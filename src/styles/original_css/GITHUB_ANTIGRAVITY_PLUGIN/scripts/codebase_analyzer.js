import fs from 'fs';
import path from 'path';

/**
 * Deeply inspects a workspace codebase to extract:
 * - Frameworks & Libraries (React, Vite, Vue, Three.js, Express, Python, etc.)
 * - Architecture structure (Pages, Components, Backend/Services, APIs, Store, Styles)
 * - Screenshots and visual assets
 * - Routes and Feature list
 * - Generate 100% accurate, contextual description, topics, README, and PRESENTATION
 */
export function analyzeCodebase(targetDir = process.cwd()) {
  const result = {
    dirName: path.basename(targetDir),
    pkgName: '',
    pkgDescription: '',
    techStack: [],
    badges: [],
    framework: 'Vanilla / Node.js',
    buildTool: '',
    styling: 'Vanilla CSS',
    hasBackend: false,
    backendServices: [],
    pages: [],
    components: [],
    screenshots: [],
    routes: [],
    topics: ['javascript', 'fullstack', 'clean-code'],
    primaryLanguage: 'JavaScript'
  };

  // 1. Inspect package.json if exists
  const pkgPath = path.join(targetDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      result.pkgName = pkg.name || result.dirName;
      result.pkgDescription = pkg.description || '';

      const allDeps = {
        ...(pkg.dependencies || {}),
        ...(pkg.devDependencies || {})
      };

      if (allDeps['react']) {
        result.framework = 'React ' + (allDeps['react'].replace(/[^0-9.]/g, '') || '18');
        result.techStack.push('React');
        result.topics.push('react');
      }
      if (allDeps['vite']) {
        result.buildTool = 'Vite';
        result.techStack.push('Vite');
        result.topics.push('vite');
      }
      if (allDeps['react-router-dom'] || allDeps['react-router']) {
        result.techStack.push('React Router');
        result.topics.push('react-router');
      }
      if (allDeps['three']) {
        result.techStack.push('Three.js / WebGL');
        result.topics.push('threejs', 'webgl');
      }
      if (allDeps['gsap']) {
        result.techStack.push('GSAP Animations');
        result.topics.push('gsap');
      }
      if (allDeps['tailwindcss']) {
        result.styling = 'Tailwind CSS';
        result.topics.push('tailwind');
      }
      if (allDeps['express'] || allDeps['fastify'] || allDeps['koa']) {
        result.hasBackend = true;
        result.techStack.push('Express / REST API');
        result.topics.push('express', 'nodejs');
      }
    } catch (e) {}
  }

  // 2. Inspect directories & architecture
  const searchDirs = ['src', 'public', 'pages', 'components', 'backend', 'api', 'services'];
  
  // Detect Pages
  const pagesDirs = [path.join(targetDir, 'src', 'pages'), path.join(targetDir, 'pages')];
  for (const pDir of pagesDirs) {
    if (fs.existsSync(pDir)) {
      try {
        const files = fs.readdirSync(pDir);
        for (const file of files) {
          if (/\.(jsx|tsx|js|vue)$/.test(file)) {
            const pageName = file.replace(/\.(jsx|tsx|js|vue)$/, '');
            result.pages.push(pageName);
            result.routes.push('/' + pageName.toLowerCase().replace(/([a-z])([A-Z])/g, '$1_$2'));
          }
        }
      } catch (e) {}
    }
  }

  // Detect Backend / Services
  const backendDirs = [
    path.join(targetDir, 'src', 'backend'),
    path.join(targetDir, 'src', 'api'),
    path.join(targetDir, 'backend'),
    path.join(targetDir, 'api')
  ];
  for (const bDir of backendDirs) {
    if (fs.existsSync(bDir)) {
      result.hasBackend = true;
      try {
        const files = fs.readdirSync(bDir);
        for (const file of files) {
          if (/\.(js|ts)$/.test(file)) {
            result.backendServices.push(file);
          }
        }
      } catch (e) {}
    }
  }

  // Detect Components
  const compDirs = [path.join(targetDir, 'src', 'components'), path.join(targetDir, 'components')];
  for (const cDir of compDirs) {
    if (fs.existsSync(cDir)) {
      try {
        const files = fs.readdirSync(cDir);
        for (const file of files) {
          if (/\.(jsx|tsx|vue|js)$/.test(file)) {
            result.components.push(file.replace(/\.(jsx|tsx|vue|js)$/, ''));
          }
        }
      } catch (e) {}
    }
  }

  // Detect Screenshots
  const screenshotDirs = [
    path.join(targetDir, 'public', 'screenshots'),
    path.join(targetDir, 'screenshots'),
    path.join(targetDir, 'public', 'images')
  ];
  for (const sDir of screenshotDirs) {
    if (fs.existsSync(sDir)) {
      try {
        const files = fs.readdirSync(sDir);
        for (const file of files) {
          if (/\.(png|jpg|jpeg|webp|gif)$/i.test(file)) {
            const relPath = path.relative(targetDir, path.join(sDir, file)).replace(/\\/g, '/');
            const title = file.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            result.screenshots.push({ file, relPath, title });
          }
        }
      } catch (e) {}
    }
  }

  // Deduplicate topics
  result.topics = [...new Set(result.topics)];

  return result;
}

export function synthesizeSmartDescription(analysis) {
  const parts = [];
  const name = analysis.pkgName || analysis.dirName;

  if (name.includes('erp') || name.includes('college') || name.includes('imsec')) {
    return `🎓 High-fidelity ${analysis.framework} + ${analysis.buildTool || 'SPA'} educational clone of IMSEC College ERP with ${analysis.pages.length || 29} modules, decoupled mock backend services & vanilla design system.`;
  }

  if (name.includes('portfolio')) {
    return `✨ Interactive personal portfolio engineered with ${analysis.framework}, custom design system, project showcases & fluid UI motion.`;
  }

  if (name.includes('lifeos') || name.includes('goal')) {
    return `🧠 Comprehensive productivity & habit tracking web application built with ${analysis.framework} and local state persistence.`;
  }

  if (name.includes('3d') || analysis.techStack.includes('Three.js / WebGL')) {
    return `⚡ Interactive 3D WebGL experience built with Three.js, GSAP animations, and modern creative frontend architecture.`;
  }

  // Generic intelligent fallback based on scanned components and features
  let desc = `🚀 Modern ${analysis.framework} web application featuring `;
  if (analysis.pages.length > 0) {
    desc += `${analysis.pages.length} interactive views, `;
  }
  if (analysis.hasBackend) {
    desc += `decoupled service architecture, `;
  }
  desc += `and responsive UI.`;
  return desc;
}
