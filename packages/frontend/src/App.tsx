/**
 * @fileoverview Main application component with routing configuration
 * @description This file defines the root component of the React application,
 * configuring React Router for navigation between pages.
 * @author Joa Gabri
 * @version 1.0.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrudPage from './pages/CrudPage';
import Page from './pages/Page';

/**
 * Main App component with routing configuration
 * @description Root component that sets up the application routing using React Router.
 * Provides navigation between the landing page and CRUD functionality.
 * @component
 * @returns {JSX.Element} Router-wrapped application with route definitions
 * @example
 * // This component is automatically rendered by main.tsx
 * // Routes available:
 * // - "/" : Landing page (Page component)
 * // - "/crud" : Notes management page (CrudPage component)
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<Page />} />
          {/* CRUD operations page route */}
          <Route path="/crud" element={<CrudPage />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;