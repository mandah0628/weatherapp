package main

import (
	"log"
	"os"
	"time"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/mandah0628/weatherapp/server/src/config"
	"github.com/mandah0628/weatherapp/server/src/routes"
)

func main() {
	// load .env file for local development
	if err := godotenv.Load(); err != nil {
		log.Println("Starting app in DEVELOPMENT mode")
	}

	// get environment
	env := os.Getenv("ENV")
	if env == "" {
		env = "prod"
	}

	// set gin environment
	if env == "prod" {
		gin.SetMode(gin.ReleaseMode)
	}
	
	// app instance
	router := gin.Default()
	
	// proxies
	router.SetTrustedProxies(nil)

	
	frontendUrl := os.Getenv("FRONTEND_URL")
	if env == "prod" {
		if frontendUrl == "" {
			log.Fatalln("Missing FRONTEND_URL in production mode")
		}
	} else {
		if frontendUrl == "" {
			frontendUrl = "http://localhost:3000"
		}
	}

	corsConfig := cors.Config{
		AllowOrigins:     []string{frontendUrl},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	router.Use(cors.New(corsConfig))
	

	// connect database and run migration
	config.Connect()
	log.Println("Database connection is successful!")


	// import routes
	routes.UserRoutes(router)
	routes.CityRoutes(router)


	// load port 
	PORT := os.Getenv("PORT")
	if PORT == "" && env == "dev" {
		log.Fatalln("Missing PORT from env in DEVELOPMENT mode");
	}

	if PORT == "" {
		PORT = "8080"
	}

	
	// start server
	if err := router.Run(":" + PORT); err != nil {
		log.Fatalln("Failed to start Gin server:", err)
	}

}