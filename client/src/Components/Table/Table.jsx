import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css';

function historic_data_mock(value) {
    let feasibleValue = (value - value * 0.1).toFixed(2);
    return feasibleValue;
}

const Table = ({ location }) => {
    const [parameters, setParameters] = useState({});
    const [values, setValues] = useState([]);
    const [priceAfter, setPriceAfter] = useState('0.00');
    const weights = [0.35257367021117375, 0.1388041054932766, 0.1082300815133856, 0.104557210677632, 0.08192149027823058, 0.07290422646688384, 0.0367651272761632, 0.03269451875151552, 0.023244497264111673, 0.022528263914997102, 0.0194739630516802, 0.006302845100949923];

    useEffect(() => {
        if (location) {
            fetchParameters();
        }
    }, [location]);

    const fetchParameters = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/parameters/${location}`);
            const fetchedParameters = response.data;
            setParameters(fetchedParameters);
            const initialValues = Object.values(fetchedParameters).slice(1);
            setValues(initialValues);
            setPriceAfter(calculatePriceAfter(initialValues));
        } catch (error) {
            console.error('Error fetching parameters:', error);
        }
    };

    const handleChange = (index, event) => {
        const newValues = [...values];
        newValues[index] = event.target.value;
        setValues(newValues);
        setPriceAfter(calculatePriceAfter(newValues));
    };

    const calculatePriceAfter = (currentValues) => {
        const total = currentValues.reduce((acc, value, index) => {
            const historicValue = Number(historic_data_mock(Number(value)));
            return acc + weights[index] * historicValue;
        }, 0);

        // Normalize the price to be between 15 and 21
        const minPrice = 15;
        const maxPrice = 21;
        const normalizedPrice = ((total / 10 - minPrice) / (maxPrice - minPrice)) * (maxPrice - minPrice) + minPrice;

        // Ensure the price is within the range
        const clampedPrice = Math.max(minPrice, Math.min(maxPrice, normalizedPrice));

        return clampedPrice.toFixed(2);
    };

    const handleSubmit = async () => {
        try {
            const parametersToSubmit = {
                SubRegion: location,
                ...Object.keys(parameters).reduce((acc, key, index) => {
                    if (key !== 'SubRegion') {
                        acc[key] = values[index - 1]; // Skip the first value (SubRegion)
                    }
                    return acc;
                }, {})
            };

            const response = await axios.post('http://localhost:5000/parameters/storeParameters', { parameters: parametersToSubmit });
            if (response.status === 200) {
                alert('Parameters stored successfully');
            }
        } catch (error) {
            console.error('Error storing parameters:', error);
        }
    };

    if (!location) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            {['high', 'moderate', 'low'].map(feasibility => (
                <div key={feasibility} className="feasibility-section">
                    <h2 className={`feasibility-title ${feasibility}`}>{feasibility} Feasibility</h2>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th className="center">Current Price</th>
                                    <th className="center">Parameter</th>
                                    <th className="center">Current Value</th>
                                    <th className="center">Feasible Reduction</th>
                                    <th className="center">Price After</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(parameters).map(([key, value], index) => {
                                    if (key !== 'SubRegion') {
                                        const feasibilityValue = value >= 50 ? 'high' : value >= 20 ? 'moderate' : 'low';
                                        if (feasibilityValue === feasibility) {
                                            return (
                                                <tr key={key}>
                                                    <td className="current-price center">21</td>
                                                    <td className="center">{key}</td>
                                                    <td className="center">{historic_data_mock(value)}</td>
                                                    <td>
                                                        <textarea
                                                            value={values[index - 1] || ''}
                                                            onChange={(e) => handleChange(index - 1, e)}
                                                        />
                                                    </td>
                                                    <td className="price-after center">
                                                        {priceAfter}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    }
                                    return null;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Table;
