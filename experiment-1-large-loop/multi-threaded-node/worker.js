const { parentPort, workerData } = require('worker_threads');


parentPort.on('message', () => {
    for(let i = 0; i < 10000000000; i++){}
    console.log('loop done 10000000000 iterations')
    parentPort.postMessage('done');
});