/**
 * @fileoverview Generic API service layer template
 * @description This file contains example HTTP client functions for communicating with the
 * backend API, providing a template service layer for CRUD operations.
 * @author Joa Gabri
 * @version 1.0.0
 */

/**
 * Generic resource data structure interface.
 * @description Example interface structure for API resources.
 * Customize this interface according to your application needs.
 * @interface Resource
 * @property {string} id - Unique resource identifier.
 * @property {string} name - Resource name.
 * @property {string} status - Resource status.
 * @property {string} created - Creation timestamp (ISO format).
 */
export interface Resource {
  id: string;
  name: string;
  status: string;
  created: string;
}

// The base URL for the API, read from Vite's environment variables.
// Update this to match your backend API endpoints
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
 * Generic API service object containing CRUD operations template.
 * @namespace apiService
 * @description Example service layer for API communication.
 * Customize these functions according to your application needs.
 */
export const apiService = {
  /**
   * Retrieves all resources from the backend.
   * @returns {Promise<Resource[]>} A promise that resolves to an array of resources.
   * @example
   * const resources = await apiService.getAllResources();
   */
  getAllResources: (): Promise<Resource[]> => {
    return fetch(`${API_BASE_URL}/resources`).then(handleResponse).catch((error) => {
      console.error('Error fetching resources:', error, `${API_BASE_URL}/resources`);
      throw error;
    });
  },

  /**
   * Creates a new resource.
   * @param {{ name: string; status?: string }} data - The data for the new resource.
   * @returns {Promise<Resource>} A promise that resolves to the newly created resource.
   * @example
   * const newResource = await apiService.createResource({ name: 'New Resource' });
   */
  createResource: (data: { name: string; status?: string }): Promise<Resource> => {
    return fetch(`${API_BASE_URL}/resources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  /**
   * Updates an existing resource.
   * @param {string} id - The ID of the resource to update.
   * @param {Partial<Resource>} data - An object with the fields to update.
   * @returns {Promise<Resource>} A promise that resolves to the updated resource.
   * @example
   * const updated = await apiService.updateResource('123', { status: 'active' });
   */
  updateResource: (id: string, data: Partial<Omit<Resource, 'id'>>): Promise<Resource> => {
    return fetch(`${API_BASE_URL}/resources/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  /**
   * Deletes a resource.
   * @param {string} id - The ID of the resource to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   * @example
   * await apiService.deleteResource('123');
   */
  deleteResource: (id: string): Promise<void> => {
    return fetch(`${API_BASE_URL}/resources/${id}`, {
      method: 'DELETE',
    }).then(handleResponse);
  },
};