"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const mysqlConfig = require("./mysql.config");
const db = mysql.createPool(mysqlConfig);
const query = (sql, val) => {
    return new Promise((resolve, reject) => {
        db.getConnection(function (err, connection) {
            if (err)
                reject(err);
            else {
                connection.query(sql, val, (err, fields) => {
                    if (err)
                        reject(err);
                    else
                        resolve(fields);
                    connection.release();
                });
            }
        });
    });
};
module.exports = { query };
//# sourceMappingURL=query.js.map