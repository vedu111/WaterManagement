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
        </div>
    );
};

export default Home;
