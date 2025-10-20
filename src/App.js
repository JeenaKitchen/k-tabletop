import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import KTabletopPage from './components/KTabletopPage';
import ItemsPage from './components/ItemsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/k-tabletop" element={<KTabletopPage />} />
          <Route path="/k-tabletop/:theme" element={<KTabletopPage />} />
          <Route path="/k-tabletop/:theme/:dish" element={<KTabletopPage />} />
          <Route path="/items" element={<ItemsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;