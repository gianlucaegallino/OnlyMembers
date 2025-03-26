const pool = require("./pool");

async function insertUser(name, surname, username, password) {
  let contents = pool.query(
    "INSERT INTO users (name, surname, username, password, memberstatus) VALUES ($1, $2, $3, $4, false)",
    [name, surname, username, password]
  );
  return contents;
}

async function getUserbyName(username) {
  let contents = pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return contents;
}


async function getUserbyId(username) {
    let contents = pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return contents;
  }

module.exports = {
  insertUser,
  getUserbyName,
  getUserbyId
};
