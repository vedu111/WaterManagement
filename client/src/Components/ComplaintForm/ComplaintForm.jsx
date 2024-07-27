// import React, { useState } from 'react';
// import axios from 'axios';

// const ComplaintForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phoneNumber: '',
//     address: '',
//     subRegion: '',
//     category: '',
//     category_2: '',
//     date: ''
//   });
//   const [file, setFile] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const submitFormData = new FormData();

//     Object.keys(formData).forEach(key => {
//       submitFormData.append(key, formData[key]);
//     });

//     if (file) {
//       submitFormData.append('photo', file);
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/complaints/submit', submitFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Complaint submitted successfully:', response.data);
//       alert("Complaint sent successfully!");
//       window.location.href = '/';
//     } catch (error) {
//       console.error('Error submitting complaint:', error);
//       console.error('Error response data:', error.response?.data);
//       console.error('Error response status:', error.response?.status);
//       console.error('Error response headers:', error.response?.headers);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Name"
//         required
//       />
//       <input
//         type="tel"
//         name="phoneNumber"
//         value={formData.phoneNumber}
//         onChange={handleChange}
//         placeholder="Phone Number"
//         required
//       />
//       <input
//         type="text"
//         name="address"
//         value={formData.address}
//         onChange={handleChange}
//         placeholder="Address"
//         required
//       />
//       <select
//         name="subRegion"
//         value={formData.subRegion}
//         onChange={handleChange}
//         required
//       >
//         <option value="">Select Sub-Region</option>
//         <option value="Depalpur">Depalpur</option>
//         <option value="Hatod">Hatod</option>
//         <option value="Sawer">Sawer</option>
//         <option value="Indore">Indore</option>
//         <option value="Mhow">Mhow</option>
//       </select>
//       <select
//         name="category"
//         value={formData.category}
//         onChange={handleChange}
//         required
//       >
//         <option value="">Select Category</option>
//         <option value="leakage">Leakage</option>
//         <option value="shortage">Shortage</option>
//         <option value="theft">Theft</option>
//       </select>
//       <input
//         type="text"
//         name="category_2"
//         value={formData.category_2}
//         onChange={handleChange}
//         placeholder="Additional Category"
//       />
//       <input
//         type="date"
//         name="date"
//         value={formData.date}
//         onChange={handleChange}
//         placeholder="Date"
//       />
//       <input
//         type="file"
//         name="photo"
//         onChange={handleFileChange}
//         accept="image/*"
//       />
//       <button type="submit">Submit Complaint</button>
//     </form>
//   );
// };

// export default ComplaintForm;

import React, { useState } from 'react';
import axios from 'axios';
import './ComplaintForm.css'; 
// import image from '../../assets/complaint.jpg';

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
      alert("Complaint sent successfully!");
      window.location.href = '/';
    } catch (error) {
      console.error('Error submitting complaint:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      console.error('Error response headers:', error.response?.headers);
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
