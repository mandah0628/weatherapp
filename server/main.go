package main

import (
	"log"
	"time"
	"os"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mandah0628/weatherapp/server/routes"
	"github.com/joho/godotenv"
)

func main() {
	// load .env file for local development
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found. Running in production mode")
	}

	// load port from env
	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}
	
	// app instance
	router := gin.Default()


	// setup cors
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type"},
		ExposeHeaders: []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge: 12 * time.Hour,
	}))

	
	// import routes
	routes.UserRoutes(router)

	// start server
	log.Println("Starting server on port:", PORT)
	if err := router.Run(":" + PORT); err != nil {
		log.Fatalln("Failed to start Gin server:", err)
	}
}