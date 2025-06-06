package database

import (
	"github.com/google/uuid"
	"github.com/mandah0628/weatherapp/server/src/config"
	"github.com/mandah0628/weatherapp/server/src/model"
)


func AddCity(city *model.City) error {
	return config.Postgres.Create(city).Error
}

func RemoveCity(cityUuid uuid.UUID) error {
	return config.Postgres.Where("id = ?", cityUuid).Delete(&model.City{}).Error
}

func GetAllCities(userUuid uuid.UUID) ([]model.City, error) {
	var cities []model.City

	err := config.Postgres.Where("user_id = ?", userUuid).Find(&cities).Error

	return cities,err
}