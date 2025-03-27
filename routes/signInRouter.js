const { Router } = require("express");
const signInController = require("../controllers/signInController");
const signInRouter = Router();
const passport = require("passport");
const session = require("express-session");

signInRouter.get("/", signInController.getForm);

signInRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

module.exports = signInRouter;
