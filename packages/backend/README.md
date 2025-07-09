# Backend - REST API with Node.js and TypeScript

## 📝 Description

This is the application's backend, built as a **REST API** using **Node.js**, **Express.js**, **TypeScript** and **Prisma ORM**. The system provides complete CRUD endpoints for note management, with automated testing support and Docker containerization.

## 🏗️ Architecture

```
src/
├── server.ts          # Main Express server
├── note.controller.ts # CRUD controllers for notes
├── note.routes.ts     # API routes definition
├── prisma.ts          # Prisma client (singleton)
└── __tests__/         # Integration tests
    ├── notes.test.ts  # Notes endpoints tests
    └── server.test.ts # Main server tests
```

## 🚀 Features

### Notes API (Complete CRUD)

- **POST /api/notes** - Create new note
- **GET /api/notes** - List all notes
- **PUT /api/notes/:id** - Update specific note
- **DELETE /api/notes/:id** - Delete specific note

### Technical Features

- ✅ **TypeScript** for static typing
- ✅ **Prisma ORM** for database management
- ✅ **PostgreSQL** as main database
- ✅ **Jest** for automated testing
- ✅ **Docker** for containerization
- ✅ **CORS** enabled for cross-origin requests
- ✅ **JSON Middleware** for automatic parsing

## 📦 Dependencies

### Production Dependencies

```json
{
  "@prisma/client": "^6.11.0",  // ORM client for PostgreSQL
  "cors": "^2.8.5",              // CORS middleware
  "express": "^5.1.0"            // Web framework
}
```

### Development Dependencies

```json
{
  "@types/express": "^5.0.3",    // TypeScript types for Express
  "@types/jest": "^30.0.0",      // TypeScript types for Jest
  "@types/supertest": "^6.0.3",  // TypeScript types for Supertest
  "dotenv-cli": "^8.0.0",        // CLI for environment variables
  "jest": "^30.0.3",             // Testing framework
  "prisma": "^6.11.0",           // Prisma CLI
  "supertest": "^7.1.1",         // HTTP testing
  "ts-jest": "^29.4.0",          // Jest preset for TypeScript
  "ts-node-dev": "^2.0.0"        // Hot reload for development
}
```

## 🌐 Environment Variables

### Development (`.env`)
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
PORT=3000
```

### Tests (`.env.test`)
```bash
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=public"
```

## 🚀 How to Use

### 1. Install Dependencies

```bash
# In the project root directory
npm install
```

### 2. Database Configuration

```bash
# Run migrations
npm run migrate:dev -w backend

# Generate Prisma client
npm run generate -w backend
```

### 3. Run in Development

```bash
# Start server with hot reload
npm run dev -w backend
```

### 4. Run Tests

```bash
# Tests with environment variables
npm run test -w backend

# Tests in CI (without .env)
npm run ci -w backend
```

### 5. Build for Production

```bash
# Compile TypeScript
npm run build -w backend

# Run compiled application
node packages/backend/dist/server.js
```

## 📝 API Usage Examples

### Create New Note

```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Note",
    "content": "Note content here"
  }'
```

**Response:**
```json
{
  "id": "clx1y2z3a0001b8c9d0e1f2g3",
  "title": "My New Note",
  "content": "Note content here",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### List All Notes

```bash
curl http://localhost:3000/api/notes
```

**Response:**
```json
[
  {
    "id": "clx1y2z3a0001b8c9d0e1f2g3",
    "title": "My New Note",
    "content": "Note content here",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Update Note

```bash
curl -X PUT http://localhost:3000/api/notes/clx1y2z3a0001b8c9d0e1f2g3 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true,
    "title": "Updated Note"
  }'
```

### Delete Note

```bash
curl -X DELETE http://localhost:3000/api/notes/clx1y2z3a0001b8c9d0e1f2g3
```

## 🐳 Docker

### Multi-stage Dockerfile

The project uses a **multi-stage Dockerfile** to optimize the build:

1. **Builder Stage:** Installs dependencies and compiles code
2. **Runner Stage:** Copies only necessary files for production

### Run with Docker

```bash
# Build image
docker build -t backend-app -f packages/backend/Dockerfile .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://username:password@host:5432/database" \
  backend-app
```

## 🧪 Tests

### Test Structure

- **`jest.setup.ts`**: Global test configuration
- **`notes.test.ts`**: CRUD endpoints integration tests
- **`server.test.ts`**: Main server tests

### Testing Strategy

1. **beforeEach**: Cleans data between tests
2. **afterAll**: Disconnects from database after all tests
3. **Isolated database**: Uses specific DATABASE_URL for tests

### Run Tests

```bash
# With environment configuration
npm run test -w backend

# In CI environment (without .env)
npm run ci -w backend
```

## 🗄️ Data Model

### Prisma Schema (Note)

```prisma
model Note {
  id        String   @id @default(cuid())
  title     String
  content   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  completed Boolean  @default(false)
}
```

### Fields

- **`id`**: Unique identifier (CUID)
- **`title`**: Note title (required)
- **`content`**: Note content (optional)
- **`createdAt`**: Creation date (automatic)
- **`updatedAt`**: Update date (automatic)
- **`completed`**: Completion status (default: false)

## 🔧 Available Scripts

```bash
# Development
npm run dev -w backend           # Server with hot reload
npm run build -w backend         # Compile TypeScript

# Database
npm run generate -w backend      # Generate Prisma client
npm run migrate:dev -w backend   # Run migrations (dev)
npm run migrate:deploy -w backend # Run migrations (prod)

# Tests
npm run test -w backend          # Tests with .env
npm run ci -w backend           # Tests in CI
```

## 🚨 Troubleshooting

### Database Connection Error

1. Check if PostgreSQL is running
2. Verify `DATABASE_URL` in `.env`
3. Run migrations: `npm run migrate:dev -w backend`

### Test Errors

1. Check if test database is configured
2. Verify `DATABASE_URL` in `.env.test`
3. Run: `npm run ci -w backend`

### Docker Errors

1. Check if all environment variables are configured
2. Verify if `entrypoint.sh` has execution permissions
3. Run: `chmod +x packages/backend/entrypoint.sh`

## 📋 Next Steps

- [ ] Implement JWT authentication
- [ ] Add pagination to listings
- [ ] Implement filters and search
- [ ] Add structured logging
- [ ] Implement rate limiting
- [ ] Add OpenAPI/Swagger documentation

---

**Author:** Joa Gabri  
**Version:** 1.0.0  
**License:** ISC 