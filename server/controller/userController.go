package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func RegisterUser (c *gin.Context) {
	c.JSON(201, gin.H{"message" : "account created"})
}

func LoginUser (c *gin.Context) {
	c.JSON(200, gin.H{"message" : "user logged in"})
}