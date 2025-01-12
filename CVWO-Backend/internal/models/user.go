package models

type User struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Role     string `json:"role"`
	Name     string `json:"name"`
	Password string `json:"password"`
}