const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { analyzeProject } = require('./analyzer');
const { generateLinkedInPost } = require('./contentGenerator');
const { prepareMediaAssets, openMediaFolder } = require('./mediaProcessor');
const { copyToClipboard, getLinkedInShareUrl, openInBrowser } = require('./publisher');

const PORT = process.env.PORT || 4173;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Helper to serve static files
function serveStatic(res, filePath, contentType) {
  if (fs.existsSync(filePath)) {
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}

// Parse JSON body
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Static Assets
  if (pathname === '/' || pathname === '/index.html') {
    return serveStatic(res, path.join(PUBLIC_DIR, 'index.html'), 'text/html; charset=utf-8');
  }
  if (pathname === '/style.css') {
    return serveStatic(res, path.join(PUBLIC_DIR, 'style.css'), 'text/css; charset=utf-8');
  }
  if (pathname === '/app.js') {
    return serveStatic(res, path.join(PUBLIC_DIR, 'app.js'), 'application/javascript; charset=utf-8');
  }

  // Safe Image Proxy for local screenshots
  if (pathname === '/api/image') {
    const imgPath = parsedUrl.query.path;
    if (imgPath && fs.existsSync(imgPath)) {
      const ext = path.extname(imgPath).toLowerCase();
      const mimeTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
      };
      return serveStatic(res, imgPath, mimeTypes[ext] || 'application/octet-stream');
    }
    res.writeHead(404);
    return res.end('Image not found');
  }

  // API: Analyze Project
  if (pathname === '/api/analyze' && req.method === 'GET') {
    try {
      const targetPath = parsedUrl.query.path || path.resolve(__dirname, '../..');
      const tone = parsedUrl.query.tone || 'showcase';

      const analysis = analyzeProject(targetPath);
      const postData = generateLinkedInPost(analysis, { tone });
      const media = prepareMediaAssets(analysis);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: true,
        analysis,
        post: postData,
        media
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // API: Publish (Open LinkedIn + Copy to Clipboard + Open Media Folder)
  if (pathname === '/api/publish' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const textToPublish = data.postText || '';
      const repoUrl = data.repoUrl || '';
      const mediaFolder = data.mediaFolder || '';

      if (textToPublish) {
        await copyToClipboard(textToPublish);
      }

      const shareUrl = getLinkedInShareUrl(textToPublish, repoUrl);
      await openInBrowser(shareUrl);

      if (mediaFolder) {
        await openMediaFolder(mediaFolder);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: true,
        message: 'LinkedIn opened, post copied to clipboard, and media folder opened!'
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // API: Copy to Clipboard only
  if (pathname === '/api/copy' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      await copyToClipboard(data.text || '');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, message: 'Copied to clipboard!' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // API: Open Folder in Explorer
  if (pathname === '/api/open-folder' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      await openMediaFolder(data.folder || process.cwd());
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`\n🚀 LinkedIn Project Agent Dashboard is live at: http://localhost:${PORT}`);
  console.log(`💡 Press Ctrl+C to stop the dashboard server.\n`);
});

module.exports = server;
