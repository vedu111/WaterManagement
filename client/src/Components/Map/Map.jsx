import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Map.css';
import image1 from '../../assets/Depalpur.png';
import image2 from '../../assets/Hatod.png';
import image3 from '../../assets/Sawer.png';
import image4 from '../../assets/Indore.png';
import image5 from '../../assets/Mhow.png';

const MapComponent = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const navigate = useNavigate();

  const regions = [
    { id: 'Depalpur', path: image1, top: '1%', left: '7%', width: '32.5%', complaints: 50 },
    { id: 'Hatod', path: image2, top: '15.1%', left: '24%', width: '28.5%', complaints: 30 },
    { id: 'Sawer', path: image3, top: '4.4%', left: '31.5%', width: '41.2%', complaints: 80 },
    { id: 'Indore', path: image4, top: '21.4%', left: '37.3%', width: '56.2%', complaints: 20 },
    { id: 'Mhow', path: image5, top: '35.2%', left: '17.9%', width: '54.2%', complaints: 60 }
  ];

  const maxComplaints = Math.max(...regions.map(r => r.complaints));

  const getColor = (complaints) => {
    const intensity = Math.floor((complaints / maxComplaints) * 255);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
  };

  const handleClick = (regionId) => {
    navigate(`/${regionId}`); // use navigate function
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
        </div>
      ))}
    </div>
  );
};

export default MapComponent;


