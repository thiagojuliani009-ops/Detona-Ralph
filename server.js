const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOSTNAME = 'localhost';

// Tipos MIME comuns
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
};

const server = http.createServer((req, res) => {
  // Rota raiz
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Remover query strings
  filePath = filePath.split('?')[0];
  
  // Caminho completo do arquivo
  const fullPath = path.join(__dirname, filePath);
  
  // Segurança: evitar traversal
  if (!fullPath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Acesso negado');
    return;
  }

  // Ler o arquivo
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Arquivo não encontrado</h1>', 'utf-8');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro no servidor', 'utf-8');
      }
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Servidor rodando em http://${HOSTNAME}:${PORT}`);
  console.log('Pressione Ctrl+C para parar o servidor');
});
