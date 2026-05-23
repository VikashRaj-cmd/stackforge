# StackForge — Frontend

Angular 21 frontend for the **StackForge — Full-Stack Issue Tracking Platform** with Server-Side Rendering (SSR).

---

## Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Framework  | Angular 21 (SSR)   |
| Language   | TypeScript         |
| Styling    | CSS                |
| Testing    | Vitest             |

---

## Project Structure

```txt
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/           # Route guards (auth)
│   │   │   ├── interceptors/     # HTTP interceptors (JWT token)
│   │   │   ├── models/           # TypeScript interfaces
│   │   │   └── services/         # API services
│   │   ├── features/
│   │   │   ├── auth/             # Login, Register
│   │   │   ├── dashboard/        # Dashboard
│   │   │   ├── issues/           # Issue list, detail, create
│   │   │   ├── projects/         # Project list, detail, create
│   │   │   ├── comments/         # Threaded comments
│   │   │   ├── labels/           # Labels management
│   │   │   └── users/            # User profile, list
│   │   ├── layout/               # Shell, navbar, sidebar
│   │   ├── shared/
│   │   │   └── components/       # Reusable UI components
│   │   ├── app.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── index.html
│   ├── main.ts
│   ├── main.server.ts
│   └── styles.css
├── angular.json
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- Angular CLI v21

```bash
npm install -g @angular/cli
```

### Installation

```bash
cd frontend
npm install
```

### Run

```bash
# Development
ng serve -o

# SSR Development
ng serve

# Production Build
ng build
```

URL: `http://localhost:4200`

---

## Implementation Stages

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

## Backend

The backend API runs at `http://localhost:5000`. See [backend README](../backend/README.md) for setup.

---

## Author

**Vikash Rajput**
[GitHub](https://github.com/VikashRaj-cmd)

---

## License

ISC
