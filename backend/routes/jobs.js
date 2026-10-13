const express = require('express');
const mockJobs = require('../data/mockJobs');

const router = express.Router();

// Get all jobs
router.get('/', (req, res) => {
  const { platform, search, page = 1 } = req.query;
  let filtered = mockJobs;

  if (platform) {
    filtered = filtered.filter(job => job.platform === platform);
  }

  if (search) {
    filtered = filtered.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
    );
  }

  const pageSize = 10;
  const startIdx = (page - 1) * pageSize;
  const paginatedJobs = filtered.slice(startIdx, startIdx + pageSize);

  res.json({
    jobs: paginatedJobs,
    total: filtered.length,
    pages: Math.ceil(filtered.length / pageSize),
  });
});

// Get single job
router.get('/:id', (req, res) => {
  const job = mockJobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

module.exports = router;
