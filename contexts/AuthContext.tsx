import React, { createContext, useContext, ReactNode } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<{ user: any; session: any } | null>;
  logout: () => Promise<void>;
  updateProfile: (profile: UserProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const value = {
    user: null,
    isLoading: false,
    login: async (email: string, password: string) => {},
    signup: async (email: string, password: string) => { return null; },
    logout: async () => {},
    updateProfile: async (profile: UserProfile) => {}
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
    return {
      user: null,
      isLoading: false,
      login: async (email: string, password: string) => {},
      signup: async (email: string, password: string) => { return null; },
      logout: async () => {},
      updateProfile: async (profile: UserProfile) => {}
    };
  }
  return context;
};