/**
 * Generates viral, high-reach, SEO-optimized LinkedIn post copy
 * based on analyzed project metadata, tech stack, and highlights.
 */

const HASHTAG_MAP = {
  'React': ['#ReactJS', '#React', '#React18', '#FrontendDeveloper', '#WebDev'],
  'Vite': ['#ViteJS', '#WebPerformance', '#FrontendTooling'],
  'JavaScript': ['#JavaScript', '#JS', '#WebDevelopment', '#FullStack'],
  'TypeScript': ['#TypeScript', '#WebDev', '#CleanCode'],
  'Next.js': ['#NextJS', '#FullStack', '#ServerSideRendering'],
  'Express.js': ['#NodeJS', '#Backend', '#RESTAPI', '#ExpressJS'],
  'Vanilla CSS': ['#CSS3', '#WebDesign', '#UIUX', '#DesignSystems'],
  'EdTech': ['#EdTech', '#HigherEducation', '#CollegeERP', '#StudentPortal'],
  'General': [
    '#SoftwareEngineering',
    '#OpenSource',
    '#TechCommunity',
    '#PortfolioProject',
    '#CodingLife',
    '#BuildInPublic',
    '#TechInnovation',
    '#ComputerScience'
  ]
};

function generateHashtags(projectData) {
  const selectedTags = new Set();

  // Tech stack specific tags
  for (const tech of projectData.techStack || []) {
    for (const [key, tags] of Object.entries(HASHTAG_MAP)) {
      if (tech.toLowerCase().includes(key.toLowerCase())) {
        tags.forEach(t => selectedTags.add(t));
      }
    }
  }

  // Domain specific tags
  const titleAndDesc = (projectData.projectName + ' ' + projectData.description + ' ' + (projectData.cleanTitle || '')).toLowerCase();
  if (titleAndDesc.includes('erp') || titleAndDesc.includes('college') || titleAndDesc.includes('student') || titleAndDesc.includes('academic')) {
    HASHTAG_MAP['EdTech'].forEach(t => selectedTags.add(t));
  }

  // General high-reach developer tags
  HASHTAG_MAP['General'].forEach(t => selectedTags.add(t));

  // Return top 10-14 unique hashtags
  return Array.from(selectedTags).slice(0, 12);
}

function generateLinkedInPost(projectData, options = {}) {
  const tone = options.tone || 'showcase'; // 'showcase' | 'deep_dive' | 'portfolio'
  const title = projectData.cleanTitle || projectData.projectName.replace(/[-_]/g, ' ').toUpperCase();
  const desc = projectData.description || 'A modern full-stack web application designed for high performance, modularity, and clean UX.';
  const techList = (projectData.techStack && projectData.techStack.length > 0)
    ? projectData.techStack.join(' • ')
    : 'React 18 • Vite • Vanilla CSS • Decoupled Services';
  const repoUrl = projectData.githubUrl || 'https://github.com/Rahul-singh13/imsec-college-erp-portal';
  const hashtags = generateHashtags(projectData).join(' ');

  // Filter top key features
  const highlights = (projectData.features && projectData.features.length > 0)
    ? projectData.features.slice(0, 4)
    : [
        '🏛️ Pixel-Perfect UI: Custom design system with modern color harmonies & responsive layouts',
        '⚡ Decoupled Service Architecture: Modular business logic separated from the UI',
        '🔒 Sanitized & Offline Capable: Zero external token leaks & robust local data persistence',
        '📱 Complete Module Coverage: Comprehensive workflow handling with dynamic state'
      ];

  const moduleCount = projectData.modules && projectData.modules.length > 0
    ? projectData.modules.length
    : (projectData.cleanTitle && projectData.cleanTitle.includes('29') ? 29 : '25+');

  let postText = '';

  if (tone === 'showcase') {
    postText = `🚀 Excited to share my latest project: ${title}!

${desc.startsWith('High-fidelity') || desc.startsWith('A ') ? '🎓 ' + desc : '🎓 A comprehensive, production-grade system built with ' + techList + '.'}

Managing institutional operations requires both pixel-perfect precision and high reliability. I built this ecosystem to demonstrate how decoupled architectures and modern frontend tooling can deliver an ultra-fast, seamless digital experience.

━━━━━━━━━━━━━━━━━━━━
🌟 KEY HIGHLIGHTS & ARCHITECTURE:
━━━━━━━━━━━━━━━━━━━━
${highlights.map(h => `✅ ${h}`).join('\n')}

${moduleCount ? `📦 Total Ecosystem Coverage: ${moduleCount} Fully Functional Views & Modules (Admissions, Attendance, Finance, Examinations, Hostel, Library & more)` : ''}

🛠️ TECH STACK:
⚡ Frontend: ${techList}
📐 Architecture: Decoupled Service Layer with Universal API Client
🎨 Styling: Pure Vanilla CSS3 Design System (Zero Heavy Framework Overhead)
💾 Data: Reactive Local Mock State & Sanitized Offline Handlers

📸 Check out the UI previews & screenshots below! 

🔗 GitHub Repository (Open Source):
👉 ${repoUrl}

I'd love to hear your feedback, thoughts, and suggestions! How do you approach scaling modular frontend architectures in your projects? Drop a comment below! 👇

---
${hashtags}`;
  } else if (tone === 'deep_dive') {
    postText = `💡 Engineering Breakdown: Building a High-Fidelity ${title} with Zero External Token Leaks & Decoupled Architecture

When architecting complex multi-module systems (${moduleCount} distinct views), keeping the presentation layer separate from business logic is critical for testability and maintainability.

Here is what went into the engineering of ${title}:

1️⃣ Decoupled Service Adapters:
The UI interacts exclusively through an abstraction layer, making backend swaps completely transparent.

2️⃣ Zero Data Leakage & Offline Resilience:
Engineered with sanitized mock data stores and offline-first state handling.

3️⃣ Lightweight Vanilla Design System:
Achieved high rendering performance and bespoke glassmorphism aesthetics without bloated CSS libraries.

🛠️ Tech Highlights: ${techList}
📂 Source Code: ${repoUrl}

Take a look at the screenshots attached below! What are your go-to patterns for multi-module web applications?

${hashtags}`;
  } else {
    // Portfolio / Career oriented
    postText = `🎉 Proud to present my comprehensive full-stack showcase: ${title}!

Over the past weeks, I engineered this full-scale application featuring ${moduleCount} complete operational modules, robust service abstractions, and modern UI/UX principles.

✨ Highlights:
${highlights.map(h => `• ${h}`).join('\n')}

🛠️ Built with: ${techList}
⭐ Explore the Code on GitHub: ${repoUrl}

Looking forward to connecting with fellow engineers, recruiters, and tech leaders! Feel free to reach out or leave your thoughts in the comments.

${hashtags}`;
  }

  return {
    title,
    postText: postText.trim(),
    hashtags,
    repoUrl,
    techList,
    moduleCount,
    tone,
    characterCount: postText.trim().length
  };
}

module.exports = {
  generateLinkedInPost,
  generateHashtags
};
