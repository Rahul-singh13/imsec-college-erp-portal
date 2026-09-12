# 🚀 GitHub Antigravity Plugin

This plugin gives **Google Antigravity** full, automated access to GitHub across all projects and workspaces on your machine.

---

## 📦 What is inside this Plugin:
1. plugin.json - Plugin manifest declaring the GitHub integration.
2. mcp_config.json - Model Context Protocol configuration running @modelcontextprotocol/server-github.
3. skills/github-workflows/SKILL.md - Complete automated skills for repository search, creating branches, pull requests, commits, and issue tracking.
4. install_global.ps1 - 1-Click setup script to enable this plugin globally for all Antigravity workspaces.

---

## 🔑 Setup Instructions:

### Step 1: Get your GitHub Token
1. Go to **[github.com/settings/tokens](https://github.com/settings/tokens)**
2. Click **Generate new token (classic)**
3. Select scopes: epo, workflow, user
4. Copy the generated token (ghp_...)

### Step 2: Set your Token
Open mcp_config.json and paste your token in GITHUB_PERSONAL_ACCESS_TOKEN:

`json
{
  mcpServers: {
    github: {
      command: cmd.exe,
      args: [/c, npx, -y, @modelcontextprotocol/server-github],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: YOUR_GITHUB_TOKEN_HERE
      }
    }
  }
}
`

### Step 3: Use in any project!
To enable in any project, simply copy the .agents folder or this plugin folder into that project root, or install globally to ~/.gemini/config/.

---
