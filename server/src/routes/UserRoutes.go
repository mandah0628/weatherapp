package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mandah0628/weatherapp/server/src/controller"
	"github.com/mandah0628/weatherapp/server/src/middleware"
)

func UserRoutes(router *gin.Engine) {
	userGroup := router.Group("/user")
	{
		userGroup.POST("/register", controller.RegisterUser)
		userGroup.POST("/login", controller.LoginUser)

		userGroup.Use(middleware.ValidateToken())
		userGroup.PUT("/update", controller.UpdateUser)
	}
}