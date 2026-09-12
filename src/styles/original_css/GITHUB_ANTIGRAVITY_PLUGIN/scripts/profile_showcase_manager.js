import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getValidToken, requestGitHub, maskToken } from './token_manager.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

// 7 Dynamic Elite Themes
const THEMES = [
  // 0: Sunday - Arctic Aurora
  {
    name: 'Arctic Aurora',
    bannerColor: '88C0D0',
    lines: 'Hi+there%2C+I%27m+Rahul+Singh+%E2%9C%A8;Creative+Full-Stack+Architect+%E2%9A%A1;Crafting+3D+WebGL+%26+Next-Gen+Apps;Building+Pixel-Perfect+Experiences+%F0%9F%9A%80',
    statusBadge: 'https://img.shields.io/badge/Vibe-Arctic_Aurora_%E2%9D%84%EF%B8%8F-88c0d0?style=for-the-badge&logoColor=white',
    quote: '"Code is like humor. When you have to explain it, it’s bad." — Cory House'
  },
  // 1: Monday - Tokyo Night Cyberpunk
  {
    name: 'Tokyo Night Cyberpunk',
    bannerColor: '7AA2F7',
    lines: 'Hi+there%2C+I%27m+Rahul+Singh+%F0%9F%91%8B;Full-Stack+Engineer+%E2%9A%A1;Generative+AI+%26+Creative+Dev+%F0%9F%A7%A0;Turning+Ideas+Into+High-Impact+Code+%F0%9F%9A%80',
    statusBadge: 'https://img.shields.io/badge/Mode-Tokyo_Cyberpunk_%F0%9F%8C%83-7aa2f7?style=for-the-badge&logoColor=white',
    quote: '"First, solve the problem. Then, write the code." — John Johnson'
  },
  // 2: Tuesday - Catppuccin Mocha
  {
    name: 'Catppuccin Mocha',
    bannerColor: 'CBA6F7',
    lines: 'Hi+there%2C+I%27m+Rahul+Singh+%F0%9F%92%9C;Creative+Frontend+%26+Full-Stack;Specialized+in+React+18%2C+3D+%26+AI;Designing+Fluid+User+Experiences+%E2%9C%A8',
    statusBadge: 'https://img.shields.io/badge/Aesthetic-Catppuccin_Mocha_%F0%9F%8C%B8-cba6f7?style=for-the-badge&logoColor=white',
    quote: '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra'
  },
  // 3: Wednesday - Emerald Matrix
  {
    name: 'Emerald Matrix',
    bannerColor: '00FF9F',
    lines: 'Hi+there%2C+I%27m+Rahul+Singh+%F0%9F%9F%A2;Full-Stack+Developer+%26+AI+Explorer;Architecture+%2B+High-Performance+Code;Deploying+Modern+Full-Stack+Websites+%F0%9F%9A%80',
    statusBadge: 'https://img.shields.io/badge/Focus-Matrix_Emerald_%E2%9A%A1-00ff9f?style=for-the-badge&logoColor=black',
    quote: '"Make it work, make it right, make it fast." — Kent Beck'
  },
  // 4: Thursday - Dracula Violet
  {
    name: 'Dracula Violet',
    bannerColor: 'BD93F9',
    lines: 'Hi+there%2C+I%27m+Rahul+Singh+%F0%9F%A7%9B%E2%80%8D%E2%99%82%EF%B8%8F;Creative+Engineer+%26+Design+Enthusiast;Mastering+React%2C+Vite%2C+WebGL+%26+PyTorch;Crafting+Production-Ready+Architectures+%E2%9C%A8',
    statusBadge: 'https://img.shields.io/badge/Theme-Dracula_Violet_%F0%9F%8E%86-bd93f9?style=for-the-badge&logoColor=white',
    quote: '"Clean code always looks like it was written by someone who cares." — Robert C. Martin'
  },
  // 5: Friday - Midnight Cobalt
  {
    name: 'Midnight Cobalt',
    bannerColor: '38BDF8',
    lines: 'Hi+there%2C+I%27m+Rahul+Singh+%F0%9F%91%8B;Full-Stack+Engineer+%E2%9A%A1;Crafting+Pixel-Perfect+Web+Apps+%F0%9F%8F%9B%EF%B8%8F;Pushing+Clean+Code+Every+Single+Day+%F0%9F%94%A5',
    statusBadge: 'https://img.shields.io/badge/Edition-Midnight_Cobalt_%F0%9F%8C%8C-38bdf8?style=for-the-badge&logoColor=black',
    quote: '"The best way to predict the future is to invent it." — Alan Kay'
  },
  // 6: Saturday - Sunset Gold
  {
    name: 'Sunset Gold',
    bannerColor: 'F59E0B',
    lines: 'Hi+there%2C+I%27m+Rahul+Singh+%F0%9F%8C%9F;Creative+Software+Engineer+%F0%9F%9A%80;Building+Fast%2C+Decoupled+%26+Modern+Apps;Exploring+Generative+AI+%26+3D+Experiences+%E2%9C%A8',
    statusBadge: 'https://img.shields.io/badge/Mood-Sunset_Gold_%F0%9F%8C%85-f59e0b?style=for-the-badge&logoColor=black',
    quote: '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler'
  }
];

