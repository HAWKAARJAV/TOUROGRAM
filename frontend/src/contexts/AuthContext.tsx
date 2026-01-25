import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
}

interface TripPlan {
  _id: string;
  destination: string;
  itinerary: string[];
  vibe: string;
  quote: string;
  estimatedDuration: string;
  bestSeason: string;
  emotionalTone?: string;
  generatedAt: Date;
}

interface MoodHistoryEntry {
  emotion: string;
  date: Date;
  source: 'story' | 'planner' | 'manual';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  showLogoutConfirmation: boolean;
  setShowLogoutConfirmation: (show: boolean) => void;
  // AI Travel Planner features
  userMood: string;
  setUserMood: (mood: string) => void;
  recentTripPlan: TripPlan | null;
  setRecentTripPlan: (plan: TripPlan | null) => void;
  moodHistory: MoodHistoryEntry[];
  addMoodToHistory: (emotion: string, source: 'story' | 'planner' | 'manual') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Dummy users data - matching your database credentials
const dummyUsers: Record<string, User> = {
  'hawk@example.com': {
    id: '701b8f82-4166-4395-bc4e-1c8ecb57676f',
    username: 'hawk',
    displayName: 'Hawk',
    email: 'hawk@example.com',
    avatar: undefined
  },
  'aarjav@example.com': {
    id: 'fe72764d-7e50-420d-a173-c0eb528ac0b1',
    username: 'aarjav',
    displayName: 'Aarjav',
    email: 'aarjav@example.com',
    avatar: undefined
  },
  'rita@example.com': {
    id: '475a386a-10b6-456f-be7a-9fb04340cfe3',
    username: 'rita',
    displayName: 'Rita',
    email: 'rita@example.com',
    avatar: undefined
  },
  'sam@example.com': {
    id: 'db2245aa-e983-4027-a843-a8c4ac871745',
    username: 'sam',
    displayName: 'Sam',
    email: 'sam@example.com',
    avatar: undefined
  },
  'anya@example.com': {
    id: 'cfcb73d4-cd1a-4cdd-ac7a-d611010d6ca2',
    username: 'anya',
    displayName: 'Anya',
    email: 'anya@example.com',
    avatar: undefined
  }
};// Default user for new registrations
const defaultNewUser: User = {
  id: 'new-user-' + Date.now(),
  username: 'newuser',
  displayName: 'New User',
  email: '',
  avatar: undefined
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  
  // AI Travel Planner state
  const [userMood, setUserMood] = useState<string>('peaceful');
  const [recentTripPlan, setRecentTripPlan] = useState<TripPlan | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodHistoryEntry[]>([]);
  
  const navigate = useNavigate();

  // Load mood state from localStorage
  React.useEffect(() => {
    const savedMood = localStorage.getItem('userMood');
    const savedPlan = localStorage.getItem('recentTripPlan');
    const savedMoodHistory = localStorage.getItem('moodHistory');
    
    if (savedMood) setUserMood(savedMood);
    if (savedPlan) {
      try {
        setRecentTripPlan(JSON.parse(savedPlan));
      } catch (e) {
        console.error('Failed to parse saved trip plan', e);
      }
    }
    if (savedMoodHistory) {
      try {
        setMoodHistory(JSON.parse(savedMoodHistory));
      } catch (e) {
        console.error('Failed to parse mood history', e);
      }
    }
  }, []);

  // Save mood state to localStorage
  React.useEffect(() => {
    localStorage.setItem('userMood', userMood);
  }, [userMood]);

  React.useEffect(() => {
    if (recentTripPlan) {
      localStorage.setItem('recentTripPlan', JSON.stringify(recentTripPlan));
    }
  }, [recentTripPlan]);

  React.useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  // Function to add mood to history
  const addMoodToHistory = (emotion: string, source: 'story' | 'planner' | 'manual') => {
    const newEntry: MoodHistoryEntry = {
      emotion,
      date: new Date(),
      source
    };
    setMoodHistory(prev => [...prev.slice(-19), newEntry]); // Keep last 20 entries
    setUserMood(emotion);
  };

  // Check for existing session on component mount
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('currentUserEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (token && userEmail && isLoggedIn === 'true') {
      // Try to find existing user first
      const existingUser = dummyUsers[userEmail];
      
      if (existingUser) {
        setUser(existingUser);
      } else {
        // Restore new user session
        const newUser = {
          ...defaultNewUser,
          email: userEmail,
          displayName: userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1),
          username: userEmail.split('@')[0]
        };
        setUser(newUser);
      }
      
      setIsAuthenticated(true);
    }
  }, []);

  // Dummy login function with specific users
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      // Check if email matches existing dummy user
      const existingUser = dummyUsers[email.toLowerCase()];
      
      if (existingUser) {
        // Use existing user with stories
        setUser(existingUser);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', `token-${existingUser.id}`);
        localStorage.setItem('currentUserId', existingUser.id);
        localStorage.setItem('currentUserEmail', existingUser.email);
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        // Create new user for any other email
        const newUser = {
          ...defaultNewUser,
          email: email.toLowerCase(),
          displayName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          username: email.split('@')[0]
        };
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', `token-${newUser.id}`);
        localStorage.setItem('currentUserId', newUser.id);
        localStorage.setItem('currentUserEmail', newUser.email);
        localStorage.setItem('isLoggedIn', 'true');
      }
      
      navigate('/explore');
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('isLoggedIn');
    setShowLogoutConfirmation(false);
    navigate('/');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    showLogoutConfirmation,
    setShowLogoutConfirmation,
    // AI Travel Planner features
    userMood,
    setUserMood,
    recentTripPlan,
    setRecentTripPlan,
    moodHistory,
    addMoodToHistory,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;