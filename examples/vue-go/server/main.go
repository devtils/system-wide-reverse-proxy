package main

import (
	"log"
	"net/http"
	"time"
)

func main() {
	// open DB and automigrate products table
	if err := TryOpenDatabase(30, time.Second); err != nil {
		log.Fatalln(err)
	} else if err := db.AutoMigrate(&Product{}); err != nil {
		log.Fatalln(err)
	}

	// Setup product API
	http.HandleFunc("/api/v1/products", handleProductsGet)
	http.HandleFunc("/api/v1/product/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			handleProductGet(w, r)
		case http.MethodPatch:
			handleProductPatch(w, r)
		case http.MethodDelete:
			handleProductDelete(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	http.HandleFunc("/api/v1/product", handleProductPut)

	// Setup web server
	http.Handle("/", http.FileServer(http.Dir("../client")))

	// Start listening
	if err := http.ListenAndServe(":80", nil); err != nil {
		log.Fatalln(err)
	}
}
