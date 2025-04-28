package config

import (
	"log"
	"github.com/joho/godotenv"
	"os"
)

func LoadEnv(key string, defaultValue string)  {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}