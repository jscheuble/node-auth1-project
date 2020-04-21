const knex = require("knex");

const config = require("../knexfile");

const environment = process.env.NODE_ENV || config.development;

module.exports = knex(environment);
