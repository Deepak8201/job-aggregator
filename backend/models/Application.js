const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  platform: { type: String, enum: ['LinkedIn', 'Naukri', 'Indeed'], required: true },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['applied', 'rejected', 'in_review', 'accepted'], default: 'applied' },
});

module.exports = mongoose.model('Application', applicationSchema);
