// src/Components/CityPartButtons.jsx
import React from 'react';
import A from '../assets/A.png';
import B from '../assets/B.png';
import C from '../assets/C.png';
import ABC from '../assets/ABC.png';

const CityPartButtons = ({ parts }) => {
    const getButtonColor = (complaints) => {
        let brightness;
        if (complaints <= 10) {
            brightness = 0.3; // Light red
        } else if (complaints <= 20) {
            brightness = 0.6; // Medium red
        } else {
            brightness = 1; // Dark red
        }
        return `rgba(255, 0, 0, ${brightness})`;
    };

    const images = {
        A: A,
        B: B,
        C: C
    };

    // Define positions for A, B, C on the ABC map
    const positions = {
        A: { top: '20%', left: '30%' },
        B: { top: '40%', left: '50%' },
        C: { top: '60%', left: '70%' }
    };

    return (
        <div style={{ position: 'relative', width: '800px', height: '600px', margin: 'auto' }}>
            <img src={ABC} alt="Map of ABC" style={{ width: '100%', height: '100%' }} />
            {parts.map((part, index) => (
                <button
                    key={index}
                    style={{
                        position: 'absolute',
                        top: positions[part.name].top,
                        left: positions[part.name].left,
                        backgroundColor: getButtonColor(part.complaints),
                        color: '#fff',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        src={images[part.name]}
                        alt={part.name}
                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    {part.name}: {part.complaints}
                </button>
            ))}
        </div>
    );
};

export default CityPartButtons;
