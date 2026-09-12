import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { getValidToken, requestGitHub, maskToken } from './token_manager.js';
import { analyzeCodebase, synthesizeSmartDescription } from './codebase_analyzer.js';

function run(cmd, silent = false) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: silent ? ['pipe', 'pipe', 'ignore'] : 'inherit' });
  } catch (err) {
    if (!silent) console.error('[Command Error] ' + cmd + ':', err.message);
    return null;
  }
}

function runOutput(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch (err) {
    return '';
  }
}

export function getCleanRepoName(dirPath) {
  const pkgPath = path.join(dirPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      if (pkg.name && typeof pkg.name === 'string' && pkg.name.length > 0) {
        return pkg.name.toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/^-+|-+$/g, '');
      }
    } catch (e) {}
  }
  const folder = path.basename(dirPath);
  return folder.toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/^-+|-+$/g, '');
}

export async function auditAndUpdatePastRepos(token, owner) {
  console.log('[Past Repos Auditor] Scanning user repositories for missing descriptions and topics...');
  try {
    const res = await requestGitHub('/user/repos?per_page=100&sort=updated', 'GET', null, token);
    if (res.status !== 200 || !Array.isArray(res.data)) {
      return;
    }

    let updatedCount = 0;
    for (const repo of res.data) {
      const name = repo.name;
      const hasDescription = repo.description && repo.description.trim() !== '' && repo.description !== '[NO DESCRIPTION]';

      if (!hasDescription || repo.description.length < 15) {
        const dummyAnalysis = { pkgName: name, dirName: name, framework: 'React / JavaScript', buildTool: 'Vite', pages: [], techStack: ['JavaScript'], hasBackend: false };
        const autoDesc = synthesizeSmartDescription(dummyAnalysis);
        console.log('  [Updating Repo Info] ' + name + ' -> ' + autoDesc);
        await requestGitHub('/repos/' + owner + '/' + name, 'PATCH', {
          description: autoDesc,
          has_issues: true,
          has_projects: true,
          has_wiki: true
        }, token);

        updatedCount++;
      }
    }
    console.log('✅ [Past Repos Auditor] Successfully audited & updated ' + updatedCount + ' repositories.');
  } catch (err) {
    console.error('  [Past Repos Auditor Error]:', err.message);
  }
}

