const express = require('express');
const router = express.Router();
const Dentist = require('../../models/Dentist'); // Import the Appointment model

// @route   GET api/dentists
// @desc    Get all dentists
// @access  Public
router.get('/', (req, res) => {
    // Use Mongoose to find all dentists from the database
    Dentist.find()
        .then(dentists => {
        // Return the list of dentists as a JSON response
        res.json(dentists);
        })
        .catch(err => {
        console.error(err);
        // Return an error if there is an issue fetching the dentists
        res.status(500).json({ error: 'Error fetching dentists' });
    });
});

module.exports = router;