@echo off
REM ================================================
REM  JOB AGGREGATOR - COMPLETE AUTO SETUP
REM ================================================

setlocal enabledelayedexpansion

echo.
echo ================================================
echo   JOB AGGREGATOR APPLICATION
echo ================================================
echo.

REM Check .env file
if not exist "backend\.env" (
    echo ERROR: backend\.env not found!
    echo.
    echo SETUP STEPS:
    echo 1. Go to: https://www.mongodb.com/cloud/atlas
    echo 2. Create FREE account and cluster
    echo 3. Get MongoDB connection string
    echo 4. Edit backend\.env and add your URL
    echo.
    echo Read FINAL_SETUP.md for detailed instructions
    echo.
    pause
    exit /b 1
)

REM Check MongoDB URI is set
findstr /M "mongodb" "backend\.env" >nul
if errorlevel 1 (
    echo ERROR: MongoDB URI not set in backend\.env!
    echo.
    echo Please update backend\.env with your MongoDB URL
    echo Read FINAL_SETUP.md for help
    echo.
    pause
    exit /b 1
)

echo [OK] Configuration found!
echo.

REM Install dependencies if needed
if not exist "backend\node_modules" (
    echo Installing Backend Dependencies (this may take 2-3 minutes)...
    cd backend
    call npm install
    cd ..
    echo.
)

if not exist "frontend\node_modules" (
    echo Installing Frontend Dependencies (this may take 2-3 minutes)...
    cd frontend
    call npm install
    cd ..
    echo.
)

echo ================================================
echo Starting Servers...
echo ================================================
echo.

REM Start Backend
start "JOB AGGREGATOR - Backend (PORT 5000)" cmd /k "cd backend && npm run dev"

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start Frontend
start "JOB AGGREGATOR - Frontend (PORT 3000)" cmd /k "cd frontend && npm start"

echo.
echo ================================================
echo SERVERS STARTING!
echo ================================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Frontend will open automatically in your browser
echo.
echo Keep this window and the server windows open!
echo.
timeout /t 3 /nobreak
