package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Product struct {
	ID    uint    `json:"id"`
	Title string  `json:"title"`
	Price float32 `json:"price"`
}

var products = []Product{
	{1, "Apple", .50},
	{2, "Banana", .80},
}

func main() {
	// Setup product API
	http.HandleFunc("/api/products", func(w http.ResponseWriter, r *http.Request) {
		// encode products into json and send it to the client
		w.Header().Add("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(products); err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
	})

	// Setup web server
	http.Handle("/", http.FileServer(http.Dir("../client")))

	// Start listening
	if err := http.ListenAndServe(":80", nil); err != nil {
		log.Fatalln(err)
	}
}
