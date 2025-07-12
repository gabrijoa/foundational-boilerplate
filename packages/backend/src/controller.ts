/**
 * @fileoverview Generic controllers for CRUD operations
 * @description This file contains template functions for Create, Read, Update 
 * and Delete operations. These are example endpoints that return mock data.
 * @author Joa Gabri
 * @version 1.0.0
 */

import { Request, Response } from 'express';

/**
 * Creates a new resource
 * @description Example endpoint for creating a new resource
 * @route POST /api/resources
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise that resolves with mock created resource
 * @example
 * // POST /api/resources
 * // Body: { "name": "Example Resource" }
 * // Response: { "id": "mock-id", "name": "Example Resource", "created": true }
 */
export const createResource = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    
    // Mock response for demonstration
    const mockResource = {
      id: `mock-${Date.now()}`,
      name: name || 'Example Resource',
      created: true,
      timestamp: new Date().toISOString()
    };
    
    res.status(201).json(mockResource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource' });
  }
};

/**
 * Retrieves all resources
 * @description Example endpoint to fetch all resources
 * @route GET /api/resources
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise that resolves with array of mock resources
 * @example
 * // GET /api/resources
 * // Response: [{ "id": "mock-1", "name": "Resource 1" }, ...]
 */
export const getAllResources = async (req: Request, res: Response) => {
  try {
    // Mock response for demonstration
    const mockResources = [
      { id: 'mock-1', name: 'Example Resource 1', status: 'active' },
      { id: 'mock-2', name: 'Example Resource 2', status: 'inactive' }
    ];
    
    res.status(200).json(mockResources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};

/**
 * Updates an existing resource
 * @description Example endpoint to update a resource
 * @route PUT /api/resources/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise that resolves with mock updated resource
 * @example
 * // PUT /api/resources/mock-1
 * // Body: { "name": "Updated Resource" }
 * // Response: { "id": "mock-1", "name": "Updated Resource", "updated": true }
 */
export const updateResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Mock response for demonstration
    const mockUpdatedResource = {
      id,
      ...updateData,
      updated: true,
      timestamp: new Date().toISOString()
    };
    
    res.status(200).json(mockUpdatedResource);
  } catch (error) {
    res.status(404).json({ error: 'Resource not found or failed to update' });
  }
};

/**
 * Removes a resource
 * @description Example endpoint to delete a resource
 * @route DELETE /api/resources/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise that resolves with no content
 * @example
 * // DELETE /api/resources/mock-1
 * // Response: 204 No Content
 */
export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Mock deletion - in a real application, you would delete from database
    console.log(`Mock: Deleting resource with id: ${id}`);
    
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Resource not found or failed to delete' });
  }
};