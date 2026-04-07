const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

// ... seu handler igual ...

const server = https.createServer(options, (req, res) => {
  // ...
});


server.listen(3443, HOSTNAME, () => {
  console.log(`Servidor rodando em https://${HOSTNAME}:3443`);
});
