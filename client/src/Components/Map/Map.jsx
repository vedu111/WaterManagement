import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Map.css';
import image1 from '../../assets/Depalpur.png';
import image2 from '../../assets/Hatod.png';
import image3 from '../../assets/Sawer.png';
import image4 from '../../assets/Indore.png';
import image5 from '../../assets/Mhow.png';

const MapComponent = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [regions, setRegions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints/regions');
        const complaintsData = response.data.reduce((acc, region) => {
          acc[region._id] = region.complaints;
          return acc;
        }, {});
        const regionsInfo = [
          { id: 'Depalpur', path: image1, top: '1%', left: '7%', width: '32.5%', complaints: complaintsData.Depalpur || 0 },
          { id: 'Hatod', path: image2, top: '15.1%', left: '24%', width: '28.5%', complaints: complaintsData.Hatod || 0 },
          { id: 'Sawer', path: image3, top: '4.4%', left: '31.5%', width: '41.2%', complaints: complaintsData.Sawer || 0 },
          { id: 'Indore', path: image4, top: '21.4%', left: '37.3%', width: '56.2%', complaints: complaintsData.Indore || 0 },
          { id: 'Mhow', path: image5, top: '35.2%', left: '17.9%', width: '54.2%', complaints: complaintsData.Mhow || 0 }
        ];
        setRegions(regionsInfo);
      } catch (error) {
        console.error('Error fetching complaints data:', error);
      }
    };

    fetchComplaints();
  }, []);

  const maxComplaints = Math.max(...regions.map(r => r.complaints));

  const getColor = (complaints) => {
    const intensity = Math.floor((complaints / maxComplaints) * 255);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
  };

  const handleClick = (regionId) => {
    navigate(`/${regionId}`);
  };

  return (
    <div className="map-container">
      {regions.map((region) => (
        <div
          key={region.id}
          className={`region-container ${hoveredRegion === region.id ? 'hovered' : ''}`}
          style={{
            top: region.top,
            left: region.left,
            width: region.width,
          }}
          onMouseEnter={() => setHoveredRegion(region.id)}
          onMouseLeave={() => setHoveredRegion(null)}
          onClick={() => handleClick(region.id)}
        >
          <img
            src={region.path}
            alt={region.id}
            className="region-image"
          />
          <div 
            className={`region-overlay ${region.id}`}
            style={{
              backgroundColor: hoveredRegion === region.id ? getColor(region.complaints) : 'transparent'
            }}
          />
          <div className="region-name">
            {region.id}
          </div>
          <div 
            className="region-complaints"
            style={{
              color: getColor(region.complaints)
            }}
          >
            {region.complaints} complaints
          </div>
        </div>
      ))}
    </div>
  );
};

export default MapComponent;