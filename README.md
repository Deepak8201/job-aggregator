# Job Aggregator Platform

A unified job application platform that aggregates job listings from **LinkedIn**, **Naukri**, and **Indeed** in one place, allowing users to apply to jobs directly through the platform.

## Features

✅ **Unified Job Board** - View all jobs from LinkedIn, Naukri, and Indeed in one dashboard
✅ **User Accounts** - Register, login, and manage your profile
✅ **Resume Upload** - Upload your resume once and auto-fill applications
✅ **Smart Filtering** - Filter jobs by platform, title, and company
✅ **Application Tracking** - Track all your applications in one place
✅ **One-Click Apply** - Apply to jobs with pre-filled profile data

## Tech Stack

### Backend
- **Node.js + Express** - REST API server
- **MongoDB** - Database for users and applications
- **JWT** - Authentication
- **Multer** - File upload handling
- **Bcrypt** - Password encryption

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure

```
job-aggregator/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Application.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── jobs.js
│   │   └── applications.js
│   ├── middleware/
│   │   └── auth.js
│   ├── data/
│   │   └── mockJobs.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── Navbar.css
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── Profile.js
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   └── Profile.css
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── package.json
    └── public/index.html
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-aggregator
JWT_SECRET=your_super_secret_key_12345
NODE_ENV=development
```

4. Start server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start React app:
```bash
npm start
```

Frontend runs on `http://localhost:3000`

## Usage

1. **Register** - Create a new account
2. **Upload Resume** - Go to Profile and upload your resume
3. **Browse Jobs** - View all available jobs from LinkedIn, Naukri, and Indeed
4. **Apply** - Click "Apply Now" to apply with auto-filled data
5. **Track Applications** - See all your applications in the sidebar

## Mock Data

The platform includes 9 mock job listings:
- 3 from LinkedIn
- 3 from Naukri
- 3 from Indeed

Jobs include positions like Senior React Developer, Full Stack Engineer, DevOps Engineer, Frontend Developer, and more.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job

### Applications
- `GET /api/applications` - Get user's applications
- `POST /api/applications` - Apply to a job

## Future Enhancements

🚀 **Real API Integration** - Connect to actual LinkedIn, Naukri, and Indeed APIs
🚀 **Email Notifications** - Get updates on application status
🚀 **Resume Parser** - Auto-extract info from resume
🚀 **Job Recommendations** - AI-powered job matching
🚀 **Interview Scheduling** - Built-in interview scheduler
🚀 **Mobile App** - React Native mobile version

## License

MIT

## Contact

For issues or suggestions, please create an issue or contact the development team.

---

Happy job hunting! 💼✨
