package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mandah0628/weatherapp/server/src/controller"
	"github.com/mandah0628/weatherapp/server/src/middleware"
)

func CityRoutes(router *gin.Engine){
	cityGroup := router.Group("/city", middleware.ValidateToken())

	cityGroup.POST("/add-city", controller.AddCity)
	cityGroup.DELETE("/remove-city", controller.RemoveCity)
}