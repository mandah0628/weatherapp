package middleware

import (
	"log"
	"os"
	"strings"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func ValidateToken() gin.HandlerFunc {
	return func(c *gin.Context) {

		// get auth header
		authHeader := c.GetHeader("Authorization")
		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenStr == "" {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "Missing or invalid Authorization header",
			})
			return
		}

		secret := os.Getenv("JWT_SECRET")

		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})
		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "Invalid or expired token",
			})
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		userId, ok2 := claims["userId"].(string)
		if !ok || !ok2 {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "Invalid token claims",
			})
			return
		}

		c.Set("userId", userId)
		log.Println("User id from token:", userId)
		c.Next()
	}
}
