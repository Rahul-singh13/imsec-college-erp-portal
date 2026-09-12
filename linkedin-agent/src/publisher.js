const { exec } = require('child_process');
const https = require('https');

/**
 * Copies text to Windows Clipboard cleanly
 */
function copyToClipboard(text) {
  return new Promise((resolve, reject) => {
    // Use PowerShell Set-Clipboard which preserves UTF-8 emoji and multi-line breaks properly
    const child = exec('powershell.exe -NoProfile -Command "$input | Set-Clipboard"', (err) => {
      if (err) {
        // Fallback to clip.exe
        const clipChild = exec('clip', (clipErr) => {
          if (clipErr) return reject(clipErr);
          resolve(true);
        });
        clipChild.stdin.write(text);
        clipChild.stdin.end();
      } else {
        resolve(true);
      }
    });

    child.stdin.write(text);
    child.stdin.end();
  });
}

/**
 * Generates LinkedIn Web Intent URL
 */
function getLinkedInShareUrl(postText, repoUrl) {
  // LinkedIn feed with shareActive triggers the post composer
  // encodeURIComponent creates valid web query string
  const encodedText = encodeURIComponent(postText);
  const feedUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`;
  return feedUrl;
}

/**
 * Opens a URL in the user's default browser on Windows
 */
function openInBrowser(url) {
  return new Promise((resolve, reject) => {
    // Windows 'start' command handles URLs
    // Escape & for cmd
    const safeUrl = url.replace(/&/g, '^&');
    exec(`start "" "${url}"`, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
}

/**
 * Headless direct LinkedIn API publishing (Optional if user provides access token)
 */
function publishViaLinkedInApi(accessToken, authorUrn, postText) {
  return new Promise((resolve, reject) => {
    if (!accessToken || !authorUrn) {
      return reject(new Error('Access Token or Author URN missing'));
    }

    const payload = JSON.stringify({
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: postText
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    });

    const options = {
      hostname: 'api.linkedin.com',
      path: '/v2/ugcPosts',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data || '{}'));
        } else {
          reject(new Error(`LinkedIn API Error (${res.statusCode}): ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

module.exports = {
  copyToClipboard,
  getLinkedInShareUrl,
  openInBrowser,
  publishViaLinkedInApi
};
