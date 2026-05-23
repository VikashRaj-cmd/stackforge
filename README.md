# StackForge — Full-Stack Issue Tracking Platform

A full-stack **Issue & Bug Tracking System** built with the **MEAN stack** — inspired by systems like GitHub Issues, Jira, and Linear.

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | Angular 21 (SSR)                  |
| Backend   | Node.js + Express.js v5           |
| Database  | MongoDB Atlas + Mongoose          |
| Auth      | JSON Web Token (jsonwebtoken)     |
| Styling   | CSS                               |

---

## Project Structure

```txt
stackforge/
├── backend/                  # Node.js + Express REST API
│   ├── config/               # App config, DB connection, logger
│   ├── controllers/          # Route handler logic
│   ├── middlewares/          # Auth, error, logging, validation middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express route definitions
│   ├── utils/                # Helpers: AppError, catchAsync, pagination
│   ├── validators/           # express-validator rule sets
│   ├── scripts/              # Database seed script
│   ├── postman/              # Postman collection and environment
│   ├── logs/                 # Winston log output
│   ├── app.js                # Express app setup
│   ├── server.js             # Server bootstrap + graceful shutdown
│   └── package.json
├── frontend/                 # Angular 21 SPA with SSR
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/         # Guards, interceptors, models, services
│   │   │   ├── features/     # Auth, dashboard, issues, projects, comments, labels, users
│   │   │   ├── layout/       # Shell layout components
│   │   │   └── shared/       # Reusable components
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- Angular CLI v21
- MongoDB Atlas account

---

## Backend

```bash
cd backend
npm install
npm run dev
```

URL: `http://localhost:5000`

### Environment Variables

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Seed Database

```bash
npm run seed
```

---

## Frontend

```bash
cd frontend
npm install
ng serve -o
```

URL: `http://localhost:4200`

---

## API Reference

Base URL: `/api/v1`

| Method | Endpoint                              | Description           | Auth     |
|--------|---------------------------------------|-----------------------|----------|
| GET    | /api/health                           | Health check          | Public   |
| POST   | /api/v1/auth/register                 | Register user         | Public   |
| POST   | /api/v1/auth/login                    | Login user            | Public   |
| GET    | /api/v1/users                         | Get all users         | Protected|
| GET    | /api/v1/projects                      | Get all projects      | Protected|
| POST   | /api/v1/projects                      | Create project        | Protected|
| GET    | /api/v1/issues                        | Get all issues        | Protected|
| POST   | /api/v1/issues                        | Create issue          | Protected|
| POST   | /api/v1/issues/:issueId/comments      | Add comment           | Protected|
| GET    | /api/v1/projects/:projectId/labels    | Get labels            | Protected|

> Protected routes require: `Authorization: Bearer <token>`

---

## Backend Implementation Stages

| Stage | Description                      | Status |
|-------|----------------------------------|--------|
| 01    | Project Initialisation           | ✅     |
| 02    | Server Setup                     | ✅     |
| 03    | Database Connection               | ✅     |
| 04    | Domain & Data Modelling          | ✅     |
| 05    | Schema Design                    | ✅     |
| 06    | Database Seed Setup              | ✅     |
| 07    | Route Structure                  | ✅     |
| 08    | Auth & User APIs                 | ✅     |
| 09    | Project APIs                     | ✅     |
| 10    | Issue APIs                       | ✅     |
| 11    | Comment & Label APIs             | ✅     |
| 12    | Input Validation                 | ✅     |
| 13    | Custom Error Class               | ✅     |
| 14    | Centralised Error Handling       | ✅     |
| 15    | JWT Authentication               | ✅     |
| 16    | Authorisation & Route Protection | ✅     |
| 17    | Middleware Layer                 | ✅     |
| 18    | Pagination & Filtering           | ✅     |
| 19    | Logging, Security & Performance  | ✅     |
| 20    | Production Readiness             | ✅     |

## Frontend Implementation Stages

| Stage | Description                      | Status |
|-------|----------------------------------|--------|
| F01   | Initialize Angular Project       | ✅     |
| F02   | Routing & Layout Setup           | ⏳     |
| F03   | Auth Module (Login / Register)   | ⏳     |
| F04   | HTTP Interceptor & Auth Guard    | ⏳     |
| F05   | Dashboard                        | ⏳     |
| F06   | Projects Module                  | ⏳     |
| F07   | Issues Module                    | ⏳     |
| F08   | Comments Module                  | ⏳     |
| F09   | Labels Module                    | ⏳     |
| F10   | Users Module                     | ⏳     |

---

## Status

| Layer    | Status      |
|----------|-------------|
| Backend  | ✅ Completed |
| Frontend | ⏳ In Progress |

---

## Author

**Vikash Rajput**
[GitHub](https://github.com/VikashRaj-cmd)

---

## License

ISC
