# node-workers-vs-goroutines

This is a comparison between node 14 LTS worker threads and goroutines. We will compare:

* Performance
* Resource overhead
* Handling locks and modifying shared memory space between threads or goroutines
* General code maintainability and ease-of-use.

## Experiment Methodolgy

* Each experiment will compare three different approaches:
  * single threaded node
  * worker-threads node
  * multiple goroutines
* Each service under test will be isolated in a docker container with throttled CPU to eight cores.
* Each load test script run will leverage k6 and will also be in it's own isolated container with six cores.
* Metrics will be provided for latency. Each request will conclude it's work on response from web server
* Metrics will be provided for go memory and cpu overhead.

## Experiments

### Experiment One: 

web server with large loop, this will show in parallel cpu-intensive workload performance

// TODO: How to show results?

### Experiment Two: 

Web server receives large payload, transforms, saves to in-memory shared map to same key. This will show concurrency primitives and handling of shared memory

// TODO: how to show results?

### References
