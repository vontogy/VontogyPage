# Vontogy Pages

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8.svg)](https://tailwindcss.com/)

Affiliate Marketing Platform built with React, Node.js, TypeScript, and Tailwind CSS.

## 📁 Project Structure

```
VontogyPages/
├── frontend/                   # React Frontend Application
│   ├── public/                 # Static assets
│   │   ├── fonts/             # Custom fonts
│   │   └── images/            # Images and icons
│   ├── src/
│   │   ├── components/        # React components
│   │   │   └── ui/           # Shadcn UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions
│   │   ├── pages/             # Page components
│   │   ├── styles/            # CSS styles
│   │   ├── App.tsx            # Main App component
│   │   └── main.tsx           # Entry point
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   ├── tsconfig.json          # TypeScript config
│   ├── vite.config.ts         # Vite configuration
│   └── postcss.config.js      # PostCSS configuration
│
├── backend/                    # Node.js Backend Application
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── middleware/        # Express middlewares
│   │   ├── routes/            # API routes
│   │   ├── types/             # TypeScript type definitions
│   │   └── index.ts           # Server entry point
│   ├── package.json           # Backend dependencies
│   └── tsconfig.json          # TypeScript config
│
├── shared/                     # Shared Code
│   ├── index.ts               # Shared types and utilities
│   ├── package.json           # Shared package config
│   └── tsconfig.json          # TypeScript config
│
├── scripts/                    # Build and utility scripts
│   └── build.ts               # Production build script
│
├── package.json               # Root workspace config
├── tsconfig.json              # Root TypeScript config
├── vercel.json                # Vercel deployment config
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VontogyPages
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   # Start frontend only
   npm run dev:frontend
   
   # Start backend only
   npm run dev:backend
   
   # Start both (requires npm-run-all)
   npm run dev:all
   ```

## 📜 Available Scripts

### Root Level Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend in development mode |
| `npm run dev:frontend` | Start frontend dev server (Vite) |
| `npm run dev:backend` | Start backend dev server (tsx watch) |
| `npm run dev:all` | Start both frontend and backend |
| `npm run build` | Build both frontend and backend |
| `npm run build:frontend` | Build frontend only |
| `npm run build:backend` | Build backend only |
| `npm run start` | Start production server |
| `npm run check` | Run TypeScript type checking |
| `npm run clean` | Remove all node_modules and dist |

### Frontend Commands (from `/frontend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | TypeScript type checking |

### Backend Commands (from `/backend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run check` | TypeScript type checking |

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS 4** - Styling
- **Shadcn/ui** - UI Components
- **React Query** - Data Fetching
- **Wouter** - Routing
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime
- **Express** - Web Framework
- **TypeScript** - Type Safety

## 🔒 Security Features

- Content Security Policy (CSP)
- CORS Configuration
- X-Frame-Options (Clickjacking Prevention)
- X-Content-Type-Options (MIME Sniffing Prevention)
- Strict-Transport-Security (HSTS)
- Referrer-Policy
- Permissions-Policy

## 📦 Deployment

### Vercel (Frontend - Static Site)

The project is configured for Vercel deployment:

```bash
# Build command
npm run build:frontend

# Output directory
frontend/dist
```

The `vercel.json` file configures:
- Build command and output directory
- URL rewrites for SPA routing
- Security headers

### Node.js Server (Backend - Optional)

If you need the backend server:

```bash
# Build
npm run build:backend

# Start
npm run start
```

## 🔧 Configuration

### Path Aliases

**Frontend** (`frontend/tsconfig.json`):
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/hooks/*": ["./src/hooks/*"],
    "@/pages/*": ["./src/pages/*"],
    "@assets/*": ["./public/images/femipro/*"],
    "@shared/*": ["../shared/*"]
  }
}
```

**Backend** (`backend/tsconfig.json`):
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/routes/*": ["./src/routes/*"],
    "@/middleware/*": ["./src/middleware/*"],
    "@shared/*": ["../shared/*"]
  }
}
```

## 👥 Team Onboarding

1. Clone the repository
2. Run `npm install` at root level
3. Run `npm run dev:frontend` for frontend development
4. Run `npm run dev:backend` for backend development (optional)

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ by Vontogy
