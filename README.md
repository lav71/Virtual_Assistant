# Virtual Assistant

A full-stack AI-powered virtual assistant web application built with
React, Vite, Node.js, Express.js, MongoDB, Cloudinary, and the Google
Gemini API.

## Live Deployment

-   Frontend: Vercel
-   Backend: Render
-   Backend URL: https://virtual-assistant-backend-7hsm.onrender.com
-   Database: MongoDB Atlas
-   Image Storage: Cloudinary
-   AI Service: Google Gemini API

> Replace the frontend placeholder in this README with your actual
> Vercel URL.

## Features

-   User registration and login
-   JWT-based authentication
-   Protected routes
-   AI-powered assistant responses
-   Text interaction
-   Voice input using the browser Web Speech API where supported
-   Text-to-speech responses
-   Assistant customization
-   Assistant image upload
-   Cloudinary image management
-   MongoDB-based user data storage
-   REST API built with Express.js
-   Responsive React frontend
-   Production deployment using Vercel and Render

## Tech Stack

### Frontend

-   React.js
-   Vite
-   Tailwind CSS
-   React Router
-   Axios
-   Web Speech API

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT
-   bcryptjs
-   Multer
-   Cloudinary
-   Google Gemini API
-   CORS
-   dotenv

### Deployment

-   Vercel --- Frontend
-   Render --- Backend
-   MongoDB Atlas --- Database
-   Cloudinary --- Media storage

## Project Structure

``` text
Virtual_Assistant/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
└── README.md
```

## Application Architecture

``` text
User
  |
  v
React + Vite Frontend
  |
  | HTTPS API Requests
  v
Express.js Backend
  |
  +----> MongoDB Atlas
  |
  +----> Cloudinary
  |
  +----> Gemini API
```

## Prerequisites

Install the following before running the project:

-   Node.js 18 or newer
-   npm
-   Git
-   MongoDB Atlas account
-   Cloudinary account
-   Google Gemini API access

Check your installation:

``` bash
node -v
npm -v
git --version
```

## Local Installation

Clone the repository:

``` bash
git clone https://github.com/lav71/Virtual_Assistant.git
cd Virtual_Assistant
```

### Backend

``` bash
cd backend
npm install
```

Create `backend/.env`:

``` env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_URL=your_gemini_api_url
```

Start the backend:

``` bash
npm run dev
```

Production-style start:

``` bash
npm start
```

Backend:

``` text
http://localhost:5000
```

### Frontend

Open another terminal:

``` bash
cd frontend
npm install
```

Create `frontend/.env`:

``` env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

``` bash
npm run dev
```

Frontend:

``` text
http://localhost:5173
```

## Environment Variables

### Backend

  Variable                  Purpose
  ------------------------- ------------------------------------
  `PORT`                    Express server port
  `MONGODB_URI`             MongoDB Atlas connection string
  `JWT_SECRET`              Secret used for JWT authentication
  `FRONTEND_URL`            Allowed frontend origin
  `CLOUDINARY_CLOUD_NAME`   Cloudinary cloud name
  `CLOUDINARY_API_KEY`      Cloudinary API key
  `CLOUDINARY_API_SECRET`   Cloudinary API secret
  `GEMINI_API_KEY`          Gemini API key
  `GEMINI_API_URL`          Gemini API endpoint

### Frontend

  Variable         Purpose
  ---------------- ----------------------
  `VITE_API_URL`   Backend API base URL

Never commit environment files or secret credentials to GitHub.

## Authentication

The application uses JWT-based authentication.

``` text
Register
   |
   v
Password hashing
   |
   v
MongoDB
   |
   v
Login
   |
   v
JWT token
   |
   v
Authenticated API requests
```

Authenticated requests use a bearer token:

``` http
Authorization: Bearer <token>
```

## API Routes

The application includes user and assistant-related API endpoints,
including:

``` text
/api/user/current
/api/user/update
/api/user/askToAssistant
```

The exact route behavior depends on the backend implementation.

## MongoDB Atlas

For production, MongoDB Atlas is used instead of a local MongoDB server.

Example:

``` env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/virtualAssistant
```

Do not publish the database username or password.

## Cloudinary

Cloudinary is used for assistant image/media management.

Required backend variables:

``` env
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Keep the API secret on the backend only.

