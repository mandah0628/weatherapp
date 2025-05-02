package controller

import (
	"log"
	"github.com/gin-gonic/gin"
	"github.com/mandah0628/weatherapp/server/src/database"
	"github.com/mandah0628/weatherapp/server/src/model"
	"github.com/mandah0628/weatherapp/server/src/utils"
)


// registers user
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
		return
	}

	// hash password
	hashedPassword, err := utils.HashPassword(requestBody.Password)
	if err != nil {
		c.JSON(500, gin.H{"error": "Internal server error"})
		return
	}

	// build user model
	user := model.User {
		Name: requestBody.Name,
		Email: requestBody.Email,
		Password: hashedPassword,
	}

	// create user in db
	if err := database.CreateUser(&user); err != nil {
		c.JSON(500, gin.H{"error" : "Failed to create user"})
		return
	}

	// generate token
	userId := user.ID.String()
	token, err := utils.GenerateToken(userId)
	if err != nil {
		c.JSON(500, gin.H{
			"error" : "Error generating token",
		})
		return
	}

	log.Println("Returning toke, status 200", token)
	c.JSON(200, gin.H{
		"token" : token,
	})
}



func LoginUser(c *gin.Context) {
	// build struct
	var requestBody struct {
		Email string `json:"email"`
		Password string `json:"password"`
	}

	// bind json to struct
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		log.Println("Error binding JSON")
		c.JSON(400, gin.H{
			"error" : "Bad request",
		})
		return
	}

	// find the user from the db
	user, err := database.FindUserByEmail(requestBody.Email)
	if err != nil {
		c.JSON(401, gin.H{
			"error" : "Incorrect email or password",
		})
		return;
	}

	if err := utils.VerifyPassword(user.Password, requestBody.Password); err != nil {
		c.JSON(401, gin.H{
			"error" : "Incorrect email or password",
		})
		return
	}
	
	token, err := utils.GenerateToken(user.ID.String())
	if err != nil {
		c.JSON(500, gin.H{
			"error" : "Internal server error",
		})
		return
	}

	c.JSON(200, gin.H{
		"token" : token,
	})
}