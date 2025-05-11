package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/mandah0628/weatherapp/server/src/database"
	"github.com/mandah0628/weatherapp/server/src/model"
	"github.com/mandah0628/weatherapp/server/src/utils"
)

func AddCity(c *gin.Context){
	// build request body struct
	var requestBody struct{
		Name string					`json:"name"`
		State string				`json:"state"`
		Country string 				`json:"country"`
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
		Name: requestBody.Name,
		State: requestBody.State,
		Country: requestBody.Country,
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

	// get cityId from params and parse to uuid
	cityId := c.Param("cityId")
	cityUuid, err := utils.ParseStringToUuid(cityId)
	if err != nil {
		c.JSON(400, gin.H{
			"error" : "Missing user Id or unable to proccess",
		})
		return
	}

	// remove city from db
	if err := database.RemoveCity(cityUuid); err != nil {
		c.JSON(500, gin.H{
			"error" : "Internal server error",
		})
		return
	}

	c.String(200, "ok")
}

func GetAllCities(c *gin.Context) {
	userId := c.GetString("userId")
	userUuid, err := utils.ParseStringToUuid(userId)
	if err != nil {
		c.JSON(400, gin.H{
			"error" : "Missing user Id or unable to proccess",
		})
		return
	}


	cities, err := database.GetAllCities(userUuid)
	if err != nil{
		c.JSON(500, gin.H{
			"error" : "Internal server error",
		})
		return
	}

	c.JSON(200, gin.H{
		"userCities" : cities,
	})
}