export async function fetchLiveUserProjects(token, username) {
  try {
    const res = await requestGitHub('/user/repos?sort=pushed&direction=desc&per_page=100', 'GET', null, token);
    if (res.status === 200 && Array.isArray(res.data)) {
      const filtered = res.data.filter(r => r.name.toLowerCase() !== username.toLowerCase() && !r.fork);
      return filtered.slice(0, 7).map(r => {
        const cleanTitle = r.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        const topics = (r.topics && r.topics.length > 0) ? r.topics : [r.language || 'JavaScript', 'fullstack'];
        const tagList = topics.slice(0, 3).map(t => '`' + t + '`').join(', ');
        return {
          name: r.name,
          title: cleanTitle,
          description: r.description || 'Full-stack application built with modern architecture and clean code standards.',
          url: r.html_url,
          tags: tagList,
          stars: r.stargazers_count,
          language: r.language || 'JavaScript',
          lastPushed: new Date(r.pushed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      });
    }
  } catch (e) {}
  return [];
}

export function buildDynamicProfileReadme(username = 'Rahul-singh13', liveProjects = []) {
  const dayIndex = new Date().getDay();
  const theme = THEMES[dayIndex];

  // Dynamically generate projects table from real latest GitHub activity
  let projectRows = '';
  if (liveProjects && liveProjects.length > 0) {
    projectRows = liveProjects.map(p => {
      const emoji = p.name.includes('erp') || p.name.includes('college') ? '🎓'
        : p.name.includes('3d') || p.name.includes('energy') ? '⚡'
        : p.name.includes('food') || p.name.includes('restaurant') ? '🍽️'
        : p.name.includes('PRODIGY') || p.name.includes('ga') ? '🤖'
        : p.name.includes('life') || p.name.includes('dwar') ? '🧠'
        : '🚀';

      return '| ' + emoji + ' **[' + p.title + '](' + p.url + ')** | ' + p.description + ' | ' + p.tags + ' | `' + p.lastPushed + '` | [🔗 View Project](' + p.url + ') |';
    }).join('\n');
  } else {
    // Fallback if network offline
    projectRows = '| 🎓 **[IMSEC College ERP Portal](https://github.com/' + username + '/imsec-college-erp-portal)** | 100% pixel-perfect educational clone of college ERP with 29 modules and decoupled mock services. | `React 18`, `Vite`, `Modular Services` | `Active` | [🔗 Open Project](https://github.com/' + username + '/imsec-college-erp-portal) |\n' +
      '| ⚡ **[Ciao Energy 3D Experience](https://github.com/' + username + '/ciao-energy-3d-experience)** | Interactive 3D WebGL product experience with smooth GSAP animations and Lenis scroll. | `Three.js`, `WebGL`, `GSAP` | `Active` | [🔗 Open Project](https://github.com/' + username + '/ciao-energy-3d-experience) |\n' +
      '| 🍽️ **[Foodhunter Atelier](https://github.com/' + username + '/Foodhunter-restaurant)** | Luxury fine dining atelier & culinary website featuring editorial dark aesthetics. | `HTML5`, `Vanilla CSS`, `JavaScript` | `Active` | [🔗 Open Project](https://github.com/' + username + '/Foodhunter-restaurant) |\n' +
      '| 🤖 **[Generative AI Suite](https://github.com/' + username + '?tab=repositories&q=PRODIGY)** | Generative AI models: GPT-2, Stable Diffusion SD 1.5, Pix2Pix cGAN, Style Transfer. | `PyTorch`, `Transformers`, `Diffusion` | `Active` | [🔗 Explore Suite](https://github.com/' + username + '?tab=repositories&q=PRODIGY) |\n' +
      '| 🧠 **[LifeOS & DWAR](https://github.com/' + username + '/LifeOS)** | Personal operating system and date-wise reflection diary for daily milestone tracking. | `JavaScript`, `State Persistence`, `UI/UX` | `Active` | [🔗 Open Project](https://github.com/' + username + '/LifeOS) |';
  }

  return '<div align="center">\n' +
    '  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=25&pause=1000&color=' + theme.bannerColor + '&center=true&vCenter=true&width=580&lines=' + theme.lines + '" alt="Dynamic Header" />\n\n' +
    '  <p align="center">\n' +
    '    <b>🚀 Software Engineer &nbsp;|&nbsp; Creative Full-Stack Developer &nbsp;|&nbsp; Generative AI Explorer</b><br>\n' +
    '    <i>Architecting high-performance web applications, interactive 3D WebGL experiences, and robust decoupled systems.</i>\n' +
    '  </p>\n\n' +
    '  <p align="center">\n' +
    '    <a href="https://github.com/' + username + '"><img src="https://img.shields.io/badge/GitHub-Rahul_Singh-181717?style=for-the-badge&logo=github&logoColor=white" /></a>\n' +
    '    <a href="https://github.com/' + username + '?tab=repositories"><img src="https://img.shields.io/badge/Public_Repositories-Explore_Projects-0969da?style=for-the-badge&logo=git&logoColor=white" /></a>\n' +
    '    <img src="' + theme.statusBadge + '" />\n' +
    '    <img src="https://img.shields.io/badge/Daily_Streak-Active_%26_Growing-2ea44f?style=for-the-badge&logo=github&logoColor=white" />\n' +
    '  </p>\n' +
    '</div>\n\n' +
    '---\n\n' +
    '### 🌟 About & Engineering Philosophy\n\n' +
    '- 🏛️ **Full-Stack Craftsmanship**: Focused on building decoupled, scalable applications with clean component architecture and responsive design systems.\n' +
    '- ⚡ **Frontend & 3D Web**: Advanced UI engineering with **React 18, Vite, Three.js, GSAP Animations**, and custom Vanilla CSS design tokens.\n' +
    '- 🤖 **Generative AI & Deep Learning**: Actively fine-tuning and deploying **Transformers (GPT-2), Stable Diffusion (SD 1.5), Pix2Pix cGANs**, and Neural Style Transfer models.\n' +
    '- 💬 **Thought of the Day**: *' + theme.quote + '*\n\n' +
    '---\n\n' +
    '### 🛠️ Technology Stack & Engineering Toolbelt\n\n' +
    '<div align="center">\n\n' +
    '#### 💻 Frontend & Creative Development\n' +
    '![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)\n' +
    '![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)\n' +
    '![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)\n' +
    '![Three.js](https://img.shields.io/badge/Three.js_WebGL-000000?style=for-the-badge&logo=three.js&logoColor=white)\n' +
    '![GSAP](https://img.shields.io/badge/GSAP_Motion-88CE02?style=for-the-badge&logo=greensock&logoColor=black)\n' +
    '![HTML5](https://img.shields.io/badge/HTML5_Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)\n' +
    '![CSS3](https://img.shields.io/badge/CSS3_Design_Tokens-1572B6?style=for-the-badge&logo=css3&logoColor=white)\n\n' +
    '#### ⚙️ Backend, AI & DevOps\n' +
    '![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)\n' +
    '![Python](https://img.shields.io/badge/Python_3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)\n' +
    '![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)\n' +
    '![Hugging Face](https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)\n' +
    '![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)\n' +
    '![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)\n' +
    '![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)\n' +
    '![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)\n\n' +
    '</div>\n\n' +
    '---\n\n' +
    '### 🚀 Live Recent & Featured Engineering Showcases\n\n' +
    '| Project | Key Highlights & Architectural Overview | Tech Stack | Last Active | Link |\n' +
    '| :--- | :--- | :--- | :--- | :--- |\n' +
    projectRows + '\n\n' +
    '---\n\n' +
    '<div align="center">\n' +
    '  <sub>✨ Designed & Dynamically Maintained by <a href="https://github.com/' + username + '"><b>Rahul Singh</b></a> &nbsp;|&nbsp; Edition: <b>' + theme.name + '</b></sub>\n' +
    '</div>\n';
}

export async function syncProfileRepository() {
  console.log('[Profile Showcase Manager] Generating dynamic latest-work showcase & theme...');

  const auth = await getValidToken();
  if (!auth.token || !auth.user) {
    console.error('❌ [Profile Manager] Authentication failed.');
    return false;
  }

  const token = auth.token;
  const username = auth.user.login;
  const theme = THEMES[new Date().getDay()];
  console.log('  [Profile User] @' + username + ' | Today\'s Theme: ' + theme.name);

  // 1. Fetch real live recent repositories from GitHub API
  console.log('  [Dynamic Projects] Fetching latest active projects for @' + username + ' from GitHub API...');
  const liveProjects = await fetchLiveUserProjects(token, username);
  console.log('  ✅ [Dynamic Projects Found]: ' + liveProjects.length + ' active repositories auto-synced into profile.');

  // 2. Ensure special repo exists
  const checkRes = await requestGitHub('/repos/' + username + '/' + username, 'GET', null, token);
  if (checkRes.status === 404) {
    await requestGitHub('/user/repos', 'POST', {
      name: username,
      description: '✨ Rahul Singh — Software Engineer, Creative Full-Stack Developer & Generative AI Specialist',
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true,
      auto_init: false
    }, token);
  }

  // 3. Prepare local workspace directory for profile repo
  const profileDir = path.resolve(__dirname, '../profile_workspace');
  if (!fs.existsSync(profileDir)) {
    fs.mkdirSync(profileDir, { recursive: true });
  }

  process.chdir(profileDir);

  const isGit = runOutput('git rev-parse --is-inside-work-tree');
  if (isGit !== 'true') {
    run('git init -b main', false);
  }
  run('git branch -M main', true);

  const currentGitUser = runOutput('git config user.name');
  if (!currentGitUser) {
    run('git config user.name "' + (auth.user.name || username) + '"', true);
    run('git config user.email "' + (auth.user.email || (username + '@users.noreply.github.com')) + '"', true);
  }

  const authRemote = 'https://' + token + '@github.com/' + username + '/' + username + '.git';
  const cleanRemote = 'https://github.com/' + username + '/' + username + '.git';

  const remotes = runOutput('git remote');
  if (remotes.includes('origin')) {
    run('git remote remove origin', true);
  }
  run('git remote add origin ' + authRemote, true);

  // 4. Generate dynamic theme README.md with real live project showcases
  const readmeContent = buildDynamicProfileReadme(username, liveProjects);
  fs.writeFileSync(path.join(profileDir, 'README.md'), readmeContent, 'utf-8');

  // 5. Stage & Commit
  run('git add README.md', false);
  const nowStr = new Date().toISOString().split('T')[0];
  const commitMsg = 'docs(profile): sync latest projects, dynamic ' + theme.name + ' theme showcase [' + nowStr + ']';
  run('git commit -m "' + commitMsg + '"', false);

  // 6. Push
  console.log('  [Profile Push] Pushing live-synced projects & ' + theme.name + ' theme to GitHub...');
  let pushResult = run('git push -u origin main', true);
  if (pushResult === null) {
    run('git pull --rebase origin main', true);
    pushResult = run('git push -u origin main --force', false);
  }

  run('git remote set-url origin ' + cleanRemote, true);
  console.log('  🎉 [Profile Success] Profile live with latest projects at: https://github.com/' + username);
  return true;
}

if (process.argv[1] && process.argv[1].includes('profile_showcase_manager.js')) {
  syncProfileRepository();
}
