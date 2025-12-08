import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  verifyMagicLink: (token: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  resendOtp: () => Promise<void>;
  updateProfile: (profile: UserProfile) => Promise<void>;
  logout: () => void;
  tempEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tempEmail, setTempEmail] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('pm_launchpad_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // --- OTP Logic (Legacy/Alternative) ---
  const login = async (email: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(generatedCode);
    setTempEmail(email);
    
    console.log(`%c🔐 PM Launchpad OTP: ${generatedCode}`, 'color: #4f46e5; font-size: 16px; font-weight: bold;');
    alert(`PM Launchpad: Your verification code is ${generatedCode}`);
    
    setIsLoading(false);
  };

  const resendOtp = async () => {
    if (tempEmail) {
        await login(tempEmail);
    }
  };

  const verifyOtp = async (otp: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otp === otpCode && tempEmail) {
      const existingProfile = localStorage.getItem(`profile_${tempEmail}`);
      
      const newUser: User = {
        email: tempEmail,
        isAuthenticated: true,
        profile: existingProfile ? JSON.parse(existingProfile) : undefined
      };
      
      setUser(newUser);
      localStorage.setItem('pm_launchpad_user', JSON.stringify(newUser));
      setOtpCode(null);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  // --- Magic Link / Email Confirmation Logic ---
  
  const sendMagicLink = async (email: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a secure random token
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    // Store token -> email mapping in localStorage to simulate a DB pending verification table
    // This allows the link to work even if the user closes the tab
    const pendingTokens = JSON.parse(localStorage.getItem('pm_launchpad_pending_tokens') || '{}');
    pendingTokens[token] = { email, expires: Date.now() + 3600000 }; // 1 hour expiry
    localStorage.setItem('pm_launchpad_pending_tokens', JSON.stringify(pendingTokens));
    
    setTempEmail(email);

    // Construct the link (handling hash router)
    const link = `${window.location.origin}/#/confirm?token=${token}`;
    
    console.log(`%c📨 PM Launchpad Magic Link: ${link}`, 'color: #10b981; font-size: 16px; font-weight: bold;');
    // We don't alert the link here, we let the EmailSent page handle the "Dev Mode" display
    
    setIsLoading(false);
  };

  const verifyMagicLink = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate validation API call

    const pendingTokens = JSON.parse(localStorage.getItem('pm_launchpad_pending_tokens') || '{}');
    const tokenData = pendingTokens[token];

    if (tokenData && tokenData.expires > Date.now()) {
        const email = tokenData.email;
        
        // Check for existing profile
        const existingProfile = localStorage.getItem(`profile_${email}`);
        
        const newUser: User = {
            email: email,
            isAuthenticated: true,
            profile: existingProfile ? JSON.parse(existingProfile) : undefined
        };

        setUser(newUser);
        localStorage.setItem('pm_launchpad_user', JSON.stringify(newUser));
        
        // Cleanup used token
        delete pendingTokens[token];
        localStorage.setItem('pm_launchpad_pending_tokens', JSON.stringify(pendingTokens));
        
        setIsLoading(false);
        return true;
    }

    setIsLoading(false);
    return false;
  };

  const updateProfile = async (profile: UserProfile) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (user) {
      const updatedUser = { ...user, profile };
      setUser(updatedUser);
      localStorage.setItem('pm_launchpad_user', JSON.stringify(updatedUser));
      localStorage.setItem(`profile_${user.email}`, JSON.stringify(profile));
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setTempEmail(null);
    setOtpCode(null);
    localStorage.removeItem('pm_launchpad_user');
  };

  return (
    <AuthContext.Provider value={{ 
        user, 
        isLoading, 
        login, 
        verifyOtp, 
        resendOtp, 
        sendMagicLink, 
        verifyMagicLink,
        updateProfile, 
        logout, 
        tempEmail 
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