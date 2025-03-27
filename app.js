//------------Imports-------------

//Node, working with file paths
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
// Dotenv
require("dotenv").config();
// PostgreSQL and queries
const { Pool } = require("pg");
const db = require("./db/queries");
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

//----------------Routers-------------------

const indexRouter = require("./routes/indexRouter");
const signInRouter = require("./routes/signInRouter");
const signUpRouter = require("./routes/signUpRouter");

//-------------Constants & Middleware-------------

const PORT = process.env.PORT || 3000;

const app = express();

//Set up view folder for ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Set up asset path
app.use(express.static(assetsPath));

//Passport
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

//Allows object url encoding (forms)
app.use(express.urlencoded({ extended: false }));

//Passport.js LocalStrategy middleware and serialization

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await db.getUserbyName(username);
      console.log(rows);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

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

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
//--------------------- Paths ---------------------
app.get("/", (req, res) => {
  res.render("index", {});
});

app.use("/", indexRouter);
app.use("/signin", signInRouter);
app.use("/signup", signUpRouter);
app.use("/signout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.get("/*", (req, res) => {
  res.render("404", {});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
