<<<<<<< HEAD

import React from 'react';
import Map from '../Components/Map';

const Home = () => {
    
    return (
        <div>
            <h1>City XYZ Water Supply Complaints</h1>
           <Map />
=======
// src/Pages/Home.jsx
import React from 'react';
import CityPartButtons from '../Components/CityPartButtons';

const Home = () => {
    const cityParts = [
        { name: 'A', complaints: 25 },
        { name: 'B', complaints: 30 },
        { name: 'C', complaints: 15 }
    ];

    return (
        <div>
            <h1>City XYZ Water Supply Complaints</h1>
            <CityPartButtons parts={cityParts} />
>>>>>>> origin/main
        </div>
    );
};

export default Home;
