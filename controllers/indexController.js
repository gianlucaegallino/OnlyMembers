const db = require("../db/queries");

async function getIndex(req, res) {
  return res.render("index", {});
}

module.exports = {
  getIndex,
};
