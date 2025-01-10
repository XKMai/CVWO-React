package database

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func SetupDatabase(){
	  dsn := "host=localhost user=postgres password=cvwo dbname=cvwo_db port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	  db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	  if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	fmt.Println("Database connection established!")
	
}