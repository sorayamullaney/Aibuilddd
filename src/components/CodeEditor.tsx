import React, { useState } from 'react';
import { 
  File, 
  Folder, 
  FolderOpen, 
  Plus, 
  X, 
  Save, 
  Search,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  FileText,
  Code,
  Image,
  Settings
} from 'lucide-react';
import { ProjectFile } from '../types';

interface CodeEditorProps {
  files: ProjectFile[];
  onFileSelect: (file: ProjectFile) => void;
  onFileUpdate: (fileId: string, content: string) => void;
  onFileCreate: (name: string, path: string) => void;
  onFileDelete: (fileId: string) => void;
  selectedFile: ProjectFile | null;
}

interface FileTreeNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileTreeNode[];
  file?: ProjectFile;
}

const SAMPLE_FILES: ProjectFile[] = [
  {
    id: '1',
    name: 'App.tsx',
    path: 'src/App.tsx',
    language: 'typescript',
    content: `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;`,
    isOpen: true
  },
  {
    id: '2',
    name: 'index.tsx',
    path: 'src/index.tsx',
    language: 'typescript',
    content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
  },
  {
    id: '3',
    name: 'Header.tsx',
    path: 'src/components/Header.tsx',
    language: 'typescript',
    content: `import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              MyApp
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;`
  },
  {
    id: '4',
    name: 'Home.tsx',
    path: 'src/pages/Home.tsx',
    language: 'typescript',
    content: `import React, { useState } from 'react';

const Home: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to MyApp
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A modern React application built with TypeScript
        </p>
        
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Counter Example</h2>
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => setCount(count - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
            <span className="text-2xl font-bold">{count}</span>
            <button 
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;`
  },
  {
    id: '5',
    name: 'package.json',
    path: 'package.json',
    language: 'json',
    content: `{
  "name": "my-react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@types/node": "^16.18.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`
  },
  {
    id: '6',
    name: 'App.css',
    path: 'src/App.css',
    language: 'css',
    content: `.App {
  min-height: 100vh;
  background-color: #f8fafc;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
}

.App-link {
  color: #61dafb;
}

/* Custom styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}`
  }
];

