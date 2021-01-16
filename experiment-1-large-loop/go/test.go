package main

import (
	"fmt"
	"net/http"
)

func main() {
	srv := &http.Server{
		Addr: "localhost:8082",
		// ReadTimeout:       30 * time.Second,
		// ReadHeaderTimeout: 30 * time.Second,
		// IdleTimeout:       1 * time.Second,
		// WriteTimeout:      30 * time.Second,
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Connection", "close")
			defer r.Body.Close()
			i := 1
			for i < 10000000000 {
				i++
			}
			fmt.Println(i)
			w.WriteHeader(http.StatusOK)
			fmt.Fprint(w, "go server done.")
		}),
	}

	fmt.Println("Go server starting server at port 8082")
	srv.ListenAndServe()
}
