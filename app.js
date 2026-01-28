const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // Multer to parse multipart/form-data

const app = express();
const PORT = 3000;

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// Setup Multer
const upload = multer(); // no file upload, just form data

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Handle form submission
app.post('/submit', upload.none(), (req, res) => {
    const { name, email, message } = req.body;

    // Validate
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required!');
    }

    const data = `Name: ${name}, Email: ${email}, Message: ${message}\n`;
    const filePath = path.join(__dirname, 'messages.txt');

    fs.appendFile(filePath, data, { flag: 'a+' }, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving message.');
        }
        res.send('Message sent successfully!');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});