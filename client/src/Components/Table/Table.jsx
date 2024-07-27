import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css';

const mock_db = [
    // High Feasibility
    { parameter: 'Average income per capita (Rs.)/Year', value: 30000, feasibility: 'high' },
    { parameter: 'Average energy cost (Rs. /kWHr)', value: 10, feasibility: 'high' },
    { parameter: 'Population density (count/sq. Km)', value: 1500, feasibility: 'high' },
    { parameter: 'Height from sea-level (meters)', value: 100, feasibility: 'high' },

    // Moderate Feasibility
    { parameter: 'Average Temperature (Degree centigrade)', value: 26, feasibility: 'moderate' },
    { parameter: 'Total Consumption', value: 500, feasibility: 'moderate' },
    { parameter: 'Flow rate (Kl per Day)', value: 250, feasibility: 'moderate' },
    { parameter: 'Household infrastructure (Percentage of Building)', value: 70, feasibility: 'moderate' },

    // Low Feasibility
    { parameter: 'Household infrastructure (Percentage of Bunglow)', value: 30, feasibility: 'low' },
    { parameter: 'Socio-economic factor (Rating 1-5 worst to best)', value: 3, feasibility: 'low' },
    { parameter: 'Peer effect percent', value: 50, feasibility: 'low' },
    { parameter: 'Const', value: 0, feasibility: 'low' },
];

const Table = () => {
    const [values, setValues] = useState(mock_db.map(param => param.value));
    const [totalCost, setTotalCost] = useState(0);
    const [featureImportances, setFeatureImportances] = useState(Array(mock_db.length).fill(0));

    const handleChange = (index, event) => {
        const newValues = [...values];
        newValues[index] = event.target.value;
        setValues(newValues);
    };

    const seekPrediction = async (values) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', {
                data: values.map(Number)
            });
            if (response.data) {
                setFeatureImportances(response.data.feature_importances);
                setTotalCost(response.data.total_cost);
            }
        } catch (error) {
            console.error('Error fetching prediction:', error);
        }
    };

    useEffect(() => {
        seekPrediction(values);
    }, [values]);

    const handleSubmit = async () => {
        try {
            const parameters = mock_db.map((param, index) => ({
                parameter: param.parameter,
                value: values[index],
                feasibility: param.feasibility,
            }));

            const response = await axios.post('http://127.0.0.1:5000/storeParameters', { parameters });
            if (response.status === 200) {
                alert('Parameters stored successfully');
            }
        } catch (error) {
            console.error('Error storing parameters:', error);
        }
    };

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
                                {mock_db.map((Parameter, index) => {
                                    if (Parameter.feasibility === feasibility) {
                                        return (
                                            <tr key={Parameter.parameter}>
                                                <td className="current-price center">21</td>
                                                <td className="center">{Parameter.parameter}</td>
                                                <td className="center">{Parameter.value}</td>
                                                <td>
                                                    <textarea
                                                        value={values[index]}
                                                        onChange={(e) => handleChange(index, e)}
                                                    />
                                                </td>
                                                <td className="price-after center">{featureImportances[index] || 'N/A'}</td>
                                            </tr>
                                        );
                                    }
                                    return null;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
            <h2>Total Cost: {totalCost || 'N/A'}</h2>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Table;

