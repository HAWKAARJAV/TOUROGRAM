<div align="center">

# 🌟 StorySwap 2.0
### *AI-Powered Travel Stories & Trip Planner*

**From stories of where we've been to plans for where we'll go next.**

Share your travel experiences with emotion, discover authentic stories, and let AI plan your next adventure based on your wanderlust.

---

### 🚀 **[Visit Live Website →](https://localelens.netlify.app)**

---

![React](https://img.shields.io/badge/React_18-Frontend-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb)
![AI](https://img.shields.io/badge/AI_Powered-AgentX-FF6B6B?style=flat&logo=openai)

</div>

---

## 🎯 What is StorySwap 2.0?

StorySwap is an **AI-powered travel storytelling and trip planning platform** that combines:
- 📖 **Story Mode:** Share travel experiences with emotion tags and mood analysis
- 🤖 **Trip Planner Mode:** AI-powered travel suggestions based on your story history
- 🗺️ **Interactive Maps:** Discover stories on beautiful MapTiler maps
- 💫 **Dynamic Island UI:** Premium iOS-inspired glassmorphism navigation
- 🎭 **Emotion Analysis:** AI understands the vibe of your journey

**Think of it as:** Your personal travel diary meets an empathetic AI travel companion.

---

## ✨ Key Features

### 🎭 Story Mode (Enhanced)
- ✅ Upload travel stories with title, description, and photos
- ✅ **AI Emotion Analysis** - Automatically detects mood and vibe from your story
- ✅ Tag stories with emotions (peaceful, adventurous, romantic, spiritual)
- ✅ Location-based storytelling with interactive maps
- ✅ "Plan Similar Trip" button on every story card
- ✅ Beautiful glassmorphism UI with Dynamic Island navigation

### 🤖 AI Trip Planner (NEW!)
- ✅ **AgentX-Powered Chat** - Talk to SoulTrip, your AI travel companion
- ✅ **Personalized Suggestions** - Based on your previous story emotions
- ✅ **Cinematic Itineraries** - Get poetic, mood-based travel plans
- ✅ **Smart Recommendations** - "Where should I go next?"
- ✅ **Seamless Integration** - Access via Dynamic Island navbar

### 🎨 Premium Design
- ✅ **Dynamic Island Navigation** - iOS-inspired floating navbar
- ✅ **Glassmorphism Effects** - Blurred glass panels with soft shadows
- ✅ **Responsive & Modern** - Works beautifully on all devices
- ✅ **Ocean-Coral Theme** - Calming blues (#174c72) with coral accents (#ff6b6b)
- ✅ **Smooth Animations** - Gentle micro-interactions throughout

---

## 🧠 How It Works

### User Journey
```
1. Login/Register
   ↓
2. Upload Past Travel Stories (with emotion tags)
   ↓
3. AI Analyzes Your Travel Mood & Preferences
   ↓
4. Click "Plan Your Next Story" in Dynamic Island
   ↓
5. Chat with AI Travel Planner (SoulTrip Agent)
   ↓
6. Get Personalized Trip Suggestions & Itineraries
   ↓
7. Save Plans & Share Your Next Adventure
```

### Technical Architecture
```
Frontend (React + TypeScript + Vite)
↓ REST API
Backend (Node.js + Express)
↓
├─→ MongoDB (Stories, Users, Trip Plans)
├─→ AgentX API (AI Travel Planner)
└─→ OpenAI (Emotion Analysis - Optional)
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern component-based UI
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first styling
- **Shadcn/UI** - Premium component library
- **MapTiler** - Interactive map integration
- **TanStack Query** - Server state management
- **Framer Motion** - Smooth animations

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB + Mongoose** - NoSQL database
- **JWT** - Secure authentication
- **AgentX SDK** - AI chat integration
- **Swagger** - API documentation

### AI & APIs
- **AgentX** - AI travel planner agent
- **OpenAI** (optional) - Emotion analysis
- **MapTiler** - Map tiles and geocoding

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- AgentX API key
- MapTiler API key (optional)

### 1. Clone Repository
```bash
git clone https://github.com/HAWKAARJAV/story-swap-locale.git
cd TOUROGRAM
```

### 2. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure Environment Variables

**Backend (.env)**
```bash
# Server
NODE_ENV=development
PORT=3001

# Database
MONGODB_URI=mongodb://localhost:27017/storyswap
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/storyswap

# JWT Secrets
JWT_SECRET=your-super-secret-jwt-key-change-this
REFRESH_TOKEN_SECRET=your-refresh-token-secret-change-this

# AI Integration
AGENTX_API_KEY=your-agentx-key-here
OPENAI_API_KEY=your-openai-key-here  # Optional

# CORS
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env.local)**
```bash
# API Configuration
VITE_API_URL=http://localhost:3001

# AgentX Configuration
VITE_AGENTX_KEY=68e364e6585958bf1781cff5dizVVs46LfZvd8oe11yUvw==

# MapTiler (optional)
VITE_MAPTILER_API_KEY=your-maptiler-key

# App Configuration
VITE_APP_NAME=StorySwap
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs at http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs at http://localhost:5173
```

### 5. Open Browser
Navigate to **http://localhost:5173**

---

## 🔑 Demo Accounts

Test the platform with these accounts:

**Admin User:**
```
Email: admin@example.com
Password: test1234
```

**Regular Users:**
```
Email: hawk@example.com
Password: test1234

Email: aarjav@example.com
Password: test1234
```

---

## 📂 Project Structure

```
TOUROGRAM/
│
├── frontend/                      # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.tsx     # Dynamic Island navbar
│   │   │   ├── FloatingChatBubble.tsx  # AI chat interface
│   │   │   ├── EmotionAnalyzer.tsx     # Story emotion detection
│   │   │   ├── StoryCard.tsx      # Story display cards
│   │   │   └── ui/               # Shadcn/UI components
│   │   │
│   │   ├── pages/
│   │   │   ├── Index.tsx         # Landing page
│   │   │   ├── Explore.tsx       # Browse stories
│   │   │   ├── MyStories.tsx     # User's story collection
│   │   │   ├── SubmitStory.tsx   # Upload new story
│   │   │   ├── TravelPlanner.tsx # AI trip planner (NEW)
│   │   │   └── Profile.tsx       # User profile
│   │   │
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx   # Auth state management
│   │   │
│   │   ├── lib/
│   │   │   ├── api.ts           # API service layer
│   │   │   └── agentx.ts        # AgentX integration
│   │   │
│   │   └── config/
│   │       └── environment.ts   # Environment config
│   │
│   └── package.json
│
├── backend/                       # Node.js + Express backend
│   ├── server.js                 # Main entry point
│   │
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── storyController.js    # Story CRUD operations
│   │   └── travelController.js   # AI trip planning (NEW)
│   │
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   ├── stories.js           # Story endpoints
│   │   ├── travel.js            # AI planner endpoints (NEW)
│   │   └── agentx-proxy.js      # AgentX proxy (NEW)
│   │
│   ├── models/
│   │   ├── User.js              # User schema (+ mood history)
│   │   ├── Story.js             # Story schema (+ emotions)
│   │   ├── TripPlan.js          # Trip plan schema (NEW)
│   │   └── Location.js          # Location schema
│   │
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── errorHandler.js      # Error handling
│   │
│   └── package.json
│
└── docs/
    ├── STARTUP-GUIDE.md          # Detailed setup instructions
    ├── INVESTMENT_PROPOSAL.md    # Business pitch
    └── MAPTILER_SETUP.md         # Map configuration
```

---

## 🎨 UI/UX Highlights

### Dynamic Island Navigation
Premium iOS-inspired floating navbar with:
- Glassmorphism backdrop blur
- Smooth hover animations
- Active state indicators
- "Plan Your Next Story" quick access

### Emotion-Based Story Cards
Each story displays:
- 🎭 Emotion badges (peaceful, adventurous, romantic)
- 🌈 Mood color indicators
- 🤖 "Plan Similar Trip" AI button
- 📍 Location with interactive map link

### AI Chat Interface
- 💬 Floating chat bubble matching glassmorphism theme
- 🧠 Context-aware responses based on user's story history
- ✨ Cinematic travel suggestions with poetic narratives
- 📱 Responsive chat panel with smooth animations

---

## 🔌 API Endpoints

### Authentication
```http
POST   /api/v1/auth/register          # Create account
POST   /api/v1/auth/login             # Login
POST   /api/v1/auth/refresh           # Refresh token
GET    /api/v1/auth/me                # Get current user
```

### Stories
```http
GET    /api/v1/stories                # Get all stories
GET    /api/v1/stories/:id            # Get single story
POST   /api/v1/stories                # Create story (auth required)
PUT    /api/v1/stories/:id            # Update story (auth required)
DELETE /api/v1/stories/:id            # Delete story (auth required)
```

### AI Travel Planner (NEW)
```http
POST   /api/v1/travel/plan            # Get AI trip suggestions
POST   /api/v1/travel/emotion         # Analyze story emotion
GET    /api/v1/travel/user-mood       # Get user mood history
POST   /api/v1/agentx/chat            # AgentX chat proxy
```

### Users
```http
GET    /api/v1/users/me               # Get profile
PUT    /api/v1/users/me               # Update profile
GET    /api/v1/users/:id/stories      # Get user's stories
```

**Full API Docs:** [https://localelens-api.onrender.com/api/docs](https://localelens-api.onrender.com/api/docs)

---

## 🌍 Deployment

### Frontend (Netlify)
1. Connect GitHub repository to Netlify
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `frontend`
3. **Environment variables:**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   VITE_AGENTX_KEY=your-agentx-key
   VITE_MAPTILER_API_KEY=your-maptiler-key
   ```
4. Deploy!

### Backend (Render)
1. Create new Web Service on Render
2. **Build settings:**
   - Build command: `npm install`
   - Start command: `node server.js`
   - Root directory: `backend`
3. **Environment variables:** (see Backend .env above)
4. Deploy!

### Database (MongoDB Atlas)
1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist IP addresses (or use 0.0.0.0/0 for all)
4. Get connection string and add to `MONGODB_URI`

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Test AI Integration
```bash
cd backend
npm run test:agentx
```

### Manual Testing
1. Upload a story with emotion tags
2. Check if emotion analysis works
3. Click "Plan Your Next Story" in navbar
4. Chat with AI and verify personalized responses
5. Test "Plan Similar Trip" on story cards

---

## 🐛 Troubleshooting

### Issue: AgentX Chat Not Loading
**Solution:**
- Verify `VITE_AGENTX_KEY` in frontend `.env.local`
- Check browser console for CORS errors
- Ensure backend proxy route `/api/v1/agentx/*` is working

### Issue: Emotion Analysis Not Working
**Solution:**
- Check `OPENAI_API_KEY` in backend `.env`
- Verify API quota hasn't been exceeded
- Falls back to keyword-based detection if API fails

### Issue: Stories Not Showing
**Solution:**
- Verify MongoDB connection in backend logs
- Check if stories are published (`isPublished: true`)
- Run seed script: `npm run seed` in backend

### Issue: Map Not Loading
**Solution:**
- Verify `VITE_MAPTILER_API_KEY` in frontend `.env.local`
- Check MapTiler quota at [maptiler.com](https://www.maptiler.com)
- Map will fallback to text-based location display

---

## 🎓 Key Implementation Details

### Emotion Analysis Flow
```javascript
// 1. User uploads story
Story Upload → Extract Text → OpenAI Sentiment Analysis
                ↓
        Detect Emotions (peaceful, adventurous, etc.)
                ↓
        Store emotion + moodScore in Story model
                ↓
        Display emotion badges on story card
```

### AI Trip Planning Flow
```javascript
// 2. User clicks "Plan Your Next Story"
User Click → Fetch User's Story History → Extract Emotions
             ↓
     Send to AgentX with context:
     - Previous story emotions
     - Preferred locations
     - User mood history
             ↓
     AgentX Returns:
     - Destination suggestion
     - Personalized itinerary
     - Poetic narrative
     - Best season to visit
             ↓
     Display in chat UI + Save to TripPlan model
```

---

## 🚦 Roadmap

### Phase 1: Core Features (✅ Complete)
- [x] Story upload and sharing
- [x] User authentication
- [x] Interactive map integration
- [x] Glassmorphism UI with Dynamic Island

### Phase 2: AI Integration (✅ Complete)
- [x] AgentX chat integration
- [x] Emotion analysis for stories
- [x] AI trip planner mode
- [x] Personalized recommendations

### Phase 3: Enhanced Features (🚧 In Progress)
- [ ] Story comments and reactions
- [ ] Follow other travelers
- [ ] Collaborative trip planning
- [ ] Photo upload to cloud storage
- [ ] Multi-language support

### Phase 4: Social & Community (📋 Planned)
- [ ] Story swapping (exchange travel tips)
- [ ] Private story sharing
- [ ] Travel buddy matching
- [ ] Trip challenges and badges
- [ ] Community travel trails

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style and TypeScript conventions
- Test your changes thoroughly
- Update documentation if needed
- Write meaningful commit messages

---

## 👨‍💻 Created By

**Aarjav Jain**
- GitHub: [@HAWKAARJAV](https://github.com/HAWKAARJAV)
- Project: [StorySwap](https://github.com/HAWKAARJAV/story-swap-locale)
- LinkedIn: [Connect with me](https://linkedin.com/in/aarjav-jain)

**Vision:** "From stories of where we've been to plans for where we'll go next."

**AI Agents Used:**
- GitHub Copilot (code development)
- AgentX/SoulTrip (travel planning)
- OpenAI GPT (emotion analysis)

---

## 📄 License

This project is licensed under the **MIT License** - feel free to use it however you like!

---

## 🙏 Acknowledgments

- **MapTiler** - Beautiful map tiles
- **AgentX** - AI chat infrastructure
- **Shadcn/UI** - Premium component library
- **Vercel** - For inspiring the Dynamic Island UI concept
- **Travel Community** - For testing and feedback

---

<div align="center">

## 🌟 Star This Repo!

If you find StorySwap useful, give it a ⭐️ on GitHub!

### 🚀 Start Your Next Story Today

[![Visit Website](https://img.shields.io/badge/Visit-StorySwap-FF6B6B?style=for-the-badge)](https://localelens.netlify.app)
[![API Docs](https://img.shields.io/badge/API-Documentation-174C72?style=for-the-badge)](https://localelens-api.onrender.com/api/docs)

---

**Made with ❤️ and AI for travelers who story-tell**

*Questions? Found a bug? Open an issue!*

</div>
