# StackForge — Backend

A production-style **Full-Stack Issue Tracking Platform** backend built with **Node.js, Express.js, MongoDB, and Mongoose** — inspired by systems like GitHub Issues, Jira, and Linear.

---

## Tech Stack

| Layer            | Technology                                          |
|------------------|-----------------------------------------------------|
| Runtime          | Node.js                                             |
| Framework        | Express.js v5                                       |
| Database         | MongoDB Atlas + Mongoose                            |
| Auth             | JSON Web Token (jsonwebtoken)                       |
| Password Hashing | bcryptjs                                            |
| Security         | helmet, express-rate-limit, express-mongo-sanitize  |
| Validation       | express-validator                                   |
| Logging          | winston                                             |
| Dev Tools        | nodemon                                             |

---

## Features

- User registration, login, and profile API
- JWT-based authentication with protected routes
- Role-based access control (admin / member)
- Project CRUD with member management
- Issue CRUD with status updates, assignment, and activity history
- Threaded comment system
- Project-specific labels
- Input validation on all endpoints
- Centralized error handling with custom `AppError` class
- Request ID and request logging middleware
- MongoDB injection protection
- Global and per-route rate limiting
- Structured JSON logging with Winston
- Pagination and multi-field filtering
- Graceful shutdown handling
- Environment validation on startup
- Database seed script

---

## Project Structure

```txt
stackforge/
├── config/
│   ├── config.js
│   ├── database.js
│   └── logger.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── projectController.js
│   ├── issueController.js
│   ├── commentController.js
│   ├── labelController.js
│   └── activityController.js
├── middlewares/
│   ├── protect.js
│   ├── restrictTo.js
│   ├── validate.js
│   ├── errorHandler.js
│   ├── requestId.js
│   ├── requestLogger.js
│   └── sanitise.js
├── models/
│   ├── User.js
│   ├── Project.js
│   ├── Issue.js
│   ├── Comment.js
│   ├── Label.js
│   └── ActivityLog.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   ├── issueRoutes.js
│   ├── commentRoutes.js
│   ├── labelRoutes.js
│   └── healthRoutes.js
├── utils/
│   ├── AppError.js
│   ├── catchAsync.js
│   ├── queryHelper.js
│   ├── generateToken.js
│   └── validateEnv.js
├── validators/
│   ├── authValidator.js
│   ├── projectValidator.js
│   ├── issueValidator.js
│   ├── commentValidator.js
│   └── labelValidator.js
├── scripts/
│   └── seed.js
├── postman/
│   ├── Issue Tracker API.postman_collection.json
│   └── Issue Tracker Local.postman_environment.json
├── logs/
├── .env.example
├── .gitignore
├── app.js
├── server.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account

### Installation

```bash
git clone https://github.com/VikashRaj-cmd/stackforge.git
cd stackforge
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run

```bash
# Development
npm run dev

# Production
npm start

# Seed database
npm run seed
```

---

## API Reference

### Base URL

```
/api/v1
```

### Health Check

```
GET /api/health
```

### Auth

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Users

```
GET    /api/v1/users
GET    /api/v1/users/:id
```

### Projects

```
GET    /api/v1/projects
POST   /api/v1/projects
GET    /api/v1/projects/:id
PUT    /api/v1/projects/:id
DELETE /api/v1/projects/:id
```

### Issues

```
GET    /api/v1/issues
POST   /api/v1/issues
GET    /api/v1/issues/:id
PUT    /api/v1/issues/:id
DELETE /api/v1/issues/:id
```

### Comments

```
POST   /api/v1/issues/:issueId/comments
GET    /api/v1/issues/:issueId/comments
```

### Labels

```
GET    /api/v1/projects/:projectId/labels
POST   /api/v1/projects/:projectId/labels
```

> Protected routes require a JWT token in the `Authorization` header:
>
> ```
> Authorization: Bearer <token>
> ```

---

## Implementation Stages

| Stage | Description                       | Status |
|-------|-----------------------------------|--------|
| 01    | Project Initialisation            | ✅     |
| 02    | Server Setup                      | ✅     |
| 03    | Database Connection               | ✅     |
| 04    | Domain & Data Modelling           | ✅     |
| 05    | Schema Design                     | ✅     |
| 06    | Database Seed Setup               | ✅     |
| 07    | Route Structure                   | ✅     |
| 08    | Auth & User APIs                  | ✅     |
| 09    | Project APIs                      | ✅     |
| 10    | Issue APIs                        | ✅     |
| 11    | Comment & Label APIs              | ✅     |
| 12    | Input Validation                  | ✅     |
| 13    | Custom Error Class                | ✅     |
| 14    | Centralised Error Handling        | ✅     |
| 15    | JWT Authentication                | ✅     |
| 16    | Authorisation & Route Protection  | ✅     |
| 17    | Middleware Layer                  | ✅     |
| 18    | Pagination & Filtering            | ✅     |
| 19    | Logging, Security & Performance   | ✅     |
| 20    | Production Readiness              | ✅     |
| 21    | Postman Collection Complete       | ✅     |
| 22    | GitHub Production Ready           | ✅     |

---

## Security

- HTTP security headers via `helmet`
- MongoDB injection protection via `express-mongo-sanitize`
- Global rate limit: 200 requests / 15 min
- Auth rate limit: 10 requests / 15 min
- Request body size limit: 50kb
- JWT token expiry enforced

---

## Logging

Structured JSON logging via Winston:

- `logs/combined.log` — all logs
- `logs/error.log` — error-level logs only
- Console output in development

---

## 🧪 Comprehensive Postman Testing

### Import Files

1. **Environment**: `postman/StackForge Local.postman_environment.json`
2. **Collection**: `postman/StackForge API.postman_collection.json`

### Setup Steps

1. Import both files into Postman
2. Select **StackForge Local** environment
3. Run **Auth → Login User** first (auto-saves token)
4. Follow sequence: Auth → Projects → Users → Issues → Comments → Labels → Validation Tests

### Environment Variables Auto-Populated
- `token` - from login response
- `projectId` - from create project
- `userId`, `issueId`, `commentId`, `labelId` - auto-captured

### Test Sequence (Recommended Order)

```
1. Auth → Register User ✓
2. Auth → Login User → 📝 Copy token  
3. Projects → Create Project → 📝 Copy projectId
4. Users → Get All Users → 📝 Copy userId  
5. Issues → Create Issue → 📝 Copy issueId
6. Comments → Add Comment → 📝 Copy commentId
7. Labels → Create Label → 📝 Copy labelId
8. Test all GET/PATCH/DELETE endpoints
9. Run Validation Tests folder
```

### Features Included
- ✅ 50+ API endpoints organized in 7 folders
- ✅ Auto token capture from login  
- ✅ Auto ID capture (project/user/issue/comment/label)
- ✅ Built-in tests for status codes
- ✅ Example bodies for all POST/PATCH
- ✅ Query params for filtering/search/pagination
- ✅ Invalid input validation tests
- ✅ Bearer auth pre-configured

### Headers (Auto-set)
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

---

## Previous Postman Info (Legacy)

Import the collection from `postman/StackForge-API.postman_collection.json` into Postman.

- **Auth** — Register and login to get a JWT token
- **Protected** — Use the JWT token in the `Authorization` header to access protected routes

---

## Author

**Vikash Rajput**
[GitHub](https://github.com/VikashRaj-cmd)

---

## License

ISC
