const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateAppointmentInput = require('../../validation/appointment');

const Profile = require('../../models/Profile'); // Import the Profile model

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
  
    // Find the profile by user ID (the authenticated user)
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar', 'email'])  // Optionally populate the user fields like 'name' and 'avatar'
      .populate('appointments.dentist')
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
  
        // Return the profile if found
        res.json(profile);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      });
  });

// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    // Get fields from the request body
    const profileFields = {};
    profileFields.user = req.user.id;  // The user ID from JWT token (passport)
  
    // Additional fields
    if (req.body.dob) profileFields.dob = req.body.dob;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.address) profileFields.address = req.body.address;
    if (req.body.contactnumber) profileFields.contactnumber = req.body.contactnumber;
  
    // Create a new one
    new Profile(profileFields)
      .save()
      .then(newProfile => res.json(newProfile));
    });  

// @route   PUT api/profile
// @desc    Update user profile
// @access  Private
router.put('/:profileId', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get fields from the request body
  const profileFields = {};
  profileFields.user = req.user.id;  // The user ID from JWT token (passport)

  // Additional fields
  if (req.body.dob) profileFields.dob = req.body.dob;
  if (req.body.gender) profileFields.gender = req.body.gender;
  if (req.body.address) profileFields.address = req.body.address;
  if (req.body.contactnumber) profileFields.contactnumber = req.body.contactnumber;

  Profile.findOneAndUpdate(
    { _id: req.params.profileId },
    { $set: profileFields },
    { new: true }
  )
  .then(updatedProfile => res.json(updatedProfile))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  });
}); 
  
// @route DELETE api/profile
// @desc Delete user and profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      // Step 1: Delete the user's profile
      const profile = await Profile.findOne({ user: req.user.id });
  
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      await Profile.findOneAndDelete({ user: req.user.id });  // Delete the profile
  
      // Step 2: Delete the user
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await User.findByIdAndDelete(req.user.id);  // Delete the user
  
      res.json({ success: true });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

// @route POST api/profile/appointment
// @desc Add appointment to profile
// @access Private
router.post('/appointment', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateAppointmentInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const { title, from, to, dentist } = req.body;
  
    // Create a new appointment
    const newAppointment = {
      user: req.user.id,  // The logged-in user's ID
      dentist: dentist,   // The dentist ID from the request
      title: title,       // Title of the appointment
      from: from,         // Start time of the appointment
      to: to              // End time of the appointment
    };
  
    // Find the profile of the user and add the new appointment
    Profile.findOne({ user: req.user.id })
        .then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Add the new appointment to the profile
        profile.appointments.unshift(newAppointment);

        // Save the updated profile
        profile.save()
            .then(updatedProfile => res.json(updatedProfile))
            .catch(err => res.status(500).json({ error: 'Error saving profile' }));
        })
        .catch(err => res.status(500).json({ error: 'Error finding profile' }));
  });

// @route PUT api/profile/appointment/:appointmentId
// @desc Update an existing appointment in the profile
// @access Private
router.put('/appointment/:appointmentId', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateAppointmentInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const { title, from, to, dentist } = req.body;
  
    // Find the profile of the user
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json({ error: 'Profile not found' });
        }
  
        // Find the index of the appointment to update
        const appointmentIndex = profile.appointments.findIndex(
          appointment => appointment._id.toString() === req.params.appointmentId
        );
  
        if (appointmentIndex === -1) {
          return res.status(404).json({ error: 'Appointment not found' });
        }
  
        // Update the appointment fields (only update if provided)
        profile.appointments[appointmentIndex] = {
          ...profile.appointments[appointmentIndex],  // Keep the old values if no new value is provided
          title: title || profile.appointments[appointmentIndex].title,
          from: from || profile.appointments[appointmentIndex].from,
          to: to || profile.appointments[appointmentIndex].to,
          dentist: dentist || profile.appointments[appointmentIndex].dentist,
        };
  
        // Save the updated profile
        profile.save()
          .then(updatedProfile => res.json(updatedProfile))
          .catch(err => res.status(500).json({ error: 'Error saving profile' }));
      })
      .catch(err => res.status(500).json({ error: 'Error finding profile' }));
  });

// @route DELETE api/profile/appointment/:appointment_id
// @desc Delete appointment from profile
// @access Private
router.delete('/appointment/:appointment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const appointmentId = req.params.appointment_id;
  
    // Find the profile and remove the appointment by ID
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json({ error: 'Profile not found' });
        }
  
        // Find the index of the appointment to remove
        const removeIndex = profile.appointments
          .map(item => item._id.toString())
          .indexOf(appointmentId);
  
        // If appointment exists, remove it
        if (removeIndex === -1) {
          return res.status(404).json({ error: 'Appointment not found' });
        }
  
        // Splice out the appointment from the profile's appointments array
        profile.appointments.splice(removeIndex, 1);
  
        // Save the updated profile
        profile.save()
          .then(updatedProfile => {
            // Populate the reference fields in the updated profile (for example, populating 'dentist' reference)
            return Profile.findById(updatedProfile._id).populate('appointments.dentist');
          })
          .then(populatedProfile => {
            res.json(populatedProfile);
          })
          .catch(err => res.status(500).json({ error: 'Error saving profile after removing appointment' }));
      })
      .catch(err => res.status(500).json({ error: 'Error finding profile' }));
  });

  module.exports = router;