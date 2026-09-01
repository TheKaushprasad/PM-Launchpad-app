import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { 
  User, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  deleteUser,
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc,
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import { InterviewSessionHistory } from '../types/interview';
import { LinkedInAnalysisResult } from '../types/linkedin';
import { StoredResumeDocument } from '../types/resumeAuditor';

export type UserType = 'college_student' | 'working_professional' | 'student' | 'professional';

export interface EducationInfo {
  passingOutYear?: string | number;
  degree?: string;
  collegeName?: string;
}

export interface ProfessionalInfo {
  companyName?: string;
  designation?: string;
  yearsOfExperience?: string | number;
}

export interface CareerInfo {
  targetRole?: string;
  industry?: string;
}

export interface FirebaseUserProfile {
  uid: string;
  userId: string;
  name: string;
  displayName: string;
  email: string;
  photoURL?: string;
  authProvider?: 'google' | 'password' | 'email' | string;
  userType?: UserType;
  
  // Structured Nested Objects
  education?: EducationInfo;
  professional?: ProfessionalInfo;
  career?: CareerInfo;

  // Flattened accessors for seamless backward compatibility
  collegeName?: string;
  degree?: string;
  graduationYear?: string | number;
  companyName?: string;
  designation?: string;
  experienceYears?: string | number;
  targetRole?: string;
  industry?: string;
  linkedinUrl?: string;

  // Course tracking
  completedDaysCount?: number;
  streakDays?: number;
  
  // Latest LinkedIn optimization score
  latestLinkedInScore?: number;
  latestLinkedInAnalysisDate?: string;

  createdAt: string;
  updatedAt: string;
}

export interface SignUpParams {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  userType: UserType;
  
  // If student
  collegeName?: string;
  degree?: string;
  graduationYear?: string | number;
  passingOutYear?: string | number;

  // If professional
  companyName?: string;
  designation?: string;
  experienceYears?: string | number;
  yearsOfExperience?: string | number;

  // Career
  targetRole?: string;
  industry?: string;
  linkedinUrl?: string;
}

export interface LessonProgressState {
  completed: boolean;
  notes?: string;
  bookmarked?: boolean;
  scrollPosition?: number;
  scrollPercentage?: number;
  lastReadAt?: string;
  completedAt?: string;
  updatedAt?: string;
}

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return regex.test(email.trim());
}

export function getFriendlyAuthErrorMessage(err: any): string {
  const code = err?.code || '';
  if (code === 'auth/operation-not-allowed') {
    return "Email/password sign-in isn't enabled yet. Please enable Email/Password in Firebase Authentication settings or continue with Google.";
  }
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return 'Email or password is incorrect.';
  }
  if (code === 'auth/email-already-in-use') {
    return 'An account already exists with this email. Try logging in instead.';
  }
  if (code === 'auth/weak-password') {
    return 'Please choose a stronger password (at least 8 characters, with letters and numbers).';
  }
  if (code === 'auth/invalid-email') {
    return 'Please enter a valid email address.';
  }
  if (code === 'auth/popup-closed-by-user') {
    return 'Google sign-in was cancelled.';
  }
  if (code === 'auth/popup-blocked') {
    return 'Your browser blocked the Google sign-in popup. Please allow popups and try again.';
  }
  if (code === 'auth/requires-recent-login') {
    return 'For security, please log out and log back in before performing this action.';
  }
  if (err?.message) {
    return err.message;
  }
  return 'An unexpected authentication error occurred. Please try again.';
}

interface AuthContextType {
  user: User | null;
  currentUser: User | null;
  userProfile: FirebaseUserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  needsOnboarding: boolean;
  
