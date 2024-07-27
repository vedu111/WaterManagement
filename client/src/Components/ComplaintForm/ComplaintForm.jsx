import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    subRegion: '',
    category: '',
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
        },
      });
      console.log('Complaint submitted successfully:', response.data);
      // Reset form or show success message
    } catch (error) {
      console.error('Error submitting complaint:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      console.error('Error response headers:', error.response?.headers);
      // Show error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
      <input type="tel" name="phoneNumber" onChange={handleChange} placeholder="Phone Number" required />
      <input type="text" name="address" onChange={handleChange} placeholder="Address" required />
      <select name="subRegion" onChange={handleChange} required>
  <option value="Depalpur">Depalpur</option>
  <option value="Hatod">Hatod</option>
  <option value="Sawer">Sawer</option>
  <option value="Indore">Indore</option>
  <option value="Mhow">Mhow</option>
</select>

<select name="category" onChange={handleChange} required>
  <option value="leakage">Leakage</option>
  <option value="shortage">Shortage</option>
  <option value="theft">Theft</option>
</select>
      <input type="file" name="photo" onChange={handleFileChange} accept="image/*" />
      <button type="submit">Submit Complaint</button>
    </form>
  );
};

export default ComplaintForm;