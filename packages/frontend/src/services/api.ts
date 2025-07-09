/**
 * @fileoverview API service layer for notes management
 * @description This file contains all HTTP client functions for communicating with the backend API,
 * providing a complete service layer for notes CRUD operations.
 * @author Joa Gabri
 * @version 1.0.0
 */

/**
 * Note data structure interface
 * @description Defines the structure of a Note object as returned by the API
 * @interface Note
 * @property {string} id - Unique note identifier (CUID)
 * @property {string} title - Note title
 * @property {string} content - Note content
 * @property {boolean} completed - Completion status
 * @property {string} createdAt - Creation timestamp (ISO format)
 * @property {string} updatedAt - Last update timestamp (ISO format)
 */
interface Note {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Base URL for backend API endpoints
 * @description Points to the backend server running on port 3001
 * @constant {string}
 */
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Note service object containing all API operations
 * @description Provides methods for all CRUD operations on notes
 * @namespace noteService
 */
export const noteService = {
  /**
   * Retrieves all notes from the backend
   * @description Fetches all notes stored in the database via GET request
   * @async
   * @function getAllNotes
   * @returns {Promise<Note[]>} Promise that resolves to array of notes
   * @throws {Error} Network error or HTTP error response
   * @example
   * try {
   *   const notes = await noteService.getAllNotes();
   *   console.log('Retrieved notes:', notes);
   * } catch (error) {
   *   console.error('Failed to fetch notes:', error);
   * }
   */
  async getAllNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes`);
    if (!response.ok) {
      // Tries to extract response body to show error details
      let errorDetails = '';
      try {
        const errorBody = await response.json();
        errorDetails = JSON.stringify(errorBody);
      } catch {
        errorDetails = await response.text();
      }
      // Shows status and error body in console
      console.error(`Error fetching notes: ${response.status} - ${errorDetails}`);
      throw new Error(`Error fetching notes: ${response.status} - ${errorDetails}`);
    }
    return response.json();
  },

  /**
   * Creates a new note in the backend
   * @description Sends POST request to create a new note with provided data
   * @async
   * @function createNote
   * @param {string} title - Note title (required)
   * @param {string} content - Note content (required)
   * @returns {Promise<Note>} Promise that resolves to the created note
   * @throws {Error} Network error or HTTP error response
   * @example
   * try {
   *   const newNote = await noteService.createNote('My Title', 'My content');
   *   console.log('Created note:', newNote);
   * } catch (error) {
   *   console.error('Failed to create note:', error);
   * }
   */
  async createNote(title: string, content: string): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
      throw new Error('Error creating note');
    }
    return response.json();
  },

  /**
   * Updates an existing note in the backend
   * @description Sends PUT request to update note with new data
   * @async
   * @function updateNote
   * @param {string} id - Unique note identifier
   * @param {string} title - Updated note title
   * @param {string} content - Updated note content
   * @param {boolean} completed - Updated completion status
   * @returns {Promise<Note>} Promise that resolves to the updated note
   * @throws {Error} Network error or HTTP error response
   * @example
   * try {
   *   const updatedNote = await noteService.updateNote('abc123', 'New Title', 'New content', true);
   *   console.log('Updated note:', updatedNote);
   * } catch (error) {
   *   console.error('Failed to update note:', error);
   * }
   */
  async updateNote(id: string, title: string, content: string, completed: boolean): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, completed }),
    });
    if (!response.ok) {
      throw new Error('Error updating note');
    }
    return response.json();
  },

  /**
   * Deletes a note from the backend
   * @description Sends DELETE request to permanently remove a note
   * @async
   * @function deleteNote
   * @param {string} id - Unique note identifier to delete
   * @returns {Promise<void>} Promise that resolves when deletion is complete
   * @throws {Error} Network error or HTTP error response
   * @example
   * try {
   *   await noteService.deleteNote('abc123');
   *   console.log('Note deleted successfully');
   * } catch (error) {
   *   console.error('Failed to delete note:', error);
   * }
   */
  async deleteNote(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting note');
    }
  },
};

export type { Note }; 