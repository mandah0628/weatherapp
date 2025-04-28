package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name string `gorm:"not null;size:50"`
	Email string `gorm:"unique;not null;size:100"`
	Password string `gorm:"not null;size:50"`
}