export interface AppProject {
  id: string;
  name: string;
  description: string;
  type: 'web-app' | 'mobile-app' | 'api' | 'chrome-extension';
  status: 'draft' | 'generating' | 'generated' | 'deployed';
  createdAt: Date;
  updatedAt: Date;
  files?: ProjectFile[];
  preview?: string;
  deployUrl?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isOpen?: boolean;
  isModified?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: 'text' | 'code' | 'component';
}

export interface GenerationStep {
  id: string;
  title: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  progress?: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  preview: string;
  features: string[];
}