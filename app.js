require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const multer = require('multer');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

// Multer setup
const upload = multer();

// MySQL connection using .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) console.error("DB connection failed:", err);
    else console.log("Connected to MySQL");
});

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Form submission
app.post('/submit', upload.none(), (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.send('All fields are required!');
    }

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err) => {
        if (err) {
            console.error(err);
            return res.send('Error saving message.');
        }
        res.send('Message sent successfully!');
    });
});

// Optional: View messages in browser
app.get('/messages', (req, res) => {
    db.query("SELECT * FROM messages ORDER BY created_at DESC", (err, results) => {
        if (err) return res.send("Error fetching messages");
        let html = '<h1>Messages</h1><ul>';
        results.forEach(msg => {
            html += `<li><strong>${msg.name}</strong> (${msg.email}): ${msg.message}</li>`;
        });
        html += '</ul>';
        res.send(html);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});