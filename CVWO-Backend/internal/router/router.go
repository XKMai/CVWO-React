package router

import (
	"context"
	"net/http"

	"github.com/XKMai/CVWO-React/CVWO-Backend/internal/routes"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Setup(db *gorm.DB) chi.Router {
	DB = db
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(MyMiddleware)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("OK"))
    })
	r.Mount("/users", routes.UserRoutes())
	return r
}

func MyMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	  // create new context from `r` request context, and assign key `"user"`
	  // to value of `"123"`
	  ctx := context.WithValue(r.Context(), "db", DB)
  
	  // call the next handler in the chain, passing the response writer and
	  // the updated request object with the new context value.
	  //
	  // note: context.Context values are nested, so any previously set
	  // values will be accessible as well, and the new `"user"` key
	  // will be accessible from this point forward.
	  next.ServeHTTP(w, r.WithContext(ctx))
	})
  }