package utils

import (
	"golang.org/x/crypto/bcrypt"
)

func VerifyPassword(hashedPassword string, reqPassword string) (error) {
	passwordByte := []byte(reqPassword)
	hashedPasswordByte := []byte(hashedPassword)
	return bcrypt.CompareHashAndPassword(hashedPasswordByte, passwordByte)
}