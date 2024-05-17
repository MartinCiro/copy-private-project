const { Pool } = require("pg");
const config = require("../config.js");

const dbauth = {
    user: config.UserDB,
    password: config.PasswordBD,
    host: config.ServerDB,
    port: config.PortDB,
    database: config.Database,
    /* ssl: { rejectUnauthorized: true } */
};
/**
 * Método para conectarse a la base de datos de nexia automation
 * @returns {Promise<Pool>}
 */
function getConnection() {
  return new Pool(dbauth);
}

module.exports = { getConnection };