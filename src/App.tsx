import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SportDetail from './pages/SportDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Legends from './pages/Legends';
import { sportsData } from './data/sports';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />
        
        {/* Création d'un nouveau sport */}
        <Route path="/sports/new" element={<SportDetail isNew={true} />} />
        
        {/* Détails d'un sport */}
        <Route path="/sports/:id" element={<SportDetail />} />
        
        {/* Page de connexion */}
        <Route path="/login" element={<Login />} />
        
        {/* Page d'inscription */}
        <Route path="/register" element={<Register />} />
        <Route path="/legends" element={<Legends />} />
      </Routes>
    </div>
  );
}

export default App;
