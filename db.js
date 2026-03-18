const mysql = require('mysql2');

// Use a pool for better performance and stability
const pool = mysql.createPool({
    host: haze420-mysql-rancerollyb-06e4.j.aivencloud.com,
    user: avnadmin,
    password: AVNS_3b0Vttsv3iYzYCi1Ir7,
    database: defaultdb,
    port: 26752,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Aiven MySQL usually requires SSL
    ssl: {
        rejectUnauthorized: false 
    }
});

// Test the connection on startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL Connection Error:', err.message);
    } else {
        console.log('Successfully connected to Aiven MySQL!');
        connection.release();
    }
});

module.exports = pool.promise(); // Using promise() lets you use async/await