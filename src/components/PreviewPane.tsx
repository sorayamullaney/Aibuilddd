import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Code, 
  Eye, 
  ExternalLink, 
  Download,
  RefreshCw,
  Settings,
  Maximize2
} from 'lucide-react';
import { AppProject } from '../types';

interface PreviewPaneProps {
  project: AppProject | null;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';
type ViewType = 'preview' | 'code';

export default function PreviewPane({ project }: PreviewPaneProps) {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [viewType, setViewType] = useState<ViewType>('preview');
  const [isLoading, setIsLoading] = useState(false);

  const getDeviceClasses = () => {
    switch (deviceType) {
      case 'mobile':
        return 'w-80 h-[600px]';
      case 'tablet':
        return 'w-[768px] h-[600px]';
      default:
        return 'w-full h-full';
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const renderPreview = () => {
    if (!project) {
      return (
        <div className="flex-1 flex items-center justify-center bg-slate-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Preview Available</h3>
            <p className="text-slate-500 max-w-sm">
              Start a conversation with the AI assistant to generate your app preview.
            </p>
          </div>
        </div>
      );
    }

    if (project.status === 'draft') {
      return (
        <div className="flex-1 flex items-center justify-center bg-slate-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Build</h3>
            <p className="text-slate-500 max-w-sm">
              Your project "{project.name}" is ready. Describe what you want to build in the chat.
            </p>
          </div>
        </div>
      );
    }

    if (project.status === 'generating') {
      return (
        <div className="flex-1 flex items-center justify-center bg-slate-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-yellow-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Generating Your App</h3>
            <p className="text-slate-500 max-w-sm">
              Please wait while we create your application. This usually takes a few moments.
            </p>
          </div>
        </div>
      );
    }

    // Generated preview
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-100">
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${getDeviceClasses()}`}>
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{project.name}</h2>
                <p className="text-slate-600 mb-6">Your app has been generated successfully!</p>
                <div className="flex items-center justify-center space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Open App
                  </button>
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
                    View Code
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCode = () => {
    const sampleCode = `import React from 'react';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          ${project?.name || 'My App'}
        </h1>
        <p className="text-gray-600 mb-6">
          ${project?.description || 'A beautiful React application'}
        </p>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            -
          </button>
          <span className="text-xl font-semibold">{count}</span>
          <button 
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}`;

    return (
      <div className="flex-1 bg-slate-900 text-slate-100 font-mono text-sm overflow-auto">
        <div className="p-6">
          <pre className="whitespace-pre-wrap">
            <code>{sampleCode}</code>
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Preview Header */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewType('preview')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewType === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-4 h-4 mr-1.5 inline" />
                Preview
              </button>
              <button
                onClick={() => setViewType('code')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewType === 'code' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code className="w-4 h-4 mr-1.5 inline" />
                Code
              </button>
            </div>
          </div>

          {viewType === 'preview' && (
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setDeviceType('desktop')}
                className={`p-2 rounded-lg transition-colors ${
                  deviceType === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceType('tablet')}
                className={`p-2 rounded-lg transition-colors ${
                  deviceType === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceType('mobile')}
                className={`p-2 rounded-lg transition-colors ${
                  deviceType === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <ExternalLink className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      {viewType === 'preview' ? renderPreview() : renderCode()}
    </div>
  );
}