package controller

import (
	"os"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/mandah0628/weatherapp/server/src/database"
	"github.com/mandah0628/weatherapp/server/src/model"
	"github.com/mandah0628/weatherapp/server/src/utils"
)

func AddCity(c *gin.Context){
	// build request body struct
	var requestBody struct{
		CountryName string 			`json:"countryName"`
		CountryCode string 			`json:"countryCode"`
		Lat	float64 				`json:"lat"`
		Lon float64 				`json:"lon"`
	}

	// bind json to struct
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{
			"error" : "Invalid data form from the client",
		})
		return
	}

	//get user id and parse to uuid
	userId := c.GetString("userId")
	userUuid, err := utils.ParseStringToUuid(userId)
	if err != nil {
		c.JSON(500, gin.H{
			"error" : "Internal server error",
		})
		return
	}

	//build city model
	city := model.City{
		CountryName: requestBody.CountryName,
		CountryCode: requestBody.CountryCode,
		Lat: requestBody.Lat,
		Lon: requestBody.Lon,
		UserID: userUuid,
	}


	// add in db
	if err := database.AddCity(&city); err != nil{
		c.JSON(500, gin.H{
			"error" : "Internal server error",
		})
		return
	}

	c.String(200, "ok")
}


func RemoveCity(c *gin.Context){
	c.String(200, "ok")
}


