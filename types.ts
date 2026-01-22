
import { ReactNode } from 'react';

export type Category = 
  | 'Foundations' 
  | 'Research' 
  | 'Data' 
  | 'Design' 
  | 'AI' 
  | 'Strategy'
  | 'Tech'
  | 'Job Ready';

export type Profession = 'Student' | 'Professional';

export interface UserProfile {
  fullName: string;
  profession: Profession;
  yearsOfExperience?: string;
  designation?: string;
  collegeName?: string;
  degreeName?: string;
  passOutYear?: string;
}

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
