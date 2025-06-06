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
		userGroup.POST("/logout", controller.LogoutUser)
		userGroup.POST("/verify-email", controller.VerifyEmail)

		userGroup.Use(middleware.ValidateToken())
		userGroup.PUT("/update-user", controller.UpdateUser)
		userGroup.GET("/get-user", controller.GetUserByID)
		userGroup.POST("/verify-token", controller.VerifyToken)
	}
}