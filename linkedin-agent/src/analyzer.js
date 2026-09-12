const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Analyzes any software project directory to extract metadata,
 * tech stack, features, architecture, git remotes, and screenshots.
 */
function analyzeProject(projectDir = process.cwd()) {
  const resolvedDir = path.resolve(projectDir);
  const result = {
    projectPath: resolvedDir,
    projectName: path.basename(resolvedDir),
    description: '',
    techStack: [],
    features: [],
    modules: [],
    architecture: '',
    githubUrl: '',
    screenshots: [],
    mediaCount: 0,
    hasPackageJson: false,
    hasReadme: false,
    stats: {}
  };

  if (!fs.existsSync(resolvedDir)) {
    throw new Error(`Directory does not exist: ${resolvedDir}`);
  }

  // 1. Read package.json if available
  const pkgPath = path.join(resolvedDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      result.hasPackageJson = true;
      if (pkg.name) result.projectName = pkg.name;
      if (pkg.description) result.description = pkg.description;

      const allDeps = {
        ...(pkg.dependencies || {}),
        ...(pkg.devDependencies || {})
      };

      // Detect tech stack
      const detectedTech = [];
      if (allDeps['react'] || allDeps['react-dom']) detectedTech.push('React 18');
      if (allDeps['vite']) detectedTech.push('Vite');
      if (allDeps['next']) detectedTech.push('Next.js');
      if (allDeps['vue']) detectedTech.push('Vue.js');
      if (allDeps['@angular/core']) detectedTech.push('Angular');
      if (allDeps['express']) detectedTech.push('Express.js');
      if (allDeps['tailwindcss']) detectedTech.push('TailwindCSS');
      if (allDeps['typescript']) detectedTech.push('TypeScript');
      if (allDeps['lucide-react'] || allDeps['react-icons']) detectedTech.push('Lucide Icons');
      if (allDeps['chart.js'] || allDeps['recharts']) detectedTech.push('Data Visualizations');
      if (allDeps['zustand'] || allDeps['redux']) detectedTech.push('State Management');
      if (allDeps['axios']) detectedTech.push('Axios API Client');
      if (allDeps['socket.io'] || allDeps['socket.io-client']) detectedTech.push('WebSockets / Realtime');

      // Default fallback if vanilla JS
      if (detectedTech.length === 0) {
        detectedTech.push('JavaScript', 'Vanilla CSS', 'HTML5');
      } else {
        detectedTech.push('Vanilla CSS3', 'JavaScript (ES6+)');
      }

      result.techStack = [...new Set(detectedTech)];
    } catch (e) {
      console.warn('Could not parse package.json:', e.message);
    }
  }

  // 2. Read README.md if available
  const readmeCandidates = ['README.md', 'readme.md', 'README', 'Readme.md'];
  for (const name of readmeCandidates) {
    const readmePath = path.join(resolvedDir, name);
    if (fs.existsSync(readmePath)) {
      result.hasReadme = true;
      const content = fs.readFileSync(readmePath, 'utf8');
      parseReadmeContent(content, result);
      break;
    }
  }

  // 3. Read PRESENTATION.md or docs if available
  const presPath = path.join(resolvedDir, 'PRESENTATION.md');
  if (fs.existsSync(presPath)) {
    const presContent = fs.readFileSync(presPath, 'utf8');
    parseReadmeContent(presContent, result);
  }

  // 4. Extract Git Remote URL
  try {
    const gitRemote = execSync('git remote get-url origin', {
      cwd: resolvedDir,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim();
    if (gitRemote) {
      result.githubUrl = gitRemote.replace(/\.git$/, '');
    }
  } catch (e) {
    // Git remote not set or not a git repo, check git config
    const gitConfigPath = path.join(resolvedDir, '.git', 'config');
    if (fs.existsSync(gitConfigPath)) {
      const gitConfig = fs.readFileSync(gitConfigPath, 'utf8');
      const match = gitConfig.match(/url\s*=\s*(https:\/\/github\.com\/[^\s\n]+)/);
      if (match) {
        result.githubUrl = match[1].replace(/\.git$/, '');
      }
    }
  }

  // 5. Scan for Screenshots and Media
  result.screenshots = findProjectScreenshots(resolvedDir);
  result.mediaCount = result.screenshots.length;

  // 6. Default Fallbacks if empty
  if (!result.description && result.projectName) {
    result.description = `A high-performance modern web application built with ${result.techStack.join(', ') || 'modern web technologies'}.`;
  }

  return result;
}

/**
 * Parses markdown README to extract title, key highlights, modules, and architecture.
 */
function parseReadmeContent(content, result) {
  const lines = content.split('\n');
  
  // Extract Title (# ...)
  if (!result.cleanTitle) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      result.cleanTitle = titleMatch[1].trim();
    }
  }

  // Extract blockquote or summary
  const quoteMatch = content.match(/>\s*(.+)/);
  if (quoteMatch && (!result.description || result.description.length < 20)) {
    result.description = quoteMatch[1].replace(/[🎓⚡🚀✨]/g, '').trim();
  }

  // Extract key highlights / features bullet points
  const linesArr = content.split('\n');
  for (const rawLine of linesArr) {
    const trimmed = rawLine.trim();
    if (trimmed.startsWith('#') || trimmed.startsWith('---') || trimmed.startsWith('```')) continue;
    const bulletMatch = trimmed.match(/^[-*]\s+([^\n]+)/);
    if (bulletMatch) {
      const cleanBullet = bulletMatch[1].replace(/[*_`]/g, '').trim();
      if (cleanBullet.length > 10 && cleanBullet.length < 150 && !cleanBullet.startsWith('http') && !cleanBullet.startsWith('![')) {
        if (!result.features.includes(cleanBullet)) {
          result.features.push(cleanBullet);
        }
      }
    }
  }

  // Extract module names if listed in backticks `ModuleName`
  const moduleMatches = content.match(/`([A-Z][a-zA-Z0-9]+)`/g);
  if (moduleMatches) {
    const modules = [...new Set(moduleMatches.map(m => m.replace(/`/g, '')))]
      .filter(m => m.length > 3 && !['React', 'Vite', 'JavaScript', 'HTML5', 'Node', 'JSON', 'CSS3'].includes(m));
    if (modules.length > 0) {
      result.modules = modules;
    }
  }

  // Check architecture diagram
  if (content.includes('```mermaid')) {
    result.architecture = 'Decoupled Service Architecture with Universal API Client Layer & Local Mock Store';
  }
}

