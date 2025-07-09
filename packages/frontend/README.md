# Frontend - React Application with TypeScript

## 📝 Description

This is the frontend application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. The application provides a modern user interface for the notes management system, featuring a landing page and a complete CRUD interface for notes operations.

## 🏗️ Architecture

```
src/
├── App.tsx              # Main application component with routing
├── main.tsx             # Application entry point
├── index.css            # Global styles and Tailwind imports
├── pages/
│   ├── Page.tsx         # Landing page component
│   └── CrudPage.tsx     # CRUD operations page
├── services/
│   └── api.ts           # API service layer for backend communication
└── vite-env.d.ts        # Vite environment type definitions
```

## 🚀 Features

### Landing Page
- **Modern Design** - Split-screen layout with custom backgrounds
- **Technology Showcase** - Displays the tech stack used in the project
- **Responsive Layout** - Adapts to different screen sizes
- **Custom Typography** - Professional fonts and styling

### CRUD Operations Page
- **Create Notes** - Add new notes with title and content
- **Read Notes** - Display all notes in a organized list
- **Update Notes** - Edit existing notes inline
- **Delete Notes** - Remove notes with confirmation
- **Mark Complete** - Toggle completion status of notes
- **Real-time Updates** - Immediate UI updates after operations

### Technical Features
- ✅ **TypeScript** for type safety
- ✅ **React Router** for navigation
- ✅ **Tailwind CSS** for styling
- ✅ **Vite** for fast development and building
- ✅ **ESLint** for code quality
- ✅ **Responsive Design** for mobile compatibility
- ✅ **Error Handling** with user feedback
- ✅ **Loading States** for better UX

## 📦 Dependencies

### Production Dependencies

```json
{
  "react": "^18.3.1",              // React library
  "react-dom": "^18.3.1",          // React DOM renderer
  "react-router-dom": "^6.28.0"    // Client-side routing
}
```

### Development Dependencies

```json
{
  "@types/react": "^18.3.12",      // TypeScript types for React
  "@types/react-dom": "^18.3.1",   // TypeScript types for React DOM
  "@vitejs/plugin-react": "^4.3.4", // Vite React plugin
  "autoprefixer": "^10.4.20",      // PostCSS autoprefixer
  "eslint": "^9.15.0",             // JavaScript/TypeScript linter
  "postcss": "^8.5.0",             // CSS post-processor
  "tailwindcss": "^3.5.0",         // Utility-first CSS framework
  "typescript": "~5.6.2",          // TypeScript compiler
  "vite": "^6.0.1"                 // Next generation frontend tooling
}
```

## 🌐 Environment Configuration

### API Configuration
The frontend connects to the backend API running on:
```typescript
API_BASE_URL = 'http://localhost:3001/api'
```

### Development Server
Default development server runs on:
```
http://localhost:5173
```

## 🚀 How to Use

### 1. Install Dependencies

```bash
# In the project root directory
npm install
```

### 2. Start Development Server

```bash
# Start frontend development server
npm run dev -w frontend
```

### 3. Build for Production

```bash
# Build the application
npm run build -w frontend

# Preview production build
npm run preview -w frontend
```

### 4. Linting

```bash
# Run ESLint
npm run lint -w frontend
```

## 🎨 User Interface

### Landing Page (`/`)

The landing page features:
- **Hero Section** with project motto
- **Technology Stack** display
- **Visual Design** with custom backgrounds
- **Project Information** and documentation links

### CRUD Page (`/crud`)

The CRUD interface provides:
- **Form Section** for creating/editing notes
- **Notes List** with all stored notes
- **Action Buttons** for each note (edit, delete, complete)
- **Status Indicators** for completed notes
- **Loading States** during API operations


## 🔌 API Integration

### Service Layer (`api.ts`)

The application uses a centralized service layer for API communication:

```typescript
// Get all notes
const notes = await noteService.getAllNotes();

// Create new note
const newNote = await noteService.createNote(title, content);

// Update existing note
const updatedNote = await noteService.updateNote(id, title, content, completed);

// Delete note
await noteService.deleteNote(id);
```

### Error Handling

All API calls include comprehensive error handling:
- **Network Errors** - Shows user-friendly messages
- **HTTP Errors** - Displays specific error details
- **Validation Errors** - Prevents invalid form submissions
- **Loading States** - Provides visual feedback during operations



## 🔧 Available Scripts

```bash
# Development
npm run dev -w frontend          # Start development server
npm run build -w frontend        # Build for production
npm run preview -w frontend      # Preview production build

# Code Quality
npm run lint -w frontend         # Run ESLint
```

## 📁 File Structure Details

### Components Organization

```
src/
├── App.tsx                      # Main router configuration
├── main.tsx                     # Application entry point
├── index.css                    # Global styles
├── pages/
│   ├── Page.tsx                 # Landing page
│   └── CrudPage.tsx             # CRUD operations
└── services/
    └── api.ts                   # API service layer
```

### Routing Configuration

```typescript
// Available routes:
"/" → Page component (Landing page)
"/crud" → CrudPage component (Notes management)
```

## 🚨 Troubleshooting

### Development Server Issues

1. **Port 5173 already in use**
   ```bash
   # Kill process using the port
   npx kill-port 5173
   # Or use different port
   npm run dev -w frontend -- --port 3000
   ```

2. **API Connection Errors**
   - Verify backend is running on port 3001
   - Check API_BASE_URL in `services/api.ts`
   - Ensure CORS is enabled in backend

### Build Issues

1. **TypeScript Errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

2. **ESLint Errors**
   ```bash
   # Fix auto-fixable issues
   npm run lint -w frontend -- --fix
   ```

### Styling Issues

1. **Tailwind CSS not working**
   - Verify `tailwind.config.js` configuration
   - Check if `@import "tailwindcss"` is in `index.css`
   - Restart development server after config changes


## 📋 Next Steps

- [ ] Add authentication and user management
- [ ] Implement note categories and tags
- [ ] Add search and filtering functionality
- [ ] Include rich text editor for note content
- [ ] Add drag-and-drop for note organization
- [ ] Implement offline functionality with service workers
- [ ] Add dark mode theme toggle
- [ ] Include note sharing capabilities
- [ ] Add bulk operations for notes
- [ ] Implement keyboard shortcuts
---

**Author:** Joa Gabri  
**Version:** 1.0.0  
**License:** ISC 