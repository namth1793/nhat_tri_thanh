@echo off
echo ============================================
echo  NHAT TRI THANH - Installing Dependencies
echo ============================================

echo.
echo [1/2] Installing backend dependencies...
cd /d "c:\MyProject\nhat_tri_thanh\backend"
call npm install
if errorlevel 1 (echo Backend install failed! & pause & exit /b 1)

echo.
echo [2/2] Installing frontend dependencies...
cd /d "c:\MyProject\nhat_tri_thanh\frontend"
call npm install
if errorlevel 1 (echo Frontend install failed! & pause & exit /b 1)

echo.
echo ============================================
echo  Installation complete!
echo  Make sure MongoDB is running, then run start.bat
echo ============================================
pause
