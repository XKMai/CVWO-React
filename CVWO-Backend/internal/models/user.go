package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	ID       uint   `json:"id" gorm:"primaryKey"`
	Role     string `json:"role"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Posts    []Post 
}
