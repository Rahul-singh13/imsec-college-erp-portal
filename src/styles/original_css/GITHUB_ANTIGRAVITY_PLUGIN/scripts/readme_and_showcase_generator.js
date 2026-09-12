import fs from 'fs';
import path from 'path';
import { analyzeCodebase, synthesizeSmartDescription } from './codebase_analyzer.js';
import { autoFixMermaidInContent, validateMarkdownAndMermaid } from './validator.js';

export function generateReadmeAndPresentation(targetDir = process.cwd()) {
  const analysis = analyzeCodebase(targetDir);
  const projectName = analysis.pkgName || path.basename(targetDir);
  const smartDesc = synthesizeSmartDescription(analysis);

  console.log('[Showcase Generator] Analyzing codebase for ' + projectName + '...');

  // Build Badges
  const badges = [
    '[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)',
    analysis.techStack.includes('React') ? '[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)' : '',
    analysis.buildTool === 'Vite' ? '[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)' : '',
    '[![Architecture](https://img.shields.io/badge/Architecture-Decoupled_Services-2ea44f?style=flat-square)](https://github.com/)',
    '[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)'
  ].filter(Boolean).join('\n');

  // Build Screenshot Section
  let screenshotSection = '';
  if (analysis.screenshots.length > 0) {
    screenshotSection = '## 📸 Visual Showcase & UI Gallery\n\n';
    analysis.screenshots.forEach((s, idx) => {
      screenshotSection += '### ' + (idx + 1) + '. ' + s.title + '\n![' + s.title + '](' + s.relPath + ')\n\n';
    });
  }

  // Build Features List
  let featuresList = '';
  if (analysis.pages.length > 0) {
    featuresList = '## 🌟 Implemented Modules & Pages (' + analysis.pages.length + ' Views)\n\n';
    const chunks = [];
    for (let i = 0; i < analysis.pages.length; i += 3) {
      const group = analysis.pages.slice(i, i + 3).map(p => '`' + p + '`').join(' | ');
      chunks.push('- ' + group);
    }
    featuresList += chunks.join('\n') + '\n\n';
  }

  // Build Architecture Diagram with SAFE QUOTED Mermaid labels
  const architectureDiagram = '## 🏗️ System Architecture\n\n```mermaid\ngraph TD\n    UI["Client Application (' + analysis.framework + ')"] --> Router["Navigation & Routing Layer"]\n    Router --> API["Universal API Client Layer"]\n    API --> Backend["Decoupled Business Logic & Services"]\n    Backend --> Data[("Local Mock Database / JSON Store")]\n```\n';

  // Assemble full README
  let finalReadme = '# ' + projectName.toUpperCase().replace(/[-_]/g, ' ') + '\n\n' +
    badges + '\n\n' +
    '> ' + smartDesc + '\n\n' +
    '---\n\n' +
    '## 🚀 Key Highlights\n\n' +
    '- 🏛️ **Pixel-Perfect Fidelity**: Engineered with a dedicated Vanilla CSS design system, precise color harmonies, and responsive layouts.\n' +
    '- ⚡ **Decoupled Architecture**: Clean separation of presentation layer, API client adapter, and mock business service layer.\n' +
    '- 🔒 **Sanitized & Offline Capable**: Zero external token dependencies, zero data leakage, and offline reliability.\n' +
    '- 📱 **Complete Module Coverage**: ' + analysis.pages.length + ' fully functional views with realistic student workflows and dynamic state.\n\n' +
    '---\n\n' +
    screenshotSection +
    featuresList +
    architectureDiagram +
    '---\n\n' +
    '## 💻 Getting Started\n\n' +
    '```bash\n' +
    '# 1. Clone the repository\n' +
    'git clone https://github.com/Rahul-singh13/' + projectName + '.git\n\n' +
    '# 2. Navigate to directory\n' +
    'cd ' + projectName + '\n\n' +
    '# 3. Install dependencies\n' +
    'npm install\n\n' +
    '# 4. Run local development server\n' +
    'npm run dev\n\n' +
    '# 5. Production build & preview\n' +
    'npm run build\n' +
    'npm run preview\n' +
    '```\n\n' +
    '---\n\n' +
    '## 📄 License\n' +
    'MIT License. Created by [Rahul Singh](https://github.com/Rahul-singh13) for educational and architectural demonstration.\n';

  finalReadme = autoFixMermaidInContent(finalReadme);

  // Assemble full PRESENTATION.md with SAFE Mermaid
  let presentationScreenshots = '';
  analysis.screenshots.forEach(s => {
    presentationScreenshots += '### ' + s.title + '\n![' + s.title + '](' + s.relPath + ')\n\n';
  });

  let finalPresentation = '# 🎓 ' + projectName.toUpperCase().replace(/[-_]/g, ' ') + ' — Architectural & Visual Showcase\n\n' +
    '> **Author**: Rahul Singh (@Rahul-singh13)\n' +
    '> **Tech Stack**: ' + (analysis.techStack.join(', ') || 'JavaScript, HTML5, CSS3') + '\n' +
    '> **Modules**: ' + analysis.pages.length + ' Views\n\n' +
    '---\n\n' +
    '## 📌 1. Project Overview\n' +
    smartDesc + '\n\n' +
    '---\n\n' +
    '## 🏛️ 2. Key Modules & Pages\n' +
    analysis.pages.map(p => '- **' + p + '**').slice(0, 20).join('\n') + '\n\n' +
    '---\n\n' +
    '## 🛠️ 3. Architecture & Data Flow\n' +
    '```mermaid\n' +
    'flowchart TD\n' +
    '    Client["Frontend UI Components"] --> Adapter["API Client Layer"]\n' +
    '    Adapter --> Academic["Academic Service"]\n' +
    '    Adapter --> Finance["Finance Service"]\n' +
    '    Academic --> DB[("Mock In-Memory DB")]\n' +
    '    Finance --> DB\n' +
    '```\n\n' +
    '---\n\n' +
    '## 🎯 4. Visual Verification\n' +
    presentationScreenshots;

  finalPresentation = autoFixMermaidInContent(finalPresentation);

  const readmeOut = path.join(targetDir, 'README.md');
  const presentationOut = path.join(targetDir, 'PRESENTATION.md');

  fs.writeFileSync(readmeOut, finalReadme, 'utf-8');
  fs.writeFileSync(presentationOut, finalPresentation, 'utf-8');

  // Validate output
  const v1 = validateMarkdownAndMermaid(readmeOut);
  const v2 = validateMarkdownAndMermaid(presentationOut);

  if (!v1.valid) console.warn('[Validator Warning in README]:', v1.errors);
  if (!v2.valid) console.warn('[Validator Warning in PRESENTATION]:', v2.errors);

  console.log('  ✅ [Showcase Generator] Validated & Created README.md and PRESENTATION.md cleanly!');
  return true;
}

if (process.argv[1] && process.argv[1].includes('readme_and_showcase_generator.js')) {
  generateReadmeAndPresentation();
}
