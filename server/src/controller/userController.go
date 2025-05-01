package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/mandah0628/weatherapp/server/src/utils"
	"log"
)

func RegisterUser(c *gin.Context) {
	var requestBody struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	// extract the request body and store in requestBody
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		log.Println("JSON binding error:", err)
		c.JSON(400, gin.H{"error": "Bad request"})
		return
	}

	// validate form
	if requestBody.Email == "" || requestBody.Name == "" || requestBody.Password == "" {
		c.JSON(400, gin.H{"error" : "Missing form field"})
	}

	// hash password
	hashedPassword, err := utils.HashPassword(requestBody.Password)
	if err != nil {
		c.JSON(500, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(200, gin.H{
		"hashedPassword" : hashedPassword,
	})
}