const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      }
  
      // Generate avatar using Gravatar
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
  
      // Create a new user instance
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password,
      });
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
  
      // Save the user to the database
      await newUser.save();
  
      // Respond with the new user (excluding password)
      res.json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

// @route   POST api/users/login
// @desc    Login user / Return JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const { email, password } = req.body;
  
    // Find user by email
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          errors.email = 'User not found';
          return res.status(400).json(errors);
        }
  
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // User matched, create payload
            const payload = {
              id: user._id, // Use _id from Mongoose as the user identifier
              name: user.name,
              avatar: user.avatar
            };
  
            // Sign JWT token
            jwt.sign(
              payload,
              keys.secretOrKey, // Use your secret key for signing the token
              { expiresIn: 3600 }, // Token expires in 1 hour
              (err, token) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ error: 'Error signing token' });
                }
                // Return the token
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
      id: req.user._id,  // Use _id from MongoDB (automatically added by Mongoose)
      name: req.user.name,
      email: req.user.email
    });
  });

// @route   GET api/users/:user_id
// @desc    Get user by user Id
// @access  Public
router.get('/:user_id', (req, res) => {
    const errors = {};
  
    // Find user by user_id (MongoDB _id)
    User.findById(req.params.user_id)
      .then(user => {
        if (!user) {
          errors.nouser = 'No user found with that ID';
          return res.status(404).json(errors);
        }
  
        // Respond with the user's data (excluding sensitive info like password)
        res.json({
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      });
});

module.exports = router;