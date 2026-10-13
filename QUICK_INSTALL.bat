@echo off
echo.
echo ========================================
echo Job Aggregator - Quick Install
echo ========================================
echo.
echo Installing Backend Dependencies...
cd backend
call npm install
echo.
echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Open MONGODB_SETUP.md and follow steps 1-6
echo 2. Update backend\.env with your MongoDB URL
echo 3. Run: cd backend && npm run dev
echo 4. In new terminal: cd frontend && npm start
echo.
pause
