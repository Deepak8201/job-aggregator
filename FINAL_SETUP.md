# 🎯 FINAL SETUP - Just 2 Steps!

## ✅ Step 1: MongoDB URL (2 minutes)

**Go here:** https://www.mongodb.com/cloud/atlas

1. Click **"Sign Up"** → Create free account
2. Create a **FREE cluster** (M0 Sandbox)
3. Add **Database User**:
   - Username: `jobuser`
   - Password: `JobApp2024@123`
4. **Network Access** → Allow from anywhere
5. Click **"Connect"** → Choose **"Drivers"** → Copy this:

```
mongodb+srv://jobuser:JobApp2024@123@cluster0.xxxxx.mongodb.net/job-aggregator?retryWrites=true&w=majority
```

---

## ✅ Step 2: Update `.env` File

Open: `backend/.env`

Replace `MONGODB_URI=` line with your copied URL:

```
PORT=5000
MONGODB_URI=mongodb+srv://jobuser:JobApp2024@123@cluster0.xxxxx.mongodb.net/job-aggregator?retryWrites=true&w=majority
JWT_SECRET=job_aggregator_secret_key_2024
NODE_ENV=development
```

**SAVE IT!** ✅

---

## ✅ Step 3: Start App

**Option A: Auto-Start (Recommended)**
```
Double-click: START_APP.bat
```

**Option B: Manual**
```
Terminal 1:
cd backend
npm run dev

Terminal 2 (new):
cd frontend
npm start
```

---

## ✨ APP READY!

Frontend opens at: **http://localhost:3000** 🎉

### Test It:
1. **Register** - Create account
2. **Profile** - Upload resume
3. **Dashboard** - See jobs from LinkedIn, Naukri, Indeed
4. **Apply** - Click "Apply Now"
5. **Track** - See applications in sidebar

---

**Questions?** Just tell me! 💪
