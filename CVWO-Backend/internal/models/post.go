package models

type Post struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Title    string `json:"title"`
	Content  string `json:"content"`
	Category string `json:"category"` //Can have multiple categories
	OwnerID  uint   `json:"owner_id"`
	Datetime string `json:"date_time"`
	Score    uint   `json:"score"`
}