const { Router } = require("express");
const signInController = require("../controllers/signInController");
const signInRouter = Router();

signInRouter.get("/", signInController.getForm);

signInRouter.post("/", signInController.postForm);

module.exports = signInRouter;
