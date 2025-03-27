const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const { Router } = require("express");
const passport = require("passport");


async function getForm(req, res) {
  return res.render("signin", {});
}


module.exports = {
  getForm,

};
