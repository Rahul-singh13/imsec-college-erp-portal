import fs from 'fs';
import path from 'path';

const SENSITIVE_PATTERNS = [
  { name: 'GitHub Classic Token', regex: /ghp_[a-zA-Z0-9]{36}/g },
  { name: 'GitHub Fine-Grained Token', regex: /github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}/g },
  { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/g },
  { name: 'Private Key Block', regex: /-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----/g },
  { name: 'Generic Secret Assignment', regex: /(api_key|secret_key|auth_token|client_secret)\s*[:=]\s*['"][a-zA-Z0-9_\-]{20,}['"]/gi }
];

const JUNK_FILE_PATTERNS = [
  /\.log$/,
  /\.tmp$/,
  /\.pyc$/,
  /\.har$/,
  /^extracted_/,
  /^analyze_.*\.py$/,
  /^inspect_.*\.py$/,
  /^extract_.*\.py$/,
  /^test_server\.py$/,
  /.*_temp\.(js|py|json)$/
];

const RECOMMENDED_GITIGNORE = `# Dependencies
node_modules/
/.pnp
.pnp.js

# Production build
dist/
dist-ssr/
build/
*.local

# Environment & Sensitive Keys
.env
.env.*
!.env.example
*.token
*.pem
*.key
credentials.json
mcp_config.json
.agents/

# Logs & Dumps
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
*.har
extracted_*

# Temporary & Scratch scripts
scratch/
*_temp.js
take_screenshots.js

# Editor & OS files
.vscode/*
!.vscode/extensions.json
.idea/
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`;

function scanFilesForSecrets(dir, scannedList = []) {
  if (!fs.existsSync(dir)) return scannedList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanFilesForSecrets(fullPath, scannedList);
    } else if (/\.(jsx?|tsx?|json|html|py|env.*)$/i.test(entry.name) && entry.name !== 'mcp_config.json' && entry.name !== 'token_manager.js') {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        for (const pattern of SENSITIVE_PATTERNS) {
          if (pattern.regex.test(content)) {
            scannedList.push({ file: fullPath, secretType: pattern.name });
          }
        }
      } catch (e) {}
    }
  }
  return scannedList;
}

export function auditAndSanitizeWorkspace(targetDir = process.cwd()) {
  console.log('[Security Sanitizer] Scanning workspace for .env, secrets & junk files...');
  let cleanedCount = 0;

  // 1. Guard & Verify .gitignore
  const gitignorePath = path.join(targetDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, RECOMMENDED_GITIGNORE, 'utf-8');
    console.log('  🛡️ [Secured] Created comprehensive .gitignore shield.');
  } else {
    let content = fs.readFileSync(gitignorePath, 'utf-8');
    let updated = false;
    const requiredKeywords = ['.env', '.env.*', '!.env.example', '*.token', '*.pem', '*.key', 'credentials.json', 'mcp_config.json', '.agents/'];
    for (const kw of requiredKeywords) {
      if (!content.includes(kw)) {
        content += '\n' + kw;
        updated = true;
      }
    }
    if (updated) {
      fs.writeFileSync(gitignorePath, content, 'utf-8');
      console.log('  🛡️ [Secured] Updated .gitignore with strict .env and secret filters.');
    }
  }

  // 2. Scan for .env files & generate safe .env.example
  const envPath = path.join(targetDir, '.env');
  const envExamplePath = path.join(targetDir, '.env.example');
  if (fs.existsSync(envPath) && !fs.existsSync(envExamplePath)) {
    try {
      const rawEnv = fs.readFileSync(envPath, 'utf-8');
      const safeExample = rawEnv.replace(/(=)(.+)/g, '=$1_your_value_here');
      fs.writeFileSync(envExamplePath, safeExample, 'utf-8');
      console.log('  🛡️ [Safe Template] Generated .env.example (Real .env kept private & ignored).');
    } catch (e) {}
  }

  // 3. Scan Codebase Files for Hardcoded Tokens/Secrets
  const leaks = scanFilesForSecrets(targetDir);
  if (leaks.length > 0) {
    console.warn('  ⚠️ [Secret Alert] Potential exposed secrets found in:');
    leaks.forEach(l => console.warn('    - ' + path.relative(targetDir, l.file) + ' (' + l.secretType + ')'));
  } else {
    console.log('  ✅ [Clean Code] Zero hardcoded secrets detected in source files.');
  }

  // 4. Remove Junk & Scratch files
  try {
    const entries = fs.readdirSync(targetDir);
    for (const entry of entries) {
      const fullPath = path.join(targetDir, entry);
      const isJunk = JUNK_FILE_PATTERNS.some(p => p.test(entry));
      if (isJunk && entry !== '.git' && entry !== 'node_modules') {
        try {
          if (fs.lstatSync(fullPath).isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(fullPath);
          }
          console.log('  [Cleaned Junk] ' + entry);
          cleanedCount++;
        } catch (e) {}
      }
    }
  } catch (e) {}

  console.log('  ✅ [Security Sanitizer Complete] Workspace protected & cleaned (' + cleanedCount + ' junk items removed).');
  return true;
}

export function cleanAndFormatWorkspace(targetDir) {
  return auditAndSanitizeWorkspace(targetDir);
}

if (process.argv[1] && process.argv[1].includes('security_sanitizer.js')) {
  auditAndSanitizeWorkspace();
}
