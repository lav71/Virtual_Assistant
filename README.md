# Virtual Assistant

A full-stack AI-powered virtual assistant web application built with React, Node.js, Express.js, MongoDB, JWT authentication, Cloudinary, and Google Gemini.

## Live Application

- Frontend: https://virtual-assistant-black.vercel.app
- Backend API: https://virtual-assistant-backend-7hsm.onrender.com
- GitHub: https://github.com/lav71/Virtual_Assistant

## Overview

Virtual Assistant is a full-stack web application that allows users to create an account, customize a personal AI assistant, interact through voice or text commands, and receive AI-powered responses.

The application combines a React/Vite frontend with an Express/Node.js backend, MongoDB Atlas for persistent data, Cloudinary for assistant image storage, and Google Gemini for natural-language command processing.

## Features

### Authentication

- User registration and login
- Password hashing with bcryptjs
- JWT-based authentication
- HTTP-only authentication cookies
- Secure production cookie configuration
- Protected API routes
- Logout functionality
- Current-user authentication checks

### Assistant Customization

- Custom assistant name
- Built-in assistant image selection
- Custom assistant image upload
- Cloudinary image storage
- Persistent assistant configuration in MongoDB

### Voice Interaction

- Browser-based speech recognition using the Web Speech API
- Speech-to-text command processing
- Text-to-speech responses where supported by the browser
- Natural-language command handling

### AI Command Processing

Google Gemini is used to understand natural-language commands and return structured command information.

Supported command categories include:

- `get_date`
- `get_time`
- `get_day`
- `get_month`
- `google_search`
- `youtube_search`
- `youtube_play`
- `general`
- `calculator_open`
- `facebook_open`
- `instagram_open`
- `weather-show`

### User History

User commands can be persisted in MongoDB as part of the user history.

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios
- React Icons
- Web Speech API
- Speech Synthesis API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- CORS
- Multer
- Cloudinary
- Google Gemini API
- Moment.js
- dotenv

### Infrastructure

- Vercel - Frontend deployment
- Render - Backend deployment
- MongoDB Atlas - Database
- Cloudinary - Image storage
- GitHub - Source control

## Architecture

```text
User
 |
 v
React + Vite Frontend
 |
 | HTTPS API requests
 v
Express + Node.js Backend
 |
 +------------------+-------------------+
 |                  |                   |
 v                  v                   v
MongoDB Atlas    Cloudinary        Google Gemini
 |                  |                   |
 v                  v                   v
User Data       Assistant Images   AI Command Processing
```

## Project Structure

```text
Virtual_Assistant/
|
|-- backend/
|   |-- config/
|   |   |-- cloudinary.js
|   |   |-- db.js
|   |   `-- token.js
|   |-- controller/
|   |   |-- auth.controller.js
|   |   `-- user.controller.js
|   |-- middleware/
|   |   |-- isAuth.js
|   |   `-- multer.js
|   |-- models/
|   |   `-- user.model.js
|   |-- routes/
|   |   |-- auth.routes.js
|   |   `-- userRoutes.js
|   |-- public/
|   |-- gemini.js
|   |-- index.js
|   |-- package.json
|   `-- .env
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |   `-- Card.jsx
|   |   |-- context/
|   |   |   `-- UserContext.jsx
|   |   |-- images/
|   |   |-- pages/
|   |   |   |-- Customize.jsx
|   |   |   |-- Customize2.jsx
|   |   |   |-- Home.jsx
|   |   |   |-- LogIn.jsx
|   |   |   `-- SignUp.jsx
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- index.html
|   |-- package.json
|   |-- vite.config.js
|   |-- vercel.json
|   `-- .env
|
`-- README.md
```

## API

### Authentication

Base path:

```text
/api/auth
```

Register:

```http
POST /api/auth/signup
```

Example body:

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "your-password"
}
```

Login:

```http
POST /api/auth/login
```

Example body:

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

Logout:

```http
GET /api/auth/logout
```

Use the exact HTTP method configured by the current backend route if it differs.

### User

Base path:

```text
/api/user
```

Get current user:

```http
GET /api/user/current
```

Update assistant:

```http
POST /api/user/update
```

Ask assistant:

```http
POST /api/user/askToAssistant
```

Example:

```json
{
  "command": "What is the current time?"
}
```

Protected user routes require the authentication cookie.

## Authentication Flow

Authentication uses JWT stored in an HTTP-only cookie.

```text
Signup / Login
      |
      v
Backend generates JWT
      |
      v
HTTP-only Cookie
      |
      v
Browser
      |
      | withCredentials: true
      v
Protected API
      |
      v
isAuth Middleware
      |
      v
JWT Verification
      |
      v
req.user_id
      |
      v
Controller
```

Production cookie configuration:

```js
{
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000
}
```

Frontend authenticated requests use:

```js
withCredentials: true
```

## Image Upload Flow

```text
React Frontend
      |
      v
Multer
      |
      v
Temporary Upload
      |
      v
Cloudinary
      |
      v
Secure Image URL
      |
      v
MongoDB
```

## Environment Variables

Never commit real credentials or API keys to GitHub.

