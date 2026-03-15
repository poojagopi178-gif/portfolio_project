Markdown
# Portfolio Project

## Description
This is a simple portfolio website developed as part of the Web Development course.  
The website displays personal information, skills, projects, and includes a contact form for users to send messages.  
All messages are now securely stored in a **MySQL database** instead of a text file.

---

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL

---

## Project Structure
portfolio_project │ ├── static/          (CSS and other static files) ├── templates/       (HTML files) ├── app.js           (Backend server) ├── package.json     (Project dependencies) ├── package-lock.json └── .gitignore

---

## Features
- Responsive portfolio webpage  
- Navigation bar and hero section  
- Skills and projects section  
- Contact form to send messages  
- **Messages stored in MySQL database**  
- Backend server processes form data  

---

## How to Run the Project

1. Install dependencies:

```bash
npm install
Start the server:
Bash
node app.js
Open the website in your browser:

http://localhost:3000
Database Setup
Before running the project, create the MySQL database and table for messages:
SQL
CREATE DATABASE IF NOT EXISTS portfolio;

USE portfolio;

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
All contact form submissions will be saved in this messages table.
Workflow
Code written locally on the system
Version control managed using Git
Project uploaded to GitHub repository
Backend server runs using Node.js and MySQL


Author
Pooja
BCA Student