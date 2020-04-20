const db = require("../data/db-config");

module.exports = {
  getUsers,
  getById,
  add,
};

function getUsers() {
  return db("user").select("id", "username");
}

function getById(id) {
  return db("user").where({ id }).first();
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return getById(id);
}
