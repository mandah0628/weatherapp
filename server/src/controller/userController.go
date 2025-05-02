package controller

import (
	"log"
	"net/http"
	"os"
	"github.com/gin-gonic/gin"
	"github.com/mandah0628/weatherapp/server/src/database"
	"github.com/mandah0628/weatherapp/server/src/model"
	"github.com/mandah0628/weatherapp/server/src/utils"
)

var isProd = os.Getenv("ENV") == "prod"

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

	// set token in cookie
	
	cookie := http.Cookie{
		Name:     "token",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   isProd,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   3600,
	}
	http.SetCookie(c.Writer, &cookie)
	// response
	c.String(200, "ok")
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

	// verify if passwords match
	if err := utils.VerifyPassword(user.Password, requestBody.Password); err != nil {
		c.JSON(401, gin.H{
			"error" : "Incorrect email or password",
		})
		return
	}
	
	// generate token
	token, err := utils.GenerateToken(user.ID.String())
	if err != nil {
		c.JSON(500, gin.H{
			"error" : "Internal server error",
		})
		return
	}

	// set token in cookie
	isProd := os.Getenv("ENV") == "prod"
	cookie := http.Cookie{
		Name:     "token",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   isProd,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   3600,
	}
	http.SetCookie(c.Writer, &cookie)
	// response
	c.String(200, "ok")
}


func LogoutUser(c *gin.Context) {
	cookie := http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   isProd,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   0,
	}
	http.SetCookie(c.Writer, &cookie)

	c.String(200, "ok")
}


func UpdateUser(c *gin.Context) {
	// build a map with the new data
	var newData map[string]interface{}
	if err := c.ShouldBindJSON(&newData); err != nil {
		c.JSON(400, gin.H{
			"error" : "Invalid data",
		})
		return
	}

	// whitelist fields that can be changed
	allowedFields := map[string]bool{
		"name" : true,
		"email" : true,
	}

	// remove non-whitelisted fields from the request body
	for field := range newData {
		if !allowedFields[field] {
			delete(newData, field)
		}
	}

	// parse user id string into uuid
	userUuid, err := utils.ParseStringToUuid(c.GetString("userId"))
	if err != nil {
		c.JSON(400, gin.H{
			"error" : "Invalid user id",
		})
		return
	}


	if err := database.UpdateUser(userUuid, newData); err != nil {
		c.JSON(500, gin.H{
			"error" : "Internal server error",
		})
		return
	}

	c.String(200, "ok")
}


func GetUserByID(c *gin.Context) {

	// get user id and parse it to uuid
	userUuid, err := utils.ParseStringToUuid(c.GetString("userId"))
	if err != nil {
		c.JSON(500, gin.H{
			"error" : "Internal server error",
		})
		return
	}

	// get user from db
	user, err := database.FindUserByID(userUuid)
	if err != nil {
		c.JSON(500, gin.H{
			"error" : "Internal server error",
		})
		return
	}

	
	c.JSON(200, gin.H{
		"user" : user,
	})
}