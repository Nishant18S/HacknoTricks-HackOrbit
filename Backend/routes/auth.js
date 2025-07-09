const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('./models/User');

const router = express.Router();

// Serve pages
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/signup.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/login.html'));
});

// Signup logic
router.post('/signup', async (req, res) => {
  const { name, email, phone, dob, address, password, termsAccepted } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, dob, address, password: hashedPassword, termsAccepted });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error('❌ Signup Error:', err);
    res.status(500).send('Signup failed');
  }
});

// Login logic
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.send('❌ User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.redirect('/chat');
    } else {
      res.send('❌ Incorrect password');
    }
  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).send('Login failed');
  }
});

module.exports = router;
