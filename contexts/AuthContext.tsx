import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile } from '../types';
import { supabase } from '../lib/supabaseClient';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  updateProfile: (profile: UserProfile) => Promise<void>;
  markLessonComplete: (day: number) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to map DB columns (snake_case) to App types (camelCase)
  const mapProfileFromDB = (data: any): UserProfile | undefined => {
    if (!data) return undefined;
    // Only return if enough data exists to consider it a valid profile
    // We check profession as a key indicator of a completed setup
    if (!data.profession) return undefined;

    return {
        fullName: data.full_name,
        profession: data.profession,
        yearsOfExperience: data.years_of_experience,
        designation: data.designation,
        collegeName: data.college_name,
        degreeName: data.degree_name,
        passOutYear: data.pass_out_year
    };
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
    }
    return data;
  };

  const fetchProgress = async (userId: string) => {
    const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_day')
        .eq('user_id', userId);
    
    if (error) {
        console.error('Error fetching progress:', error);
        return [];
    }
    return data.map((item: any) => item.lesson_day);
  };

  const refreshUserData = async (sessionUser: any) => {
      if (!sessionUser) return;
      
      const [profileData, completedLessons] = await Promise.all([
          fetchProfile(sessionUser.id),
          fetchProgress(sessionUser.id)
      ]);
      
      const mappedProfile = mapProfileFromDB(profileData);

      setUser({
        email: sessionUser.email || '',
        isAuthenticated: true,
        profile: mappedProfile,
        completedLessons: completedLessons
      });
  };

  useEffect(() => {
    // Check active session on load
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
           await refreshUserData(session.user);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
         await refreshUserData(session.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password
        });

        if (error) throw error;
        return data;
    } catch (err) {
        throw err;
    } finally {
        setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password: password
        });

        if (error) throw error;
        return data;
    } catch (err) {
        throw err;
    } finally {
        setIsLoading(false);
    }
  };

  const updateProfile = async (profile: UserProfile) => {
    setIsLoading(true);
    try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!currentUser) throw new Error("No user logged in");

        const updates = {
            id: currentUser.id,
            full_name: profile.fullName,
            profession: profile.profession,
            years_of_experience: profile.yearsOfExperience,
            designation: profile.designation,
            college_name: profile.collegeName,
            degree_name: profile.degreeName,
            pass_out_year: profile.passOutYear,
            updated_at: new Date().toISOString(),
        };

        const { error } = await supabase
            .from('profiles')
            .upsert(updates);

        if (error) throw error;

        // Update local state
        if (user) {
            setUser({
                ...user,
                profile: profile
            });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    } finally {
        setIsLoading(false);
    }
  };

  const markLessonComplete = async (day: number) => {
    if (!user) return;

    try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!currentUser) return;

        const { error } = await supabase
            .from('user_progress')
            .upsert({
                user_id: currentUser.id,
                lesson_day: day,
                is_completed: true,
                completed_at: new Date().toISOString()
            }, { onConflict: 'user_id,lesson_day' });

        if (error) throw error;

        // Update local state
        if (!user.completedLessons.includes(day)) {
            setUser({
                ...user,
                completedLessons: [...user.completedLessons, day]
            });
        }
    } catch (error) {
        console.error('Error marking lesson complete:', error);
        throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
        await supabase.auth.signOut();
        setUser(null);
    } catch (error) {
        console.error("Error logging out", error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
        user, 
        isLoading, 
        login, 
        signup,
        updateProfile, 
        markLessonComplete,
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