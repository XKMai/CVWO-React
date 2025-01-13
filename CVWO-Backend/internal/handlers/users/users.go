package users

import (
	//"encoding/json"

	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/XKMai/CVWO-React/CVWO-Backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type UserHandler struct {
	db *gorm.DB
}



func (b *UserHandler) ListUsers(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open(postgres.Open("cvwo_db"), &gorm.Config{})
	if err != nil {log.Fatalf("Failed to connect to the database: %v", err)}
	fmt.Println("ListUsers")
	var users []models.User
	// Get all records
	result := db.Select("Name").Find(&users)
	// SELECT * FROM users;
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

func (b *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetUsers")
	// db := database.GetDB()
	// id := r.URL.Query().Get("id")
	// var user database.User
	// db.First(&user, id)
	// w.Header().Set("Content-Type", "application/json")
	// w.WriteHeader(http.StatusOK)
	// json.NewEncoder(w).Encode(user)
}

func (b *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open(postgres.Open("cvwo_db"), &gorm.Config{})
	if err != nil {log.Fatalf("Failed to connect to the database: %v", err)}
	fmt.Println("CreateUsers")
	result := db.Create(&models.User{ID: 1, Role:"User", Name: "Xin Kai", Password: "password"})
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

func (b *UserHandler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("UpdateUser")
	// db := database.GetDB()
	// var user database.User
	// json.NewDecoder(r.Body).Decode(&user)
	// db.Save(&user)
	// w.Header().Set("Content-Type", "application/json")
	// w.WriteHeader(http.StatusOK)
	// json.NewEncoder(w).Encode(user)
}

func (b *UserHandler) DeleteUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("DeleteUsers")
	// db := database.GetDB()
	// id := r.URL.Query().Get("id")
	// db.Delete(&database.User{}, id)
	// w.Header().Set("Content-Type", "application/json")
	// w.WriteHeader(http.StatusOK)
}

