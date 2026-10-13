# 🚀 Quick Setup Guide

## Step 1: MongoDB Atlas Setup (5 minutes)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **Sign Up** (free tier)
3. Create account with email
4. Create a cluster:
   - Choose **FREE** tier
   - Select region close to you
   - Click "Create Cluster"
5. Wait for cluster to be created (~3-5 min)

## Step 2: Get Connection String

1. Click **Connect** button
2. Choose **Drivers** → Node.js
3. Copy connection string like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   ```
4. Replace `username`, `password`, and database name

## Step 3: Update Backend .env

Edit `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/job-aggregator?retryWrites=true&w=majority
JWT_SECRET=job_aggregator_secret_key_2024
NODE_ENV=development
```

## Step 4: Install & Run Backend

```bash
cd backend
npm install
npm run dev
```

Output should show:
```
Server running on port 5000
MongoDB connected
```

## Step 5: Run Frontend

In a new terminal:
```bash
cd frontend
npm install
npm start
```

App opens at: `http://localhost:3000`

## Test the App

1. **Register**: Create account with email + password
2. **Profile**: Upload a resume file
3. **Dashboard**: See 9 jobs, filter by platform
4. **Apply**: Click apply on any job
5. **Track**: See applications in sidebar

---

## Troubleshooting

**"MongoDB connection error"?**
- Check internet connection
- Verify MONGODB_URI in .env
- Make sure cluster is running on Atlas

**"Cannot connect to backend"?**
- Backend must be running on port 5000
- Check if backend terminal shows "Server running on port 5000"

**"Jobs not showing"?**
- Refresh the page
- Check browser console for errors

