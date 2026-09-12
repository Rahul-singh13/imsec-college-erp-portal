import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { auditAndSanitizeWorkspace } from './security_sanitizer.js';
import { generateReadmeAndPresentation } from './readme_and_showcase_generator.js';
import { ensureAndSyncGitHubRemote } from './github_repo_manager.js';
import { syncProfileRepository } from './profile_showcase_manager.js';

export async function autoSyncRepository(workspaceDir = process.cwd()) {
  console.log('----------------------------------------------------------------');
  console.log('  🚀 Processing Repository: ' + workspaceDir);
  console.log('----------------------------------------------------------------');

  try {
    // 1. Security audit and cleanup
    auditAndSanitizeWorkspace(workspaceDir);

    // 2. Deep codebase analysis & auto-generate README.md & PRESENTATION.md
    generateReadmeAndPresentation(workspaceDir);

    // 3. Auto-configure remote, auto-create repo if missing, update descriptions, and push
    await ensureAndSyncGitHubRemote(workspaceDir);

    console.log('  ✅ Completed sync for: ' + workspaceDir);
    return true;
  } catch (err) {
    console.error('  ❌ [Sync Error in ' + workspaceDir + ']:', err.message);
    return false;
  }
}

async function main() {
  console.log('================================================================');
  console.log('  🌟 GitHub Antigravity Auto-Manager, Profile & Streak Keeper   ');
  console.log('================================================================');

  const cwd = process.cwd();
  const isGit = fs.existsSync(path.join(cwd, '.git'));

  // Target project workspaces to scan and auto-sync
  const configuredRepositories = [
    'C:/Users/acer/OneDrive/Desktop/OWN CLG CLONE',
    'D:/3D'
  ];

  // If invoked directly inside a specific repo
  if (isGit && !cwd.toLowerCase().includes('system32')) {
    await autoSyncRepository(cwd);
  } else {
    // Invoked by Task Scheduler or Desktop runner: sync all configured projects
    console.log('[Scheduler Mode] Scanning configured repositories...');
    for (const repoPath of configuredRepositories) {
      if (fs.existsSync(repoPath)) {
        await autoSyncRepository(repoPath);
      }
    }
  }

  // Sync and dynamically update Special GitHub Profile README with latest work
  console.log('================================================================');
  console.log('  ✨ Syncing & Updating Official GitHub Profile Showcase...     ');
  console.log('================================================================');
  await syncProfileRepository();

  console.log('================================================================');
  console.log('  🎉 All repositories & GitHub Profile secured, updated & live! ');
  console.log('================================================================');
}

if (process.argv[1] && process.argv[1].includes('daily_streak_keeper.js')) {
  main();
}
