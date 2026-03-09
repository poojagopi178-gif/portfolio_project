const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // for form parsing

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Handle contact form submission
const upload = multer(); // no files, just form data
app.post('/submit', upload.none(), (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required!');
    }

    const data = `Name: ${name}, Email: ${email}, Message: ${message}\n`;
    const filePath = path.join(__dirname, 'messages.txt');

    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving message.');
        }
        res.send('Message sent successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
