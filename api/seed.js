const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI; // Your MongoDB URI
const Dentist = require('./models/Dentist'); // Assuming you have a User model

// Sample seed data
const dentists = [
    {
        "name": "Dr. Jordan Smith",
        "avatar": "//randomuser.me/api/portraits/men/1.jpg",
        "dob": "1985-05-15",
        "gender": "M",
        "address": "123 One Street, Pasig City, Philippines",
        "contactnumber": "+639991238888",
        "specialization": "General Dentistry",
        "schedules": "Monday, Saturday, Sunday"
      },
      {
        "name": "Dr. Emma Thompson",
        "avatar": "//randomuser.me/api/portraits/women/2.jpg",
        "dob": "1990-12-01",
        "gender": "F",
        "address": "456 Oak Avenue, Makati City, Philippines",
        "contactnumber": "+639991238999",
        "specialization": "Pediatric Dentistry",
        "schedules": "Tuesday, Thursday, Friday"
      },
      {
        "name": "Dr. Mia Johnson",
        "avatar": "https://randomuser.me/api/portraits/women/3.jpg",
        "dob": "1978-03-25",
        "gender": "F",
        "address": "789 Pine Road, Quezon City, Philippines",
        "contactnumber": "+639991239000",
        "specialization": "Cosmetic Dentistry",
        "schedules": "Monday, Wednesday, Friday"
      },
      {
        "name": "Dr. Lucas Brown",
        "avatar": "//randomuser.me/api/portraits/men/4.jpg",
        "dob": "1982-07-10",
        "gender": "M",
        "address": "321 Elm Street, Taguig City, Philippines",
        "contactnumber": "+639991239111",
        "specialization": "Orthodontics",
        "schedules": "Tuesday, Thursday, Saturday"
      },
      {
        "name": "Dr. Olivia Davis",
        "avatar": "//randomuser.me/api/portraits/women/4.jpg",
        "dob": "1995-11-19",
        "gender": "F",
        "address": "123 Maple Lane, Mandaluyong City, Philippines",
        "contactnumber": "+639991239222",
        "specialization": "Periodontics",
        "schedules": "Monday, Wednesday, Friday"
      },
      {
        "name": "Dr. Noah Williams",
        "avatar": "//randomuser.me/api/portraits/men/7.jpg",
        "dob": "1988-02-14",
        "gender": "M",
        "address": "234 Cedar Street, Makati City, Philippines",
        "contactnumber": "+639991239333",
        "specialization": "Oral Surgery",
        "schedules": "Monday, Tuesday, Thursday"
      }
];

// Function to seed data
const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

    // Clear the collections before inserting new data (optional)
    await Dentist.deleteMany();
    
    // Insert users
    await Dentist.create(dentists);
    console.log('Dentists seeded successfully.');

    // Close the database connection
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

// Call the seed function
seedData();