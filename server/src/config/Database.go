package config

import (
    "fmt"
    "log"
    "os"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
	"github.com/mandah0628/weatherapp/server/src/model"
)


var Postgres *gorm.DB


func Connect() {
    env := os.Getenv("ENV")

    host := os.Getenv("POSTGRES_HOST")
    port := os.Getenv("POSTGRES_PORT")
    user := os.Getenv("POSTGRES_USER")
    password := os.Getenv("POSTGRES_PASSWORD")
    dbname := os.Getenv("POSTGRES_DB")
    sslMode := "disable"
    if env == "prod" {
        sslMode = "require"
    }

    dsn := fmt.Sprintf(
        "host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
        host, port, user, password, dbname, sslMode,
    )

    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }

    if env == "dev" {
        log.Println("Database running in DEVELOPMENT mode, applying auto-migrations")
        if err := db.AutoMigrate(
            &model.User{},
            &model.City{},
        ); err != nil {
            log.Fatalf("Failed to auto migrate: %v", err)
        }
    }

    Postgres = db
}
