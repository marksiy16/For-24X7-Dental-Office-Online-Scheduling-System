const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const dentists = require('./routes/api/dentists');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

const cors = require('cors');

app.use(cors());

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/dentists', dentists);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));