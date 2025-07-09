/**
 * @fileoverview Jest initial configuration for tests
 * @description This file is executed before all tests to prepare the test environment,
 * including test database configuration.
 * @author Joa Gabri
 * @version 1.0.0
 */

// packages/backend/jest.setup.ts
import { execSync } from 'child_process';
import path from 'path';

/**
 * Test database connection URL
 * @description PostgreSQL connection string configured specifically for tests.
 * This URL points to a database separate from the development environment.
 * @type {string}
 * @constant
 */
const DATABASE_URL = "postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=public";

/**
 * Absolute path to the Prisma CLI binary
 * @description Resolves the path to the Prisma executable in node_modules
 * to avoid issues with npx in CI/CD environments.
 * @type {string}
 * @constant
 */
const prismaBinary = path.resolve(__dirname, '../../node_modules/.bin/prisma');

/**
 * Jest hook executed before all tests
 * @description Prepares the test database by running Prisma migrations.
 * This hook runs once at the beginning of the test suite.
 * @function beforeAll
 * @throws {Error} Fails if unable to execute database migrations
 * @example
 * // This hook is executed automatically by Jest
 * // No need to call it manually
 */
beforeAll(() => {
  console.log('INFO: Preparing test database...');

  try {
    // Executes migration, injecting DATABASE_URL into the command environment.
    // We use direct path to Prisma binary to avoid issues with npx.
    execSync(`"${prismaBinary}" migrate deploy`, {
      env: {
        ...process.env, // Preserves existing environment variables
        DATABASE_URL: DATABASE_URL, // Overrides URL for test database
      },
      stdio: 'inherit', // Shows command output in console
    });
    console.log('INFO: Test database ready.');
  } catch (error) {
    console.error('ERROR: Failed to execute prisma migrate deploy.', error);
    throw error; // Re-throws error to stop tests
  }
});