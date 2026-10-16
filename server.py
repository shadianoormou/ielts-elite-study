#!/usr/bin/env python3
"""Single-user local server for IELTS Elite.

Serves the static app and persists one learner state record in SQLite. The
server deliberately binds to loopback only; it is not intended as a public
multi-user deployment.
"""

from __future__ import annotations

import json
import mimetypes
import os
import sqlite3
import urllib.error
import urllib.request
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / "ielts_elite.sqlite3"
MAX_STATE_BYTES = 8 * 1024 * 1024
REQUESTED_BACKEND = os.environ.get("IELTS_DB_BACKEND", "auto").strip().lower()
SQLSERVER_CONNECTION_STRING = os.environ.get("IELTS_SQLSERVER_CONNECTION_STRING", "").strip()
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "").strip()
OLLAMA_BASE_URL = os.environ.get("OLLAMA_BASE_URL", "http://127.0.0.1:11434").strip().rstrip("/")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "").strip()

try:
    import pyodbc  # type: ignore
except ImportError:
    pyodbc = None


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def sqlserver_available() -> bool:
    return bool(pyodbc and SQLSERVER_CONNECTION_STRING)


def backend_name() -> str:
    if REQUESTED_BACKEND == "sqlserver":
        return "sqlserver"
    if REQUESTED_BACKEND == "sqlite":
        return "sqlite"
    return "sqlserver" if sqlserver_available() else "sqlite-recovery"


def ai_provider_name() -> str:
    if OPENAI_API_KEY and OPENAI_MODEL:
        return "openai"
    if OLLAMA_MODEL:
        return "ollama-local"
    return "none"


def connect_sqlite() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.execute("PRAGMA journal_mode=WAL")
    connection.execute(
        "CREATE TABLE IF NOT EXISTS learner_state (id INTEGER PRIMARY KEY CHECK (id = 1), state_json TEXT NOT NULL, updated_at TEXT NOT NULL)"
    )
    connection.commit()
    return connection


def connect_sqlserver():
    if not pyodbc:
        raise RuntimeError("Microsoft SQL Server requires the pyodbc package")
    if not SQLSERVER_CONNECTION_STRING:
        raise RuntimeError("IELTS_SQLSERVER_CONNECTION_STRING is not configured")
    connection = pyodbc.connect(SQLSERVER_CONNECTION_STRING, timeout=8)
    connection.execute(
        "IF OBJECT_ID(N'dbo.learner_state', N'U') IS NULL "
        "CREATE TABLE dbo.learner_state (id INT NOT NULL CONSTRAINT PK_learner_state PRIMARY KEY, "
        "state_json NVARCHAR(MAX) NOT NULL, updated_at DATETIMEOFFSET(7) NOT NULL)"
    )
    connection.commit()
    return connection


def connect_db():
    if backend_name() == "sqlserver":
        return connect_sqlserver()
    return connect_sqlite()


def read_state() -> tuple[bool, dict | None, str | None]:
    with connect_db() as connection:
        query = "SELECT TOP 1 state_json, updated_at FROM dbo.learner_state WHERE id = 1" if backend_name() == "sqlserver" else "SELECT state_json, updated_at FROM learner_state WHERE id = 1"
        row = connection.execute(query).fetchone()
    if not row:
        return False, None, None
    try:
        updated_at = row[1].isoformat() if hasattr(row[1], "isoformat") else str(row[1])
        return True, json.loads(row[0]), updated_at
    except json.JSONDecodeError:
        return False, None, None


def write_state(state: dict) -> str:
    encoded = json.dumps(state, ensure_ascii=False, separators=(",", ":"))
    if len(encoded.encode("utf-8")) > MAX_STATE_BYTES:
        raise ValueError("learner state is too large")
    updated_at = utc_now()
    with connect_db() as connection:
        if backend_name() == "sqlserver":
            cursor = connection.execute("UPDATE dbo.learner_state SET state_json = ?, updated_at = ? WHERE id = 1", encoded, updated_at)
            if cursor.rowcount == 0:
                connection.execute("INSERT INTO dbo.learner_state (id, state_json, updated_at) VALUES (1, ?, ?)", 1, encoded, updated_at)
        else:
            connection.execute(
                "INSERT INTO learner_state (id, state_json, updated_at) VALUES (1, ?, ?) "
                "ON CONFLICT(id) DO UPDATE SET state_json = excluded.state_json, updated_at = excluded.updated_at",
                (encoded, updated_at),
            )
        connection.commit()
    return updated_at


def tutor_prompt(question: str, context: dict) -> str:
    prompt = (
        "You are an IELTS study tutor. Give concise, evidence-linked guidance. "
        "Do not claim an official IELTS score, do not infer pronunciation from typed text, "
        "do not invent learner weaknesses, and do not invent citations, books, studies, "
        "or official references. If the evidence is insufficient, say so plainly. Learner evidence: "
        f"{json.dumps(context, ensure_ascii=False)}\nQuestion: {question}"
    )
    return prompt


