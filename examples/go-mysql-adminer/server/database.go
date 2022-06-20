package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	db         *gorm.DB
	dbHostname = os.Getenv("MYSQL_HOSTNAME")
	dbPort     = os.Getenv("MYSQL_PORT")
	dbDatabase = os.Getenv("MYSQL_DATABASE")
	dbUser     = os.Getenv("MYSQL_USER")
	dbPassword = os.Getenv("MYSQL_PASSWORD")
)

func openDatabase() (*gorm.DB, error) {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%v)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPassword, dbHostname, dbPort, dbDatabase)
	d, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	d = d.Debug() // activate sql query log
	return d, nil
}

func TryOpenDatabase(retryCount int, delay time.Duration) (err error) {
	log.Println("Connecting to MySQL database ...")
	for i := 0; i < retryCount; i++ {
		db, err = openDatabase()
		if err != nil {
			log.Println("Connecting to database failed (Retry: %v/%v)", i, retryCount)
			time.Sleep(delay)
			continue
		}
		break
	}
	return err
}
