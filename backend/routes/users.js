const express = require('express');
const auth = require('../middleware/auth');
const db = require('../db/memory');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    console.log('Fetching profile for userId:', req.userId);
    const user = await db.getUserById(req.userId);
    console.log('Found user:', user ? 'yes' : 'no');
    if (!user) return res.status(404).json({ error: 'User not found - please login again' });
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    console.log('Updating profile for userId:', req.userId);
    console.log('Update data:', req.body);

    const { name, phone, resume, designation, linkedinUrl, naukriUrl, indeedUrl } = req.body;
    const user = await db.updateUser(req.userId, {
      name,
      phone,
      resume,
      designation,
      linkedinUrl,
      naukriUrl,
      indeedUrl
    });

    console.log('Updated user:', user);
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
