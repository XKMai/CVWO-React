package routes

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func GetRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		r.Get("/api", func(w http.ResponseWriter, r *http.Request) {
			json.NewEncoder(w).Encode(map[string]string{"message": "Hello, World!"})
		})
	}
}