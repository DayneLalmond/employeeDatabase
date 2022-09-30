const mysql = require('mysql2')


const server = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'module12'
  });

  module.exports = server