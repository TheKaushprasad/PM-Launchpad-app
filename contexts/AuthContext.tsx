import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthUser extends UserProfile {
  isAuthenticated: boolean;
  completedDays?: number[];
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: {
    email: string;
    password?: string;
    fullName: string;
    profession: 'Student' | 'Working Professional';
    isAspiringPM: boolean;
  }) => Promise<{ user: AuthUser; session: any } | null>;
  logout: () => Promise<void>;
  updateProfile: (profile: UserProfile) => Promise<void>;
  toggleDayCompletion: (day: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'noob_pm_registered_users';
const SESSION_STORAGE_KEY = 'noob_pm_current_session';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load existing session on boot
    try {
      const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
      if (storedSession) {
        const parsedUser = JSON.parse(storedSession);
        setUser({ ...parsedUser, isAuthenticated: true });
      }
    } catch (e) {
      console.error('Failed to parse auth session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lowercaseEmail = email.toLowerCase().trim();
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const usersList = storedUsers ? JSON.parse(storedUsers) : [];

    const foundUser = usersList.find((u: any) => u.email.toLowerCase().trim() === lowercaseEmail);

    if (!foundUser) {
      throw new Error('Invalid login credentials. User not found.');
    }

    if (foundUser.password !== password) {
      throw new Error('Invalid login credentials. Incorrect password.');
    }

    // Store session
    const authUser: AuthUser = {
      fullName: foundUser.fullName,
      profession: foundUser.profession,
      isAspiringPM: foundUser.isAspiringPM,
      email: foundUser.email,
      isAuthenticated: true,
      collegeName: foundUser.collegeName,
      degreeName: foundUser.degreeName,
      passOutYear: foundUser.passOutYear,
      yearsOfExperience: foundUser.yearsOfExperience,
      designation: foundUser.designation,
      completedDays: foundUser.completedDays || [],
    };

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
  };

  const signup = async (payload: {
    email: string;
    password?: string;
    fullName: string;
    profession: 'Student' | 'Working Professional';
    isAspiringPM: boolean;
  }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lowercaseEmail = payload.email.toLowerCase().trim();
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    let usersList = storedUsers ? JSON.parse(storedUsers) : [];

    const exists = usersList.some((u: any) => u.email.toLowerCase().trim() === lowercaseEmail);
    if (exists) {
      throw new Error('A user with this email address already exists.');
    }

    // Save user profile details
    const newUserRecord = {
      ...payload,
      email: lowercaseEmail,
      completedDays: [],
    };
    usersList.push(newUserRecord);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersList));

    // Sign them in immediately
    const authUser: AuthUser = {
      fullName: payload.fullName,
      profession: payload.profession,
      isAspiringPM: payload.isAspiringPM,
      email: lowercaseEmail,
      isAuthenticated: true,
      completedDays: [],
    };

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);

    return { user: authUser, session: { id: 'local-session-id' } };
  };

  const logout = async () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
  };

  const updateProfile = async (profile: UserProfile) => {
    if (!user) return;
    const authUser: AuthUser = {
      ...user,
      ...profile,
      isAuthenticated: true,
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);

    // Also update in registered list
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (storedUsers && user.email) {
      const usersList = JSON.parse(storedUsers);
      const userEmail = user.email.toLowerCase().trim();
      const updatedList = usersList.map((u: any) => {
        if (u.email && u.email.toLowerCase().trim() === userEmail) {
          return { ...u, ...profile };
        }
        return u;
      });
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedList));
    }
  };

  const toggleDayCompletion = async (day: number) => {
    if (!user) return;
    const currentCompleted = user.completedDays || [];
    const isCompleted = currentCompleted.includes(day);
    const updatedCompleted = isCompleted
      ? currentCompleted.filter((d) => d !== day)
      : [...currentCompleted, day];

    const authUser: AuthUser = {
      ...user,
      completedDays: updatedCompleted,
      isAuthenticated: true,
    };

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);

    // Also update in registered list
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (storedUsers && user.email) {
      const usersList = JSON.parse(storedUsers);
      const userEmail = user.email.toLowerCase().trim();
      const updatedList = usersList.map((u: any) => {
        if (u.email && u.email.toLowerCase().trim() === userEmail) {
          return { ...u, completedDays: updatedCompleted };
        }
        return u;
      });
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedList));
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    toggleDayCompletion,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};