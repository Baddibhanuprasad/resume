const http = require('http');
const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname);
const PORT = 3000;

const MIME = {
  '.html' : 'text/html; charset=utf-8',
  '.css'  : 'text/css',
  '.js'   : 'application/javascript',
  '.mp4'  : 'video/mp4',
  '.webm' : 'video/webm',
  '.png'  : 'image/png',
  '.jpg'  : 'image/jpeg',
  '.jpeg' : 'image/jpeg',
  '.webp' : 'image/webp',
  '.svg'  : 'image/svg+xml',
  '.pdf'  : 'application/pdf',
  '.ico'  : 'image/x-icon',
  '.woff2': 'font/woff2',
  '.md'   : 'text/plain',
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);

  // Security: prevent path traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404); res.end('Not Found'); return;
    }

    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    const size = stat.size;

    // Handle Range requests (needed for <video> seek)
    const rangeHeader = req.headers['range'];
    if (rangeHeader && (ext === '.mp4' || ext === '.webm')) {
      const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
      if (match) {
        const start = parseInt(match[1], 10);
        const end   = match[2] ? parseInt(match[2], 10) : size - 1;

        // Clamp end to file size - 1
        const safeEnd = Math.min(end, size - 1);

        if (start > safeEnd || start >= size) {
          res.writeHead(416, { 'Content-Range': `bytes */${size}` });
          res.end(); return;
        }

        const chunkSize = safeEnd - start + 1;
        res.writeHead(206, {
          'Content-Range' : `bytes ${start}-${safeEnd}/${size}`,
          'Accept-Ranges' : 'bytes',
          'Content-Length': chunkSize,
          'Content-Type'  : mime,
        });
        fs.createReadStream(filePath, { start, end: safeEnd }).pipe(res);
        return;
      }
    }

    // Normal response
    res.writeHead(200, {
      'Content-Type'  : mime,
      'Content-Length': size,
      'Accept-Ranges' : 'bytes',
      'Cache-Control' : 'no-cache',
    });
    fs.createReadStream(filePath).pipe(res);
  });

}).listen(PORT, () => {
  console.log(`\n  ⚡ Cyberpunk Portfolio Server`);
  console.log(`  🌐 http://localhost:${PORT}\n`);
});
