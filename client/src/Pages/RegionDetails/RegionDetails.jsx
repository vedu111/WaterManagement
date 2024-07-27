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
  const [regionData, setRegionData] = useState({});
  const [maxComplaints, setMaxComplaints] = useState(0);

  const images = {
    Depalpur: image1,
    Hatod: image2,
    Sawer: image3,
    Indore: image4,
    Mhow: image5
  };

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints/regions');
        const data = response.data.reduce((acc, item) => {
          acc[item._id] = { name: item._id, complaints: item.complaints, image: images[item._id] };
          return acc;
        }, {});
        setRegionData(data);
        setMaxComplaints(Math.max(...Object.values(data).map(r => r.complaints)));
      } catch (error) {
        console.error('Error fetching region data:', error);
      }
    };

    fetchRegionData();
  }, []);

  const region = regionData[id] || { name: 'Unknown', complaints: 0, image: null };

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