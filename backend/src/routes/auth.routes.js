const express = require("express")
 const authController = require("../controller/auth.controller")
const authRouter = express.Router()

authRouter.post("/register" , authController.RegisterControll )

authRouter.post("/login" , authController.loginControll )

authRouter.get("/get-me" , authController.getMeControll )

module.exports = authRouter
