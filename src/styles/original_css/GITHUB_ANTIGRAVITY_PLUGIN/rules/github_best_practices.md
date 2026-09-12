# GitHub Automation & Best Practices Rule

## 1. Security & Credentials
- NEVER commit secrets, API keys, personal access tokens (`ghp_*`), or private environment variables (`.env`).
- Always keep `.gitignore` updated with security rules.
- Mask all tokens in console logs.

## 2. Professional Commit Quality
- Use Conventional Commits format: `feat(...)`, `fix(...)`, `chore(...)`, `docs(...)`.
- Always generate rich `README.md` and `PRESENTATION.md` with screenshots before pushing.

## 3. Remote Sync Resilience
- Automatically detect missing remotes and create GitHub repositories via API.
- Automatically update repository descriptions, homepages, and topics.
- Automatically resolve divergences via `git pull --rebase origin main` before push.
