const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'clickhouse-136727a7-rancerollyb-06e4.d.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_0fdVtOSY7PUL0SXvGub',
    database: 'default'
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

module.exports = db;