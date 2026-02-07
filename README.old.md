<div align="center">

# 🌍 LocaleLens
### *Travel Stories by Real People, for Real People*

Share your travel experiences, discover hidden gems, and explore the world through authentic stories from locals and travelers.

---

### 🚀 **[Visit Live Website →](https://localelens.netlify.app)**

---

![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb)

</div>

---

## 📱 What is LocaleLens?

LocaleLens is a **travel storytelling website** where:
- 📝 **Travelers share** their experiences at specific locations
- 🗺️ **Others discover** these stories on an interactive map
- 💬 **Everyone connects** through authentic local experiences

**Think of it as:** Instagram meets Google Maps for travel stories!

---

## 🌐 Live Links

| What | Where | What It Does |
|------|-------|--------------|
| **Website** | [localelens.netlify.app](https://localelens.netlify.app) | Main website where users visit |
| **API Server** | [localelens-api.onrender.com](https://localelens-api.onrender.com) | Backend that stores data |
| **API Docs** | [API Documentation](https://localelens-api.onrender.com/api/docs) | Technical documentation |

---

## ✨ What Can You Do?

### For Everyone (No Login Needed)
- ✅ Browse travel stories from around the world
- ✅ View stories on an interactive map
- ✅ Read about hidden gems and local experiences
- ✅ Filter stories by location and tags

### For Registered Users
- ✅ Write and publish your own travel stories
- ✅ Add photos and location to your stories
- ✅ Manage your personal story collection
- ✅ Like and engage with other stories

### For Admins
- ✅ Moderate content and manage users
- ✅ View analytics and trending stories
- ✅ Manage the entire platform

---

## 🎯 Why This Project?

### The Problem
When traveling, people often miss **authentic local experiences** because:
- Travel blogs are generic and commercial
- Google reviews lack detailed stories
- Friends' recommendations get lost in chat history

### The Solution
LocaleLens provides:
- **Real stories** from real people
- **Location-specific** recommendations
- **Easy discovery** through interactive maps
- **Community-driven** content

---

## 🏗️ How It Works (Simple Explanation)

```
User Opens Website
        ↓
    Sees Stories
        ↓
Clicks on Story → Reads Details
        ↓
Likes Story / Writes Own Story
        ↓
Story Saved in Database
```

### Technical Flow (Slightly Detailed)

1. **Frontend (React Website)** - What you see and interact with
2. **Backend (Node.js Server)** - Handles requests and business logic
3. **Database (MongoDB)** - Stores all data (users, stories, locations)
4. **Map (MapTiler)** - Shows interactive maps

---

## 🛠️ Technologies Used (In Simple Terms)

### Frontend (What You See)
- **React** - Makes the website interactive and fast
- **TypeScript** - Adds safety to the code (catches errors early)
- **Tailwind CSS** - Makes it look beautiful and modern
- **Vite** - Makes development super fast

### Backend (Behind the Scenes)
- **Node.js** - Runs JavaScript on the server
- **Express** - Handles web requests (like when you click a button)
- **MongoDB** - Database that stores all information
- **JWT** - Keeps your login secure

### Deployment (Where It Lives)
- **Netlify** - Hosts the website (frontend)
- **Render** - Runs the server (backend)
- **MongoDB Atlas** - Cloud database

---

## 🚀 How to Run Locally (On Your Computer)

### What You Need
- Node.js installed on your computer
- MongoDB (or a free MongoDB Atlas account)
- Basic terminal/command line knowledge

### Step 1: Download the Code
```bash
git clone https://github.com/HAWKAARJAV/LocaleLens.git
cd LocaleLens
```

### Step 2: Setup Everything (One Command!)
```bash
./setup.sh
```
This installs all required packages for both frontend and backend.

### Step 3: Start the Application
```bash
# Start everything together
./start-all.sh

# Or start separately
./start-backend.sh    # Server runs at http://localhost:3001
./start-frontend.sh   # Website runs at http://localhost:8080
```

### Step 4: Open in Browser
Go to: **http://localhost:8080**

---

## 🔑 Test Accounts (Demo Login)

Try the website with these test accounts:

**Admin User:**
```
Email: admin@example.com
Password: test1234
```

**Regular User:**
```
Email: rita@example.com
Password: test1234
```

*Or create your own account!*

---

## 📂 Project Structure (What's What)

```
localelens/
│
├── frontend/               ← Website code (what you see)
│   └── vite-frontend/
│       ├── src/
│       │   ├── pages/      ← Different pages (Home, Explore, Profile)
│       │   ├── components/ ← Reusable UI parts (Buttons, Cards, etc.)
│       │   └── lib/        ← Helper functions and API calls
│       └── package.json    ← List of dependencies
│
├── backend/                ← Server code (handles requests)
│   ├── server.js          ← Main server file (starts here)
│   ├── routes/            ← URL paths (/api/stories, /api/users)
│   ├── controllers/       ← Business logic (what happens when you click)
│   ├── models/            ← Database structure (how data is stored)
│   └── middleware/        ← Security and validation
│
└── README.md              ← You are here!
```

---

## 🎨 Key Features Explained

### 1. 📍 Location-Based Stories
Every story is tied to a real place on the map. When you share a story, you pick the exact location, so others can find stories about specific places.

**Example:** "My experience at Qutub Minar, Delhi"

### 2. 🗺️ Interactive Map
See all stories as pins on a map! Click any pin to read the story.

**Why it's useful:** Discover stories in areas you're planning to visit

### 3. 🔐 Secure Login
Your account and stories are protected with:
- Encrypted passwords (bcrypt)
- Secure tokens (JWT)
- Session management

### 4. 📱 Mobile Responsive
Works perfectly on phones, tablets, and computers.

---

## 🔧 Configuration (For Developers)

### Backend Settings
Create a `.env` file in `backend/` folder:

```bash
# Basic Settings
NODE_ENV=development
PORT=3001

# Database (Get from MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/localelens

# Security Keys (Generate random strings)
JWT_SECRET=your-secret-key-here
REFRESH_TOKEN_SECRET=another-secret-key-here
```

### Frontend Settings
Create a `.env.local` file in `frontend/vite-frontend/` folder:

```bash
# API Connection
VITE_API_URL=http://localhost:3001

# Map Integration
VITE_MAPTILER_API_KEY=your-maptiler-key

# App Name
VITE_APP_NAME=LocaleLens
```

---

## 🌍 Deployment Guide

### Deploy Frontend (Netlify)
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL=https://localelens-api.onrender.com`
5. Deploy!

### Deploy Backend (Render)
1. Connect GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `node server.js`
4. Add environment variables (see Backend Settings above)
5. Deploy!

### Setup Database (MongoDB Atlas)
1. Create free account at [mongodb.com](https://www.mongodb.com)
2. Create a new cluster
3. Get connection string
4. Add to backend `.env` as `MONGODB_URI`

---

## 🐛 Common Problems & Solutions

### Problem: "Cannot connect to database"
**Solution:** Check if `MONGODB_URI` in `.env` includes the database name:
```
mongodb+srv://user:pass@cluster.mongodb.net/localelens
                                                ^^^^^^^^ (should have database name)
```

### Problem: "CORS Error" in browser
**Solution:** Make sure backend `.env` has:
```
FRONTEND_URL=https://localelens.netlify.app
```

### Problem: "Port already in use"
**Solution:** 
- Frontend automatically tries port 8081 if 8080 is busy
- For backend, stop other apps using port 3001

### Problem: "No stories showing"
**Solution:** Make sure both frontend and backend are running, and database has stories.

---

## 📚 API Endpoints (For Developers)

### Stories
```
GET    /api/v1/stories              → Get all stories
GET    /api/v1/stories/:id          → Get one story
POST   /api/v1/stories              → Create new story (login required)
PUT    /api/v1/stories/:id          → Update story (login required)
DELETE /api/v1/stories/:id          → Delete story (login required)
```

### Authentication
```
POST   /api/v1/auth/register        → Create new account
POST   /api/v1/auth/login           → Login
POST   /api/v1/auth/refresh         → Refresh auth token
```

### Users
```
GET    /api/v1/users/me             → Get my profile
PUT    /api/v1/users/me             → Update my profile
```

Full documentation: [https://localelens-api.onrender.com/api/docs](https://localelens-api.onrender.com/api/docs)

---

## 🤝 Want to Contribute?

1. Fork this repository
2. Create a new branch: `git checkout -b my-new-feature`
3. Make your changes
4. Commit: `git commit -m 'Add some feature'`
5. Push: `git push origin my-new-feature`
6. Create a Pull Request

---

## 👨‍💻 Created By

**Aarjav Jain**

- GitHub: [@HAWKAARJAV](https://github.com/HAWKAARJAV)
- Project: [LocaleLens](https://github.com/HAWKAARJAV/LocaleLens)

---

## 📄 License

Free to use under MIT License - do whatever you want with it!

---

## 💡 Future Ideas

- [ ] Add photo upload directly from camera
- [ ] Enable comments on stories
- [ ] Create travel itineraries
- [ ] Follow other travelers
- [ ] Offline mode for saved stories
- [ ] Multi-language support
- [ ] Story recommendations based on preferences

---

<div align="center">

### 🌍 Start Your Travel Story Today!

[![Visit Website](https://img.shields.io/badge/Visit-LocaleLens-00C7B7?style=for-the-badge)](https://localelens.netlify.app)

**Made with ❤️ for travelers everywhere**

---

*Questions? Found a bug? Open an issue on GitHub!*

</div>