def call_ai_tutor(question: str, context: dict) -> tuple[str, str]:
    prompt = tutor_prompt(question, context)
    if OPENAI_API_KEY and OPENAI_MODEL:
        body = json.dumps({
            "model": OPENAI_MODEL,
            "store": False,
            "input": [{"role": "user", "content": [{"type": "input_text", "text": prompt}]}],
        }).encode("utf-8")
        request = urllib.request.Request(
            "https://api.openai.com/v1/responses",
            data=body,
            headers={"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"},
            method="POST",
        )
        endpoint_source = "openai-responses"
    elif OLLAMA_MODEL:
        body = json.dumps({
            "model": OLLAMA_MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "stream": False,
            "options": {"temperature": 0.2, "num_predict": 300},
        }).encode("utf-8")
        request = urllib.request.Request(
            f"{OLLAMA_BASE_URL}/api/chat",
            data=body,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        endpoint_source = "ollama-local"
    else:
        raise RuntimeError("No AI provider is configured; set OPENAI_API_KEY/OPENAI_MODEL or OLLAMA_MODEL")
    try:
        with urllib.request.urlopen(request, timeout=120 if endpoint_source == "ollama-local" else 30) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
        raise RuntimeError("AI provider request failed") from error
    texts = []
    if endpoint_source == "openai-responses":
        for item in payload.get("output", []):
            for content in item.get("content", []):
                if content.get("type") == "output_text" and content.get("text"):
                    texts.append(content["text"])
    else:
        message = payload.get("message", {})
        if message.get("content"):
            texts.append(message["content"])
    if not texts:
        raise RuntimeError("AI provider returned no text")
    return "\n".join(texts).strip(), endpoint_source


class AppHandler(SimpleHTTPRequestHandler):
    server_version = "IELTS-Elite/1.0"

    def log_message(self, format: str, *args: object) -> None:
        print(f"[{self.log_date_time_string()}] {format % args}")

    def send_json(self, payload: dict, status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        path = urlparse(self.path).path
        if path == "/api/health":
            exists, _, updated_at = read_state()
            self.send_json({"ok": True, "storage": backend_name(), "aiProvider": ai_provider_name(), "stateExists": exists, "updatedAt": updated_at})
            return
        if path == "/api/state":
            exists, state, updated_at = read_state()
            self.send_json({"ok": True, "exists": exists, "state": state, "updatedAt": updated_at})
            return
        super().do_GET()

    def do_PUT(self) -> None:
        if urlparse(self.path).path != "/api/state":
            self.send_json({"ok": False, "error": "not found"}, HTTPStatus.NOT_FOUND)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > MAX_STATE_BYTES:
                raise ValueError("invalid state size")
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            if not isinstance(payload, dict):
                raise ValueError("state must be a JSON object")
            updated_at = write_state(payload)
            self.send_json({"ok": True, "updatedAt": updated_at})
        except (ValueError, json.JSONDecodeError, UnicodeDecodeError) as error:
            self.send_json({"ok": False, "error": str(error)}, HTTPStatus.BAD_REQUEST)
        except Exception as error:  # keep the client-facing failure explicit
            self.send_json({"ok": False, "error": "storage failure"}, HTTPStatus.INTERNAL_SERVER_ERROR)
            print(f"state write failed: {error}")

    def do_POST(self) -> None:
        if urlparse(self.path).path != "/api/tutor":
            self.send_json({"ok": False, "error": "not found"}, HTTPStatus.NOT_FOUND)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 64 * 1024:
                raise ValueError("invalid request size")
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            question = str(payload.get("question", "")).strip()
            context = payload.get("context", {})
            if not question:
                raise ValueError("question is required")
            answer, source = call_ai_tutor(question, context if isinstance(context, dict) else {})
            self.send_json({"ok": True, "source": source, "answer": answer})
        except RuntimeError as error:
            self.send_json({"ok": False, "error": str(error)}, HTTPStatus.SERVICE_UNAVAILABLE)
        except (ValueError, json.JSONDecodeError, UnicodeDecodeError) as error:
            self.send_json({"ok": False, "error": str(error)}, HTTPStatus.BAD_REQUEST)

    def do_OPTIONS(self) -> None:
        self.send_response(HTTPStatus.NO_CONTENT)
        self.end_headers()


def main() -> None:
    os.chdir(ROOT)
    connect_db().close()
    server = ThreadingHTTPServer(("127.0.0.1", 4173), AppHandler)
    print(f"IELTS Elite running at http://127.0.0.1:4173/ (database: {backend_name()})")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping IELTS Elite server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
