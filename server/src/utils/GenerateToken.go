package utils

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/mandah0628/weatherapp/server/src/model"
)


func GenerateToken(user *model.User) (string,error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Fatalln("Missing JWT secret in ENV")
	}

	claims := jwt.MapClaims{
		"userId" : user.ID,
		"isVerified": user.Verified,
		"exp" : time.Now().Add(time.Hour * 24).Unix(),
		"iat": time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return "" , err
	}

	return tokenString , nil
}