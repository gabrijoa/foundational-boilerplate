/**
 * @fileoverview Controllers for notes CRUD operations
 * @description This file contains all functions that handle Create, Read, Update 
 * and Delete operations for the Note model using Prisma ORM.
 * @author Joa Gabri
 * @version 1.0.0
 */

// packages/backend/src/note.controller.ts
import { Request, Response } from 'express';
import prisma from './prisma';

/**
 * Creates a new note in the database
 * @description Endpoint to create a new note with title and optional content
 * @route POST /api/notes
 * @param {Request} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.title - Note title (required)
 * @param {string} [req.body.content] - Note content (optional)
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise that resolves with created note or error
 * @throws {Error} 500 - Internal server error when creating note
 * @example
 * // POST /api/notes
 * // Body: { "title": "My Note", "content": "Note content" }
 * // Response: { "id": "abc123", "title": "My Note", "content": "Note content", ... }
 */
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const newNote = await prisma.note.create({
      data: { title, content },
    });
    res.status(201).json(newNote); // 201: Created
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note',
      errorDetails: error,
     });
  }
};

/**
 * Retrieves all notes from the database
 * @description Endpoint to fetch all notes registered in the system
 * @route GET /api/notes
 * @param {Request} req - Express request object (no parameters used)
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise that resolves with array of notes or error
 * @throws {Error} 500 - Internal server error when fetching notes
 * @example
 * // GET /api/notes
 * // Response: [{ "id": "abc123", "title": "Note 1", ... }, { "id": "def456", "title": "Note 2", ... }]
 */
export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await prisma.note.findMany();
    res.status(200).json(notes); // 200: OK
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

/**
 * Updates an existing note in the database
 * @description Endpoint to update title, content or completion status of a note
 * @route PUT /api/notes/:id
 * @param {Request} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Unique ID of the note to be updated
 * @param {Object} req.body - Request body with fields to be updated
 * @param {string} [req.body.title] - New note title (optional)
 * @param {string} [req.body.content] - New note content (optional)
 * @param {boolean} [req.body.completed] - Note completion status (optional)
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise that resolves with updated note or error
 * @throws {Error} 404 - Note not found or update failed
 * @example
 * // PUT /api/notes/abc123
 * // Body: { "completed": true, "title": "Updated Title" }
 * // Response: { "id": "abc123", "title": "Updated Title", "completed": true, ... }
 */
export const updateNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content, completed } = req.body;
        
        // Updates only the fields provided in the request body
        const updatedNote = await prisma.note.update({
            where: { id },
            data: { title, content, completed },
        });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(404).json({ error: 'Note not found or failed to update' });
    }
};

/**
 * Removes a note from the database
 * @description Endpoint to permanently delete a note by its ID
 * @route DELETE /api/notes/:id
 * @param {Request} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Unique ID of the note to be deleted
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise that resolves with no content or error
 * @throws {Error} 404 - Note not found or deletion failed
 * @example
 * // DELETE /api/notes/abc123
 * // Response: 204 No Content (no response body)
 */
export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        // Removes the note from database by ID
        await prisma.note.delete({
            where: { id },
        });
        res.status(204).send(); // 204: No Content - Successful operation with no return
    } catch (error) {
        res.status(404).json({ error: 'Note not found or failed to delete' });
    }
};