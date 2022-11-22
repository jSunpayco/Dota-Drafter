import * as React from 'react';
import Heroes from './pages/Heroes/Heroes.tsx';
import Drafter from './pages/Drafter.tsx';
import Home from './pages/Home.tsx';
// import About from './pages/About.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drafter" element={<Drafter />} />
        <Route path="/heroes" element={<Heroes />} />
        {/* <Route path="/about" element={<About />} /> */}
        
      </Routes>
    </Router>
  );
}
