# node-workers-vs-goroutines

This is a comparison between node v14.15.4 LTS worker threads and go1.15.6 goroutines. We will compare:

* Performance
* Resource overhead
* Handling locks and modifying shared memory space between threads or goroutines
* General code maintainability and ease-of-use.

## Experiment Methodolgy

* Each experiment will compare:
  * worker-threads node
  * multiple goroutines
* Each service under test will be run on same host machine as test with up to 16 threads available for use.
* Each load test script run will leverage k6
* Each test will simulate 10 users making a request, waiting until completion, and then continuing. In order for a
  request to count it must return 200 status code. Each test duration will be 30 seconds long.
* Metrics will be provided for latency. Each request will conclude it's work on response from web server
* Metrics will be provided for go memory and cpu overhead. These will be obtained by looking at top in terminal, and observing max values.

## Experiments

### Experiment One: 

web server with large loop, this will show in parallel cpu-intensive workload performance

// TODO: How to show results?

### Experiment Two: 

Web server receives large payload, transforms, saves to in-memory shared map to same key. This will show concurrency primitives and handling mutation of shared memory

// TODO: how to show results?

### Hardware

OS: Windows WSL Ubuntu
Processor: i9-9000K 8 cores & 16 threads
RAM: 32GB

