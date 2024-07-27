import React, { useState } from 'react';
import axios from 'axios';
import './ComplaintForm.css'; 

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    subRegion: '',
    category: '',
    category_2: '',
    date: ''
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in first!");
      window.location.href = '/';
      return;
    }
  
    const submitFormData = new FormData();
  
    Object.keys(formData).forEach(key => {
      submitFormData.append(key, formData[key]);
    });
  
    if (file) {
      submitFormData.append('photo', file);
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/complaints/submit', submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log('Complaint submitted successfully:', response.data);
      alert("Complaint sent successfully!");
      window.location.href = '/';
    } catch (error) {
      console.error('Error submitting complaint:', error);
  
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        alert(`Error submitting complaint: ${error.response.data.message || 'Unknown error'}`);
      } else {
        alert('Error submitting complaint: Network error');
      }
    }
  };
  

  return (
    <div className="container">
      <div className="image-container">
        {/* Image is set as background in CSS */}
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Submit Your Complaint</h2>
        
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Name" 
          required 
        />
        
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input 
          type="tel" 
          id="phoneNumber" 
          name="phoneNumber" 
          value={formData.phoneNumber} 
          onChange={handleChange} 
          placeholder="Phone Number" 
          required 
        />
        
        <label htmlFor="address">Address:</label>
        <input 
          type="text" 
          id="address" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          placeholder="Address" 
          required 
        />
        
        <label htmlFor="subRegion">Sub Region:</label>
        <select 
          id="subRegion" 
          name="subRegion" 
          value={formData.subRegion} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Sub Region</option>
          <option value="Depalpur">Depalpur</option>
          <option value="Hatod">Hatod</option>
          <option value="Sawer">Sawer</option>
          <option value="Indore">Indore</option>
          <option value="Mhow">Mhow</option>
        </select>
        
        <label htmlFor="category">Category:</label>
        <select 
          id="category" 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Category</option>
          <option value="leakage">Leakage</option>
          <option value="shortage">Shortage</option>
          <option value="theft">Theft</option>
        </select>

        <label htmlFor="category_2">Additional Category:</label>
        <input 
          type="text" 
          id="category_2" 
          name="category_2" 
          value={formData.category_2} 
          onChange={handleChange} 
          placeholder="Additional Category" 
        />

        <label htmlFor="date">Date:</label>
        <input 
          type="date" 
          id="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
        />
        
        <label htmlFor="photo">Upload Photo:</label>
        <input 
          type="file" 
          id="photo" 
          name="photo" 
          onChange={handleFileChange} 
          accept="image/*" 
        />
        
        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
};

export default ComplaintForm;
