/**
 * @fileoverview Prisma ORM client configuration and instance (OPTIONAL)
 * @description This file configures and exports a single PrismaClient instance
 * to be reused throughout the application, following the singleton pattern.
 * This file is optional and only needed if you're using Prisma ORM in your project.
 * @author Joa Gabri
 * @version 1.0.0
 */

import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma client instance (OPTIONAL)
 * @description ORM client for PostgreSQL database interaction.
 * This instance is reused throughout the application to avoid multiple connections.
 * Only import and use this if you have models defined in your schema.prisma file.
 * @type {PrismaClient}
 * @example
 * // Usage in controllers (when you have models):
 * import prisma from './prisma';
 * const users = await prisma.user.findMany();
 */
const prisma = new PrismaClient();

export default prisma;