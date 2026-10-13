@echo off
REM Job Aggregator - Auto Start Script
REM This will start both backend and frontend

echo.
echo ========================================
echo   JOB AGGREGATOR - Starting Application
echo ========================================
echo.

REM Check if node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not installed!
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Checking dependencies...
if not exist "backend\node_modules" (
    echo [2/4] Installing backend packages...
    cd backend
    call npm install --silent
    cd ..
)

if not exist "frontend\node_modules" (
    echo [3/4] Installing frontend packages...
    cd frontend
    call npm install --silent
    cd ..
)

echo [4/4] Starting servers...
echo.
echo ========================================
echo IMPORTANT:
echo 1. Backend will start on PORT 5000
echo 2. Frontend will start on PORT 3000
echo 3. Don't close this window!
echo ========================================
echo.

REM Start backend in background
start "Backend - Job Aggregator" cmd /k "cd backend && npm run dev"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak

REM Start frontend
start "Frontend - Job Aggregator" cmd /k "cd frontend && npm start"

echo.
echo Waiting for applications to start...
echo Frontend will open automatically in browser!
echo.
timeout /t 5 /nobreak

echo.
echo ========================================
echo Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
