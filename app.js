//------------Imports-------------

//Node, working with file paths
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
// Dotenv
require("dotenv").config();
// PostgreSQL 
const { Pool } = require("pg");
// Express
const express = require("express");
// Express validator
const { body, validationResult } = require("express-validator");
// Express session (for passport)
const session = require("express-session");
// Passport.js
const passport = require("passport");
// Passport strategy
const LocalStrategy = require("passport-local").Strategy;
// Bcrypt
const bcrypt = require("bcryptjs");

//-------------Constants & Middleware-------------

const PORT = process.env.PORT || 3000;

const app = express();
//Set up view folder for ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//Set up asset path
app.use(express.static(assetsPath));
//Passport
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
//Allows object url encoding (forms)
app.use(express.urlencoded({ extended: false }));



//--------------------- Paths ---------------------
app.get("/", (req, res) => {
  res.render("index", {});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
