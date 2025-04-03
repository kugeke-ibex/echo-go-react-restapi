package main

import (
	"go-rest-api/controller"
	"go-rest-api/router"
	"go-rest-api/usecase"
	"go-rest-api/repository"
	"go-rest-api/db"
)

func main () {
	db := db.NewDB()
	userRepository := repository.NewUserRepository(db)
	userUsecase := usecase.NewUserUsecase(userRepository)
	userController := controller.NewUserController(userUsecase)
	e := router.NewRouter(userController)
	e.Logger.Fatal(e.Start(":8080"))
}
