const UserComplaint = require('../models/UserComplaint');
const fs = require('fs');
const path = require('path');
const upload = require('../middleware/multer');

exports.submitComplaint = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    const { name, phoneNumber, address, subRegion, category } = req.body;
    const image = {
      data: req.file ? fs.readFileSync(path.join(__dirname, '../uploads/' + req.file.filename)) : null,
      contentType: req.file ? req.file.mimetype : null
    };

    const newComplaint = new UserComplaint({
      name,
      phoneNumber,
      address,
      subRegion,
      image,
      category
    });

    try {
      await newComplaint.save();
      res.status(201).json({ msg: 'Complaint submitted successfully' });
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
};

exports.fetchComplaints = async (req, res) => {
  try {
    const complaints = await UserComplaint.find();
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.fetchComplaintsBySubRegion = async (req, res) => {
  const { subRegion } = req.params;
  try {
    const complaints = await UserComplaint.find({ subRegion });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