export default function CodeEditor({ 
  files = SAMPLE_FILES, 
  onFileSelect, 
  onFileUpdate, 
  onFileCreate, 
  onFileDelete, 
  selectedFile 
}: CodeEditorProps) {
  const [openTabs, setOpenTabs] = useState<ProjectFile[]>([SAMPLE_FILES[0]]);
  const [activeTab, setActiveTab] = useState<ProjectFile>(SAMPLE_FILES[0]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'src/components', 'src/pages']));
  const [searchQuery, setSearchQuery] = useState('');

  const buildFileTree = (files: ProjectFile[]): FileTreeNode[] => {
    const tree: FileTreeNode[] = [];
    const folderMap = new Map<string, FileTreeNode>();

    // Create folder structure
    files.forEach(file => {
      const pathParts = file.path.split('/');
      let currentPath = '';

      pathParts.forEach((part, index) => {
        const isFile = index === pathParts.length - 1;
        currentPath = currentPath ? `${currentPath}/${part}` : part;

        if (isFile) {
          // Add file
          const parentPath = pathParts.slice(0, -1).join('/');
          const parent = parentPath ? folderMap.get(parentPath) : null;
          
          const fileNode: FileTreeNode = {
            name: part,
            path: currentPath,
            type: 'file',
            file
          };

          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(fileNode);
          } else {
            tree.push(fileNode);
          }
        } else {
          // Add folder if it doesn't exist
          if (!folderMap.has(currentPath)) {
            const parentPath = pathParts.slice(0, index).join('/');
            const parent = parentPath ? folderMap.get(parentPath) : null;

            const folderNode: FileTreeNode = {
              name: part,
              path: currentPath,
              type: 'folder',
              children: []
            };

            folderMap.set(currentPath, folderNode);

            if (parent) {
              parent.children = parent.children || [];
              parent.children.push(folderNode);
            } else {
              tree.push(folderNode);
            }
          }
        }
      });
    });

    return tree;
  };

  const getFileIcon = (fileName: string, language?: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    switch (ext) {
      case 'tsx':
      case 'jsx':
        return <Code className="w-4 h-4 text-blue-500" />;
      case 'ts':
      case 'js':
        return <FileText className="w-4 h-4 text-yellow-500" />;
      case 'css':
      case 'scss':
        return <FileText className="w-4 h-4 text-pink-500" />;
      case 'json':
        return <Settings className="w-4 h-4 text-green-500" />;
      case 'png':
      case 'jpg':
      case 'svg':
        return <Image className="w-4 h-4 text-purple-500" />;
      default:
        return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleFileClick = (file: ProjectFile) => {
    setActiveTab(file);
    if (!openTabs.find(tab => tab.id === file.id)) {
      setOpenTabs([...openTabs, file]);
    }
    onFileSelect(file);
  };

  const handleTabClose = (file: ProjectFile) => {
    const newTabs = openTabs.filter(tab => tab.id !== file.id);
    setOpenTabs(newTabs);
    
    if (activeTab.id === file.id && newTabs.length > 0) {
      setActiveTab(newTabs[0]);
      onFileSelect(newTabs[0]);
    }
  };

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (nodes: FileTreeNode[], depth = 0) => {
    return nodes.map(node => (
      <div key={node.path}>
        <div
          className={`flex items-center space-x-2 px-2 py-1 hover:bg-slate-100 cursor-pointer text-sm ${
            activeTab?.path === node.path ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else if (node.file) {
              handleFileClick(node.file);
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {expandedFolders.has(node.path) ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
              {expandedFolders.has(node.path) ? (
                <FolderOpen className="w-4 h-4 text-blue-500" />
              ) : (
                <Folder className="w-4 h-4 text-blue-500" />
              )}
            </>
          ) : (
            <>
              <div className="w-4" />
              {getFileIcon(node.name, node.file?.language)}
            </>
          )}
          <span className="flex-1 truncate">{node.name}</span>
          {node.file?.isModified && (
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
          )}
        </div>
        
        {node.type === 'folder' && expandedFolders.has(node.path) && node.children && (
          <div>
            {renderFileTree(node.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  const fileTree = buildFileTree(files);

  return (
    <div className="h-full flex">
      {/* File Explorer */}
      <div className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col">
        {/* Explorer Header */}
        <div className="h-10 flex items-center justify-between px-3 border-b border-slate-200 bg-white">
          <span className="text-sm font-medium text-slate-700">Explorer</span>
          <div className="flex items-center space-x-1">
            <button className="p-1 hover:bg-slate-100 rounded">
              <Plus className="w-4 h-4 text-slate-500" />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded">
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-2 border-b border-slate-200 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* File Tree */}
        <div className="flex-1 overflow-y-auto">
          {renderFileTree(fileTree)}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center overflow-x-auto">
          {openTabs.map(tab => (
            <div
              key={tab.id}
              className={`flex items-center space-x-2 px-3 py-2 border-r border-slate-200 cursor-pointer text-sm min-w-0 ${
                activeTab.id === tab.id 
                  ? 'bg-white text-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              onClick={() => {
                setActiveTab(tab);
                onFileSelect(tab);
              }}
            >
              {getFileIcon(tab.name, tab.language)}
              <span className="truncate max-w-32">{tab.name}</span>
              {tab.isModified && (
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTabClose(tab);
                }}
                className="p-0.5 hover:bg-slate-200 rounded flex-shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 bg-white">
          {activeTab ? (
            <div className="h-full flex flex-col">
              {/* Editor Toolbar */}
              <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-3">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>{activeTab.path}</span>
                  <span>•</span>
                  <span className="capitalize">{activeTab.language}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-slate-200 rounded text-slate-500">
                    <Save className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="flex-1 overflow-auto">
                <pre className="p-4 text-sm font-mono leading-relaxed text-slate-800">
                  <code>{activeTab.content}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500">
              <div className="text-center">
                <Code className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>Select a file to start editing</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}