import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/NavBar/Navbar';
import Table from '../../Components/Table/Table';
import ComplaintPreview from '../../Components/ComplaintPreview/ComplaintPreview';
import axios from 'axios';
import './RegionDetails.css';

import image1 from '../../assets/Depalpur.png';
import image2 from '../../assets/Hatod.png';
import image3 from '../../assets/Sawer.png';
import image4 from '../../assets/Indore.png';
import image5 from '../../assets/Mhow.png';

const RegionDetails = () => {
  const { id } = useParams();
  const [showPreview, setShowPreview] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const regionData = {
    Depalpur: { name: 'Depalpur', complaints: 50, image: image1 },
    Hatod: { name: 'Hatod', complaints: 30, image: image2 },
    Sawer: { name: 'Sawer', complaints: 80, image: image3 },
    Indore: { name: 'Indore', complaints: 20, image: image4 },
    Mhow: { name: 'Mhow', complaints: 60, image: image5 }
  };

  const region = regionData[id] || { name: 'Unknown', complaints: 0, image: null };

  // Calculate color based on complaints
  const maxComplaints = Math.max(...Object.values(regionData).map(r => r.complaints));
  const getColor = (complaints) => {
    const intensity = Math.floor((complaints / maxComplaints) * 255);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
  };

  const regionNameColor = getColor(region.complaints);

  const handleShowPreview = async () => {
    if (!showPreview) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/complaints/fetchComplaints/${region.name}`);
        if (response.data && Array.isArray(response.data)) {
          setComplaints(response.data);
        } else {
          console.error('Unexpected API response:', response);
          setComplaints([]);
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    }
    setShowPreview(!showPreview);
  };

  return (
    <div className="region-details">
      <Navbar />
      <div className="map-container">
        <div className="complaint-preview-container">
          <div className="arrow-overlay"></div>
          <button
            className="toggle-preview-button"
            onClick={handleShowPreview}
          >
            {showPreview ? 'Hide Complaints' : 'View Complaints'}
          </button>
          {showPreview && (
            <ComplaintPreview complaints={complaints} loading={loading} />
          )}
        </div>
        {region.image && <img src={region.image} alt={region.name} className="region-image" />}
        <div
          className="region-name-overlay"
          style={{ color: regionNameColor }}
        >
          {region.name}
        </div>
        <div className="region-complaints-overlay" style={{ color: regionNameColor }}>
          Complaints: {region.complaints}
        </div>
      </div>
      <h1>{region.name}</h1>
      <p>Complaints: {region.complaints}</p>
      <Table />
    </div>
  );
};

export default RegionDetails;
