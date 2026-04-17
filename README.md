# TalabaUy - Student Housing Platform

TalabaUy is a modern web application designed to help students in Uzbekistan find affordable, comfortable, and convenient housing near their universities.

## Features
- 🏠 **Property Search & Filters**: Search for student apartments, private rooms, or shared rooms.
- 🤖 **AI Chatbot**: Integrated Google Gemini AI to assist users in searching for properties in natural language (Uzbek).
- 📍 **Maps Integration**: Interactive map to view property locations.
- 🔐 **Secure Authentication**: User registration and login system with JWT.
- 📱 **Responsive Design**: Mobile-friendly user interface built with React and Tailwind CSS.
- 🛠️ **Admin Dashboard**: Manage properties, users, and bookings easily.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Python, Django, Django REST Framework
- **Database**: SQLite (Development)
- **AI Integration**: Google Generative AI (Gemini 2.5 Flash)

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
DJANGO_SECRET_KEY=your_secret_key_here
```
