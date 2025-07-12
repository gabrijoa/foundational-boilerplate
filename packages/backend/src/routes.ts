/**
 * @fileoverview API routes definition for generic CRUD operations
 * @description This file configures all HTTP routes for generic resource operations,
 * connecting endpoints to their corresponding controller functions.
 * @author Joa Gabri
 * @version 1.0.0
 */

import { Router } from 'express';
import { createResource, getAllResources, updateResource, deleteResource } from './controller';

/**
 * Express Router for managing generic resource routes
 * @description Configures all RESTful routes for generic CRUD operations
 * @type {Router}
 */
const router = Router();

/**
 * @route POST /resources
 * @description Creates a new resource
 * @access Public
 * @controller createResource
 */
router.post('/resources', createResource);

/**
 * @route GET /resources
 * @description Retrieves all resources
 * @access Public
 * @controller getAllResources
 */
router.get('/resources', getAllResources);

/**
 * @route PUT /resources/:id
 * @description Updates a specific resource
 * @access Public
 * @param {string} id - Unique resource ID
 * @controller updateResource
 */
router.put('/resources/:id', updateResource);

/**
 * @route DELETE /resources/:id
 * @description Removes a specific resource
 * @access Public
 * @param {string} id - Unique resource ID
 * @controller deleteResource
 */
router.delete('/resources/:id', deleteResource);

export default router;