# Contributing to DecentraSocial

Thank you for your interest in contributing! This document explains how to get started.

---

## Project Structure

```
blockchain/   → Solidity smart contracts (Hardhat)
backend/      → Node.js + Express API (TypeScript)
frontend/     → React + Vite UI (TypeScript)
ml-service/   → Python FastAPI fake news detection
```

---

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Blockchain.git`
3. Create a new branch: `git checkout -b feat/your-feature-name`
4. Follow the setup instructions in [README.md](./README.md)
5. Make your changes
6. Run tests before submitting (see below)
7. Push and open a Pull Request

---

## Branch Naming

| Type | Format | Example |
|------|--------|---------|
| New feature | `feat/name` | `feat/post-bookmarks` |
| Bug fix | `fix/name` | `fix/login-redirect` |
| Documentation | `docs/name` | `docs/api-guide` |
| Refactor | `refactor/name` | `refactor/auth-service` |

---

## Running Tests

```bash
# Smart contract tests
cd blockchain
npx hardhat test

# Backend type check
cd backend
npx tsc --noEmit

# Frontend build check
cd frontend
npm run build

# ML service syntax check
cd ml-service
python -m py_compile main.py
```

---

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add bookmark feature to posts
fix: resolve JWT expiry type error
docs: update setup instructions
test: add moderation contract tests
refactor: simplify encryption service
chore: update dependencies
```

---

## Pull Request Checklist

- [ ] All tests pass locally
- [ ] TypeScript has no type errors
- [ ] Smart contracts compile without warnings
- [ ] Commit messages follow the convention above
- [ ] Changes are described clearly in the PR description

---

## Code Style

- TypeScript strict mode is enabled — no `any` unless absolutely necessary
- Use `async/await` over `.then()` chains
- Keep functions small and single-purpose
- Solidity: follow checks-effects-interactions pattern

---

## Reporting Bugs

Please use the [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md) issue template.

## Suggesting Features

Please use the [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md) issue template.
