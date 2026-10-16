# IELTS Elite

IELTS Elite is a local-first, mobile-responsive IELTS Academic preparation workspace built from the supplied 30-Day Master Prompt.

## Run locally

From this folder (recommended single-user mode):

```bash
python3 server.py
```

Open <http://127.0.0.1:4173>.

The server binds to `127.0.0.1` and stores the single learner record in `ielts_elite.sqlite3`. Browser `localStorage` remains as a recovery mirror. No package installation, API key, or build step is required.

Static-only fallback is still available with `python3 -m http.server 4173`, but it uses browser recovery mode because the SQLite API is not available.

## Microsoft SQL Server mode

The same server supports Microsoft SQL Server through `pyodbc`. Copy [.env.example](</Users/ras/Documents/ChatGPT/IELTS application/.env.example>) into your shell environment, install `pyodbc` and Microsoft ODBC Driver 18, create the `IELTS_Elite` database, then launch with:

```bash
export IELTS_DB_BACKEND=sqlserver
export IELTS_SQLSERVER_CONNECTION_STRING='DRIVER={ODBC Driver 18 for SQL Server};SERVER=localhost,1433;DATABASE=IELTS_Elite;UID=YOUR_USER;PWD=YOUR_PASSWORD;Encrypt=no;TrustServerCertificate=yes'
python3 server.py
```

The server creates `dbo.learner_state` automatically. It never stores the connection string in the project. If SQL Server configuration is absent, `auto` mode uses the local SQLite recovery backend and exposes that fact through `/api/health`; it does not claim that SQL Server is connected.

## Optional AI tutor

The local server exposes `POST /api/tutor` and keeps the API key server-side. Configure it in the shell before starting the server:

```bash
export OPENAI_API_KEY='your-key'
export OPENAI_MODEL='your-model'
python3 server.py
```

The browser sends a question only when you click **Ask tutor**. If the provider is not configured, unavailable, or returns an error, the app records a deterministic evidence-linked fallback instead. The public static Site cannot use this private local endpoint unless a separately deployed backend is configured.

### Free local AI alternative

Install [Ollama](https://ollama.com), pull any compatible local model, and configure the server without an API key:

```bash
ollama pull llama3.2:3b
export OLLAMA_MODEL='llama3.2:3b'
python3 server.py
```

The app uses OpenAI when both OpenAI variables are present; otherwise it uses Ollama when `OLLAMA_MODEL` is set; otherwise it uses the deterministic fallback. Ollama keeps the tutor request on your own computer and has no per-token API charge, but it needs enough local RAM/CPU and does not automatically make the public Site AI-enabled. Local generation is bounded and allowed more time on slower CPUs.

After the first model download, you can double-click [`run_local.command`](</Users/ras/Documents/ChatGPT/IELTS%20application/run_local.command>) or run `./run_local.command` to start the app with the free local model automatically.

## Implemented journey

1. Create a learner profile and planning inputs.
2. Complete a four-skill diagnostic with objective questions plus Writing and Speaking evidence samples.
3. Receive provisional, evidence-labelled estimates and a generated 30-day roadmap.
4. Complete daily tasks with browser-local persistence.
5. Submit Reading practice and log question-level errors.
6. Review recurring priorities in the Error notebook.
7. Use the Listening studio with browser text-to-speech when available, with a visible text fallback.
8. Save Writing Task 1 and Task 2 drafts/submissions with task-specific heuristic feedback and revision records.
9. Practice Speaking Parts 1, 2, and 3 with typed fallback and an in-browser microphone attempt when supported.
10. Ask the configured server-side AI tutor for evidence-linked explanations, with a deterministic local fallback when no provider is configured.
11. Revisit recorded errors through a persisted spaced-repetition Revision queue with expanding intervals.
12. Start a timed 40-item objective mock (20 Listening + 20 Reading), optionally add Writing/Speaking evidence, autosave answers, and inspect deep review with question-type accuracy, elapsed time, and historical comparison.
13. Review analytics and export the full local learner state as JSON.

## Honest limitations

- Single-user data is persisted in Microsoft SQL Server when SQL Server mode is configured, or local SQLite in recovery mode, with browser `localStorage` as a recovery mirror. There is no account system or multi-device sync.
- Listening uses original text-fallback items and browser text-to-speech when available; it is not equivalent to licensed IELTS audio.
- Speaking supports Parts 1–3, typed fallback, and a browser microphone attempt. Pronunciation is never inferred from typed text, and recordings are not uploaded.
- Writing and Speaking feedback is heuristic and explicitly marked as non-official.
- The mock exam has 40 original objective items plus optional subjective evidence; it is not a full official-format IELTS exam or official score conversion.
- The public static Site is available at [IELTS Elite Study](https://ielts-elite-study.ababil-cox-8536.chatgpt.site), but its browser-only mode cannot reach the private local SQL/AI server.
- The AI adapter is wired to the OpenAI Responses API but requires your own server-side API key and model configuration.
- Listening uses original text-fallback items and browser text-to-speech when available; it is not equivalent to licensed IELTS audio.
- The app applies the official IELTS overall-band rounding rule to its provisional component estimates, but it does not perform official raw-score conversion or provide an official IELTS result. Official scoring still requires an authorised IELTS test.

## Data model

The browser state record is stored under `ielts-elite-state-v1` and mirrored as one JSON record in the SQLite `learner_state` table. It includes profile, diagnostic attempts, results, plan days, task completion, practice answers, writing/speaking revisions, error records, revision queue, language mastery, mock records, sessions, and preferences.

## Verification

See [QA_CHECKLIST.md](QA_CHECKLIST.md) for the manual workflow used during browser verification and the limitations that remain unverified in this local-only build.
