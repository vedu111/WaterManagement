import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './Pages/Home/Home';
import RegionDetails from './Pages/RegionDetails/RegionDetails';
import Signup from './Components/Authentication/SignUp/signup';
import Login from './Components/Authentication/Login/Login';
import ComplaintForm from './Components/ComplaintForm/ComplaintForm';
const App = () => (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<RegionDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complaintForm" element={<ComplaintForm />} />
      </Routes>
    </Router>
  );

export default App;