const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

async function getForm(req, res) {
  return res.render("signup", {});
}

module.exports = {
  getForm,
};
