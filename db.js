const mysql = require('mysql2');

// Use a pool for better performance and stability
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 26753,
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