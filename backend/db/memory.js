// In-Memory Database (No MongoDB needed!)
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


// Initialize empty - users will register
let users = [];
let applications = [];

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
      linkedinUrl: userData.linkedinUrl || '',
      naukriUrl: userData.naukriUrl || '',
      indeedUrl: userData.indeedUrl || '',
      createdAt: new Date(),
    };
    users.push(user);
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
    if (updateData.linkedinUrl !== undefined) user.linkedinUrl = updateData.linkedinUrl;
    if (updateData.naukriUrl !== undefined) user.naukriUrl = updateData.naukriUrl;
    if (updateData.indeedUrl !== undefined) user.indeedUrl = updateData.indeedUrl;

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
