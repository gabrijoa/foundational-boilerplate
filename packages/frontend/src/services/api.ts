/**
 * @fileoverview API service layer for notes management.
 * @description This file contains all HTTP client functions for communicating with the
 * backend API, providing a complete service layer for notes CRUD operations.
 * @author Joa Gabri
 * @version 1.0.0
 */

/**
 * Note data structure interface.
 * @description Defines the structure of a Note object as returned by the API.
 * @interface Note
 * @property {string} id - Unique note identifier (CUID).
 * @property {string} title - Note title.
 * @property {string | null} content - Note content, can be null.
 * @property {boolean} completed - Completion status.
 * @property {string} createdAt - Creation timestamp (ISO format).
 * @property {string} updatedAt - Last update timestamp (ISO format).
 */
export interface Note {
  id: string;
  title: string;
  content: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// The base URL for the API, read from Vite's environment variables.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * A centralized helper function to handle all API responses.
 * It ensures the response body is read only once and provides detailed errors.
 * @param {Response} response - The raw Response object from a fetch call.
 * @returns {Promise<any>} A promise that resolves with the JSON body or nothing for 204 responses.
 * @throws {Error} Throws an error with the specific message from the backend if the request fails.
 */
const handleResponse = async (response: Response) => {
  // If the response is not OK (e.g., 404, 500), handle it as an error.
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown API error' }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  // For DELETE requests, a 204 No Content status is a success but has no body.
  if (response.status === 204) {
    return '204';
  }

  // If the response is successful, return the JSON body.
  return response.json();
};

/**
 * Note service object containing all CRUD API operations.
 * @namespace noteService
 */
export const noteService = {
  /**
   * Retrieves all notes from the backend.
   * @returns {Promise<Note[]>} A promise that resolves to an array of notes.
   */
  getAllNotes: (): Promise<Note[]> => {
    return fetch(`${API_BASE_URL}/notes`).then(handleResponse).catch((error) => {
      console.error('Error fetching notes:', error, `${API_BASE_URL}/notes`);
      throw error;
    });
  },

  /**
   * Creates a new note.
   * @param {{ title: string; content?: string }} data - The data for the new note.
   * @returns {Promise<Note>} A promise that resolves to the newly created note.
   */
  createNote: (data: { title: string; content?: string }): Promise<Note> => {
    return fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  /**
   * Updates an existing note.
   * @param {string} id - The ID of the note to update.
   * @param {Partial<Note>} data - An object with the fields to update.
   * @returns {Promise<Note>} A promise that resolves to the updated note.
   */
  updateNote: (id: string, data: Partial<Omit<Note, 'id'>>): Promise<Note> => {
    return fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  /**
   * Deletes a note.
   * @param {string} id - The ID of the note to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  deleteNote: (id: string): Promise<void> => {
    return fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    }).then(handleResponse);
  },
};