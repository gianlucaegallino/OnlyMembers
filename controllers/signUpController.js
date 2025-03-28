const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

const alphaErr = "must be alphabetical.";
const alphanumErr = "must be alphanumeric.";
const lengthErr64 = "must be between 1 and 64 characters.";
const pwdLenErr = "must be at least 6 characters long.";

const validateUser = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage(`Name ${alphaErr}`)
    .isLength({ min: 1, max: 64 })
    .withMessage(`Name ${lengthErr64}`),
  body("surname")
    .trim()
    .isAlpha()
    .withMessage(
      `
      Surname ${alphaErr}`
    )
    .isLength({ min: 1, max: 64 })
    .withMessage(`Surname ${lengthErr64}`),
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage(`Username ${alphanumErr}`)
    .isLength({ min: 1, max: 64 })
    .withMessage(`Username ${lengthErr64}`)
    .custom(async (value) => {
      const user = await db.getUserbyName(value);
      if (user.rows.length !== 0) {
        throw new Error();
      }
    })
    .withMessage(`This user already exists.`),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage(`Password ${pwdLenErr}`),
  body("confirm-password")
    .custom(async (value, { req }) => {
      if (value !== req.body.password) throw new Error();
    })
    .withMessage(`Passwords dont match.`),
];

async function getForm(req, res) {
  return res.render("signup", {});
}

let postForm = [
  validateUser,
  async (req, res) => {
    try {
      const name = req.body.name;
      const surname = req.body.surname;
      const username = req.body.username;
      const hashedPwd = await bcrypt.hash(req.body.password, 10);
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        await db.insertUser(name, surname, username, hashedPwd);
        res.render("index", { messages: ["User created correctly. Please, log in."] });
      } else {
        let errorArray = errors.errors.map((error)=>{
          return error.msg;
        });
        res.render("signup", { messages: errorArray });
      }
    } catch (error) {
      console.error(error);
      res.render("signup", { messages: ["Something exploded somewhere.", error] });
    }
  },
];

module.exports = {
  getForm,
  postForm,
};
