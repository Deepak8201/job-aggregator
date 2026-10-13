import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState(null);
  const [resumeFileName, setResumeFileName] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [naukriUrl, setNaukriUrl] = useState('');
  const [indeedUrl, setIndeedUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, message: '', type: 'info' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${window.API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setName(response.data.name);
      setPhone(response.data.phone || '');
      setResume(response.data.resume);
      setLinkedinUrl(response.data.linkedinUrl || '');
      setNaukriUrl(response.data.naukriUrl || '');
      setIndeedUrl(response.data.indeedUrl || '');

      // Save to localStorage as backup
      localStorage.setItem('userProfile', JSON.stringify({
        name: response.data.name,
        phone: response.data.phone,
        resume: response.data.resume,
        linkedinUrl: response.data.linkedinUrl,
        naukriUrl: response.data.naukriUrl,
        indeedUrl: response.data.indeedUrl,
      }));
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Load from localStorage if API fails
      const cached = localStorage.getItem('userProfile');
      if (cached) {
        const data = JSON.parse(cached);
        setName(data.name || '');
        setPhone(data.phone || '');
        setResume(data.resume || '');
        setLinkedinUrl(data.linkedinUrl || '');
        setNaukriUrl(data.naukriUrl || '');
        setIndeedUrl(data.indeedUrl || '');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!phone.trim()) {
        setModal({ isOpen: true, message: 'Please enter phone number', type: 'error' });
        return;
      }

      const resumeToSend = resumeFileName || resume || 'Resume uploaded';

      console.log('Sending profile update:', {
        name,
        phone,
        resume: resumeToSend,
        linkedinUrl,
        naukriUrl,
        indeedUrl
      });

      const response = await axios.put(`${window.API_URL}/api/users/profile`, {
        name,
        phone,
        resume: resumeToSend,
        linkedinUrl,
        naukriUrl,
        indeedUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Profile update response:', response.data);

      setModal({
        isOpen: true,
        message: '✨ Profile updated successfully!\nRedirecting to jobs...',
        type: 'success',
        redirect: true
      });
      setResumeFileName(null);
      fetchProfile();
    } catch (error) {
      setModal({
        isOpen: true,
        message: error.response?.data?.error || 'Update failed',
        type: 'error'
      });
    }
  };

  const handleModalClose = () => {
    setModal({ ...modal, isOpen: false });
    if (modal.redirect) {
      navigate('/');
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <Modal
        isOpen={modal.isOpen}
        message={modal.message}
        type={modal.type}
        onClose={handleModalClose}
        autoClose={modal.type === 'success'}
      />
      <div className="profile-card">
        <h1>📋 My Profile</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={user?.email}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>📄 Resume (PDF/Word/Image):</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
            />
            {resume && <p className="info">✅ {resume}</p>}
            {resumeFileName && <p className="info">✅ {resumeFileName}</p>}
          </div>

          <hr style={{ margin: '30px 0', border: 'none', borderTop: '2px solid #eee' }} />

          <h3 style={{ marginBottom: '20px', color: '#333' }}>🔗 Job Platform Profiles</h3>
          <div style={{
            background: '#e7f3ff',
            border: '1px solid #b3d9ff',
            borderRadius: '6px',
            padding: '12px',
            marginBottom: '20px',
            color: '#004085',
            fontSize: '14px'
          }}>
            <strong>💡 Tip:</strong> Make sure you're logged in to your LinkedIn, Naukri, and Indeed accounts before applying to jobs. When you click "Apply", the job page will open in a new tab where you can complete the application with your saved profile.
          </div>

          <div className="form-group">
            <label>LinkedIn Profile URL:</label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://www.linkedin.com/in/yourprofile"
            />
          </div>

          <div className="form-group">
            <label>Naukri Profile URL:</label>
            <input
              type="url"
              value={naukriUrl}
              onChange={(e) => setNaukriUrl(e.target.value)}
              placeholder="https://www.naukri.com/mnjuser/profile"
            />
          </div>

          <div className="form-group">
            <label>Indeed Profile URL:</label>
            <input
              type="url"
              value={indeedUrl}
              onChange={(e) => setIndeedUrl(e.target.value)}
              placeholder="https://www.indeed.com/r/yourprofile"
            />
          </div>

          <button type="submit">💾 Save Profile</button>
        </form>
      </div>
    </div>
  );
}
