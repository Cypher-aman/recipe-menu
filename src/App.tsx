import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import RecipeDetails from './pages/Recipe';
import { Toaster } from 'react-hot-toast';
import Favorites from './pages/Favorite';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Placeholder for Navigation */}
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
