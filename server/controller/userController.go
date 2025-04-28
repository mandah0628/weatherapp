package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/mandah0628/weatherapp/server/utils"

)

func RegisterUser (c *gin.Context) {
	var requestBody struct {
		Name string `json:"name"`
		Email string `json:"email"`
		Password string `json:"password"`
	}

	// extract the request body
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{"error" : "Bad request"})
		return
	}

	// hash password
	hashedPassword, err :=  utils.HashPassword(requestBody.Password)
	if err != nil {
		c.JSON(500, gin.H{"error" : "Internal server error"})
		return
	}

	

}
