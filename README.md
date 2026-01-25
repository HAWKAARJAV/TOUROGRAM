<div align="center">

# 🌍 Tourogram

### *Discover the World Through Local Stories*

A hyperlocal travel storytelling platform where travelers and locals share authentic, location-based experiences and discover hidden gems through the lens of real people.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Tourogram-00C7B7?style=for-the-badge)](https://tourogram.netlify.app)
[![API Docs](https://img.shields.io/badge/📚_API-Documentation-FF6B6B?style=for-the-badge)](https://tourogram-tdp7.onrender.com/api/docs)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Demo](#-demo-credentials) • [Deployment](#-deployment)

</div>

---

## 🌟 Live Deployments

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | [tourogram.netlify.app](https://tourogram.netlify.app) | Production React App (Netlify) |
| **Backend API** | [tourogram-tdp7.onrender.com](https://tourogram-tdp7.onrender.com) | RESTful API Server (Render) |
| **API Docs** | [API Documentation](https://tourogram-tdp7.onrender.com/api/docs) | Interactive Swagger Docs |

---

## ✨ Features

### 🎯 Core Functionality
- **📍 Location-Based Stories** - Geotagged storytelling tied to specific places
- **🗺️ Interactive Map** - Explore stories visually with MapTiler integration
- **🔐 Secure Authentication** - JWT-based auth with persistent sessions
- **📱 Responsive Design** - Seamless experience across all devices
- **🎨 Modern UI/UX** - Premium design with glassmorphism and smooth animations

### 💎 User Experience
- **👤 User Profiles** - Personalized dashboards and story management
- **📝 Rich Story Editor** - Create engaging stories with text and media
- **🔍 Smart Discovery** - Browse by location, tags, and trends
- **💬 Social Engagement** - Likes, views, and community interaction
- **🏆 Trending Stories** - Discover popular content in real-time

### 🛠️ Technical Highlights
- **Dynamic Island Navigation** - iOS-inspired premium navbar
- **Optimistic UI Updates** - Lightning-fast interactions
- **Advanced Caching** - TanStack Query for optimal performance
- **Error Recovery** - Graceful fallbacks and error boundaries
- **SEO Optimized** - Server-side rendering ready

---

## 🚀 Tech Stack

### Frontend
```
React 18.3         TypeScript 5.0      Vite 5.0
Tailwind CSS       Shadcn/UI           React Router v6
TanStack Query     MapTiler SDK        Lucide Icons
```

### Backend
```
Node.js 20         Express.js          MongoDB Atlas
Mongoose ODM       JWT Auth            Bcrypt
Swagger/OpenAPI    Helmet Security     Rate Limiting
```

### DevOps & Deployment
```
Netlify (Frontend)    Render (Backend)     MongoDB Atlas
GitHub Actions        Environment Vars     CORS Config
```

---

## 🎬 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas account)
- Git

### One-Command Setup 🚀
```bash
# Clone and setup everything
git clone https://github.com/HAWKAARJAV/TOUROGRAM.git
cd TOUROGRAM
./setup.sh
```

### Start Development
```bash
# Start both frontend and backend
./start-all.sh

# Or individually
./start-backend.sh     # Backend → http://localhost:3001
./start-frontend.sh    # Frontend → http://localhost:8080
```

### Access the Application
- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:3001
- **API Docs:** http://localhost:3001/api/docs

---

## 📋 Demo Credentials

**Admin Account**
```
Email: admin@example.com
Password: test1234
```

**User Accounts**
```
Email: rita@example.com  |  sam@example.com
Password: test1234       |  test1234
```

*Or create your own account in seconds!*

---

## 📁 Project Structure

```
tourogram/
├── frontend/vite-frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navigation.tsx
│   │   │   ├── StoryCard.tsx
│   │   │   └── ui/           # Shadcn components
│   │   ├── pages/            # Route pages
│   │   │   ├── Index.tsx     # Landing page
│   │   │   ├── Explore.tsx   # Story discovery
│   │   │   └── SubmitStory.tsx
│   │   ├── contexts/         # React contexts
│   │   ├── lib/              # API client & utils
│   │   └── types/            # TypeScript types
│   └── package.json
│
├── backend/
│   ├── server.js             # Express entry point
│   ├── controllers/          # Business logic
│   ├── routes/               # API routes
│   ├── models/               # Mongoose schemas
│   ├── middleware/           # Auth & error handling
│   └── config/               # App configuration
│
└── docs/                     # Documentation
```

---

## 🔧 Configuration

### Backend Environment (.env)
```bash
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tourogram
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-refresh-secret
```

### Frontend Environment (.env.local)
```bash
VITE_API_URL=https://tourogram-tdp7.onrender.com
VITE_MAPTILER_API_KEY=your-maptiler-key
VITE_APP_NAME=Tourogram
```

---

## 🌐 Deployment

### Frontend (Netlify)
```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables
VITE_API_URL=https://tourogram-tdp7.onrender.com
```

### Backend (Render)
```bash
# Build command
npm install

# Start command
node server.js

# Environment variables
MONGODB_URI=[your-mongodb-atlas-uri]
NODE_ENV=production
```

---

## 🎨 Key Features Explained

### 📍 Location-Based Storytelling
Every story is tied to a specific geographical location with coordinates, enabling map-based discovery and hyperlocal content exploration.

### 🗺️ Interactive Map Integration
Built with MapTiler, users can:
- View stories as markers on an interactive map
- Click markers to preview stories
- Auto-center and smart zoom based on story locations
- Toggle between list and map views

### 🔐 JWT Authentication
Secure, stateless authentication with:
- Access tokens (15 min expiry)
- Refresh tokens (30 day expiry)
- Role-based access control (Admin/User)
- Protected routes and API endpoints

### 📱 Premium UI/UX
- **Dynamic Island Navigation** - iOS-inspired floating navbar
- **Glassmorphism Effects** - Modern frosted glass aesthetics
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Mobile-first approach

---

## 🛠️ Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build

# Backend
npm start            # Start server
npm run dev          # Start with nodemon
npm test             # Run tests
```

### Tech Decisions

| Technology | Why We Chose It |
|------------|----------------|
| **React 18** | Concurrent features, improved performance |
| **TypeScript** | Type safety, better developer experience |
| **Vite** | Lightning-fast HMR, optimal build times |
| **Tailwind CSS** | Rapid UI development, consistent design |
| **MongoDB** | Flexible schema, geospatial queries |
| **Express.js** | Minimal, flexible, industry standard |

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check connection string includes database name
mongodb+srv://user:pass@cluster.mongodb.net/tourogram
                                                ^^^^^^^^
```

### CORS Errors
Verify `FRONTEND_URL` in backend `.env` matches your frontend domain:
```bash
FRONTEND_URL=https://tourogram.netlify.app
```

### Port Conflicts
Frontend auto-switches to port 8081 if 8080 is busy. Backend requires port 3001 to be available.

---

## 📚 API Documentation

Visit [https://tourogram-tdp7.onrender.com/api/docs](https://tourogram-tdp7.onrender.com/api/docs) for interactive Swagger documentation.

### Key Endpoints

```
GET    /api/v1/stories              # Get all stories
GET    /api/v1/stories/:id          # Get story by ID
POST   /api/v1/stories              # Create story (auth)
PUT    /api/v1/stories/:id          # Update story (auth)
DELETE /api/v1/stories/:id          # Delete story (auth)

GET    /api/v1/stories/trending     # Get trending stories
POST   /api/v1/auth/register        # Register user
POST   /api/v1/auth/login           # Login user
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Aarjav Jain**

[![GitHub](https://img.shields.io/badge/GitHub-HAWKAARJAV-181717?style=flat&logo=github)](https://github.com/HAWKAARJAV)
[![Repository](https://img.shields.io/badge/Repo-TOUROGRAM-00C7B7?style=flat&logo=github)](https://github.com/HAWKAARJAV/TOUROGRAM)

---

## 🙏 Acknowledgments

- [Shadcn/UI](https://ui.shadcn.com/) - Beautiful component library
- [MapTiler](https://www.maptiler.com/) - Mapping infrastructure
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Community](https://react.dev/) - Excellent documentation and ecosystem
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

<div align="center">

### 🌍 Start Sharing Your Travel Stories Today!

[![Visit Tourogram](https://img.shields.io/badge/Visit-Tourogram-00C7B7?style=for-the-badge&logo=safari)](https://tourogram.netlify.app)

**Made with ❤️ for travelers and storytellers worldwide**

</div>