import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieCarousel from './components/MovieCarousel';
import Navbar from './components/Navbar';
import MovieDetail from './components/MovieDetail';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <div className="bg-gray-800 dark:bg-gray-200 min-h-screen text-white dark:text-gray-800">
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MovieCarousel />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