  // Auth Operations
  signInWithGoogle: (additionalProfile?: Partial<SignUpParams>) => Promise<User | null>;
  signInWithEmail: (email: string, password: string) => Promise<User>;
  signUpWithEmail: (params: SignUpParams) => Promise<User>;
  sendVerificationEmail: (userToVerify?: User) => Promise<void>;
  reloadUser: () => Promise<boolean>;
  updateUserProfileData: (updates: Partial<FirebaseUserProfile>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  
  // LinkedIn Analyses Store
  userAnalyses: LinkedInAnalysisResult[];
  recordLinkedInAnalysis: (analysis: LinkedInAnalysisResult) => Promise<void>;
  deleteUserAnalysis: (analysisId: string) => Promise<void>;

  // Stored Resumes in Cloud Firestore
  storedResumes: StoredResumeDocument[];
  saveResumeDocument: (docData: Omit<StoredResumeDocument, 'userId'>) => Promise<void>;
  deleteResumeDocument: (resumeId: string) => Promise<void>;

  // Lessons and Interviews
  progressMap: Record<number, LessonProgressState>;
  interviewHistory: InterviewSessionHistory[];
  completedCount: number;
  toggleLessonComplete: (day: number) => Promise<void>;
  updateLessonNotes: (day: number, notes: string) => Promise<void>;
  toggleLessonBookmark: (day: number) => Promise<void>;
  updateLessonScrollPosition: (day: number, scrollPosition: number, scrollPercentage: number) => Promise<void>;
  recordInterviewSession: (session: InterviewSessionHistory, evaluationSummary?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function cleanFirestorePayload<T extends Record<string, any>>(obj: T): T {
  const result: any = Array.isArray(obj) ? [] : {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (val === undefined) {
      continue;
    }
    if (val !== null && typeof val === 'object' && !(val instanceof Date)) {
      result[key] = cleanFirestorePayload(val);
    } else {
      result[key] = val;
    }
  }
  return result;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<FirebaseUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userAnalyses, setUserAnalyses] = useState<LinkedInAnalysisResult[]>([]);
  const [storedResumes, setStoredResumes] = useState<StoredResumeDocument[]>([]);
  const [progressMap, setProgressMap] = useState<Record<number, LessonProgressState>>(() => {
    try {
      const savedProgress = localStorage.getItem('pm_launchpad_progress');
      if (savedProgress) {
        return JSON.parse(savedProgress);
      }
    } catch (e) {}
    return {};
  });
  const progressMapRef = useRef<Record<number, LessonProgressState>>(progressMap);
  useEffect(() => {
    progressMapRef.current = progressMap;
  }, [progressMap]);
  const [interviewHistory, setInterviewHistory] = useState<InterviewSessionHistory[]>([]);

  // 1. Listen for Auth State Changes & Sync User Profile
  useEffect(() => {
    let profileUnsubscribe: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (profileUnsubscribe) {
        profileUnsubscribe();
        profileUnsubscribe = null;
      }

      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const path = `users/${currentUser.uid}`;

        // Set up real-time listener for user profile (works offline and online)
        profileUnsubscribe = onSnapshot(
          userDocRef,
          async (docSnap) => {
            const now = new Date().toISOString();
            if (!docSnap.exists()) {
              setUserProfile(prev => {
                if (prev && prev.uid === currentUser.uid && prev.userType) {
                  // If we already have a rich profile from signup in local state, keep it
                  return prev;
                }
                const providerId = currentUser.providerData?.[0]?.providerId === 'google.com' ? 'google' : 'password';
                const newProfile: FirebaseUserProfile = {
                  uid: currentUser.uid,
                  userId: currentUser.uid,
                  name: currentUser.displayName || 'PM Aspiring Talent',
                  displayName: currentUser.displayName || 'PM Aspiring Talent',
                  email: currentUser.email || '',
                  photoURL: currentUser.photoURL || '',
                  authProvider: providerId,
                  career: {
                    targetRole: 'Product Manager',
                    industry: 'SaaS'
                  },
                  completedDaysCount: 0,
                  streakDays: 1,
                  createdAt: now,
                  updatedAt: now
                };
                // Non-blocking write
                setDoc(userDocRef, newProfile, { merge: true }).catch(e => console.warn("Init profile write:", e));
                return newProfile;
              });
            } else {
              const data = docSnap.data() as FirebaseUserProfile;
              setUserProfile(data);
            }
            setLoading(false);
          },
          (err) => {
            console.warn(`Profile sync offline/warning for ${path}:`, err?.message || err);
            // Fallback profile from currentUser so user is never blocked or left in loading state
            setUserProfile(prev => prev || {
              uid: currentUser.uid,
              userId: currentUser.uid,
              name: currentUser.displayName || 'PM Aspiring Talent',
              displayName: currentUser.displayName || 'PM Aspiring Talent',
              email: currentUser.email || '',
              photoURL: currentUser.photoURL || '',
              authProvider: currentUser.providerData?.[0]?.providerId === 'google.com' ? 'google' : 'password',
              completedDaysCount: 0,
              streakDays: 1,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            setLoading(false);
          }
        );
      } else {
        setUserProfile(null);
        setUserAnalyses([]);
        setProgressMap({});
        setInterviewHistory([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      if (profileUnsubscribe) {
        profileUnsubscribe();
      }
    };
  }, []);

  // 2. Real-time LinkedIn Analyses Listener
  useEffect(() => {
    if (!user) {
      setUserAnalyses([]);
      return;
    }

    const analysesColRef = collection(db, 'users', user.uid, 'analyses');
    const path = `users/${user.uid}/analyses`;

    const unsubscribe = onSnapshot(
      analysesColRef,
      (snapshot) => {
        const list: LinkedInAnalysisResult[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as LinkedInAnalysisResult;
          list.push({
            ...data,
            id: data.id || docSnap.id
          });
        });
        // Sort newest first
        list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setUserAnalyses(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // 2b. Real-time Resumes / CV Documents Listener
  useEffect(() => {
    if (!user) {
      try {
        const local = localStorage.getItem('pm_stored_resumes_local');
        if (local) setStoredResumes(JSON.parse(local));
        else setStoredResumes([]);
      } catch (e) {
        setStoredResumes([]);
      }
      return;
    }

    const resumesColRef = collection(db, 'users', user.uid, 'resumes');
    const path = `users/${user.uid}/resumes`;

    const unsubscribe = onSnapshot(
      resumesColRef,
      (snapshot) => {
        const list: StoredResumeDocument[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as StoredResumeDocument;
          list.push({
            ...data,
            id: data.id || docSnap.id,
            userId: user.uid
          });
        });
        // Sort newest first
        list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setStoredResumes(list);
        try {
          localStorage.setItem(`pm_stored_resumes_${user.uid}`, JSON.stringify(list));
        } catch (e) {}
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // 3. Real-time Lesson Progress Listener
  useEffect(() => {
    if (!user) {
      try {
        const savedProgress = localStorage.getItem('pm_launchpad_progress');
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          progressMapRef.current = parsed;
          setProgressMap(parsed);
        }
      } catch (e) {}
      return;
    }

    const progressColRef = collection(db, 'users', user.uid, 'progress');
    const path = `users/${user.uid}/progress`;

    const unsubscribe = onSnapshot(
      progressColRef,
      (snapshot) => {
        const remoteMap: Record<number, Partial<LessonProgressState>> = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const day = data.day !== undefined ? data.day : parseInt(docSnap.id.replace('day_', ''), 10);
          if (day !== undefined && !isNaN(day)) {
            remoteMap[day] = {
              ...(typeof data.completed === 'boolean' ? { completed: data.completed } : {}),
              ...(typeof data.notes === 'string' ? { notes: data.notes } : {}),
              ...(typeof data.bookmarked === 'boolean' ? { bookmarked: data.bookmarked } : {}),
              ...(typeof data.scrollPosition === 'number' ? { scrollPosition: data.scrollPosition } : {}),
              ...(typeof data.scrollPercentage === 'number' ? { scrollPercentage: data.scrollPercentage } : {}),
              ...(data.lastReadAt ? { lastReadAt: data.lastReadAt } : {}),
              ...(data.completedAt ? { completedAt: data.completedAt } : {}),
              ...(data.updatedAt ? { updatedAt: data.updatedAt } : {})
            };
          }
        });

        setProgressMap((prevMap) => {
          const merged: Record<number, LessonProgressState> = { ...prevMap };
          for (const key of Object.keys(remoteMap)) {
            const dayNum = Number(key);
            const remoteItem = remoteMap[dayNum];
            const localItem = prevMap[dayNum];
            
            merged[dayNum] = {
              completed: remoteItem.completed !== undefined ? remoteItem.completed : (localItem?.completed ?? false),
              bookmarked: remoteItem.bookmarked !== undefined ? remoteItem.bookmarked : (localItem?.bookmarked ?? false),
              notes: remoteItem.notes !== undefined ? remoteItem.notes : (localItem?.notes || ''),
              scrollPosition: remoteItem.scrollPosition !== undefined ? remoteItem.scrollPosition : localItem?.scrollPosition,
              scrollPercentage: remoteItem.scrollPercentage !== undefined ? remoteItem.scrollPercentage : localItem?.scrollPercentage,
              lastReadAt: remoteItem.lastReadAt || localItem?.lastReadAt,
              completedAt: remoteItem.completedAt || localItem?.completedAt,
              updatedAt: remoteItem.updatedAt || localItem?.updatedAt || new Date().toISOString()
            };
          }
          progressMapRef.current = merged;
          try {
            localStorage.setItem('pm_launchpad_progress', JSON.stringify(merged));
          } catch (e) {}
          return merged;
        });
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // 4. Real-time Interview Sessions History Listener
  useEffect(() => {
    if (!user) {
      try {
        const saved = localStorage.getItem('pm_interview_history');
        if (saved) {
          setInterviewHistory(JSON.parse(saved));
        }
      } catch (e) {}
      return;
    }

    const sessionsColRef = collection(db, 'users', user.uid, 'interview_sessions');
    const path = `users/${user.uid}/interview_sessions`;

    const unsubscribe = onSnapshot(
      sessionsColRef,
      (snapshot) => {
        const list: InterviewSessionHistory[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          list.push({
            id: d.sessionId || docSnap.id,
            scenarioId: d.scenarioId,
            scenarioTitle: d.scenarioTitle || '',
            company: d.company || '',
            track: d.track || 'rca',
            date: d.createdAt ? new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
            score: d.score || 0,
            verdict: d.verdict || 'Lean Yes',
            durationMinutes: d.durationMinutes || 15
          });
        });
        list.sort((a, b) => (b.id > a.id ? 1 : -1));
        setInterviewHistory(list);
        try {
          localStorage.setItem('pm_interview_history', JSON.stringify(list));
        } catch (e) {}
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Sign In with Google Popup
  const signInWithGoogle = async (additionalProfile?: Partial<SignUpParams>) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const currentUser = result.user;
      if (currentUser) {
        if (additionalProfile?.name && (!currentUser.displayName || currentUser.displayName === 'PM Aspiring Talent')) {
          try {
            await updateProfile(currentUser, { displayName: additionalProfile.name });
          } catch (e) {
            console.warn("Could not update auth display name:", e);
          }
        }

        const userDocRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDocRef).catch(() => null);
        const now = new Date().toISOString();

        const uType = additionalProfile?.userType || (docSnap?.exists() ? docSnap.data()?.userType : undefined);
        const isStudent = uType === 'student' || uType === 'college_student';
        const isProfessional = uType === 'professional' || uType === 'working_professional';

        const profileData: FirebaseUserProfile = {
          uid: currentUser.uid,
          userId: currentUser.uid,
          name: additionalProfile?.name || currentUser.displayName || (docSnap?.exists() ? docSnap.data()?.name : 'PM Aspiring Talent'),
          displayName: additionalProfile?.name || currentUser.displayName || (docSnap?.exists() ? docSnap.data()?.displayName : 'PM Aspiring Talent'),
          email: currentUser.email || '',
          photoURL: currentUser.photoURL || '',
          authProvider: 'google',
          ...(uType ? { userType: uType } : {}),
          ...(isStudent ? {
            education: {
              passingOutYear: additionalProfile?.passingOutYear || additionalProfile?.graduationYear || docSnap?.data()?.education?.passingOutYear || '2025',
              degree: additionalProfile?.degree || docSnap?.data()?.education?.degree || '',
              collegeName: additionalProfile?.collegeName || docSnap?.data()?.education?.collegeName || ''
            },
            collegeName: additionalProfile?.collegeName || docSnap?.data()?.collegeName || '',
            degree: additionalProfile?.degree || docSnap?.data()?.degree || '',
            graduationYear: additionalProfile?.passingOutYear || additionalProfile?.graduationYear || docSnap?.data()?.graduationYear || '2025',
          } : {}),
          ...(isProfessional ? {
            professional: {
              companyName: additionalProfile?.companyName || docSnap?.data()?.professional?.companyName || '',
              designation: additionalProfile?.designation || docSnap?.data()?.professional?.designation || '',
              yearsOfExperience: additionalProfile?.yearsOfExperience || additionalProfile?.experienceYears || docSnap?.data()?.professional?.yearsOfExperience || '1-3 years'
            },
            companyName: additionalProfile?.companyName || docSnap?.data()?.companyName || '',
            designation: additionalProfile?.designation || docSnap?.data()?.designation || '',
            experienceYears: additionalProfile?.yearsOfExperience || additionalProfile?.experienceYears || docSnap?.data()?.experienceYears || '1-3 years',
          } : {}),
          career: {
            targetRole: additionalProfile?.targetRole || docSnap?.data()?.career?.targetRole || 'Product Manager',
            industry: additionalProfile?.industry || docSnap?.data()?.career?.industry || 'SaaS'
          },
          targetRole: additionalProfile?.targetRole || docSnap?.data()?.targetRole || 'Product Manager',
          industry: additionalProfile?.industry || docSnap?.data()?.industry || 'SaaS',
          linkedinUrl: additionalProfile?.linkedinUrl || docSnap?.data()?.linkedinUrl || '',
          completedDaysCount: docSnap?.exists() ? (docSnap.data()?.completedDaysCount || 0) : 0,
          streakDays: docSnap?.exists() ? (docSnap.data()?.streakDays || 1) : 1,
          createdAt: docSnap?.exists() ? (docSnap.data()?.createdAt || now) : now,
          updatedAt: now
        };

        await Promise.race([
          setDoc(userDocRef, profileData, { merge: true }),
          new Promise((resolve) => setTimeout(resolve, 2000))
        ]).catch(e => console.warn("Google user profile save warning:", e));
        setUserProfile(profileData);
      }
      return currentUser;
    } catch (err: any) {
      console.error("Google sign in failed:", err);
      throw err;
    }
  };

  // Sign In with Email & Password
  const signInWithEmail = async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      return userCredential.user;
    } catch (err: any) {
      console.warn("Email sign in error:", err?.code || err?.message || err);
      throw err;
    }
  };

  // Sign Up with Email, Password & Complete Profile Information
  const signUpWithEmail = async (params: SignUpParams): Promise<User> => {
    if (!params.email || !params.password) {
      throw new Error("Email and password are required.");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, params.email.trim(), params.password);
      const newUser = userCredential.user;

      if (params.name) {
        try {
          await updateProfile(newUser, { displayName: params.name.trim() });
        } catch (e) {
          console.warn("Could not update auth display name:", e);
        }
      }

      const now = new Date().toISOString();
      const isStudent = params.userType === 'student' || params.userType === 'college_student';
      const isProfessional = params.userType === 'professional' || params.userType === 'working_professional';

      const profileData: FirebaseUserProfile = {
        uid: newUser.uid,
        userId: newUser.uid,
        name: params.name.trim() || 'PM Aspiring Talent',
        displayName: params.name.trim() || 'PM Aspiring Talent',
        email: newUser.email || params.email.trim(),
        photoURL: newUser.photoURL || '',
        authProvider: 'password',
        userType: params.userType,
        ...(isStudent ? {
          education: {
            passingOutYear: params.passingOutYear || params.graduationYear || '2026',
            degree: params.degree?.trim() || '',
            collegeName: params.collegeName?.trim() || ''
          },
          collegeName: params.collegeName?.trim() || '',
          degree: params.degree?.trim() || '',
          graduationYear: params.passingOutYear || params.graduationYear || '2026',
        } : {}),
        ...(isProfessional ? {
          professional: {
            companyName: params.companyName?.trim() || '',
            designation: params.designation?.trim() || '',
            yearsOfExperience: params.yearsOfExperience || params.experienceYears || '1-3 years'
          },
          companyName: params.companyName?.trim() || '',
          designation: params.designation?.trim() || '',
          experienceYears: params.yearsOfExperience || params.experienceYears || '1-3 years',
        } : {}),
        career: {
          targetRole: params.targetRole || 'Product Manager',
          industry: params.industry || 'SaaS'
        },
        targetRole: params.targetRole || 'Product Manager',
        industry: params.industry || 'SaaS',
        linkedinUrl: params.linkedinUrl?.trim() || '',
        completedDaysCount: 0,
        streakDays: 1,
        createdAt: now,
        updatedAt: now
      };

      // Set user profile in state immediately
      setUserProfile(profileData);

      // Persist profile to Firestore with timeout safety so offline/slow network never hangs the signup flow
      const userDocRef = doc(db, 'users', newUser.uid);
      try {
        await Promise.race([
          setDoc(userDocRef, profileData, { merge: true }),
          new Promise((resolve) => setTimeout(resolve, 2000))
        ]);
      } catch (docErr) {
        console.warn("Firestore user profile save notice:", docErr);
      }

      // Send verification email to verify the user's email address
      try {
        await sendEmailVerification(newUser);
      } catch (verifErr) {
        console.warn("Could not dispatch initial sendEmailVerification:", verifErr);
      }

      return newUser;
    } catch (err: any) {
      console.warn("Sign up error:", err?.code || err?.message || err);
      throw err;
    }
  };

  // Send verification email on demand
  const sendVerificationEmail = async (userToVerify?: User): Promise<void> => {
    const targetUser = userToVerify || auth.currentUser || user;
    if (!targetUser) {
      throw new Error("No active user to send verification email to.");
    }
    await sendEmailVerification(targetUser);
  };

  // Reload user auth token and check if email is verified
  const reloadUser = async (): Promise<boolean> => {
    if (!auth.currentUser) return false;
    try {
      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;
      if (updatedUser) {
        setUser({ ...updatedUser } as User);
        const isVerified = Boolean(
          updatedUser.emailVerified || 
          updatedUser.providerData?.some(p => p.providerId === 'google.com')
        );
        return isVerified;
      }
      return false;
    } catch (err) {
      console.warn("Could not reload user auth state:", err);
      return false;
    }
  };

  // Update user profile info with optimistic UI and parallel non-blocking execution
  const updateUserProfileData = async (updates: Partial<FirebaseUserProfile>) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    const now = new Date().toISOString();
    
    // Maintain deep compatibility with both nested and flat fields
    const isStudent = updates.userType === 'student' || updates.userType === 'college_student' || userProfile?.userType === 'student' || userProfile?.userType === 'college_student';
    const isProfessional = updates.userType === 'professional' || updates.userType === 'working_professional' || userProfile?.userType === 'professional' || userProfile?.userType === 'working_professional';

    const mergedData: Partial<FirebaseUserProfile> = cleanFirestorePayload({
      uid: user.uid,
      userId: user.uid,
      email: user.email || '',
      ...updates,
      ...(updates.name ? { displayName: updates.name } : {}),
      ...(updates.displayName ? { name: updates.displayName } : {}),
      ...(isStudent ? {
        education: {
          passingOutYear: updates.graduationYear || updates.education?.passingOutYear || userProfile?.education?.passingOutYear || '2026',
          degree: updates.degree || updates.education?.degree || userProfile?.education?.degree || '',
          collegeName: updates.collegeName || updates.education?.collegeName || userProfile?.education?.collegeName || ''
        }
      } : {}),
      ...(isProfessional ? {
        professional: {
          companyName: updates.companyName || updates.professional?.companyName || userProfile?.professional?.companyName || '',
          designation: updates.designation || updates.professional?.designation || userProfile?.professional?.designation || '',
          yearsOfExperience: updates.experienceYears || updates.professional?.yearsOfExperience || userProfile?.professional?.yearsOfExperience || '1-3 years'
        }
      } : {}),
      ...(updates.targetRole || updates.industry ? {
        career: {
          targetRole: updates.targetRole || userProfile?.career?.targetRole || 'Product Manager',
          industry: updates.industry || userProfile?.career?.industry || 'Technology'
        }
      } : {}),
      onboardingCompleted: true,
      updatedAt: now
    });

    // 1. Optimistically update local React state immediately (0ms UI lag)
    setUserProfile(prev => (prev ? { ...prev, ...mergedData } : (mergedData as FirebaseUserProfile)));

    // Also persist to localStorage cache so it is immediately available across tabs / reloads
    try {
      localStorage.setItem(`pm_user_profile_${user.uid}`, JSON.stringify(mergedData));
    } catch {}

    // 2. Prepare concurrent async tasks
    const tasks: Promise<any>[] = [
      setDoc(userDocRef, mergedData, { merge: true })
    ];

    // 3. Only update Firebase Auth profile if displayName or photoURL actually changed
    const targetDisplayName = (updates.name || updates.displayName || '').trim();
    const targetPhotoURL = updates.photoURL !== undefined ? updates.photoURL.trim() : undefined;
    
    if (auth.currentUser) {
      const nameChanged = Boolean(targetDisplayName && targetDisplayName !== (auth.currentUser.displayName || ''));
      const photoChanged = Boolean(targetPhotoURL !== undefined && targetPhotoURL !== (auth.currentUser.photoURL || ''));
      
      if (nameChanged || photoChanged) {
        tasks.push(
          updateProfile(auth.currentUser, {
            ...(nameChanged ? { displayName: targetDisplayName } : {}),
            ...(photoChanged ? { photoURL: targetPhotoURL } : {})
          }).catch(authErr => {
            console.warn("Auth displayName/photoURL update warning:", authErr);
          })
        );
      }
    }

    try {
      await Promise.all(tasks);
    } catch (err) {
      console.error("Firestore update error:", err);
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
    }
  };

  // Record a LinkedIn Analysis Result to Firestore
  const recordLinkedInAnalysis = async (analysis: LinkedInAnalysisResult) => {
    if (!user) return;
    const sanitizedId = (analysis.id || `audit_${Date.now()}`).replace(/[^a-zA-Z0-9_\-]/g, '_');
    const docPath = `users/${user.uid}/analyses/${sanitizedId}`;
    const docRef = doc(db, 'users', user.uid, 'analyses', sanitizedId);
    const now = new Date().toISOString();

    const analysisToSave: LinkedInAnalysisResult = {
      ...analysis,
      id: sanitizedId,
      createdAt: analysis.createdAt || now
    };

    try {
      await setDoc(docRef, analysisToSave);
      
      // Update top-level user profile with latest score
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        latestLinkedInScore: analysis.overallScore,
        latestLinkedInAnalysisDate: now,
        updatedAt: now
      }, { merge: true });

      setUserProfile(prev => prev ? {
        ...prev,
        latestLinkedInScore: analysis.overallScore,
        latestLinkedInAnalysisDate: now,
        updatedAt: now
      } : null);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, docPath);
    }
  };

  // Delete a LinkedIn Analysis Result
  const deleteUserAnalysis = async (analysisId: string) => {
    if (!user) return;
    const sanitizedId = analysisId.replace(/[^a-zA-Z0-9_\-]/g, '_');
    const docPath = `users/${user.uid}/analyses/${sanitizedId}`;
    const docRef = doc(db, 'users', user.uid, 'analyses', sanitizedId);
    try {
      await deleteDoc(docRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, docPath);
    }
  };

  // Save Resume / CV Document to Firestore
  const saveResumeDocument = async (docData: Omit<StoredResumeDocument, 'userId'>) => {
    const itemToSave: StoredResumeDocument = {
      ...docData,
      userId: user?.uid || 'guest',
      storageMode: user ? 'firestore' : 'local'
    };

    // Optimistic local update
    setStoredResumes(prev => [itemToSave, ...prev.filter(r => r.id !== itemToSave.id)]);

    if (!user) {
      try {
        const local = JSON.parse(localStorage.getItem('pm_stored_resumes_local') || '[]');
        const updated = [itemToSave, ...local.filter((r: StoredResumeDocument) => r.id !== itemToSave.id)];
        localStorage.setItem('pm_stored_resumes_local', JSON.stringify(updated));
      } catch (e) {}
      return;
    }

    const sanitizedId = itemToSave.id.replace(/[^a-zA-Z0-9_\-]/g, '_');
    const docPath = `users/${user.uid}/resumes/${sanitizedId}`;
    const docRef = doc(db, 'users', user.uid, 'resumes', sanitizedId);

    try {
      const payload = cleanFirestorePayload({
        id: sanitizedId,
        userId: user.uid,
        fileName: itemToSave.fileName.slice(0, 200),
        fileSize: itemToSave.fileSize,
        fileType: itemToSave.fileType || 'application/pdf',
        extractedText: itemToSave.extractedText.slice(0, 50000),
        wordCount: itemToSave.wordCount,
        storageMode: 'firestore',
        createdAt: itemToSave.createdAt || new Date().toISOString()
      });
      await setDoc(docRef, payload, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, docPath);
    }
  };

  // Delete a Stored Resume Document
  const deleteResumeDocument = async (resumeId: string) => {
    // Optimistic update
    setStoredResumes(prev => prev.filter(r => r.id !== resumeId));

    if (!user) {
      try {
        const local = JSON.parse(localStorage.getItem('pm_stored_resumes_local') || '[]');
        const updated = local.filter((r: StoredResumeDocument) => r.id !== resumeId);
        localStorage.setItem('pm_stored_resumes_local', JSON.stringify(updated));
      } catch (e) {}
      return;
    }

    const sanitizedId = resumeId.replace(/[^a-zA-Z0-9_\-]/g, '_');
    const docPath = `users/${user.uid}/resumes/${sanitizedId}`;
    const docRef = doc(db, 'users', user.uid, 'resumes', sanitizedId);
    try {
      await deleteDoc(docRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, docPath);
    }
  };

  // Reset Password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err: any) {
      console.error("Password reset failed:", err);
      throw err;
    }
  };

  // Sign Out
  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      setUserAnalyses([]);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  // Delete Account Permanently
  const deleteAccount = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const uid = currentUser.uid;

    try {
      // 1. Delete user profile doc from Firestore
      const userDocRef = doc(db, 'users', uid);
      await deleteDoc(userDocRef);

      // 2. Delete Auth user from Firebase
      await deleteUser(currentUser);
      
      setUser(null);
      setUserProfile(null);
      setUserAnalyses([]);
      setProgressMap({});
      setInterviewHistory([]);
      try {
        localStorage.removeItem('pm_launchpad_progress');
        localStorage.removeItem('pm_interview_history');
      } catch (e) {}
    } catch (err: any) {
      console.error("Delete account error:", err);
      throw err;
    }
  };

  // Toggle Lesson Completion
  const toggleLessonComplete = async (day: number) => {
    const now = new Date().toISOString();
    const currentState = progressMapRef.current[day] || { completed: false, notes: '', bookmarked: false };
    const newCompleted = !currentState.completed;
    const currentNotes = currentState.notes || '';
    const currentBookmarked = !!currentState.bookmarked;

    const updatedState: LessonProgressState = {
      ...currentState,
      completed: newCompleted,
      completedAt: newCompleted ? now : undefined,
      updatedAt: now
    };

    const updatedMap = { ...progressMapRef.current, [day]: updatedState };
    progressMapRef.current = updatedMap;
    const count = Object.values(updatedMap).filter(p => p.completed).length;

    try {
      localStorage.setItem('pm_launchpad_progress', JSON.stringify(updatedMap));
    } catch (e) {}

    setProgressMap(updatedMap);

    if (user) {
      const docPath = `users/${user.uid}/progress/day_${day}`;
      const docRef = doc(db, 'users', user.uid, 'progress', `day_${day}`);
      try {
        const payload = cleanFirestorePayload({
          userId: user.uid,
          day,
          completed: newCompleted,
          bookmarked: currentBookmarked,
          notes: currentNotes.slice(0, 5000),
          completedAt: newCompleted ? now : null,
          scrollPosition: currentState.scrollPosition,
          scrollPercentage: currentState.scrollPercentage,
          lastReadAt: currentState.lastReadAt,
          updatedAt: now
        });

        await setDoc(docRef, payload, { merge: true });

        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          completedDaysCount: count,
          updatedAt: now
        }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, docPath);
      }
    }
  };

  // Update Lesson Notes
  const updateLessonNotes = async (day: number, notes: string) => {
    const now = new Date().toISOString();
    const cleanNotes = (notes ?? '').slice(0, 5000);
    const currentState = progressMapRef.current[day] || { completed: false, notes: '', bookmarked: false };
    const currentCompleted = !!currentState.completed;
    const currentBookmarked = !!currentState.bookmarked;

    const updatedState: LessonProgressState = {
      ...currentState,
      notes: cleanNotes,
      updatedAt: now
    };

    const updatedMap = { ...progressMapRef.current, [day]: updatedState };
    progressMapRef.current = updatedMap;

    try {
      localStorage.setItem('pm_launchpad_progress', JSON.stringify(updatedMap));
    } catch (e) {}

    setProgressMap(updatedMap);

    if (user) {
      const docPath = `users/${user.uid}/progress/day_${day}`;
      const docRef = doc(db, 'users', user.uid, 'progress', `day_${day}`);
      try {
        const payload = cleanFirestorePayload({
          userId: user.uid,
          day,
          completed: currentCompleted,
          notes: cleanNotes,
          bookmarked: currentBookmarked,
          completedAt: currentState.completedAt,
          scrollPosition: currentState.scrollPosition,
          scrollPercentage: currentState.scrollPercentage,
          lastReadAt: currentState.lastReadAt,
          updatedAt: now
        });

        await setDoc(docRef, payload, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, docPath);
      }
    }
  };

  // Toggle Lesson Bookmark
  const toggleLessonBookmark = async (day: number) => {
    const now = new Date().toISOString();
    const currentState = progressMapRef.current[day] || { completed: false, notes: '', bookmarked: false };
    const newBookmarked = !currentState.bookmarked;
    const currentCompleted = !!currentState.completed;
    const currentNotes = currentState.notes || '';

    const updatedState: LessonProgressState = {
      ...currentState,
      bookmarked: newBookmarked,
      updatedAt: now
    };

    const updatedMap = { ...progressMapRef.current, [day]: updatedState };
    progressMapRef.current = updatedMap;

    try {
      localStorage.setItem('pm_launchpad_progress', JSON.stringify(updatedMap));
    } catch (e) {}

    setProgressMap(updatedMap);

    if (user) {
      const docPath = `users/${user.uid}/progress/day_${day}`;
      const docRef = doc(db, 'users', user.uid, 'progress', `day_${day}`);
      try {
        const payload = cleanFirestorePayload({
          userId: user.uid,
          day,
          completed: currentCompleted,
          bookmarked: newBookmarked,
          notes: currentNotes.slice(0, 5000),
          completedAt: currentState.completedAt,
          scrollPosition: currentState.scrollPosition,
          scrollPercentage: currentState.scrollPercentage,
          lastReadAt: currentState.lastReadAt,
          updatedAt: now
        });

        await setDoc(docRef, payload, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, docPath);
      }
    }
  };

  // Update Lesson Reading & Scroll Position
  const updateLessonScrollPosition = async (day: number, scrollPosition: number, scrollPercentage: number) => {
    const now = new Date().toISOString();
    const cleanScrollTop = Math.max(0, Math.round(scrollPosition));
    const cleanPercentage = Math.min(100, Math.max(0, Math.round(scrollPercentage)));

    // 1. Direct synchronous localStorage write for zero latency on day switches/reloads
    try {
      localStorage.setItem(`pm_scroll_day_${day}`, JSON.stringify({
        scrollTop: cleanScrollTop,
        scrollPercentage: cleanPercentage,
        updatedAt: now
      }));
    } catch (e) {}

    const currentState = progressMapRef.current[day] || { completed: false, notes: '', bookmarked: false };
    if (
      currentState.scrollPosition === cleanScrollTop &&
      currentState.scrollPercentage === cleanPercentage
    ) {
      return;
    }

    const updatedState: LessonProgressState = {
      ...currentState,
      scrollPosition: cleanScrollTop,
      scrollPercentage: cleanPercentage,
      lastReadAt: now,
      updatedAt: now
    };

    const updatedMap = { ...progressMapRef.current, [day]: updatedState };
    progressMapRef.current = updatedMap;

    try {
      localStorage.setItem('pm_launchpad_progress', JSON.stringify(updatedMap));
    } catch (e) {}

    setProgressMap(updatedMap);

    // 3. Debounced cloud persistence to Firestore
    if (user) {
      const docPath = `users/${user.uid}/progress/day_${day}`;
      const docRef = doc(db, 'users', user.uid, 'progress', `day_${day}`);
      try {
        const payload = cleanFirestorePayload({
          userId: user.uid,
          day,
          completed: currentState.completed ?? false,
          bookmarked: currentState.bookmarked ?? false,
          notes: currentState.notes || '',
          scrollPosition: cleanScrollTop,
          scrollPercentage: cleanPercentage,
          lastReadAt: now,
          updatedAt: now
        });
        await setDoc(docRef, payload, { merge: true });
      } catch (err) {
        // Non-blocking catch for scroll streaming
      }
    }
  };

  // Record Interview Session to Firestore
  const recordInterviewSession = async (session: InterviewSessionHistory, evaluationSummary = '') => {
    const updatedList = [session, ...interviewHistory];
    setInterviewHistory(updatedList);
    try {
      localStorage.setItem('pm_interview_history', JSON.stringify(updatedList));
    } catch (e) {}

    if (user) {
      const sanitizedSessionId = session.id.replace(/[^a-zA-Z0-9_\-]/g, '_');
      const docPath = `users/${user.uid}/interview_sessions/${sanitizedSessionId}`;
      const docRef = doc(db, 'users', user.uid, 'interview_sessions', sanitizedSessionId);
      const now = new Date().toISOString();

      try {
        await setDoc(docRef, {
          sessionId: sanitizedSessionId,
          userId: user.uid,
          scenarioId: session.scenarioId,
          scenarioTitle: session.scenarioTitle.slice(0, 200),
          company: session.company.slice(0, 100),
          track: session.track,
          score: session.score,
          verdict: session.verdict,
          durationMinutes: session.durationMinutes,
          evaluationSummary: evaluationSummary.slice(0, 5000),
          createdAt: now
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, docPath);
      }
    }
  };

  const completedCount = Object.values(progressMap).filter(p => p.completed).length;
  const isAuthenticated = !!user;
  const isGoogleUser = user?.providerData?.some(p => p.providerId === 'google.com') ?? false;
  const isEmailVerified = Boolean(user && (user.emailVerified || isGoogleUser));
  const needsOnboarding = isAuthenticated && (!userProfile?.userType);

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser: user,
        userProfile,
        loading,
        isAuthenticated,
        isEmailVerified,
        needsOnboarding,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendVerificationEmail,
        reloadUser,
        updateUserProfileData,
        resetPassword,
        logout,
        deleteAccount,
        userAnalyses,
        recordLinkedInAnalysis,
        deleteUserAnalysis,
        storedResumes,
        saveResumeDocument,
        deleteResumeDocument,
        progressMap,
        interviewHistory,
        completedCount,
        toggleLessonComplete,
        updateLessonNotes,
        toggleLessonBookmark,
        updateLessonScrollPosition,
        recordInterviewSession
      }}
    >
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
