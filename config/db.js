
const {createPool} = require('mysql2');
require('dotenv').config();
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "schools",
    connectionLimit:10
});



pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Database connected successfully');
    connection.release();
});

module.exports = pool.promise();
