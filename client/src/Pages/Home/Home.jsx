import React from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import Map from '../../Components/Map/Map';
import image from '../../assets/home.jpg';

const Home = () => {

  const handleImageClick = () => {
    // Handle the image click event, e.g., download an APK or navigate to a link
    console.log('Image clicked');
    // Add the desired functionality here, such as downloading a file or navigating to another page
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
