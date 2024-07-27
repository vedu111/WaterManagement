const express = require('express');
const router = express.Router();
const Parameter = require('../models/Parameter');

// Fetch parameters by subRegion
router.get('/:subRegion', async (req, res) => {
    try {
        const parameters = await Parameter.findOne({ SubRegion: req.params.subRegion });
        if (!parameters) {
            return res.status(404).json({ message: 'Parameters not found' });
        }
        res.json(parameters);
    } catch (error) {
        console.error('Error fetching parameters:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Store or update parameters
router.post('/storeParameters', async (req, res) => {
    try {
        const { parameters } = req.body;
        if (!parameters || !parameters.SubRegion) {
            console.error('Invalid parameters data:', req.body);
            return res.status(400).json({ message: 'Invalid parameters data' });
        }

        console.log('Parameters:', parameters);

        const updatedParameters = await Parameter.findOneAndUpdate(
            { SubRegion: parameters.SubRegion },
            parameters,
            { new: true, upsert: true }
        );
        res.status(200).json(updatedParameters);
    } catch (error) {
        console.error('Error storing parameters:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
