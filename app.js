require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'static')));

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
    } else {
        console.log("Connected to MySQL");
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err) => {
        if (err) {
            res.send("Error saving message");
        } else {
            res.send("Message saved successfully!");
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
