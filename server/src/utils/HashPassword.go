package utils

import (
	"golang.org/x/crypto/bcrypt"
)

// Hashes a password
// 
// Parameters:
// 1) password: the unhashed password
//
// Returns:
// If operations is successful, hashed password and nil.
// If operations are unsuccessful, empty string and error
func HashPassword(password string) (string, error) {
	passwordBytes := []byte(password)
	cost := bcrypt.DefaultCost

	hashedBytes, err := bcrypt.GenerateFromPassword(passwordBytes,cost)
	if err != nil {
		return "", err
	} 

	return string(hashedBytes), nil
}