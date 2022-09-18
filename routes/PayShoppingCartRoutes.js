const express = require("express");
const payShoppingCartController = require("../controllers/PayController");
const authController = require("../controllers/authController");
const payShoppingCartRouter = express.Router();
//routes
payShoppingCartRouter
    .route("/")
    .all(authController.protect)
    .post(payShoppingCartController.payShoppingCart)

module.exports = payShoppingCartRouter;