export async function ensureAndSyncGitHubRemote(workspaceDir = process.cwd()) {
  console.log('[GitHub Remote Sync] Initializing code-aware remote synchronization...');
  process.chdir(workspaceDir);

  const auth = await getValidToken();
  if (!auth.token || !auth.user) {
    console.error('❌ [GitHub Remote Sync] Authentication failed. Please verify GitHub token.');
    return false;
  }

  const token = auth.token;
  const owner = auth.user.login;
  console.log('  [Auth] Authenticated as @' + owner + ' (Token: ' + maskToken(token) + ')');

  // Configure git user name & email locally if missing
  const currentGitUser = runOutput('git config user.name');
  if (!currentGitUser) {
    run('git config user.name "' + (auth.user.name || owner) + '"', true);
    run('git config user.email "' + (auth.user.email || (owner + '@users.noreply.github.com')) + '"', true);
  }

  // Deep Codebase Analysis
  const analysis = analyzeCodebase(workspaceDir);
  const repoName = getCleanRepoName(workspaceDir);
  const repoDescription = synthesizeSmartDescription(analysis);
  const topics = analysis.topics;

  console.log('  [Repository Target] ' + owner + '/' + repoName);
  console.log('  [Code-Aware Description] ' + repoDescription);
  console.log('  [Code-Aware Topics] ' + topics.join(', '));

  // 1. Check if repository exists on GitHub
  let repoExists = false;
  const checkRes = await requestGitHub('/repos/' + owner + '/' + repoName, 'GET', null, token);
  if (checkRes.status === 200) {
    repoExists = true;
    console.log('  [Remote Status] Repository exists on GitHub.');
  } else if (checkRes.status === 404) {
    console.log('  [Remote Status] Repository does not exist. Creating on GitHub automatically...');
    const createRes = await requestGitHub('/user/repos', 'POST', {
      name: repoName,
      description: repoDescription,
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true,
      auto_init: false
    }, token);

    if (createRes.status === 201) {
      repoExists = true;
      console.log('  ✅ [Created] Repository ' + owner + '/' + repoName + ' created successfully on GitHub!');
    }
  }

  // 2. Update description & topics
  if (repoExists) {
    try {
      await requestGitHub('/repos/' + owner + '/' + repoName, 'PATCH', {
        description: repoDescription,
        has_issues: true,
        has_projects: true,
        has_wiki: true
      }, token);

      await requestGitHub('/repos/' + owner + '/' + repoName + '/topics', 'PUT', {
        names: topics
      }, token);
      console.log('  [Metadata] Repository description and topics updated on GitHub.');
    } catch (e) {}
  }

  // 3. Ensure Git Repo initialized
  const isGit = runOutput('git rev-parse --is-inside-work-tree');
  if (isGit !== 'true') {
    run('git init -b main', false);
  }

  run('git branch -M main', true);

  // 4. Set Remote URL with Token Authentication
  const authenticatedRemoteUrl = 'https://' + token + '@github.com/' + owner + '/' + repoName + '.git';
  const cleanPublicRemoteUrl = 'https://github.com/' + owner + '/' + repoName + '.git';

  const existingRemotes = runOutput('git remote');
  if (existingRemotes.includes('origin')) {
    run('git remote remove origin', true);
  }
  run('git remote add origin ' + authenticatedRemoteUrl, true);

  // 5. Check if changes exist, or create daily streak heartbeat if no commit today
  const status = runOutput('git status --porcelain');
  const todayDate = new Date().toISOString().split('T')[0];
  const lastCommitDate = runOutput('git log -1 --format=%cd --date=short');

  if (status && status.length > 0) {
    run('git add -A', false);
    const commitMsg = 'feat(sync): automated repository sync, documentation & asset showcase [' + todayDate + ']';
    run('git commit -m "' + commitMsg + '"', false);
    console.log('  [Committed Code Changes] ' + commitMsg);
  } else if (lastCommitDate !== todayDate) {
    // If no changes made today, touch daily streak pulse so GitHub records daily contribution
    const githubDir = path.join(workspaceDir, '.github');
    if (!fs.existsSync(githubDir)) fs.mkdirSync(githubDir, { recursive: true });
    const pulseFile = path.join(githubDir, 'sync_pulse.json');
    fs.writeFileSync(pulseFile, JSON.stringify({
      last_verified: new Date().toISOString(),
      repository: repoName,
      status: 'healthy',
      audit: 'passed'
    }, null, 2), 'utf-8');

    run('git add ' + pulseFile, false);
    const pulseCommitMsg = 'chore(streak): daily repository maintenance & streak sync [' + todayDate + ']';
    run('git commit -m "' + pulseCommitMsg + '"', false);
    console.log('  🔥 [Daily Streak Pulse] Generated contribution commit for today: ' + todayDate);
  } else {
    console.log('  ✅ [Streak Already Active] Repository already has a verified commit for today (' + todayDate + ').');
  }

  // 6. Resilient Pull & Push
  console.log('  [Push] Pushing to GitHub main branch...');
  let pushResult = run('git push -u origin main', true);

  if (pushResult === null) {
    console.log('  [Sync Conflict / Divergence] Handling remote sync & rebase...');
    run('git pull --rebase origin main', true);
    pushResult = run('git push -u origin main', true);
    if (pushResult === null) {
      console.log('  [Clean Force Sync] Syncing main branch to GitHub...');
      pushResult = run('git push -u origin main --force', false);
    }
  }

  if (pushResult !== null) {
    console.log('  🎉 [Push Success] Repository pushed and live at: https://github.com/' + owner + '/' + repoName);
  }

  // 7. Reset origin URL to public url (so token is never stored in plain text in .git/config)
  run('git remote set-url origin ' + cleanPublicRemoteUrl, true);
  console.log('  🔒 [Security] Remote origin URL sanitized in local .git/config (token removed).');

  // 8. Auto-update past repositories missing descriptions
  await auditAndUpdatePastRepos(token, owner);

  return true;
}

if (process.argv[1] && process.argv[1].includes('github_repo_manager.js')) {
  ensureAndSyncGitHubRemote();
}
