import React, { useState } from 'react';
import './Table.css';

let mock_db = [
    {   
        "parameter": "Household infrastructure ",
        "value": 30,
        "feasibility": "moderate"
    },
    {
        "parameter": "Household infrastructure ",
        "value": 40,
        "feasibility": "moderate"
        
    },
    {
        "parameter": "Average Temperature ",
        "value": 25,
        "feasibility": "moderate"
    },
    {
        "parameter": "Average income per capita ",
        "value": 200000,
        "feasibility": "moderate"
    },
    {
        "parameter": "Population density",
        "value": 1200,
        "feasibility": "high"
    },
    {
        "parameter": "Height from sea-level",
        "value": 50,
        "feasibility": "high"
    },
    {
        "parameter": "Flow rate ",
        "value": 150,
        "feasibility": "high"
    },
    {
        "parameter": "Socio-economic factor ",
        "value": 3,
        "feasibility": "high"
    },
    {
        "parameter": "Peer effect percent",
        "value": 15,
        "feasibility": "low"
    },
    {
        "parameter": "Average energy cost ",
        "value": 8,
        "feasibility": "low"
    },
    {
        "parameter": "Total Consumption",
        "value": 5000,
        "feasibility": "low"
    }
];

function historic_data_mock(value){
    let feasibleValue = (value - value * 0.1).toFixed(2);
    return feasibleValue;
}

function SeekPrediction(value){
   value =  (value * 0.3).toFixed(2);
   return value
}

const Table = () => {
    const [values, setValues] = useState(mock_db.map(param => historic_data_mock(param.value)));

    const handleChange = (index, event) => {
        const newValues = [...values];
        newValues[index] = event.target.value;
        setValues(newValues);
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
                                    <th class="center">Current Price</th>
                                    <th class="center">Parameter</th>
                                    <th class="center" >Current Value</th>
                                    <th class="center" >Feasible Reduction</th>
                                    <th class="center">Price After</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mock_db.map((Parameter, index) => {
                                    if (Parameter.feasibility === feasibility) {
                                        return (
                                            <tr key={Parameter.parameter}>
                                                <td className="current-price center">25</td>
                                                <td className="center">{Parameter.parameter}</td>
                                                <td className="center">{Parameter.value}</td>
                                                <td>
                                                    <textarea 
                                                        value={values[index]} 
                                                        onChange={(e) => handleChange(index, e)}
                                                    />
                                                </td>
                                                <td className="price-after center">{SeekPrediction(values[index])}</td>
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
        </div>
    );
};

export default Table;