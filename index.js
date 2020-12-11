const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    console.log(req.url);
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    console.log(filePath);
    let extname = path.extname(filePath)
    console.log(extname);
    let contentType = 'text/html'
    switch(extname) {
        case '.js':
            contentType = 'text/javascript'
            break
        case '.css':
            contentType = 'text/css'
            break
        case '.png' :
            contentType = 'image/png'
            break
        case '.jpg' :
        case '.jpeg':
            contentType = 'image/jpg'
            break
        case '.ico' :
            contentType = 'image/x-icon'
            break
        case '.svg' :
            contentType = 'image/svg+xml'
            break
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
         if (err.code === 'ENOENT') {
            fs.readFile('./public/404.html', (err, data) => {
                if (err) throw err
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.end(data)
                })
            } else {
                res.writeHead(500)
                res.end(err.code)
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType})
            res.end(data)
        }
    })
})




//Ganz am Ende!!
server.listen(5001, () => console.log("Server running...on: http://localhost:5001"))
