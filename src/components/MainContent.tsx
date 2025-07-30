import React from 'react';
import { AppProject } from '../types';

interface MainContentProps {
  project: AppProject | null;
}

export default function MainContent({ project }: MainContentProps) {
  return (
    <div className="flex-1 bg-slate-50">
      {/* This component is now handled by the split view in App.tsx */}
    </div>
  );
}