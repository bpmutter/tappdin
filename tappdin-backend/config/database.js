const config = require("./index");

const logging = true;
const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
  development: {
    logging,
    username,
    password,
    database,
    host,
    dialect: "postgres",
  },
};
