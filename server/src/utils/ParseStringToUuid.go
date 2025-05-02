package utils

import "github.com/google/uuid"

func ParseStringToUuid(userId string) (uuid.UUID, error) {
	userUuid, err := uuid.Parse(userId)
	return userUuid,err
}