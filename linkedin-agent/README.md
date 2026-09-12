# 🚀 LinkedIn Project Agent & High-Reach Auto-Publisher

A global developer branding & AI agent tool that analyzes any repository or software project, crafts high-reach viral LinkedIn copy (titles, problem/solution, tech stack, architecture, SEO hashtags), handles media/screenshots, and enables 1-click publishing directly to LinkedIn.

---

## 🌟 Key Capabilities

1. 🔍 **Universal Project Analyzer**: Reads `package.json`, `README.md`, `git remote`, modules, features, and tech stack of ANY project.
2. 📈 **High-Reach SEO Engine**: Crafts viral hooks, structured architecture highlights, and auto-generates 10-15 trending developer hashtags (`#ReactJS #FullStack #EdTech #SoftwareEngineering #OpenSource` etc.).
3. 📸 **Smart Media Discovery**: Scans and bundles screenshots (`admission.png`, `attendance.png`, `dashboard.png`, `library.png`) ready for post attachment.
4. 🚀 **1-Click LinkedIn Publishing**: Automatically copies formatted text with emojis to Windows Clipboard and opens the LinkedIn post creator in browser!
5. 🎨 **Interactive Web Dashboard**: Live realistic LinkedIn Feed Card preview with dark-mode aesthetic and tone switcher (*Showcase*, *Engineering Deep-Dive*, *Portfolio*).

---

## 💻 How to Use

### 1. Run the Interactive Visual Dashboard
```bash
node cli.js --ui
# or
npm start
```
Then open [http://localhost:4173](http://localhost:4173) in your browser!

### 2. Run from CLI for Current Project
```bash
# Analyze and copy post to clipboard
node cli.js

# 1-Click Publish to LinkedIn (Opens browser + copies clipboard + opens screenshot folder)
node cli.js --publish
```

### 3. Run on ANY Other Project Directory
```bash
node cli.js --path "C:\Users\acer\OneDrive\Desktop\AnyOtherProject" --publish
```

### 4. Change Tone
```bash
node cli.js --tone deep_dive
node cli.js --tone portfolio
```

---

## 🏷️ Global PATH Setup (Optional)
To use `linkedin-post` from any terminal or PowerShell window:
1. Add `c:\Users\acer\OneDrive\Desktop\OWN CLG CLONE\linkedin-agent\bin` to your Windows System Environment `PATH`.
2. Now in any project folder, simply type:
```bash
linkedin-post --publish
```
