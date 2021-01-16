const { parentPort, workerData } = require('worker_threads');


parentPort.on('message', (sharedArray) => {
    for(let i = 0; i < 10000000000; i++){}
    let val = Atomics.load(sharedArray, 0)
   
    if (val === 1) {
        val = 0
    } else {
        val = 1
    }
   
    Atomics.store(sharedArray, 0, val);

    parentPort.postMessage('done');
});