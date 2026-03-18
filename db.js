const mysql = require('mysql2');

// Use a pool for better performance and stability
const pool = mysql.createPool({
    host: 'haze420-mysql-rancerollyb-06e4.j.aivencloud.com', // Must have quotes!
    user: 'avnadmin', 
    password: 'YOUR_PASSWORD_HERE', 
    database: 'defaultdb',
    port: 26753,
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