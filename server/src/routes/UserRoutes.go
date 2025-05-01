package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mandah0628/weatherapp/server/src/controller"
)

func UserRoutes(router *gin.Engine) {
	userGroup := router.Group("/users")
	{
		userGroup.POST("/register", controller.RegisterUser)
	}
}