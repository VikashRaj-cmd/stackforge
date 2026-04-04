# 🚀 Issue Tracker Backend (MEAN Stack - Backend)

A professional Issue & Bug Tracking System backend built using Node.js, Express, and MongoDB.

---

## 📌 Features (Completed)

- User Model with Authentication support
- Project Management System
- Issue Tracking System
- Comments System
- Labels for categorization
- Activity Logging (basic structure)
- Database Seeding

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (upcoming)
- bcryptjs (password hashing)

---

## 📁 Project Structure
issue-tracker/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── validators/
├── scripts/
├── app.js
├── server.js
├── .env


---

## ⚙️ Installation

git clone https://github.com/VikashRaj-cmd/issue-tracker.git
cd issue-tracker
npm install
---
## ▶️ Run Project
npm run dev
🌱 Seed Database
npm run seed

## 🔐 Environment Variables
Create .env file:
PORT=5000
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_secret


##📡 API Health Check
GET /api/health

## 📅 Progress
✅ Stage 01: Project Setup

✅ Stage 02: Server Setup

✅ Stage 03: Database Connection

✅ Stage 04: Data Modeling

✅ Stage 05: Schema Design

✅ Stage 06: Database Seeding

⏳ Stage 07: Routes

⏳ Stage 08: Authentication APIs

⏳ Stage 09+: Advanced Features

👨‍💻 Author
Vikash Rajput


---

## 📡 API Routes (Stage 07)

### Health
GET /api/health

### Auth
POST /api/auth/register
POST /api/auth/login

### Users
GET /api/users
GET /api/users/:id

### Projects
GET /api/projects
POST /api/projects

### Issues
GET /api/issues
POST /api/issues

### Comments
POST /api/comments

### Labels
GET /api/labels

## 🔐 Authentication (Stage 08)

### Register
POST /api/auth/register

### Login
POST /api/auth/login

### Protected Routes
Require JWT Token in header:

Authorization: Bearer <token>

---

## 🧪 Postman Testing

### Auth Folder
- Register User
- Login User

### Protected Folder
- Access APIs using JWT token


## 📦 CRUD APIs (Stage 09)

### Projects
- Create Project
- Get Projects (Pagination)
- Get Single Project
- Update Project
- Delete Project

### Issues
- Create Issue
- Get Issues (Filter + Pagination)
- Update Issue
- Delete Issue

