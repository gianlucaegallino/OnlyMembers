const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function getForm(req, res) {
  return res.render("signup", {});
}
async function postForm(req, res) {
  try {
    const name = req.body.name;
    const surname = req.body.surname;
    const username = req.body.username;
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    await db.insertUser(name, surname, username, hashedPwd);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
   }
}

module.exports = {
  getForm,
};
