const { Worker } = require("worker_threads");
const path = require("path");

// create some big array
const elements = 1000000000;
const bigArray = Array(elements)
  .fill()
  .map(() => Math.random());

// we get the path of the script
const workerScript = path.join(__dirname, "./sorter.js");

// create a new worker from our script
const worker = new Worker(workerScript, { workerData: bigArray });

// receive events from the worker
worker.on("message", (sortedArray) => console.log('message:', sortedArray[0]));
worker.on("error", (error) => console.error("error", error));
worker.on("exit", () => console.log("exit"));