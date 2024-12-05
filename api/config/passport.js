const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('users');
const keys = require('../config/keys');

// Create options for JWT strategy
const opts = {};

// Extract JWT from the Authorization header as a Bearer token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// Set the secret key to verify the JWT's signature
opts.secretOrKey = keys.secretOrKey;

// Export the passport configuration
module.exports = passport => {
  // Use JwtStrategy for authenticating with JWT
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

    // Try to find the user by ID from the JWT payload
    User.findById(jwt_payload.id)
      .then(user => {
        if(user) {
          // If the user is found, authentication succeeds
          return done(null, user);
        }
        // If no user is found, authentication fails
        return done(null, false);
      })
      .catch(err => {
        // If there's an error during the database query, log it
        console.log(err);
        return done(err, false); // Pass the error to `done`
      });
  }));
};