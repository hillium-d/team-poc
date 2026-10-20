# CLAUDE.md

Instructions for Claude (Claude Code and the GitHub action) when working in this repo.

## Project

Team POC: a small Node.js 20 + Express API used to prove the team workflow.
- `src/app.js` — routes (`/health`, `/tasks`)
- `src/server.js` — starts the server
- `test/` — Jest + Supertest tests

## Commands

- `make install` — install dependencies
- `make lint` — ESLint
- `make test` — tests with coverage
- `make build` — syntax check

Run `make lint` and `make test` before saying a change is finished.

## Team rules

- Never commit to `main`. Work on a branch named `<type>/<issue-number>-<short-name>`.
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`.
- Every change needs tests.
- Never add secrets, API keys or real customer data to code, tests or comments. New environment variables go in `.env.example`.
- Do not edit `render.yaml`, `.github/workflows/` or `.github/CODEOWNERS` unless the issue explicitly asks for it.

## Reviewing pull requests

Your review is advisory; the Team Lead approves and merges. Focus on bugs, missing tests, security problems and breaks from the rules above. Keep comments short and specific.
