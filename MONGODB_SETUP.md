# MongoDB Atlas Setup (Easy Method) ☁️

## 🔗 STEP 1: Create Free MongoDB Account

1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Sign Up"** (green button)
3. Fill: Email, Password, First/Last Name
4. Accept terms → Click **Create account**
5. Check your email for verification link

---

## 🎯 STEP 2: Create Your First Cluster

After login:
1. Click **"+ Create"** button
2. Choose **FREE** tier (M0 Sandbox)
3. Pick region closest to you (e.g., Mumbai, Singapore)
4. Click **"Create Cluster"** (wait 3-5 minutes)

---

## 🔐 STEP 3: Setup Database User

1. Click **"Security"** → **"Database Access"**
2. Click **"+ Add New Database User"**
3. Enter:
   - **Username**: `jobuser`
   - **Password**: `JobApp2024@123` (remember this!)
4. Click **"Add User"**

---

## 📍 STEP 4: Whitelist IP Address

1. Click **"Security"** → **"Network Access"**
2. Click **"+ Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. Click **"Confirm"**

---

## 🔌 STEP 5: Get Connection String

1. Go back to **Clusters** page
2. Click **"Connect"** button
3. Choose **"Drivers"** → **Node.js**
4. Copy this string (it will have your username/password):
```
mongodb+srv://jobuser:JobApp2024@123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## 📝 STEP 6: Update Your .env File

Open `backend/.env` and replace MONGODB_URI with your string:

```
PORT=5000
MONGODB_URI=mongodb+srv://jobuser:JobApp2024@123@cluster0.xxxxx.mongodb.net/job-aggregator?retryWrites=true&w=majority
JWT_SECRET=job_aggregator_secret_key_2024
NODE_ENV=development
```

**Important:** Change `/?retryWrites=true&w=majority` to `/job-aggregator?retryWrites=true&w=majority`

---

## ✅ STEP 7: Test Connection

Open **Terminal** in `backend` folder and run:
```bash
npm install
npm run dev
```

Should show:
```
Server running on port 5000
MongoDB connected ✅
```

---

## 🎉 STEP 8: Run Frontend

Open **new Terminal** in `frontend` folder:
```bash
npm install
npm start
```

Opens automatically at: `http://localhost:3000`

---

## 🧪 TEST THE APP

1. **Register**: 
   - Name: Your name
   - Email: test@gmail.com
   - Password: anything

2. **Profile Page**:
   - Phone: Your phone
   - Upload Resume: Any file (PDF/Word/Image)

3. **Dashboard**:
   - See 9 jobs from LinkedIn, Naukri, Indeed
   - Filter by platform
   - Click "Apply Now"

4. **Check Applications**:
   - Right sidebar shows all your applications

---

Done! 🚀✨
