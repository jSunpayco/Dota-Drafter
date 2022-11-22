const React = require('react')
const Heroes = require('./pages/Heroes/Heroes.tsx')
const Drafter = require('./pages/Drafter.tsx')
const Home = require('./pages/Home.tsx')
// const About = require('./pages/About.tsx')
const { Router, Routes, Route } = require('react-router-dom')

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
