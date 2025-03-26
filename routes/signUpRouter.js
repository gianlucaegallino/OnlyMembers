const { Router } = require("express");
const signUpController = require("../controllers/signUpController");
const signUpRouter = Router();

signUpRouter.get("/", signUpController.getForm);

module.exports = signUpRouter;