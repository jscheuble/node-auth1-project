const db = require("../data/db-config");

module.exports = {
  getUsers,
  getBy,
  getById,
  add,
};

function getUsers() {
  return db("user").select("id", "username", "password");
}

function getBy(str) {
  return db("user").where("username", str);
}

function getById(id) {
  return db("user").where({ id }).first();
}

async function add(user) {
  const [id] = await db("user").insert(user, "id");
  return getById(id);
}