## Gemini API

The Gemini API powers the AI assistant functionality.

Required backend configuration:

``` env
GEMINI_API_KEY=...
GEMINI_API_URL=...
```

The Gemini API key must never be exposed in frontend source code.

## Deployment

### Frontend --- Vercel

Recommended Vercel configuration:

``` text
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Production environment variable:

``` env
VITE_API_URL=https://virtual-assistant-backend-7hsm.onrender.com
```

After changing Vite environment variables, redeploy the frontend.

### Backend --- Render

Recommended Render configuration:

``` text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Configure all backend environment variables in Render.

For production:

``` env
FRONTEND_URL=https://YOUR-VERCEL-DOMAIN.vercel.app
```

The backend should use the Render-provided `PORT`:

``` js
const PORT = process.env.PORT || 5000;
```

### Production Architecture

``` text
                    Internet
                       |
             +---------+---------+
             |                   |
             v                   v
          Vercel              Render
       React Frontend      Express Backend
                                 |
                    +------------+------------+
                    |            |            |
                    v            v            v
               MongoDB       Cloudinary     Gemini
                 Atlas
```

## Security

Never commit:

``` text
.env
.env.local
.env.production
```

Never expose:

-   MongoDB passwords
-   JWT secrets
-   Cloudinary API secrets
-   Gemini API keys
-   Other private credentials

If a credential is accidentally exposed publicly, revoke or rotate it
immediately.

## Troubleshooting

### MongoDB URI is undefined

If Render logs show:

``` text
The `uri` parameter to `openUri()` must be a string, got "undefined"
```

make sure the environment variable name in Render exactly matches the
name used in the backend.

For example:

``` js
mongoose.connect(process.env.MONGODB_URI);
```

requires:

``` text
MONGODB_URI
```

in Render.

### CORS Error

Make sure production uses the Vercel frontend URL:

``` env
FRONTEND_URL=https://YOUR-VERCEL-DOMAIN.vercel.app
```

Do not use `http://localhost:5173` in production.

### Frontend Cannot Connect to Backend

Check:

``` env
VITE_API_URL=https://virtual-assistant-backend-7hsm.onrender.com
```

Then rebuild and redeploy the frontend.

### Case-Sensitive Import Errors

Vercel builds on Linux, where file names are case-sensitive.

For example, if the file is:

``` text
UserContext.jsx
```

the import should match the exact casing:

``` js
import UserContext from "./context/UserContext.jsx";
```

Not:

``` js
import UserContext from "./context/userContext.jsx";
```

## Useful Commands

### Backend

``` bash
cd backend
npm install
npm run dev
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

### Frontend Production Build

``` bash
cd frontend
npm run build
```

### Git

``` bash
git status
git add .
git commit -m "Update application"
git push origin main
```

## Production Checklist

-   [ ] Frontend deployed on Vercel
-   [ ] Backend deployed on Render
-   [ ] MongoDB Atlas connected
-   [ ] `MONGODB_URI` configured on Render
-   [ ] `JWT_SECRET` configured
-   [ ] Cloudinary credentials configured
-   [ ] Gemini credentials configured
-   [ ] `FRONTEND_URL` points to the Vercel domain
-   [ ] `VITE_API_URL` points to the Render backend
-   [ ] CORS configured correctly
-   [ ] Registration tested
-   [ ] Login tested
-   [ ] Protected routes tested
-   [ ] Assistant customization tested
-   [ ] Image upload tested
-   [ ] AI response tested
-   [ ] Logout tested
-   [ ] No secrets committed to GitHub

## Future Improvements

-   Conversation history
-   Multiple assistant personalities
-   Streaming AI responses
-   Improved voice controls
-   Refresh-token authentication
-   Email verification
-   Password reset
-   Admin dashboard
-   Usage analytics
-   Improved mobile accessibility
-   Progressive Web App support

## Author

**Lavkush Vishwakarma**

B.Tech --- Computer Science and Engineering

GitHub: https://github.com/lav71

## License

This project is currently intended for educational, portfolio, and
development purposes. Add an appropriate open-source license if you plan
to distribute the project under an open-source license.
