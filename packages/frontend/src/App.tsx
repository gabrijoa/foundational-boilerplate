import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrudPage from './pages/CrudPage';
import Page from './pages/Page';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/crud" element={<CrudPage />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;