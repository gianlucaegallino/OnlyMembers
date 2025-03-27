const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const { Router } = require("express");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

async function getForm(req, res) {
  return res.render("signin", {});
}

async function authForm() {
  return passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  });
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.getUserbyId(id);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = {
  getForm,
  authForm,
};
