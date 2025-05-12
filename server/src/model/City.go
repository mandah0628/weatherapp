package model

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type City struct {
	ID        uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	Name      string         `gorm:"not null;size:50" json:"name"`
	State     string         `gorm:"size:50" json:"state"`
	Country   string         `gorm:"not null;size:2" json:"country"`
	Lat       float64        `gorm:"not null" json:"lat"`
	Lon       float64        `gorm:"not null" json:"lon"`
	UserID    uuid.UUID      `gorm:"type:uuid;not null" json:"userId"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"deletedAt"`
}

func (city *City) BeforeCreate(tx *gorm.DB) (err error) {
	if city.ID == uuid.Nil {
		city.ID = uuid.New()
	}
	return
}