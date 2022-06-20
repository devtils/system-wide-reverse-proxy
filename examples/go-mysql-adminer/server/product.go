package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
)

type Product struct {
	ID    uint    `json:"id"`
	Name  string  `json:"name"`
	Price float32 `json:"price,omitempty"`
}

func GetIDFromRequestPath(r *http.Request, prefix string) uint {
	// get id from request path
	path := strings.TrimPrefix(r.URL.Path, prefix)
	if idx := strings.IndexAny(path, "?&#"); idx != -1 {
		path = path[0 : idx-1]
	}
	id, err := strconv.ParseUint(path, 10, 64)
	if err != nil || id == 0 {
		return 0
	}
	return uint(id)
}

func handleProductsGet(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// fetch products from database
	var products []*Product
	if err := db.Find(&products).Error; err != nil {
		log.Printf("Error while fetching Products from Database: %+v", err) // log error to console
		// TODO differentiate between real internal errors and NotFound and/or DuplicateKey
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// encode products into json and send it to the client
	w.Header().Add("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(products); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
}

func handleProductGet(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// get id from request path
	id := GetIDFromRequestPath(r, "/api/product/")
	if id == 0 {
		http.Error(w, "ID not valid", http.StatusBadRequest)
		return
	}

	// fetch product from database
	var product Product
	if err := db.Find(&product, id).Error; err != nil {
		log.Printf("Error while fetching Product from Database: %+v", err) // log error to console
		// TODO differentiate between real internal errors and NotFound and/or DuplicateKey
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// encode products into json and send it to the client
	w.Header().Add("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(product); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
}

func handleProductPut(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// parse request json body into product struct
	var data Product
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		log.Printf("Error while encoding Product: %+v", err) // log error to console
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// validate product struct
	if data.ID != 0 {
		http.Error(w, "Product already exists", http.StatusNotFound)
		return
	}
	// TODO: validate name & price

	// save product
	if err := db.Save(&data).Error; err != nil {
		log.Printf("Error while saving Product into Database: %+v", err) // log error to console
		// TODO differentiate between real internal errors and NotFound and/or DuplicateKey
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// encode product into json and send it to the client
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Printf("Error while encoding Product: %+v", err) // log error to console
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
}

func handleProductPatch(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPatch {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// get id from request path
	id := GetIDFromRequestPath(r, "/api/product/")
	if id == 0 {
		http.Error(w, "ID not valid", http.StatusNotFound)
		return
	}

	// fetch product from database
	var product Product
	if err := db.Find(&product, id).Error; err != nil {
		log.Printf("Error while fetching Product from Database: %+v", err) // log error to console
		// TODO differentiate between real internal errors and NotFound and/or DuplicateKey
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// parse request body into product struct
	var data Product
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		log.Printf("Error while encoding Product: %+v", err) // log error to console
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	// TODO: validate name & price

	// update product
	product.Name = data.Name
	product.Price = data.Price

	// save product
	if err := db.Save(&product).Error; err != nil {
		log.Printf("Error while saving Product into Database: %+v", err) // log error to console
		// TODO differentiate between real internal errors and NotFound and/or DuplicateKey
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// encode product into json and send it to the client
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(product); err != nil {
		log.Printf("Error while encoding Product: %+v", err) // log error to console
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
}

func handleProductDelete(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// get id from request path
	id := GetIDFromRequestPath(r, "/api/product/")
	if id == 0 {
		http.Error(w, "ID not valid", http.StatusNotFound)
		return
	}

	// save product
	if err := db.Delete(&Product{}, id).Error; err != nil {
		log.Printf("Error while saving Product into Database: %+v", err) // log error to console
		// TODO differentiate between real internal errors and NotFound and/or DuplicateKey
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// send response
	w.WriteHeader(http.StatusOK)
}
