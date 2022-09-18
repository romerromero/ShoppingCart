const express = require("express");
const userController = require("./../controllers/userController");
const userRouter = express.Router();
//routes
userRouter
    .route("/")
    .post(userController.addUser)

module.exports = userRouter;