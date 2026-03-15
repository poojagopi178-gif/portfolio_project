
# Portfolio Project

## Description
This is a simple portfolio website developed as part of the Web Development course.  
The website displays personal information, skills, projects, and includes a contact form for users to send messages.

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
portfolio_project/ │ ├── static/          # CSS, JS, images ├── templates/       # HTML files ├── app.js           # Node.js server ├── package.json     # Project dependencies ├── package-lock.json ├── .gitignore       # Ignore sensitive/unnecessary files ├── README.md        # Project description & instructions └── .github/         # CI/CD workflow └── workflows/ └── nodejs.yml

---

## Features
- Responsive portfolio webpage  
- Navigation bar and hero section  
- Skills and projects section  
- Contact form to send messages  
- Backend server processes form data locally  
- CI/CD workflow checks Node.js setup, installs dependencies, and optionally runs tests & linting  

---

## How to Run the Project Locally

### 1. Install dependencies
```bash
npm install
2. Create MySQL database
SQL
CREATE DATABASE portfolio;
USE portfolio;
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
3. Update database credentials
Update host, user, password, and database in app.js.
4. Start the server
Bash
node app.js
5. Open the website in your browser
http://localhost:3000⁠ 
6. Test the contact form
Messages will be saved in your local MySQL database.


CI/CD Workflow (GitHub Actions)
Workflow file: .github/workflows/nodejs.yml
Runs automatically on push or pull request to main.
Checks Node.js environment, installs dependencies, and optionally runs tests/lint.
Does not deploy the app or affect your local database.
Workflow Summary
Code written locally
Version control managed using Git and GitHub
Backend server runs locally using Node.js
Database operations are local (MySQL)
CI/CD workflow ensures code integrity on GitHub


Author
Pooja
BCA Student

---