### Backend

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=https://your-frontend-domain.vercel.app

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_URL=your_gemini_api_url
```

Use the exact variable names required by the backend source code.

### Frontend

For local development:

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://virtual-assistant-backend-7hsm.onrender.com
```

Frontend environment variables must not contain server-side secrets.

## Local Development

### Requirements

- Node.js
- npm
- MongoDB or MongoDB Atlas
- Cloudinary account
- Google Gemini API access
- Git

### Clone

```bash
git clone https://github.com/lav71/Virtual_Assistant.git
cd Virtual_Assistant
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Local backend:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Local frontend:

```text
http://localhost:5173
```

## Production Build

From `frontend`:

```bash
npm run build
```

The production output is generated in:

```text
frontend/dist
```

## Deployment

### Vercel

Frontend configuration:

```text
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Production environment variable:

```env
VITE_API_URL=https://virtual-assistant-backend-7hsm.onrender.com
```

### Render

Backend configuration:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Required Render environment variables:

```text
MONGODB_URI
JWT_SECRET
FRONTEND_URL
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
GEMINI_API_KEY
GEMINI_API_URL
```

The backend should use the Render-provided port:

```js
const port = process.env.PORT || 5000;
```

### MongoDB Atlas

MongoDB Atlas is used as the production database.

The connection string is stored in:

```env
MONGODB_URI
```

Database credentials must never be committed to the repository.

### Cloudinary

Cloudinary stores uploaded assistant images.

Required variables:

```text
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

## CORS

The frontend and backend use different domains in production, so CORS must allow the deployed frontend origin.

Backend:

```js
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
```

Production example:

```env
FRONTEND_URL=https://virtual-assistant-black.vercel.app
```

Do not add a trailing slash.

## Security

- Passwords are hashed with bcryptjs.
- JWT authentication is handled server-side.
- Authentication tokens are stored in HTTP-only cookies.
- Production cookies use secure cross-site configuration.
- CORS is restricted to the configured frontend origin.
- API keys are stored in environment variables.
- `.env` files are excluded from Git.
- Cloudinary and Gemini credentials remain server-side.
- Protected routes use authentication middleware.
- MongoDB credentials are not stored in source code.

## Common Production Issues

### CORS Error

Verify:

```env
FRONTEND_URL=https://virtual-assistant-black.vercel.app
```

and:

```js
credentials: true
```

### Token Not Found

Verify that login/signup cookies use:

```js
httpOnly: true
secure: true
sameSite: "none"
```

and frontend Axios requests use:

```js
withCredentials: true
```

### MongoDB Connection Error

Verify the `MONGODB_URI` variable exists in Render and MongoDB Atlas permits the deployed backend to connect.

### Assistant Update Error

Check:

- Authentication cookie
- CORS configuration
- Multer field name
- Cloudinary credentials
- Cloudinary upload logs
- Backend Render logs

### Vercel React Route 404

For client-side React routes such as `/login`, `/signup`, `/customize`, and `/customize2`, Vercel should rewrite unknown routes to the React entry point. The project includes `vercel.json` for SPA routing.

## Application Flow

```text
User
 |
 v
Vercel React Frontend
 |
 +-------------------------+
 |                         |
 v                         v
Authentication         Assistant UI
 |                         |
 v                         v
Render Express API     Voice / Text
 |                         |
 |                         v
 |                    Gemini API
 |                         |
 |                         v
 |                  Intent / Response
 |                         |
 +------------+------------+
              |
              v
        MongoDB Atlas
              |
              +------------------+
              |                  |
              v                  v
         User Data         Command History

Assistant Image
      |
      v
    Multer
      |
      v
  Cloudinary
      |
      v
 Image URL
      |
      v
  MongoDB
```

## Frontend Pages

### Sign Up

Creates a new user account.

### Login

Authenticates an existing user.

### Home

Provides the primary virtual assistant interface, including voice interaction and assistant responses.

### Customize

Allows the user to choose an assistant image and configure the assistant.

### Customize2

Completes assistant configuration and sends the assistant update request to the backend.

## Backend Responsibilities

- User registration
- Login and logout
- JWT generation and verification
- User profile retrieval
- Assistant configuration
- Image upload handling
- Cloudinary integration
- Gemini integration
- Command processing
- User history persistence
- MongoDB operations
- CORS and API security

## Frontend Responsibilities

- React routing
- Authentication interface
- Assistant customization
- Voice recognition
- Text-to-speech
- API communication
- Responsive user interface
- Client-side user context
- Assistant interaction

## Git Workflow

```bash
git status
git add .
git commit -m "Update application"
git push origin main
```

Before pushing, make sure no `.env` files or credentials are staged.

## Future Improvements

- Dedicated conversation history UI
- Streaming AI responses
- More assistant personalities
- Additional voice options
- More command integrations
- Improved intent detection
- User profile management
- Accessibility improvements
- Progressive Web App support
- API rate limiting
- Automated testing
- CI/CD pipeline
- Centralized error monitoring
- Improved request validation

## License

This project is intended for educational, portfolio, and demonstration purposes.

Add an open-source license file if the project is intended for public redistribution.

## Author

**Lavkush Vishwakarma**

Bachelor of Technology - Computer Science and Engineering

Quantum University, Roorkee

GitHub: https://github.com/lav71
