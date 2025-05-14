package model

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID uuid.UUID 				`gorm:"type:uuid;primaryKey" json:"id"`
	Name string 				`gorm:"not null;size:50" json:"name"`
	Email string 				`gorm:"unique;not null;size:100" json:"email"`
	Password string 			`gorm:"not null;size:100" json:"password"`
	Verified bool				`gorm:"default:false" json:"verified"`
	VerificationToken string	`gorm:"size:255" json:"verificationToken"`
	CreatedAt time.Time			`json:"createdAt"`
	UpdatedAt time.Time			`json:"updatedAt"`
	DeletedAt gorm.DeletedAt 	`gorm:"index" json:"deletedAt"`
	SavedCities []City 			`gorm:"foreignKey:UserID" json:"savedCities"`
}

func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	if user.ID == uuid.Nil {
		user.ID = uuid.New()
	}
	return
}