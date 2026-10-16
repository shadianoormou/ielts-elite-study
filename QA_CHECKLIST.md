# Manual QA checklist

Executed against the local preview at `http://127.0.0.1:4173` on 16 October 2026.

## Executed

- [x] Fresh profile form accepts name, date, target, study hours, language, strengths, and consent.
- [x] Diagnostic opens with an honest `0% complete` / `Not assessed` state.
- [x] Listening and Reading objective answers update progress and show explanations.
- [x] Writing and Speaking diagnostic drafts save in the browser and require minimum evidence.
- [x] Completing all four diagnostic sections creates provisional evidence summaries and a 30-day plan.
- [x] Refresh preserves the learner profile and completed diagnostic state.
- [x] Daily task checkbox changes completion from `0/4` to `1/4` and persists the record.
- [x] Reading practice records wrong answers with category, correct answer, and explanation.
- [x] Error notebook groups recurrence and displays transparent priority values.
- [x] Writing submission creates a versioned heuristic feedback record with word-count feedback.
- [x] Speaking text fallback explicitly leaves pronunciation unassessed.
- [x] Listening studio renders five diagnostic items, supports TTS when available, and keeps the text fallback visible.
- [x] Writing Task 1 / Task 2 tabs save separate drafts and show task-specific word guidance.
- [x] Speaking Parts 1 / 2 / 3 tabs save separate drafts and expose microphone capability without requiring it.
- [x] Local tutor returns evidence-linked explanations and stores the conversation in browser state.
- [x] Recorded errors create a persisted Revision queue with due/upcoming cards and interval updates.
- [x] Mock start, timer, 40 objective items, answer autosave, submission, scoring, and deep-review limitations are visible.
- [x] Submitted mock review shows question-type accuracy, elapsed-time evidence, and first-attempt historical comparison state.
- [x] Mobile-width browser screenshot checked for readable layout and usable controls.
- [x] JavaScript parsed successfully with Tree-sitter JavaScript grammar after implementation.
- [x] Single-user SQLite server starts on loopback and exposes `/api/health` and `/api/state`.
- [x] Fresh app bootstrap restores server state when present and writes browser state to SQLite when the database is empty.
- [x] Save failures visibly fall back to browser recovery mode instead of pretending server persistence succeeded.
- [x] Microsoft SQL Server adapter, schema bootstrap, connection-string environment variable, and backend health reporting are implemented.
- [x] Server-side AI tutor adapter sends only on an explicit tutor action and falls back safely when the provider is unavailable.
- [x] Free local Ollama adapter is available through `OLLAMA_MODEL`, with OpenAI taking precedence when configured.
- [x] Ollama `llama3.2:3b` installed locally and a real `/api/tutor` response verified with `source: ollama-local`.
- [x] Public static Site deployment loads the onboarding screen cleanly with no browser console errors.
- [x] Overall-band display applies the official nearest-half-band rounding rule while retaining a provisional/non-official label.

## Not executed / unavailable

- [ ] Licensed IELTS audio playback, transcription, and pronunciation analysis. Browser microphone capture is capability-dependent and was not treated as a scoring engine.
- [ ] Live server-side AI response; unavailable because no API key/model was configured in this environment.
- [ ] Live Microsoft SQL Server connection; unavailable in this environment because `pyodbc`, an ODBC driver, and a SQL Server connection were not configured.
- [ ] Secure authentication, cloud database, multi-user access control, and account deletion; intentionally out of scope for a private single-user loopback app.
- [ ] Full 40-question IELTS Listening/Reading timing and official-format equivalence.
- [ ] Official raw-score conversion/result service; practice conversions remain explicitly local and provisional.
- [ ] Cross-device synchronization.
- [x] Public static deployment.

## Acceptance note

The implemented local journey is coherent and stateful, but the app should be extended with a backend, secure identity, licensed/original audio assets, and a configured AI service before being treated as a production release.
