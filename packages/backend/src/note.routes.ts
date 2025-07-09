/**
 * @fileoverview API routes definition for notes operations
 * @description This file configures all HTTP routes for the Note resource,
 * connecting endpoints to their corresponding controller functions.
 * @author Joa Gabri
 * @version 1.0.0
 */

// packages/backend/src/note.routes.ts
import { Router } from 'express';
import { createNote, getAllNotes, updateNote, deleteNote } from './note.controller';

/**
 * Express Router for managing note-related routes
 * @description Configures all RESTful routes for notes CRUD operations
 * @type {Router}
 */
const router = Router();

/**
 * @route POST /notes
 * @description Creates a new note
 * @access Public
 * @controller createNote
 */
router.post('/notes', createNote);

/**
 * @route GET /notes
 * @description Retrieves all notes
 * @access Public
 * @controller getAllNotes
 */
router.get('/notes', getAllNotes);

/**
 * @route PUT /notes/:id
 * @description Updates a specific note
 * @access Public
 * @param {string} id - Unique note ID
 * @controller updateNote
 */
router.put('/notes/:id', updateNote);

/**
 * @route DELETE /notes/:id
 * @description Removes a specific note
 * @access Public
 * @param {string} id - Unique note ID
 * @controller deleteNote
 */
router.delete('/notes/:id', deleteNote);

export default router;