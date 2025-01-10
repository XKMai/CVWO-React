package models

type User struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	role     string `json:"role"`
	Name     string `json:"name"`
	password string `json:"password"`
}