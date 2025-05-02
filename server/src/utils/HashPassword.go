package utils

import (
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	passwordBytes := []byte(password)
	cost := bcrypt.DefaultCost

	hashedBytes, err := bcrypt.GenerateFromPassword(passwordBytes,cost)
	if err != nil {
		return "", err
	} 

	return string(hashedBytes), nil
}