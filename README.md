# 🏗️ Foundational Boilerplate - Full Stack Development Kit

> **"Every plan that you build needs a foundation."**

A comprehensive, production-ready boilerplate for building modern full-stack applications with **TypeScript**, **React**, **Node.js**, and **PostgreSQL**. This foundation provides everything you need to jumpstart your next project with best practices, testing, and deployment configurations.

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Technology Stack](#️-technology-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Development](#-development)
- [🐳 Docker Deployment](#-docker-deployment)
- [🧪 Testing](#-testing)
- [📚 Documentation](#-documentation)
- [🚨 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📋 Roadmap](#-roadmap)

## 🎯 Project Overview

This boilerplate provides a complete full-stack development environment with:

- **Frontend**: React 18 with TypeScript, Vite, and Tailwind CSS
- **Backend**: Node.js with Express, TypeScript, and Prisma ORM
- **Database**: PostgreSQL with automated migrations
- **Testing**: Jest for backend integration tests
- **Deployment**: Docker containers with multi-stage builds
- **Development**: Hot reload, ESLint, and development tools

### Key Features

- ✅ **Type Safety** - Full TypeScript coverage across frontend and backend
- ✅ **Modern React** - Latest React 18 features with functional components
- ✅ **RESTful API** - Clean API architecture with proper error handling
- ✅ **Database ORM** - Prisma for type-safe database operations
- ✅ **Testing Ready** - Jest configuration with test databases
- ✅ **Docker Ready** - Production-ready containerization
- ✅ **Development Tools** - ESLint, hot reload, and debugging setup


## 🚀 Quick Start

### Prerequisites

- **Node.js** 20 or higher
- **Docker** and **Docker Compose**
- **PostgreSQL** (for local development)

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/foundational-boilerplate.git
cd foundational-boilerplate

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Create environment files

# Configure your database URLs in .env and .env.test
```

### 3. Database Setup

```bash
# Start database with Docker
docker-compose up 

```

### 4. Start Development Servers

```bash
# Terminal 1: Start backend
npm run dev -w backend

# Terminal 2: Start frontend
npm run dev -w frontend
```

### 5. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with functional components
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **ESLint** - Code linting and formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety for backend code
- **Prisma ORM** - Database toolkit with type safety
- **PostgreSQL** - Relational database
- **Jest** - Testing framework
- **CORS** - Cross-origin resource sharing

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline (planned)
- **Nginx** - Production web server (frontend)

## 📁 Project Structure

```
foundational-boilerplate/
├── packages/
│   ├── backend/                 # Node.js API server
│   │   ├── src/
│   │   │   ├── server.ts        # Express server setup
│   │   │   ├── note.controller.ts # CRUD controllers
│   │   │   ├── note.routes.ts   # API routes
│   │   │   ├── prisma.ts        # Database client
│   │   │   └── __tests__/       # Integration tests
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Database schema
│   │   │   └── migrations/      # Database migrations
│   │   ├── Dockerfile           # Production container
│   │   └── README.md            # Backend documentation
│   │
│   └── frontend/                # React application
│       ├── src/
│       │   ├── App.tsx          # Main app component
│       │   ├── pages/           # Page components
│       │   │   ├── Page.tsx     # Landing page
│       │   │   └── CrudPage.tsx # CRUD interface
│       │   └── services/
│       │       └── api.ts       # API service layer
│       ├── public/              # Static assets
│       ├── Dockerfile           # Production container
│       └── README.md            # Frontend documentation
│
├── docker-compose.yml           # Development environment
├── package.json                 # Root package configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## ⚡ Development

### Available Scripts

```bash
# Development
npm run dev -w backend          # Start backend with hot reload
npm run dev -w frontend         # Start frontend with hot reload

# Building
npm run build -w backend        # Build backend for production
npm run build -w frontend       # Build frontend for production

# Testing
npm run test -w backend         # Run backend tests (needs to create a env.test with postgre URL_DATABASE)
npm run ci -w backend          # Run tests in CI environment

# Database
npm run migrate:dev -w backend  # Run database migrations
npm run generate -w backend     # Generate Prisma client

# Linting
npm run lint -w frontend        # Run ESLint on frontend
```

### Development Workflow

1. **Feature Development**
   - Create feature branch from `main`
   - Develop with hot reload enabled
   - Write tests for new functionality
   - Update documentation

2. **API Development**
   - Define routes in `note.routes.ts`
   - Implement controllers in `note.controller.ts`
   - Add integration tests
   - Update API documentation

3. **Frontend Development**
   - Create/update components in `src/pages/`
   - Add API calls to `services/api.ts`
   - Style with Tailwind CSS
   - Test responsive behavior

## 🐳 Docker Deployment

### Development Environment

```bash
# Start all services
docker-compose up

# Start specific service
docker-compose up postgres
docker-compose up backend
docker-compose up frontend

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```


### Container Details

- **Backend**: Multi-stage Node.js container with optimized production build
- **Frontend**: Nginx container serving static React build
- **Database**: PostgreSQL with persistent volumes
- **Reverse Proxy**: Nginx for routing (production)

## 🧪 Testing

### Backend Testing

```bash
# Run all tests
npm run test -w backend

# Run specific test file
npm run test -w backend -- notes.test.ts

```

### Test Structure

- **Integration Tests**: Full API endpoint testing
- **Database Tests**: Isolated test database
- **Error Handling**: Comprehensive error scenarios
- **Data Validation**: Input validation testing


## 📚 Documentation

### Component Documentation

- **[Backend README](packages/backend/README.md)** - API documentation, database setup, testing
- **[Frontend README](packages/frontend/README.md)** - React components, UI features, styling

### API Documentation

The backend provides RESTful endpoints for notes management:

```
GET    /api/notes      # Get all notes
POST   /api/notes      # Create new note
PUT    /api/notes/:id  # Update note
DELETE /api/notes/:id  # Delete note
```

### Code Documentation

All code includes comprehensive JSDoc comments:
- Function descriptions and parameters
- Return types and error handling
- Usage examples
- Type definitions

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port
   npx kill-port 3001  # Backend
   npx kill-port 5173  # Frontend
   ```

2. **Database Connection**
   ```bash
   # Check PostgreSQL is running
   docker-compose ps postgres
   
   # Reset database
   docker-compose down -v
   docker-compose up -d postgres
   npm run migrate:dev -w backend
   ```

3. **Docker Issues**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild containers
   docker-compose build --no-cache
   ```

4. **Dependencies Issues**
   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   rm -rf packages/*/node_modules
   npm install
   ```

### Environment Variables

Required environment variables:

```bash
# .env
DATABASE_URL="postgresql://username:password@localhost:5432/database"
PORT=3001

# .env.test
DATABASE_URL="postgresql://username:password@localhost:5432/test_database"
```
## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Express.js** - For the robust web framework
- **Prisma** - For the excellent ORM
- **Tailwind CSS** - For the utility-first CSS framework
- **Docker** - For containerization technology

---

**Author:** Joa Gabri  
**Version:** 1.0.0  
**Repository:** [gabrijoa/foundational-boilerplate](https://github.com/gabrijoa/foundational-boilerplate)

> Built with ❤️ for developers who value solid foundations and clean code.

---

### 🌟 Star this repository if it helped you build something amazing! 