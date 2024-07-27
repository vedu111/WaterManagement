const express = require('express');
const router = express.Router();
const { submitComplaint, fetchComplaints, fetchComplaintsBySubRegion } = require('../controllers/complaintController');
const auth = require('../middleware/auth');

router.post('/submit', auth, submitComplaint);

router.get('/fetchComplaints', fetchComplaints);

router.get('/fetchComplaints/:subRegion', auth, fetchComplaintsBySubRegion);

module.exports = router;
