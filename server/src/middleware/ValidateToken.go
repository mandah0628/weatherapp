package middleware

import (
	"log"
	"os"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func ValidateToken() gin.HandlerFunc {
	return func(c *gin.Context) {

		// get token from cookie
		rawToken, err := c.Cookie("token")
		if err != nil || rawToken == "" {
			c.AbortWithStatusJSON(401, gin.H{
				"error" : "Missing or invalid cookie",
			})
			return
		}


		// verify token authenticity
		secret := os.Getenv("JWT_SECRET")
		decodedToken, err := jwt.Parse(rawToken, func(token *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})
		if err != nil || !decodedToken.Valid {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "Invalid or expired token",
			})
			return
		}

		// extract claims from decoded token
		// then extract userId from claims
		claims, claimsIsMap := decodedToken.Claims.(jwt.MapClaims)
		userId, valueIsString := claims["userId"].(string)
		if !claimsIsMap || !valueIsString {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "Invalid token claims",
			})
			return
		}

		// store used id in context
		c.Set("userId", userId)
		log.Println("User id from token:", userId)

		c.Next()
	}
}
