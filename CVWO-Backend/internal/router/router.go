package router

import (
	"net/http"

	"github.com/XKMai/CVWO-React/CVWO-Backend/internal/routes"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func Setup() chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("OK"))
    })
	r.Mount("/users", routes.UserRoutes())
	http.ListenAndServe(":3000",r)
	return r
}