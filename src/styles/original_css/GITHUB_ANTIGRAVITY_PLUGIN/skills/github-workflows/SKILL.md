---
name: github-workflows
description: Guide and runbooks for working with GitHub repositories, branches, commits, pull requests, issues, and workflow management using GitHub MCP tools and CLI.
---

# GitHub Workflows & Integration Skill

This skill provides comprehensive instructions for interacting with GitHub repositories, issues, branches, and pull requests directly within Antigravity.

## Common Operations

### 1. Repository Management
- Search repositories: `search_repositories`
- Read repository files and directory contents
- Create or fork repositories

### 2. Issues & Discussions
- Create issues with markdown formatting
- List and filter issues by label, state, or milestone
- Add comments and close/reopen issues

### 3. Pull Requests & Code Review
- Create feature branches: `git checkout -b feature/...`
- Push branches and open Pull Requests
- Review PR diffs and add review comments
- Merge pull requests (squash, merge, or rebase)

### 4. Git CLI Helpers
When using local git commands via shell:
- `git status`: Check modified files
- `git add <files>`: Stage changes
- `git commit -m "<message>"`: Commit changes
- `git push origin <branch>`: Push to remote
