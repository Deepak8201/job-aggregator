// In-Memory Database with File Persistence
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const applicationsFile = path.join(dataDir, 'applications.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load data from files
let users = [];
let applications = [];

const loadData = () => {
  try {
    if (fs.existsSync(usersFile)) {
      users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
      // Ensure all users have designation field
      users = users.map(user => ({
        ...user,
        designation: user.designation || ''
      }));
      console.log(`Loaded ${users.length} users from file`);
    }
    if (fs.existsSync(applicationsFile)) {
      applications = JSON.parse(fs.readFileSync(applicationsFile, 'utf8'));
      console.log(`Loaded ${applications.length} applications from file`);
    }
  } catch (err) {
    console.error('Error loading data:', err);
  }
};

const saveData = () => {
  try {
    console.log('Saving users:', users.length);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    fs.writeFileSync(applicationsFile, JSON.stringify(applications, null, 2));
    console.log('Data saved successfully');
  } catch (err) {
    console.error('Error saving data:', err);
  }
};

loadData();

const db = {
  // User operations
  createUser: async (userData) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = {
      _id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone || '',
      resume: userData.resume || null,
      designation: userData.designation || '',
      linkedinUrl: userData.linkedinUrl || '',
      naukriUrl: userData.naukriUrl || '',
      indeedUrl: userData.indeedUrl || '',
      createdAt: new Date(),
    };
    users.push(user);
    saveData();
    return user;
  },

  getUserByEmail: async (email) => {
    return users.find(u => u.email === email);
  },

  getUserById: async (id) => {
    return users.find(u => u._id === id);
  },

  updateUser: async (id, updateData) => {
    const user = users.find(u => u._id === id);
    if (!user) throw new Error('User not found');

    if (updateData.name) user.name = updateData.name;
    if (updateData.phone !== undefined) user.phone = updateData.phone;
    if (updateData.resume !== undefined) user.resume = updateData.resume;
    if (updateData.designation !== undefined) user.designation = updateData.designation;
    if (updateData.linkedinUrl !== undefined) user.linkedinUrl = updateData.linkedinUrl;
    if (updateData.naukriUrl !== undefined) user.naukriUrl = updateData.naukriUrl;
    if (updateData.indeedUrl !== undefined) user.indeedUrl = updateData.indeedUrl;

    saveData();
    return user;
  },

  // Application operations
  createApplication: async (appData) => {
    const existingApp = applications.find(
      a => a.userId === appData.userId && a.jobId === appData.jobId
    );
    if (existingApp) throw new Error('Already applied to this job');

    const app = {
      _id: crypto.randomUUID(),
      userId: appData.userId,
      jobId: appData.jobId,
      jobTitle: appData.jobTitle,
      company: appData.company,
      platform: appData.platform,
      appliedAt: new Date(),
      status: 'applied',
    };
    applications.push(app);
    saveData();
    return app;
  },

  getApplicationsByUserId: async (userId) => {
    return applications
      .filter(a => a.userId === userId)
      .sort((a, b) => b.appliedAt - a.appliedAt);
  },

  // Debug
  getAllUsers: () => users.map(u => ({ ...u, password: '***' })),
  getAllApplications: () => applications,
  clearAll: () => {
    users = [];
    applications = [];
  },
};

module.exports = db;
