package routes

import (
	"net/http"

	"github.com/XKMai/CVWO-React/CVWO-Backend/internal/handlers/users"
	"github.com/go-chi/chi/v5"
)

func UserRoutes() chi.Router {
	r := chi.NewRouter()
	userhandler := users.UserHandler{}
	r.Get("/", userhandler.ListUsers)
	r.Post("/", userhandler.CreateUser)
	r.Get("/{ID}", userhandler.GetUser)
	r.Put("/{ID}", userhandler.UpdateUser)
	r.Delete("/{ID}", userhandler.DeleteUser)
	return r
}

func HealthCheckRoute() http.Handler {
	r := chi.NewRouter()

	// Define the health check endpoint
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"healthy"}`))
	})

	return r
}

// func PostRoutes() chi.Router {
// 	r := chi.NewRouter()
// 	userhandler := posts.PostHandler{}
// 	r.Get("/", userhandler.ListPosts)
// 	r.Post("/", userhandler.CreatePost)
// 	r.Get("/{id}", userhandler.GetPost)
// 	r.Put("/{id}", userhandler.UpdatePost)
// 	r.Delete("/{id}", userhandler.DeletePost)
// }