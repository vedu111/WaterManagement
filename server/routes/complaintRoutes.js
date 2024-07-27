const express = require('express');
const router = express.Router();
const { submitComplaint, fetchComplaints, fetchComplaintsBySubRegion, countComplaints } = require('../controllers/complaintController');

router.post('/submit', submitComplaint);
router.get('/fetchComplaints', fetchComplaints);
router.get('/fetchComplaints/:subRegion', fetchComplaintsBySubRegion);
router.get('/regions', countComplaints);
  

module.exports = router;
