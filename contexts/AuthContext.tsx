import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile } from '../types';
import { supabase } from '../lib/supabaseClient';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  updateProfile: (profile: UserProfile) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Fetch profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          // Only treat profile as existing if it has a Full Name.
          const mappedProfile: UserProfile | undefined = (profileData && profileData.full_name) ? {
            fullName: profileData.full_name,
            profession: profileData.profession,
            yearsOfExperience: profileData.years_of_experience,
            designation: profileData.designation,
            collegeName: profileData.college_name,
            degreeName: profileData.degree_name,
            passOutYear: profileData.pass_out_year
          } : undefined;

          setUser({
            email: session.user.email!,
            isAuthenticated: true,
            profile: mappedProfile
          });
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
             const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

             const mappedProfile: UserProfile | undefined = (profileData && profileData.full_name) ? {
                fullName: profileData.full_name,
                profession: profileData.profession,
                yearsOfExperience: profileData.years_of_experience,
                designation: profileData.designation,
                collegeName: profileData.college_name,
                degreeName: profileData.degree_name,
                passOutYear: profileData.pass_out_year
              } : undefined;

            setUser({
                email: session.user.email!,
                isAuthenticated: true,
                profile: mappedProfile
            });
            setIsLoading(false);
        } else {
            setUser(null);
            setIsLoading(false);
        }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // We do not set isLoading(true) here because onAuthStateChange handles the state update.
    // Setting it manually can cause race conditions or stuck loading states if the listener is slow or doesn't fire.
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  };

  const signup = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) throw error;
    return data;
  };

  const updateProfile = async (profile: UserProfile) => {
    setIsLoading(true);
    try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) throw new Error("No authenticated user");

        const updates = {
            id: authUser.id,
            email: authUser.email,
            full_name: profile.fullName,
            profession: profile.profession,
            years_of_experience: profile.yearsOfExperience,
            designation: profile.designation,
            college_name: profile.collegeName,
            degree_name: profile.degreeName,
            pass_out_year: profile.passOutYear,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) throw error;

        // Update local state immediately for responsiveness
        if (user) {
            setUser({ ...user, profile });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    } finally {
        setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
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