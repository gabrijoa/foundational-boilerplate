/**
 * @fileoverview Application entry point and React DOM rendering
 * @description This file serves as the main entry point for the React application,
 * handling the mounting of the root App component to the DOM.
 * @author Joa Gabri
 * @version 1.0.0
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * Application initialization and DOM mounting
 * @description Creates the React root and renders the App component with StrictMode enabled.
 * StrictMode helps identify potential problems in the application during development.
 * @function
 * @throws {Error} Throws error if 'root' element is not found in the DOM
 * @example
 * // This file is executed automatically when the application starts
 * // Mounts the App component to the #root element in index.html
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
