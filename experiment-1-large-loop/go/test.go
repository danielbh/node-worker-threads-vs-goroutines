package main

import (
	"fmt"
	"net/http"
)

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
			i := 1
			for i < 10000000000 {
				i++
			}

			w.WriteHeader(http.StatusOK)
			fmt.Fprint(w, "go server done.")
		}),
	}

	fmt.Println("Go server starting server at port 8080")
	srv.ListenAndServe()
}
