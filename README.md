# SkillStream Backend - Modern Learning Platform

## Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or MongoDB Atlas)
- Google Cloud Console project with OAuth 2.0 credentials

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the `backend` directory based on `.env.example`:
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/learning-platform
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SESSION_SECRET=your_session_secret
   CLIENT_URL=http://localhost:3000
   ```

3. **Run the Server**
   ```bash
   npm start
   # or for development
   nodemon index.js
   ```

## Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run the React App**
   ```bash
   npm run dev
   ```

## Design Inspiration
Inspired by Google Skills and modern SaaS dashboards, featuring:
- Minimal card-based layout
- Soft shadows and neutral color palette
- Collapsible sidebar navigation
- Progress tracking with vibrant accents
- Responsive design for all devices
