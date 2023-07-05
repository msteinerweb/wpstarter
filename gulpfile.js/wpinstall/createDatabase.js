const { database } = require('../../config');

const mysql = require('mysql2/promise');


async function createDatabase() {
    const connection = await mysql.createConnection({
        host: database.dbhost,
        user: database.dbuser,
        password: database.dbpass,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database.dbname}`);
    await connection.close();
}

module.exports = createDatabase;
