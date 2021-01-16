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

Node

| iterations  | p95 (s)  | min (s) | max (s) | max cpu | max mem |
|---|---|---|---|---|---|
|40   |  8.48 | 8.25 | 8.62  | 1006  | 0.5  |
| 40  |  8.51 | 8.24  | 8.58  | 1002  | 0.9  |
| 40  | 8.49  |  8.27 | 8.59  | 1000  |  1.4  |

Go

| iterations  | p95 (s)  | min (s) | max (s) | max cpu | max mem |
|---|---|---|---|---|---|
|90   |  3.56 | 3.14 | 3.62  | 1000  | 0.0  |
| 91  |  3.54 | 2.22  | 3.61 | 1005  | 0.0  |
| 90  | 3.51  |  3.11 | 3.57 | 1005  |  0.0  |


### Experiment Two: 

Web server receives request, does long running iteration and saves to in-memory shared map to same key. This will show concurrency primitives and handling mutation of shared memory

Node

| iterations  | p95 (s)  | min (s) | max (s) | max cpu | max mem |
|---|---|---|---|---|---|
|40   |  8.49 | 8.21 | 8.57  | 1005  | 0.6  |
| 40  |  8.49 | 8.25  | 8.56  | 1007  | 1.0  |
| 40  | 8.5  |  8.27 | 8.53  | 1000  |  1.4  |

Go

| iterations  | p95 (s)  | min (s) | max (s) | max cpu | max mem |
|---|---|---|---|---|---|
|91   |  3.51 | 2.19 | 3.59  | 1004  | 0.0  |
| 90  |  3.55 | 3.14  | 3.62  | 1004  | 0.0  |
| 91  | 3.5  |  2.3 | 3.61 | 1004  |  0.0  |

### Hardware

* OS: Windows WSL Ubuntu
* Processor: i9-9000K 8 cores & 16 threads
* RAM: 32GB

### Analysis

Rarely when comparing technologies used to make similar solutions is the decision so clear in my mind. The results from this experiment clearly lean toward Go as the better choice for writing CPU-intensive parallel/concurrent workloads.

#### Performance

Go outperformed Node and was 125%. Go did up to 91 iterations in all cases while node did 40 in all cases. Single iterations for Go were ~3.5s 95 percentile while Node was ~8.94 percentile. 

#### Resource overhead

Node used up to 1.4% host memory which is 444 mb in this case. While go never even went above 0.1%. This makes sense given that goroutines are much more lightweight than threads.

For node something of concern regarding memory was that memory seemed to increase for each test. I did not restart the node server between tests. It seems there might be a memory leak somewhere. Not sure where. I looked at code, nothing seems obvious to me. Further work needed to determine cause.

#### Handling locks and modifying shared memory space between threads or goroutines

Out of the box Go is much easier to use for manipulating shared memory between threads/goroutines. With some good libraries node could be there too. It is a drawback that the only shared colllection that offers atomic operations are int32 arrays. I have seen some workarounds/wrappers for this, so this could be fixed with a good library.

#### General code maintainability and ease-of-use.

Go is way easier to use. Along with the results here, and the track record it has acquired over the past decade with highly mature projects I cannot at this time recommend node worker-threads over go with goroutines. Perhaps as node worker-threads mature they might become a better option, for now go will be my recommendation for CPU-intensive workloads.