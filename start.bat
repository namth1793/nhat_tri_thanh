@echo off
echo ============================================
echo  NHAT TRI THANH - Starting Servers
echo ============================================
echo.
echo Backend:  http://localhost:5001
echo Frontend: http://localhost:3000
echo.
echo DB: SQLite (tu dong tao khi chay)
echo.

start "NTT Backend" cmd /k "cd /d c:\MyProject\nhat_tri_thanh\backend && npm run dev"
timeout /t 3 /nobreak >nul
start "NTT Frontend" cmd /k "cd /d c:\MyProject\nhat_tri_thanh\frontend && npm run dev"

echo.
echo Both servers started in separate windows.
echo Press any key to exit this window...
pause >nul
