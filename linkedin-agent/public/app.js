// LinkedIn Project Agent Web UI Controller

let currentData = null;
let currentTone = 'showcase';
let currentMediaPath = '';

// DOM Elements
const projectPathInput = document.getElementById('projectPathInput');
const btnScan = document.getElementById('btnScan');
const tonePills = document.querySelectorAll('.tone-pill');
const activeProjectBadge = document.getElementById('activeProjectBadge');

const statTechCount = document.getElementById('statTechCount');
const statModuleCount = document.getElementById('statModuleCount');
const statMediaCount = document.getElementById('statMediaCount');
const techTagsContainer = document.getElementById('techTagsContainer');
const repoLink = document.getElementById('repoLink');

const postTextarea = document.getElementById('postTextarea');
const charCount = document.getElementById('charCount');
const btnPublish = document.getElementById('btnPublish');
const btnCopy = document.getElementById('btnCopy');
const btnOpenMediaFolder = document.getElementById('btnOpenMediaFolder');
const mediaCountBadge = document.getElementById('mediaCountBadge');
const screenshotsGrid = document.getElementById('screenshotsGrid');

const linkedinPostContent = document.getElementById('linkedinPostContent');
const linkedinMediaStage = document.getElementById('linkedinMediaStage');
const toast = document.getElementById('toast');

// Auto-fill default path
const defaultProjectPath = "c:\\Users\\acer\\OneDrive\\Desktop\\OWN CLG CLONE";
projectPathInput.value = defaultProjectPath;

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  scanProject(defaultProjectPath, currentTone);
});

// Scan Button
btnScan.addEventListener('click', () => {
  const path = projectPathInput.value.trim();
  if (path) {
    scanProject(path, currentTone);
  }
});

// Path Enter Key
projectPathInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    btnScan.click();
  }
});

// Tone switcher
tonePills.forEach(pill => {
  pill.addEventListener('click', () => {
    tonePills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentTone = pill.dataset.tone;
    const path = projectPathInput.value.trim() || defaultProjectPath;
    scanProject(path, currentTone);
  });
});

// Textarea Live Edit
postTextarea.addEventListener('input', () => {
  updateCharCount();
  updateLivePreview(postTextarea.value);
});

// 1-Click Publish Button
btnPublish.addEventListener('click', async () => {
  const text = postTextarea.value.trim();
  const repo = currentData?.analysis?.githubUrl || '';
  
  showToast('🚀 Launching LinkedIn & Copying text to clipboard...');
  
  try {
    const res = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postText: text,
        repoUrl: repo,
        mediaFolder: currentMediaPath
      })
    });
    const result = await res.json();
    if (result.success) {
      showToast('✨ Text copied to Clipboard & LinkedIn opened! Ready to post.');
    }
  } catch (err) {
    showToast('⚠️ Error: ' + err.message);
  }
});

// Copy Button
btnCopy.addEventListener('click', async () => {
  const text = postTextarea.value.trim();
  try {
    await fetch('/api/copy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    navigator.clipboard.writeText(text);
    showToast('📋 Post copied to clipboard!');
  } catch (err) {
    showToast('⚠️ Could not copy: ' + err.message);
  }
});

// Open Media Folder Button
btnOpenMediaFolder.addEventListener('click', async () => {
  if (!currentMediaPath) {
    showToast('⚠️ No media folder found for this project.');
    return;
  }
  try {
    await fetch('/api/open-folder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder: currentMediaPath })
    });
    showToast('📂 Media folder opened in Windows Explorer!');
  } catch (err) {
    showToast('⚠️ Could not open folder: ' + err.message);
  }
});

// Scan & Fetch API
async function scanProject(projectPath, tone) {
  btnScan.disabled = true;
  btnScan.innerText = 'Scanning...';

  try {
    const res = await fetch(`/api/analyze?path=${encodeURIComponent(projectPath)}&tone=${tone}`);
    const data = await res.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }

    currentData = data;
    renderData(data);
    showToast(`✅ Successfully analyzed "${data.analysis.cleanTitle || data.analysis.projectName}"`);
  } catch (err) {
    showToast('❌ Scan failed: ' + err.message);
    console.error(err);
  } finally {
    btnScan.disabled = false;
    btnScan.innerHTML = '<span>🔍 Scan & Generate</span>';
  }
}

function renderData(data) {
  const { analysis, post, media } = data;

  activeProjectBadge.innerText = `Target: ${analysis.cleanTitle || analysis.projectName}`;
  
  // Stats
  statTechCount.innerText = analysis.techStack.length || 0;
  statModuleCount.innerText = analysis.modules.length || (analysis.cleanTitle?.includes('29') ? 29 : 'Full');
  statMediaCount.innerText = media.count || 0;
  mediaCountBadge.innerText = `${media.count} images`;

  // Tech Tags
  techTagsContainer.innerHTML = '';
  analysis.techStack.forEach(tech => {
    const tag = document.createElement('span');
    tag.className = 'tech-tag';
    tag.innerText = tech;
    techTagsContainer.appendChild(tag);
  });

  // Repo link
  if (analysis.githubUrl) {
    repoLink.innerText = analysis.githubUrl;
    repoLink.href = analysis.githubUrl;
  } else {
    repoLink.innerText = 'Not detected (Local Repository)';
    repoLink.removeAttribute('href');
  }

  // Post Text
  postTextarea.value = post.postText;
  updateCharCount();
  updateLivePreview(post.postText);

  // Screenshots
  screenshotsGrid.innerHTML = '';
  if (media.count > 0) {
    currentMediaPath = media.items[0].absolutePath;
    
    media.items.forEach(img => {
      const card = document.createElement('div');
      card.className = 'screenshot-thumb-card';
      card.title = `Click to inspect: ${img.name}`;
      
      const imgEl = document.createElement('img');
      imgEl.className = 'screenshot-thumb-img';
      imgEl.src = `/api/image?path=${encodeURIComponent(img.absolutePath)}`;
      imgEl.alt = img.name;

      const infoEl = document.createElement('div');
      infoEl.className = 'screenshot-thumb-info';
      infoEl.innerText = `${img.title} (${img.sizeFormatted})`;

      card.appendChild(imgEl);
      card.appendChild(infoEl);
      screenshotsGrid.appendChild(card);
    });

    // Render preview media collage in LinkedIn card
    renderMediaCollage(media.items);
  } else {
    currentMediaPath = '';
    screenshotsGrid.innerHTML = '<p class="empty-state">No screenshots found in project directory.</p>';
    linkedinMediaStage.innerHTML = '';
  }
}

function renderMediaCollage(items) {
  linkedinMediaStage.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = `media-collage-grid ${items.length === 1 ? 'single' : ''}`;

  const displayItems = items.slice(0, 4);
  displayItems.forEach(item => {
    const img = document.createElement('img');
    img.className = 'collage-item';
    img.src = `/api/image?path=${encodeURIComponent(item.absolutePath)}`;
    img.alt = item.name;
    grid.appendChild(img);
  });

  linkedinMediaStage.appendChild(grid);
}

function updateCharCount() {
  const count = postTextarea.value.length;
  charCount.innerText = `${count} characters`;
}

function updateLivePreview(text) {
  if (!text) {
    linkedinPostContent.innerHTML = '<p class="placeholder-text">Enter post text...</p>';
    return;
  }

  // Escape HTML
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight Hashtags
  formatted = formatted.replace(/(#\w+)/g, '<span class="hashtag">$1</span>');

  // Highlight links
  formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

  linkedinPostContent.innerHTML = formatted;
}

function showToast(msg) {
  toast.innerText = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}
