import * as React from 'react';
import './style.css';
import Heroes from './pages/Heroes';
import Drafter from './pages/Drafter';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drafter" element={<Drafter />} />
        <Route path="/heroes" element={<Heroes />} />
        {/* <Route path='/contact' element={<Contact/>} />
          <Route path='/blogs' element={<Blogs/>} />
          <Route path='/sign-up' element={<SignUp/>} /> */}
      </Routes>
    </Router>
  );
}
