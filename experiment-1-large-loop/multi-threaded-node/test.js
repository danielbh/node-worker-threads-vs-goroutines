const http = require('http')
const { Worker } = require('worker_threads')

const server = http.createServer((req, res) => {
    const worker = new Worker(__dirname + '/worker.js', {
        workerData: {},
      });

    worker.on('message', () => {
        res.end("multi-threaded node server done.")
    });

    // worker.on('error', (err) => {
    //     res.status({ status: 500 }).json({ message: err.message })
    // });

    // worker.on('exit', (code) => {
    //     if (code !== 0) {
    //         res.end("node server done.")
    //         res.status({ status: 500 }).json({ message: code })
    //     }
    // })

    worker.postMessage('lets do it')

})

server.listen(8081)

console.log("Multi-threaded node server running at http://localhost:8081")

10000000000
10000000000