# 🚀 Deploy Using Firebase + Render

## ✅ You Already Have!
- Firebase console (backend)
- Render dashboard (for laundry-booking-app)
- Twilio apps

---

## Phase 1: Deploy Backend to Render

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "Job Aggregator App"
git remote add origin https://github.com/YOUR_USERNAME/job-aggregator.git
git push -u origin main
```

### Step 2: Deploy Backend on Render
1. Go to: https://dashboard.render.com
2. Click **"New+"** → **"Web Service"**
3. Connect GitHub
4. Select `job-aggregator` repository
5. Fill:
   - **Name:** `job-aggregator-api`
   - **Environment:** `Node`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm run dev`
6. Add Environment Variables:
   ```
   MONGODB_URI = (Firebase Realtime DB URL)
   JWT_SECRET = your_secret_key_here
   NODE_ENV = production
   ```
7. Click **"Create Web Service"**

### Step 3: Get Backend URL
- Render gives you: `https://job-aggregator-api.onrender.com`
- Save this URL!

---

## Phase 2: Setup Firebase Realtime Database

### Step 1: Enable Database in Firebase
1. Go to: https://console.firebase.google.com
2. Select your project
3. Go to **"Realtime Database"**
4. Click **"Create Database"**
5. Choose **"Start in test mode"** (for development)

### Step 2: Update Backend for Firebase
Replace MongoDB code in `backend/server.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});

const db = admin.database();

// Use db instead of mongoose
```

### Step 3: Get Firebase Config
1. In Firebase Console → Project Settings → Service Accounts
2. Click **"Generate new private key"**
3. Save as `backend/serviceAccountKey.json`
4. Add to `.gitignore`: `serviceAccountKey.json`

---

## Phase 3: Deploy Frontend to Firebase Hosting

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Initialize Firebase in Frontend
```bash
cd frontend
firebase init hosting
```

Choose:
- **Public directory:** `build`
- **Single page app:** Yes

### Step 3: Build Frontend
```bash
npm run build
```

### Step 4: Deploy Frontend
```bash
firebase deploy --only hosting
```

Frontend URL: `https://job-aggregator-12345.firebaseapp.com`

---

## Phase 4: Connect Frontend to Backend

### Update `frontend/.env.production`
```
REACT_APP_API_URL=https://job-aggregator-api.onrender.com
```

### Update API Calls in Frontend
In `frontend/src/pages/Dashboard.js` and `Profile.js`:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

axios.get(`${API_URL}/api/users/profile`, {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

## Phase 5: Update CORS

In `backend/server.js`:
```javascript
app.use(cors({
  origin: 'https://job-aggregator-12345.firebaseapp.com',
  credentials: true
}));
```

---

## 📱 Your Live App URLs

After deployment:
- **Frontend:** `https://job-aggregator-12345.firebaseapp.com`
- **Backend API:** `https://job-aggregator-api.onrender.com`
- **Database:** Firebase Realtime DB
- **Messages:** Twilio (optional, can integrate later)

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Backend URL working
- [ ] Firebase Realtime DB created
- [ ] Firebase CLI installed
- [ ] Frontend built
- [ ] Frontend deployed to Firebase Hosting
- [ ] API URLs updated
- [ ] Test registration
- [ ] Test job browsing
- [ ] Test job apply

---

## 🎯 Quick Deploy Command

```bash
# Backend
cd backend
git push origin main  # Auto-deploys on Render

# Frontend
cd frontend
npm run build
firebase deploy --only hosting
```

---

## 💡 Firebase Database Structure

```
job-aggregator/
├── users/
│   ├── user_id_1/
│   │   ├── name: "Deepak"
│   │   ├── email: "deepak@test.com"
│   │   ├── phone: "9632469859"
│   │   ├── resume: "filename.pdf"
│   │   ├── linkedinUrl: "..."
│   │   ├── naukriUrl: "..."
│   │   └── indeedUrl: "..."
│
└── applications/
    ├── app_id_1/
    │   ├── userId: "user_id_1"
    │   ├── jobId: "li-1"
    │   ├── company: "Tech Innovations"
    │   ├── platform: "LinkedIn"
    │   └── appliedAt: timestamp
```

---

## 🚀 LIVE! 

Your Job Aggregator is now LIVE on:
**https://job-aggregator-12345.firebaseapp.com**

Share with friends! 🎉

---

## 🆘 Need Help?

- Render docs: https://render.com/docs
- Firebase docs: https://firebase.google.com/docs
- GitHub: Push code anytime to auto-deploy

**Let me know when you're ready to deploy!** 💪
