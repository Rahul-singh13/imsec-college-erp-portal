const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * Handles media discovery, bundling, and opening in Windows Explorer
 */
function prepareMediaAssets(projectData) {
  const screenshots = projectData.screenshots || [];
  
  return {
    count: screenshots.length,
    items: screenshots.map(img => ({
      ...img,
      exists: fs.existsSync(img.absolutePath)
    })),
    primaryImage: screenshots.length > 0 ? screenshots[0] : null
  };
}

/**
 * Opens the screenshots folder in Windows Explorer so user can drag & drop
 */
function openMediaFolder(targetPath) {
  return new Promise((resolve, reject) => {
    let folderToOpen = targetPath;
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
      folderToOpen = path.dirname(targetPath);
    }

    if (!fs.existsSync(folderToOpen)) {
      return reject(new Error(`Path does not exist: ${folderToOpen}`));
    }

    const cmd = `explorer.exe "${folderToOpen}"`;
    exec(cmd, (err) => {
      if (err) {
        console.error('Failed to open explorer:', err);
        return reject(err);
      }
      resolve(folderToOpen);
    });
  });
}

module.exports = {
  prepareMediaAssets,
  openMediaFolder
};
