/**
 * @fileoverview Main backend API server using Express.js
 * @description This file configures and initializes the Express server with middlewares,
 * routes and configurations needed for the notes API.
 * @author Joa Gabri
 * @version 1.0.0
 */

// packages/backend/src/server.ts
import express from 'express';
import noteRoutes from './note.routes'; // <-- IMPORT THE ROUTES
import cors from 'cors'; // <-- Install cors to allow frontend requests

/**
 * Main Express application instance
 * @type {express.Application}
 */
const app = express();

/**
 * Server port, obtained from PORT environment variable or 3000 as default
 * @type {number}
 */
const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(cors()); // <-- ENABLE CORS - Allows requests from different origins
app.use(express.json()); // <-- Middleware for Express to understand JSON in request body
app.use('/api', noteRoutes); // <-- CONNECT THE ROUTES - All note routes will be prefixed with '/api'

/**
 * API health check route
 * @description Simple endpoint to verify if the API is working
 * @route GET /
 * @returns {Object} JSON object with status message
 * @example
 * // GET /
 * // Response: { "message": "API is running!" }
 */
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running!' });
});

/**
 * Starts the Express server on the specified port
 * @description Configures the server to listen for HTTP requests
 * @param {number} PORT - Port where the server will listen
 * @returns {void}
 */
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

export default app;