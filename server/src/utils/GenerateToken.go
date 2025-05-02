package utils

import (
	"log"
	"os"
	"time"
	"github.com/golang-jwt/jwt/v5"
)


func GenerateToken(userId string) (string,error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Fatalln("Missing JWT secret in ENV")
	}

	claims := jwt.MapClaims{
		"userId" : userId,
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