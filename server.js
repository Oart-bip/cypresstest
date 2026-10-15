const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3000
const PUBLIC_DIR = path.join(__dirname, 'public')

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8'
}

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0]
  const requested = urlPath === '/' ? '/login.html' : urlPath
  const filePath = path.normalize(path.join(PUBLIC_DIR, requested))

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403)
    res.end('Acesso negado')
    return
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Não encontrado')
      return
    }
    const type = TYPES[path.extname(filePath)] || 'application/octet-stream'
    res.writeHead(200, { 'Content-Type': type })
    res.end(data)
  })
})

server.listen(PORT, () => {
  console.log(`Aplicação disponível em http://localhost:${PORT}`)
})
