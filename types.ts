import { ReactNode } from 'react';

export type Category = 
  | 'Foundations' 
  | 'Research' 
  | 'Data' 
  | 'Design' 
  | 'AI' 
  | 'Strategy'
  | 'Tech';

export interface Lesson {
  day: number;
  title: string;
  category: Category;
  preview: string;
  content: ReactNode;
  assignment?: ReactNode;
  resources?: { title: string; url: string; type: 'video' | 'article' | 'tool' }[];
}

export interface ModuleInfo {
  id: string;
  title: string;
  category: Category;
  description: string;
}

export type Profession = 'Student' | 'Professional';

export interface UserProfile {
  fullName: string;
  profession: Profession;
  // Professional fields
  yearsOfExperience?: string;
  designation?: string;
  // Student fields
  collegeName?: string;
  degreeName?: string;
  passOutYear?: string;
}

export interface User {
  email: string;
  isAuthenticated: boolean;
  profile?: UserProfile;
  completedLessons: number[]; // Array of completed day numbers
}