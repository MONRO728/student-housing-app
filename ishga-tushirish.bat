@echo off
echo TalabaUy loyihasini ishga tushirish...

set "ROOT=%~dp0"

start cmd /k "cd /d "%ROOT%backend" && python manage.py runserver"
start cmd /k "cd /d "%ROOT%frontend" && npm run dev"

echo.
echo Serverlar ishga tushirildi!
echo Frontend:   http://localhost:5173
echo Backend:    http://localhost:8000
echo Admin Panel: http://localhost:8000/admin  (admin / admin123)
echo.
pause
