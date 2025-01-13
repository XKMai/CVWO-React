package main

import (
	//"net/http"

	//"fmt"

	"github.com/XKMai/CVWO-React/CVWO-Backend/internal/database"
	//"github.com/XKMai/CVWO-React/CVWO-Backend/internal/models"
	"github.com/XKMai/CVWO-React/CVWO-Backend/internal/router"
	//"github.com/XKMai/CVWO-React/CVWO-Backend/internal/handlers/users"
	//"gorm.io/driver/postgres"
	//"gorm.io/gorm"
)

func main() {
    router.Setup()
	database.SetupDatabase()
	//db, err := gorm.Open(postgres.Open("cvwo_db"), &gorm.Config{})
	//user := models.User{ID: 1, Role:"User", Name: "Xin Kai", Password: "password"}
}
