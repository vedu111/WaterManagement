import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/NavBar/Navbar';
import Table from '../../Components/Table/Table';
import ComplainPreviewButton from '../../Components/ComplaintPreview/ComplaintPreview';

const RegionDetails = () => {
  const { id } = useParams();

  // Fetch or use the data based on the id
  const regionData = {
    Depalpur: { name: 'Depalpur', complaints: 50 },
    Hatod: { name: 'Hatod', complaints: 30 },
    Sawer: { name: 'Sawer', complaints: 80 },
    Indore: { name: 'Indore', complaints: 20 },
    Mhow: { name: 'Mhow', complaints: 60 }
  };

  const region = regionData[id] || { name: 'Unknown', complaints: 0 };

  return (
    <div>
       <Navbar />
       <ComplainPreviewButton />
      <h1>{region.name}</h1>
      <p>Complaints: {region.complaints}</p>
      <Table />
    </div>
  );
};

export default RegionDetails;
