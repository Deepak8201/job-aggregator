const express = require('express');
const axios = require('axios');
const mockJobs = require('../data/mockJobs');

const router = express.Router();

const JSEARCH_API_KEY = '676b0c469fmsh89f98d0ff0348cbp1ee452jsna08bbb2579c7';
const JSEARCH_API_HOST = 'jsearch.p.rapidapi.com';

// Map designations to job titles for API search
const designationToJobTitle = {
  'QA': 'QA Engineer',
  'Developer': 'Software Developer',
  'Senior Developer': 'Senior Developer',
  'Junior Developer': 'Junior Developer',
  'Designer': 'UI UX Designer',
  'Analyst': 'Data Analyst',
};

// Get all jobs (Real API + Mock fallback)
router.get('/', async (req, res) => {
  try {
    const { platform, search, page = 1, department, designation } = req.query;
    console.log('Jobs query:', { platform, search, department, designation });

    let allJobs = [];

    // Try to fetch real jobs from JSearch API if designation provided
    if (designation && designationToJobTitle[designation]) {
      try {
        const jobTitle = designationToJobTitle[designation];
        console.log('Fetching real jobs for:', jobTitle);

        const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
          params: {
            query: `${jobTitle} in India`,
            page: 1,
            num_pages: 1,
          },
          headers: {
            'X-RapidAPI-Key': JSEARCH_API_KEY,
            'X-RapidAPI-Host': JSEARCH_API_HOST,
          },
          timeout: 5000,
        });

        if (response.data.data && response.data.data.length > 0) {
          allJobs = response.data.data.map(job => ({
            _id: job.job_id,
            id: job.job_id,
            title: job.job_title,
            company: job.employer_name,
            platform: 'Real Jobs',
            department: designation,
            designation: designation,
            location: `${job.job_city}, ${job.job_country}`,
            salary: job.job_salary_currency ? `${job.job_salary_currency} ${job.job_salary_min || 'N/A'} - ${job.job_salary_max || 'N/A'}` : 'Not specified',
            description: job.job_description?.substring(0, 200) || 'Exciting opportunity',
            requirements: job.job_required_skills ? job.job_required_skills.slice(0, 5) : ['Skills required'],
            postedAt: new Date(job.job_posted_at_datetime_utc),
            url: job.job_apply_link || '#',
          }));

          console.log('Fetched', allJobs.length, 'real jobs');
        }
      } catch (apiError) {
        console.log('JSearch API error, using mock jobs:', apiError.message);
        allJobs = mockJobs;
      }
    } else {
      allJobs = mockJobs;
    }

    let filtered = allJobs;

    if (platform && platform !== 'Real Jobs') {
      filtered = filtered.filter(job => job.platform === platform);
    }

    if (department) {
      filtered = filtered.filter(job => job.department === department);
    }

    if (designation) {
      filtered = filtered.filter(job => job.designation === designation);
    }

    if (search) {
      console.log('Searching for:', search);
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
      );
      console.log('After search filter:', filtered.length, 'jobs');
    }

    // Sort by recent first
    filtered = filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

    const pageSize = 10;
    const startIdx = (page - 1) * pageSize;
    const paginatedJobs = filtered.slice(startIdx, startIdx + pageSize);

    res.json({
      jobs: paginatedJobs,
      total: filtered.length,
      pages: Math.ceil(filtered.length / pageSize),
    });
  } catch (error) {
    console.error('Jobs endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single job
router.get('/:id', (req, res) => {
  const job = mockJobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

module.exports = router;
