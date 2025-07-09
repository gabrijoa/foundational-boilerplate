/**
 * @fileoverview Prisma ORM client configuration and instance
 * @description This file configures and exports a single PrismaClient instance
 * to be reused throughout the application, following the singleton pattern.
 * @author Joa Gabri
 * @version 1.0.0
 */

import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma client instance
 * @description ORM client for PostgreSQL database interaction.
 * This instance is reused throughout the application to avoid multiple connections.
 * @type {PrismaClient}
 * @example
 * // Usage in controllers:
 * import prisma from './prisma';
 * const notes = await prisma.note.findMany();
 */
const prisma = new PrismaClient();

export default prisma;