import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './Pages/Home/Home';
import RegionDetails from './Pages/RegionDetails/RegionDetails';

const App = () => (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<RegionDetails />} />
      </Routes>
    </Router>
  );

export default App;