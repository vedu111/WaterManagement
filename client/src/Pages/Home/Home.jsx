import React from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import Map from '../../Components/Map/Map';
import image from '../../assets/home.jpg';
import mockApk from '../../assets/mock-app.apk'; // Add your APK file here

const Home = () => {
  const handleImageClick = () => {
    const link = document.createElement('a');
    link.href = mockApk; // URL or path to your APK file
    link.download = 'mock-app.apk'; // Filename for the downloaded file
    link.click();
  };

  return (
    <div>
      <Navbar />
      <Map />
      <div
        style={{ width: '50px', position: 'absolute', top: '150px', left: '800px' }}
      >
        <img
          style={{ width: '650px', mixBlendMode: 'multiply' }}
          src={image}
          alt="Click to download APK"
          onClick={handleImageClick} // Attach click handler
        />
      </div>
    </div>
  );
};

export default Home;
