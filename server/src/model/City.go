package model

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type City struct{
	ID uuid.UUID 				`gorm:"type:uuid;primaryKey"`
	Name string 				`gorm:"not null;size:50"`
	CountryName string 			`gorm:"not null;size:50"`
	CountryCode string 			`gorm:"not null;size:2"`
	Lat	float64 				`gorm:"not null"`
	Lon float64 				`gorm:"not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt
	UserID uuid.UUID 			`gorm:"type:uuid;not null"`
}

func (city *City) BeforeCreate(tx *gorm.DB) (err error) {
	if city.ID == uuid.Nil {
		city.ID = uuid.New()
	}
	return
}