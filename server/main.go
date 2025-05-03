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
		log.Println("No .env file found. Running in production mode")
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
	if env == "dev" {
		router.SetTrustedProxies(nil)
		log.Println("Starting app in DEVELOPMENT mode, all proxies allowed")
	} else {
		prodProxy := os.Getenv("LOAD_BALANCER_IP")
		if prodProxy == "" {
			log.Fatalln("Missing load balancer IP from env")
		}
		if err := router.SetTrustedProxies([]string{prodProxy}); err != nil {
			log.Fatalln("Error setting trusted proxies:", err)
		}
		log.Println("Starting app in PRODUCTION mode")
	}


	// setup cors
	corsConfig := cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders: []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge: 12 * time.Hour,
	}
	if env == "prod" {
		frontendUrl := os.Getenv("FRONTEND_PROD_URL")
		if frontendUrl == "" {
			log.Fatalln("Missing frontend URL from env")
		}
		corsConfig.AllowOrigins = []string{frontendUrl}
	}
	router.Use(cors.New(corsConfig))
	

	// connect database and run migration
	config.Connect()
	log.Println("Database connection is successful!")


	// import routes
	routes.UserRoutes(router)
	routes.CityRoutes(router)


	// load port from env
	PORT := os.Getenv("PORT")
	if PORT == "" {
		log.Fatalln("Missing PORT from env");
	}
	// start server
	if err := router.Run(":" + PORT); err != nil {
		log.Fatalln("Failed to start Gin server:", err)
	}

}