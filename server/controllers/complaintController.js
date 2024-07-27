const UserComplaint = require('../models/UserComplaint');
const fs = require('fs');
const path = require('path');
const upload = require('../middleware/multer');

exports.submitComplaint = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).send(err.message);
    }

    const { name, phoneNumber, address, subRegion, category, category_2, date } = req.body;

    let image = {};
    if (req.file) {
      image = {
        data: fs.readFileSync(path.join(__dirname, '../uploads/' + req.file.filename)),
        contentType: req.file.mimetype
      };
    }

    const newComplaint = new UserComplaint({
      name,
      phoneNumber,
      address,
      subRegion,
      category,
      category_2,
      date: date ? new Date(date) : undefined,
      image
    });

    try {
      await newComplaint.save();
      res.status(201).json({ msg: 'Complaint submitted successfully' });
    } catch (err) {
      console.error('Save error:', err);
      res.status(500).send('Server error');
    }
  });
};

exports.fetchComplaints = async (req, res) => {
  try {
    const complaints = await UserComplaint.find();
    res.status(200).json(complaints);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).send('Server error');
  }
};

exports.fetchComplaintsBySubRegion = async (req, res) => {
  const { subRegion } = req.params;
  try {
    console.log('SubRegion received:', subRegion);

    const complaints = await UserComplaint.find({ subRegion: subRegion.trim() }); // Ensure no leading/trailing spaces
    res.status(200).json(complaints);
  } catch (err) {
    console.error('Fetch by subregion error:', err);
    res.status(500).send('Server error');
  }
};

exports.countComplaints = async (req, res) => {
  try {
    const complaintsData = await UserComplaint.aggregate([
      { $group: { _id: "$subRegion", complaints: { $sum: 1 } } }
    ]);
    res.json(complaintsData);
  } catch (error) {
    console.error('Error in countComplaints:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

