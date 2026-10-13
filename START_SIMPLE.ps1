# Job Aggregator - Simple Start Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  JOB AGGREGATOR - Starting" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Install backend if needed
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "[1] Installing Backend..." -ForegroundColor Yellow
    Set-Location backend
    npm install --silent
    Set-Location ..
}

# Install frontend if needed
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "[2] Installing Frontend..." -ForegroundColor Yellow
    Set-Location frontend
    npm install --silent
    Set-Location ..
}

Write-Host "[3] Starting Backend Server..." -ForegroundColor Yellow
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev" -PassThru

Write-Host "[4] Starting Frontend..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start" -PassThru

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SERVERS STARTED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Blue
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host ""
Write-Host "Frontend will open in browser automatically!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Do NOT close this window!" -ForegroundColor Red
Write-Host ""

# Keep script running
Read-Host "Press Enter to stop servers"

Write-Host "Stopping servers..." -ForegroundColor Yellow
Stop-Process -Id $backend.Id -ErrorAction SilentlyContinue
Stop-Process -Id $frontend.Id -ErrorAction SilentlyContinue
