package config

import (
    "fmt"
    "log"
    "os"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"

	"github.com/mandah0628/weatherapp/server/src/model"

)

// DB is the global database connection handle
var DB *gorm.DB

// Connect initializes the database connection using environment variables and GORM.
func Connect() {
    // 1. Load PostgreSQL configuration from environment variables
    host := os.Getenv("POSTGRES_HOST")
    port := os.Getenv("POSTGRES_PORT")
    user := os.Getenv("POSTGRES_USER")
    password := os.Getenv("POSTGRES_PASSWORD")
    dbname := os.Getenv("POSTGRES_DB")
    // (Optionally, handle missing vars or use defaults as needed)

    // 2. Build the DSN (Data Source Name) connection string for Postgres
    dsn := fmt.Sprintf(
        "host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
        host, port, user, password, dbname,
    )
    // For security, you might disable SSL only in development; adjust sslmode as needed.

    // 3. Connect to the database using GORM's PostgreSQL driver
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }

    // 4. Run database migrations for the User model (and others as needed)
    if err := db.AutoMigrate(&model.User{}); err != nil {
        log.Fatalf("Failed to run AutoMigrate on User model: %v", err)
    }

    // 5. Assign the *gorm.DB to the global DB variable for use throughout the app
    DB = db
}
