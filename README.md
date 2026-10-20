# Team POC

A small Node.js/Express API that proves the team workflow end to end:
**issue → branch → pull request → automatic checks + Claude review → Team Lead approves and merges → staging → Team Lead releases in Render → production.**

The app itself is deliberately tiny (`/health` and `/tasks`). The point of this repo is everything around it.

## What's inside

| File | What it does |
| --- | --- |
| `src/app.js`, `src/server.js` | The sample API |
| `test/app.test.js` | Tests (Jest + Supertest) |
| `Makefile` | The same four commands for every project: `install`, `lint`, `test`, `build` |
| `.github/workflows/ci.yml` | Runs lint, tests and build on every PR and on `main` |
| `.github/workflows/claude-review.yml` | Claude posts an advisory review on every PR |
| `.github/workflows/claude.yml` | Lets anyone type `@claude` in an issue or PR comment |
| `.github/CODEOWNERS` | Makes the Team Lead the required reviewer on every PR |
| `.github/pull_request_template.md`, `.github/ISSUE_TEMPLATE/` | Templates for PRs, features, bugs and tasks |
| `render.yaml` | Staging (auto-deploys after CI passes, with PR previews) and production (deploys only when the Team Lead clicks Manual Deploy in Render) |
| `CLAUDE.md` | Rules Claude follows in this repo |

## Free demo mode

This repo is set up so the POC can be shown without any paid plans:

- **GitHub Free organization + public repo.** GitHub enforces rulesets on public repos on the Free plan (private repos need GitHub Team). The demo code contains no secrets, so public is safe. Real projects: Team plan + private repos.
- **Render free instances.** `render.yaml` uses `plan: free`. Free services sleep after a period without traffic, so open both `/health` links a few minutes before a demo. Real projects: `plan: starter` or higher.

## Run it locally

Needs Node.js 20 or newer.

```bash
cp .env.example .env
make install
make test
npm run dev        # http://localhost:3000/health
```

## One-time setup (Team Lead)

Before the first push: replace `BOSS-GITHUB-USERNAME` in `.github/CODEOWNERS` with the Team Lead's GitHub username, and run `npm install` so `package-lock.json` is created and committed (CI and Render use `npm ci`, which needs it).

1. **Create the repo.** In the company GitHub organization: New repository → `team-poc`, private, no README. Push this code to `main` and let the CI run once.
2. **Give the team access.** Settings → Collaborators and teams → add the `developers` team with **Write**.
3. **Lock `main`.** Settings → Rules → Rulesets → New branch ruleset → target the default branch. Turn on: Restrict updates, Restrict deletions, Block force pushes, Require a pull request (1 approval, Require review from Code Owners), Require status checks (`check`). Bypass list: **Repository admin**, *For pull requests only* (the Team Lead is the only admin). Enforcement: Active.
4. **Connect Render.** In the Team Lead's Render workspace: New → Blueprint → pick this repo. Render creates `team-poc-staging` (auto-deploys after CI passes, PR previews on) and `team-poc-production` (auto-deploy off).
5. **Connect Claude.** Install the Claude GitHub app on this repo and add the repo secret `ANTHROPIC_API_KEY` (or run `/install-github-app` in Claude Code).
6. **Create the board.** Organization → Projects → New project → Board with Backlog, Ready, In progress, In review, Done, linked to this repo.

**Releasing to production:** the Team Lead opens `team-poc-production` in Render → **Manual Deploy → Deploy latest commit**. Rollback: **Events** → previous deploy → **Rollback**.

> GitHub's environment "required reviewers" approval button isn't available for private repos on the Team plan, which is why production is released from Render instead.

## Day-to-day (developers)

```bash
git checkout main && git pull
git checkout -b feature/12-mark-task-done
# make the change + tests
make lint && make test
git commit -am "feat: mark a task as done"
git push -u origin feature/12-mark-task-done
```

Open a pull request with `Closes #12`. CI runs, Render posts a preview link, Claude reviews, and the Team Lead is asked to approve. After he merges, staging updates on its own; production updates when he clicks Manual Deploy in Render.