/**
 * Discovers screenshots and images in common folders
 */
function findProjectScreenshots(rootDir) {
  const potentialDirs = [
    path.join(rootDir, 'public', 'screenshots'),
    path.join(rootDir, 'screenshots'),
    path.join(rootDir, 'assets', 'screenshots'),
    path.join(rootDir, 'docs', 'screenshots'),
    path.join(rootDir, 'public'),
    path.join(rootDir, 'assets')
  ];

  const found = [];
  const validExts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4'];

  for (const dir of potentialDirs) {
    if (fs.existsSync(dir)) {
      try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          if (validExts.includes(ext)) {
            const fullPath = path.join(dir, file);
            const stats = fs.statSync(fullPath);
            if (stats.isFile() && stats.size > 2000) { // filter out tiny favicons
              const relPath = path.relative(rootDir, fullPath);
              found.push({
                name: file,
                title: path.basename(file, ext).replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                relativePath: relPath.replace(/\\/g, '/'),
                absolutePath: fullPath,
                sizeBytes: stats.size,
                sizeFormatted: (stats.size / 1024).toFixed(1) + ' KB',
                ext: ext
              });
            }
          }
        }
      } catch (e) {
        // ignore directory read errors
      }
    }
  }

  // Deduplicate by filename
  const unique = [];
  const seen = new Set();
  for (const item of found) {
    if (!seen.has(item.name)) {
      seen.add(item.name);
      unique.push(item);
    }
  }

  return unique;
}

module.exports = {
  analyzeProject,
  findProjectScreenshots
};
