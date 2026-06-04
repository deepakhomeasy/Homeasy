// types.ts
export type ActiveTab = 'home' | 'solutions' | 'portfolio' | 'app' | 'product' | 'blog';

export interface LeadForm {
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  budget: string;
}

export interface AtmosphereScene {
  id: string;
  name: string;
  description: string;
  lightsColor: string;
  lightsIntensity: number;
  temp: number;
  musicActive: boolean;
  curtainsOpen: boolean;
  securityArmed: boolean;
}
// Update src/types/index.ts - Add these interfaces

export interface BlogCategory {
  id: string;
  name: string;
  icon?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;        // ← Make sure this exists
  content: string;
  author: string;
  authorBio?: string;
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  tags: string[];
}
