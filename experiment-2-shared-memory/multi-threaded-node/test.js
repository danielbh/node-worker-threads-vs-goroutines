const http = require('http')
const { Worker } = require('worker_threads')

const server = http.createServer((req, res) => {

    // RangeError: byte length of Int32Array should be a multiple of 4
    // no such thing as "SharedObjectBuffer" but you could do something like this:
    // https://stackoverflow.com/questions/51053222/nodejs-worker-threads-shared-object-store
    let sharedBuffer = new SharedArrayBuffer(4);
    // only works with 32bit numbers, but typical use-case not an issue
    let sharedArray = new Int32Array(sharedBuffer);

    sharedArray[0] = 0

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

    worker.postMessage(sharedArray)

})

server.listen(8080)

console.log("Multi-threaded node server running at http://localhost:8080")
