const express = require('express');
const router = express.Router();
const { submitComplaint, fetchComplaints, fetchComplaintsBySubRegion } = require('../controllers/complaintController');

router.post('/submit', submitComplaint);
router.get('/fetchComplaints', fetchComplaints);
router.get('/fetchComplaints/:subRegion', fetchComplaintsBySubRegion);

module.exports = router;