package database

import (
	"github.com/google/uuid"
	"github.com/mandah0628/weatherapp/server/src/config"
	"github.com/mandah0628/weatherapp/server/src/model"
)

func CreateUser(user *model.User) error {
	return config.Postgres.Create(user).Error
}

func FindUserByEmail(email string) (*model.User, error) {
	var user model.User
	err := config.Postgres.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func UpdateUser(userId uuid.UUID, updateData map[string]interface{}) error {
	return config.Postgres.
	Model(&model.User{}).
	Where("id = ?").
	Updates(updateData).Error
}