package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mandah0628/weatherapp/server/controller"
	"github.com/mandah0628/weatherapp/server/middleware"
)

func UserRoutes(router *gin.Engine) {
	userGroup := router.Group("/users")
	{
		userGroup.POST("/register", middleware.ValidateRegisterFields, controller.RegisterUser)
	}
}