const db = require("../db/queries");

async function getIndex(req, res) {
  return res.render("index", { user: req.user });
}

module.exports = {
  getIndex,
};
