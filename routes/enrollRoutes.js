// const express = require('express');
// const router = express.Router();
// const enrollController = require('../controllers/enrollController');

// router.post('/', enrollController.enroll);

// module.exports = router;

const express = require('express');
const router = express.Router();
const Enroll = require('../models/enroll');
const enrollController = require('../controllers/enrollController')
// Add body-parser middleware to parse the request body
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.post('/', enrollController.enroll)
// Handle enroll POST request
// index.js
// router.post('/', async (req, res) => {
//     const { name, email, language } = req.body;
//     try {
//       const student = new Enroll({ name, email, language });
//       await student.save();
//       res.status(201).json({ message: 'Enrollment successful!' });
//     } catch (err) {
//       console.error(err);
//       res.status(400).json({ message: 'Enrollment failed' });
//     }
//   });
  

module.exports = router;
