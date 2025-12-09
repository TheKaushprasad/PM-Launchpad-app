import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  updateProfile: (profile: UserProfile) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'pm_launchpad_users';
const SESSION_KEY = 'pm_launchpad_session';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for active session in local storage
    const loadSession = () => {
      try {
        const storedSession = localStorage.getItem(SESSION_KEY);
        if (storedSession) {
          const sessionUser = JSON.parse(storedSession);
          setUser({
            email: sessionUser.email,
            isAuthenticated: true,
            profile: sessionUser.profile
          });
        }
      } catch (error) {
        console.error('Error loading session:', error);
        localStorage.removeItem(SESSION_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
        const usersStr = localStorage.getItem(USERS_KEY);
        const users = usersStr ? JSON.parse(usersStr) : [];
        const foundUser = users.find((u: any) => u.email === email && u.password === password);

        if (!foundUser) {
            throw new Error('Invalid email or password');
        }

        const userObj = {
            email: foundUser.email,
            isAuthenticated: true,
            profile: foundUser.profile
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(userObj));
        setUser(userObj);
        return { user: userObj };
    } catch (err) {
        throw err;
    } finally {
        setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
        const usersStr = localStorage.getItem(USERS_KEY);
        const users = usersStr ? JSON.parse(usersStr) : [];
        
        if (users.find((u: any) => u.email === email)) {
            throw new Error('User already exists');
        }

        const newUser = { email, password, profile: null };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        // Auto login after signup
        const userObj = {
            email: newUser.email,
            isAuthenticated: true,
            profile: null
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(userObj));
        setUser(userObj);

        return { user: userObj, session: true };
    } catch (err) {
        throw err;
    } finally {
        setIsLoading(false);
    }
  };

  const updateProfile = async (profile: UserProfile) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        const sessionStr = localStorage.getItem(SESSION_KEY);
        if (!sessionStr) throw new Error("No authenticated user");
        
        const sessionUser = JSON.parse(sessionStr);
        const email = sessionUser.email;

        // Update in users array to persist across sessions
        const usersStr = localStorage.getItem(USERS_KEY);
        const users = usersStr ? JSON.parse(usersStr) : [];
        const userIndex = users.findIndex((u: any) => u.email === email);

        if (userIndex !== -1) {
            users[userIndex].profile = profile;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }

        // Update current session
        const updatedUser = { ...sessionUser, profile };
        localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
        setUser(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    } finally {
        setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
        user, 
        isLoading, 
        login, 
        signup,
        updateProfile, 
        logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};