package config

import (
	"gopkg.in/mail.v2"
	"os"
	"log"
	"strconv"
)

var MailDialer *mail.Dialer

func InitMailer() {
	env := os.Getenv("ENV")

	host := os.Getenv("MAIL_HOST")
	portStr := os.Getenv("MAIL_PORT")
	port, err := strconv.Atoi(portStr)
	if err != nil {
		log.Fatalln("Invalid MAIL_PORT env")
	}


	if env == "dev" {
		MailDialer = mail.NewDialer(host, port, "", "")
		MailDialer.SSL = false
		MailDialer.StartTLSPolicy = mail.NoStartTLS
	} else {
		user := os.Getenv("MAIL_USER")
		password := os.Getenv("MAIL_PASSWORD")
		if user == "" || password == "" {
			log.Fatalf("Missing MAIL_USER or MAIL_PASSWORD env")
		}

		MailDialer = mail.NewDialer(host, port, user, password)
		MailDialer.SSL = true
		MailDialer.StartTLSPolicy = mail.MandatoryStartTLS
	}
}
