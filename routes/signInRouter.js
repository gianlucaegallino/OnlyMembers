const { Router } = require("express");
const signInController = require("../controllers/signInController");
const signInRouter = Router();

signInRouter.get("/", signInController.getForm);

module.exports = signInRouter;
