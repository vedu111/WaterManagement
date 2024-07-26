// controllers/complaintController.js
const UserComplaint = require('../models/UserComplaint');
const fs = require('fs');
const path = require('path');
const upload = require('../middleware/multer');

exports.submitComplaint = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    const { name, phoneNumber, address, category } = req.body;
    const image = {
      data: req.file ? fs.readFileSync(path.join(__dirname, '../uploads/' + req.file.filename)) : null,
      contentType: req.file ? req.file.mimetype : null
    };

    const newComplaint = new UserComplaint({
      name,
      phoneNumber,
      address,
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
