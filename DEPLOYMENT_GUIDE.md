# 🚀 Deployment Guide - Job Aggregator Live

## Phase 1: Setup MongoDB Atlas (Free)

### Step 1: Create MongoDB Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Sign up with email
4. Verify email

### Step 2: Create Cluster
1. Click **"+ Create"**
2. Choose **FREE** (M0 Sandbox)
3. Select region near you
4. Click **"Create Cluster"** (wait 3-5 min)

### Step 3: Setup Database User
1. Click **"Security"** → **"Database Access"**
2. Click **"+ Add New Database User"**
3. Username: `jobuser`
4. Password: Generate secure password (save it!)
5. Click **"Add User"**

### Step 4: Whitelist IP
1. Click **"Security"** → **"Network Access"**
2. Click **"+ Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for now)
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go back to **"Clusters"**
2. Click **"Connect"** button
3. Choose **"Drivers"** → **Node.js**
4. Copy connection string (looks like):
```
mongodb+srv://jobuser:PASSWORD@cluster0.xxxxx.mongodb.net/job-aggregator?retryWrites=true&w=majority
```
5. Replace `PASSWORD` with your actual password

---

## Phase 2: Update Backend for Production

### Step 1: Update backend/.env
```
PORT=5000
MONGODB_URI=mongodb+srv://jobuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/job-aggregator?retryWrites=true&w=majority
JWT_SECRET=job_aggregator_super_secret_key_2024
NODE_ENV=production
```

### Step 2: Update backend/server.js
Replace MongoDB connection code with actual MongoDB:

```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB error:', err));
```

### Step 3: Use Real Models
Replace in-memory DB with MongoDB models:
- Use `User` model instead of memory.js
- Use `Application` model instead of memory.js

---

## Phase 3: Deploy Backend to Railway

### Step 1: Create Railway Account
1. Go to: https://railway.app
2. Click **"Start Project"**
3. Login with GitHub / Email

### Step 2: Deploy from GitHub
1. Connect your GitHub account
2. Select repository
3. Railway auto-deploys on push

### Step 3: Add Environment Variables
1. In Railway dashboard: Click **"Variables"**
2. Add:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = your secret key
   - `NODE_ENV` = production

### Step 4: Get Backend URL
- Railway generates URL like: `https://job-aggregator-backend.railway.app`
- This is your **BACKEND_URL**

---

## Phase 4: Deploy Frontend to Vercel

### Step 1: Create .env.production
Create `frontend/.env.production`:
```
REACT_APP_API_URL=https://job-aggregator-backend.railway.app
```

### Step 2: Update API Calls
In frontend code, change:
```javascript
// From:
axios.get('/api/users/profile')

// To:
axios.get(`${process.env.REACT_APP_API_URL}/api/users/profile`)
```

### Step 3: Deploy to Vercel
1. Go to: https://vercel.com
2. Click **"Import Project"**
3. Select GitHub repository
4. Add Environment Variable:
   - `REACT_APP_API_URL` = your backend Railway URL
5. Click **"Deploy"**

### Step 4: Get Frontend URL
- Vercel generates URL like: `https://job-aggregator.vercel.app`
- This is your **LIVE APP**

---

## Phase 5: Update CORS & API URLs

### Backend (server.js)
```javascript
app.use(cors({
  origin: 'https://job-aggregator.vercel.app',
  credentials: true
}));
```

### Frontend (package.json)
Update proxy:
```json
"proxy": "https://job-aggregator-backend.railway.app"
```

---

## 🎯 Quick Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] Database user created
- [ ] Connection string copied
- [ ] Backend .env updated
- [ ] Railway account created
- [ ] Backend deployed to Railway
- [ ] Backend URL working (`/api/jobs` endpoint)
- [ ] Frontend .env.production created
- [ ] API calls updated with backend URL
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] Test registration
- [ ] Test profile update
- [ ] Test job browsing
- [ ] Test job apply

---

## 🔗 Final URLs

After deployment:
- **Frontend (Live App):** `https://job-aggregator.vercel.app`
- **Backend API:** `https://job-aggregator-backend.railway.app`
- **MongoDB:** Cloud database on Atlas

---

## 💡 Testing Live App

1. Go to: `https://job-aggregator.vercel.app`
2. Register new account
3. Update profile with all details
4. Browse jobs
5. Click apply (redirects to job site)

---

## ⚠️ Important Notes

1. **Database**: Using MongoDB Atlas free tier (512MB storage)
2. **Hosting**: Railway free tier ($5/month credit)
3. **Security**: Change JWT_SECRET to strong key
4. **Backups**: MongoDB Atlas auto-backups

---

## 🆘 Troubleshooting

### "Cannot connect to backend"
- Check MONGODB_URI in Railway env vars
- Verify IP whitelist on MongoDB Atlas
- Check CORS origin in backend

### "Jobs not loading"
- Verify API endpoint on Vercel logs
- Check backend logs on Railway
- Ensure backend URL is correct

### "Login fails"
- Check JWT_SECRET matches
- Verify MongoDB connection
- Check user collection in MongoDB

---

## 📱 Share Your Live App!

Once deployed:
- Share URL with friends
- They can register and try
- All data saved to cloud

**Congratulations! Your app is now LIVE! 🎉**
