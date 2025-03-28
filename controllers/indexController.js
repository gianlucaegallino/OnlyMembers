const db = require("../db/queries");

async function getIndex(req, res) {
  return res.render("index", { user: req.user });
}

async function validateSecret(req, res) {

  const secret = req.body.secret;

  if (secret === process.env.secretpassword){
    try {
      let result = await db.updateMembershipStatus(req.user.id, true);

      if (result.rowCount === 1) {
        req.user.memberstatus = true;
      }
      return res.render("index", { user: req.user, messages: ["You are now a member of the council."] });
    } catch (error) {
      console.error(error)
      return res.render("index", { user: req.user, messages: ["There was an error somewhere. Call the dev.", error] });
    }

  } else{
    return res.render("index", { user: req.user, messages: ["That password is incorrect."] });
  }

}

module.exports = {
  getIndex,
  validateSecret
};
