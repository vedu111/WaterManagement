// routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const { submitComplaint } = require('../controllers/complaintController');
const auth = require('../middleware/auth');

// @route   POST api/complaints/submit
// @desc    Submit a new complaint
// @access  Private (Requires authentication)
router.post('/submit', submitComplaint);

module.exports = router;
