const mysql = require("mysql2")
const mysqlConfig = require("./mysql.config")
const db = mysql.createPool(mysqlConfig)

const query = (sql: string, val: any) => {
  return new Promise((resolve, reject) => {
    db.getConnection(function (err: any, connection: any) {
      if (err) reject(err);
      else {
        connection.query(sql, val, (err: any, fields: any) => {
      if (err) reject(err);
          else resolve(fields);
          connection.release();
        });
      }
    });
  });
};

module.exports = { query }
export {}