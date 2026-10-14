import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState('');
  const [userDesignation, setUserDesignation] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, [search, platform, userDesignation]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${window.API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserDesignation(response.data.designation || '');
      setUserProfile(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const fetchJobs = async () => {
    try {
      console.log('Fetching jobs from:', window.API_URL);
      const response = await axios.get(`${window.API_URL}/api/jobs`, {
        params: { search, platform, designation: userDesignation }
      });
      console.log('Jobs response:', response.data);
      // Sort by recent first (newest job first)
      const sortedJobs = (response.data.jobs || []).sort((a, b) =>
        new Date(b.postedAt) - new Date(a.postedAt)
      );
      setJobs(sortedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${window.API_URL}/api/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (job) => {
    try {
      // First check profile
      let profileData = null;
      try {
        const profileRes = await axios.get(`${window.API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        profileData = profileRes.data;
      } catch (err) {
        // If API fails, try cached profile
        const cached = localStorage.getItem('userProfile');
        if (cached) {
          profileData = JSON.parse(cached);
        } else {
          throw new Error('Cannot fetch profile');
        }
      }

      if (!profileData.phone || !profileData.phone.trim()) {
        setMessage('❌ Please add phone number in profile');
        setTimeout(() => setMessage(''), 5000);
        return;
      }
      if (!profileData.resume) {
        setMessage('❌ Please upload resume in profile');
        setTimeout(() => setMessage(''), 5000);
        return;
      }

      // Check if user has platform URL
      if (job.platform === 'LinkedIn' && !profileData.linkedinUrl) {
        setMessage('❌ Please add LinkedIn profile URL in profile settings');
        setTimeout(() => setMessage(''), 5000);
        return;
      } else if (job.platform === 'Naukri' && !profileData.naukriUrl) {
        setMessage('❌ Please add Naukri profile URL in profile settings');
        setTimeout(() => setMessage(''), 5000);
        return;
      } else if (job.platform === 'Indeed' && !profileData.indeedUrl) {
        setMessage('❌ Please add Indeed profile URL in profile settings');
        setTimeout(() => setMessage(''), 5000);
        return;
      }

      // Save application in our system
      await axios.post(`${window.API_URL}/api/applications`, {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        platform: job.platform
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('✅ Opening ' + job.platform + ' job page...\n(Make sure you are logged in!)');
      setTimeout(() => setMessage(''), 4000);

      // Open actual job URL in new tab
      if (job.url) {
        const newTab = window.open(job.url, '_blank');
        if (!newTab) {
          setMessage('❌ Popup blocked! Please allow popups and try again.');
          setTimeout(() => setMessage(''), 5000);
        }
      }

      fetchApplications();
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Application failed';
      setMessage('❌ ' + errorMsg);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const isApplied = (jobId) => applications.some(app => app.jobId === jobId);

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1>🔍 Find & Apply to Jobs</h1>

      {message && <div className={message.includes('✅') ? 'success' : 'error'}>{message}</div>}

      {userDesignation && <div style={{ background: '#e8f5e9', padding: '10px', marginBottom: '15px', borderRadius: '5px', color: '#2e7d32' }}>
        ✅ Showing <strong>{userDesignation}</strong> jobs only
      </div>}

      <div className="filters">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option value="">All Platforms</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Naukri">Naukri</option>
          <option value="Indeed">Indeed</option>
        </select>
      </div>

      <div className="dashboard-grid">
        <div className="jobs-section">
          <h2>🔥 Recently Posted Jobs for {userDesignation || 'You'} ({jobs.length})</h2>
          <p style={{ color: '#666', fontSize: '12px', marginBottom: '15px' }}>Jobs sorted by most recent first</p>
          <div className="jobs-list">
            {jobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <span className="platform-badge">{job.platform}</span>
                </div>
                <p className="company">{job.company}</p>
                <p className="location">📍 {job.location}</p>
                <p className="salary">💰 {job.salary}</p>
                <p className="description">{job.description}</p>
                <div className="requirements">
                  {job.requirements.map(req => (
                    <span key={req} className="tag">{req}</span>
                  ))}
                </div>
                <button
                  onClick={() => handleApply(job)}
                  disabled={isApplied(job.id)}
                  className={isApplied(job.id) ? 'applied' : ''}
                >
                  {isApplied(job.id) ? '✅ Applied' : '📨 Apply Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section" style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>👤 Your Profile</h3>
          {userProfile && (
            <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
              <p><strong>Name:</strong> {userProfile.name}</p>
              <p><strong>Designation:</strong> {userProfile.designation || 'Not set'}</p>
              <p><strong>Phone:</strong> {userProfile.phone || 'Not set'}</p>
              <p><strong>Resume:</strong> {userProfile.resume || 'Not uploaded'}</p>
              {userProfile.linkedinUrl && <p><strong>LinkedIn:</strong> <a href={userProfile.linkedinUrl} target="_blank" rel="noopener noreferrer">View Profile</a></p>}
              {userProfile.naukriUrl && <p><strong>Naukri:</strong> <a href={userProfile.naukriUrl} target="_blank" rel="noopener noreferrer">View Profile</a></p>}
              {userProfile.indeedUrl && <p><strong>Indeed:</strong> <a href={userProfile.indeedUrl} target="_blank" rel="noopener noreferrer">View Profile</a></p>}
            </div>
          )}
        </div>

        <div className="applications-section">
          <h2>My Applications ({applications.length})</h2>
          <div className="applications-list">
            {applications.length === 0 ? (
              <p>No applications yet</p>
            ) : (
              applications.map(app => (
                <div key={app._id} className="app-item">
                  <h4>{app.jobTitle}</h4>
                  <p>{app.company}</p>
                  <p className="platform-badge">{app.platform}</p>
                  <p className="date">{new Date(app.appliedAt).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
