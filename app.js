const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT ||3000;

// Serve static files
app.use("/static", express.static(path.join(__dirname, "static")));

// Multer for form data
const upload = multer();

// Serve HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", 'index.html'));
});

// Email setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "poojagopi178@gmail.com",      // 🔴 your gmail
        pass: "kvavnmmqtiieiccf"     // 🔴 app password
    }
});

// Handle form submission
app.post("/submit", upload.none(), (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("All fields are required!");
    }

    // 📄 Save to messages.txt
    const filePath = path.join(__dirname, "messages.txt");
    const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n----------------------\n`;

    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error("File error:", err);
        }
    });

    // 📧 Send email
    const mailOptions = {
        from: email,
        to: "poojagopi178@gmail.com",
        subject: "New Portfolio Contact Message",
        text: data
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Email error:", error);
            return res.status(500).send("Message saved but email failed.");
        }
        res.send("Message sent to email and saved successfully!");
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
