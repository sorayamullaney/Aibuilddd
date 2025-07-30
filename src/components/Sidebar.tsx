import React, { useState } from 'react';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Folder, 
  FileText, 
  Settings, 
  HelpCircle,
  Sparkles,
  Code2,
  Smartphone,
  Globe,
  Puzzle
} from 'lucide-react';
import { AppProject } from '../types';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNewProject: () => void;
  currentProject: AppProject | null;
}

const RECENT_PROJECTS = [
  { id: '1', name: 'E-commerce Store', type: 'web-app', status: 'deployed' },
  { id: '2', name: 'Task Manager', type: 'web-app', status: 'generated' },
  { id: '3', name: 'Weather App', type: 'mobile-app', status: 'draft' },
];

const PROJECT_TEMPLATES = [
  { id: 'web-app', name: 'Web Application', icon: Globe, color: 'bg-blue-500' },
  { id: 'mobile-app', name: 'Mobile App', icon: Smartphone, color: 'bg-green-500' },
  { id: 'api', name: 'API Service', icon: Code2, color: 'bg-purple-500' },
  { id: 'extension', name: 'Browser Extension', icon: Puzzle, color: 'bg-orange-500' },
];

export default function Sidebar({ collapsed, onToggle, onNewProject, currentProject }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<'projects' | 'templates'>('projects');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-500';
      case 'generated': return 'bg-blue-500';
      case 'generating': return 'bg-yellow-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900">AI Builder</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          )}
        </button>
      </div>

      {/* New Project Button */}
      <div className="p-4">
        <button
          onClick={onNewProject}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
            collapsed ? 'px-2' : ''
          }`}
        >
          <Plus className="w-4 h-4" />
          {!collapsed && <span className="font-medium">New Project</span>}
        </button>
      </div>

      {/* Navigation Tabs */}
      {!collapsed && (
        <div className="px-4 mb-4">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setActiveSection('projects')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === 'projects' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveSection('templates')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === 'templates' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Templates
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {!collapsed && activeSection === 'projects' && (
          <div className="px-4 space-y-4">
            {/* Current Project */}
            {currentProject && (
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Current Project
                </h3>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(currentProject.status)}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {currentProject.name}
                      </p>
                      <p className="text-xs text-slate-500 capitalize">
                        {currentProject.type.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Projects */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Recent Projects
              </h3>
              <div className="space-y-2">
                {RECENT_PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {project.name}
                      </p>
                      <p className="text-xs text-slate-500 capitalize">
                        {project.type.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!collapsed && activeSection === 'templates' && (
          <div className="px-4 space-y-2">
            {PROJECT_TEMPLATES.map((template) => {
              const Icon = template.icon;
              return (
                <button
                  key={template.id}
                  onClick={onNewProject}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
                >
                  <div className={`w-8 h-8 ${template.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      {template.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200 space-y-2">
          <button className="w-full flex items-center space-x-3 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Help & Support</span>
          </button>
        </div>
      )}
    </div>
  );
}