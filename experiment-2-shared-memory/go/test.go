package main

import (
	"fmt"
	"net/http"
	"sync"
)

var a [1]int
var lock = sync.RWMutex{}

func main() {
	srv := &http.Server{
		Addr: "localhost:8080",
		// ReadTimeout:       30 * time.Second,
		// ReadHeaderTimeout: 30 * time.Second,
		// IdleTimeout:       1 * time.Second,
		// WriteTimeout:      30 * time.Second,
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Connection", "close")
			defer r.Body.Close()
			defer lock.Unlock()
			i := 1
			for i < 10000000000 {
				i++
			}

			lock.Lock()
			val := a[0]
			if val == 1 {
				val = 0
			} else {
				val = 1
			}

			a[0] = val

			w.WriteHeader(http.StatusOK)
			fmt.Fprint(w, "go server done.")
		}),
	}

	fmt.Println("Go server starting server at port 8080")
	srv.ListenAndServe()
}
