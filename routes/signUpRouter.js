const { Router } = require("express");
const signUpController = require("../controllers/signUpController");
const signUpRouter = Router();
// Passport strategy
const LocalStrategy = require("passport-local").Strategy;

signUpRouter.get("/", signUpController.getForm);
signUpRouter.post("/", signUpController.postForm);

module.exports = signUpRouter;