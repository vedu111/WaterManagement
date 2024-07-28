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
    const [totalCost, setTotalCost] = useState(0);
    const [featureImportances, setFeatureImportances] = useState([]);

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
            setValues(Object.values(fetchedParameters).slice(1)); // Skip the first value (SubRegion)
        } catch (error) {
            console.error('Error fetching parameters:', error);
        }
    };

    const handleChange = (index, event) => {
        const newValues = [...values];
        newValues[index] = event.target.value;
        setValues(newValues);
    };

    const seekPrediction = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/predict', {
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
        if (values.length) {
            seekPrediction(values);
        }
    }, [values]);

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
                                                    <td className="center">{value}</td>
                                                    <td>
                                                        <textarea
                                                            value={values[index - 1] || ''} // Display the current value in the textarea
                                                            onChange={(e) => handleChange(index - 1, e)}
                                                        />
                                                    </td>
                                                    <td className="price-after center">{featureImportances[index - 1] || 'N/A'}</td>
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
            <h2>-----------</h2>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Table;
