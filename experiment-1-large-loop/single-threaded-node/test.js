const http = require('http')

const server = http.createServer((req, res) => {
    for(let i = 0; i < 10000000000; i++){}
    res.end("single-threaded node server done.")
})

server.listen(8080)

console.log("Single-threaded node server running at http://localhost:8080")