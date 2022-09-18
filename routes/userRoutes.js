const express = require("express");
const userController = require("./../controllers/userController");
const userRouter = express.Router();
//routes
userRouter
    .route("/")
    .post(userController.addUser)
    .get(userController.getAllUsers)
    .put(userController.updateUser);
userRouter
    .route("/:id")
    .get(userController.getUserById)
    .delete(userController.deleteUserById)

module.exports = userRouter;