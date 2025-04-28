package middleware

import (
	"github.com/gin-gonic/gin"
)

func ValidateRegisterFields(c * gin.Context){
	var requestBody struct {
		Name string `json:"name"`
		Email string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid request",
		})
		c.Abort()
		return
	}


	if requestBody.Name == "" || requestBody.Email == "" || requestBody.Password == "" {
		c.JSON(400, gin.H{
			"error" : "Missing fields",
		})
		c.Abort()
		return
	}

	c.Next()
}