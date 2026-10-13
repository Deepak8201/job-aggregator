const express = require('express');
const auth = require('../middleware/auth');
const db = require('../db/memory');

const router = express.Router();

// Apply to job
router.post('/', auth, async (req, res) => {
  try {
    const { jobId, jobTitle, company, platform } = req.body;

    // Check if user has completed profile
    const user = await db.getUserById(req.userId);
    if (!user.phone || !user.phone.trim()) {
      return res.status(400).json({ error: 'Please add phone number in profile' });
    }
    if (!user.resume) {
      return res.status(400).json({ error: 'Please upload resume in profile' });
    }

    const application = await db.createApplication({
      userId: req.userId,
      jobId,
      jobTitle,
      company,
      platform,
    });
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's applications
router.get('/', auth, async (req, res) => {
  try {
    const applications = await db.getApplicationsByUserId(req.userId);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
