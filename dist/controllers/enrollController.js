const Enroll = require('../models/enroll');

async function enroll(req, res) {
  console.log('Enrolling');
  const { name, email, language } = req.body;
    try {
      const student = new Enroll({ name, email, language });
      await student.save();
      res.status(201).json({ message: 'Enrollment successful!' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Enrollment failed' });
    }
}

module.exports = { enroll };
