import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ChatInterface from './components/ChatInterface';
import PreviewPane from './components/PreviewPane';
import CodeEditor from './components/CodeEditor';
import { AppProject } from './types';
import { Code2, Sparkles, Zap } from 'lucide-react';

type ViewMode = 'chat' | 'editor' | 'preview' | 'split' | 'code';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [currentProject, setCurrentProject] = useState<AppProject | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNewProject = () => {
    const newProject: AppProject = {
      id: `project_${Date.now()}`,
      name: 'Untitled Project',
      description: '',
      type: 'web-app',
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setCurrentProject(newProject);
  };

  const handleGenerateApp = async (prompt: string) => {
    setIsGenerating(true);
    // Simulate app generation
    setTimeout(() => {
      setIsGenerating(false);
      if (currentProject) {
        setCurrentProject({
          ...currentProject,
          status: 'generated',
          updatedAt: new Date()
        });
      }
    }, 3000);
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNewProject={handleNewProject}
        currentProject={currentProject}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900">
                {currentProject?.name || 'AI App Builder'}
              </span>
            </div>
            {currentProject && (
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <div className={`w-2 h-2 rounded-full ${
                  currentProject.status === 'generated' ? 'bg-green-500' :
                  currentProject.status === 'generating' ? 'bg-yellow-500' :
                  'bg-slate-400'
                }`} />
                <span className="capitalize">{currentProject.status}</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('chat')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'chat' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'code' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'split' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Split
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Preview
              </button>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Deploy
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex min-h-0">
          {viewMode === 'chat' && (
            <div className="flex-1">
              <ChatInterface
                onGenerate={handleGenerateApp}
                isGenerating={isGenerating}
                project={currentProject}
              />
            </div>
          )}
          
          {viewMode === 'code' && (
            <div className="flex-1">
              <CodeEditor
                files={currentProject?.files || []}
                onFileSelect={(file) => console.log('File selected:', file)}
                onFileUpdate={(fileId, content) => console.log('File updated:', fileId, content)}
                onFileCreate={(name, path) => console.log('File created:', name, path)}
                onFileDelete={(fileId) => console.log('File deleted:', fileId)}
                selectedFile={null}
              />
            </div>
          )}
          
          {viewMode === 'split' && (
            <>
              <div className="w-1/2 border-r border-slate-200">
                <ChatInterface
                  onGenerate={handleGenerateApp}
                  isGenerating={isGenerating}
                  project={currentProject}
                />
              </div>
              <div className="w-1/2">
                <PreviewPane project={currentProject} />
              </div>
            </>
          )}
          
          {viewMode === 'preview' && (
            <div className="flex-1">
              <PreviewPane project={currentProject} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
