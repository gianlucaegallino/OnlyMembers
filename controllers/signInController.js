const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const passport = require("passport");

async function getForm(req, res) {
  return res.render("signin", {});
}

async function postForm(req,res){
  return passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
}

module.exports = {
  getForm,
  postForm
};
