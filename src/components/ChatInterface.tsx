import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Code, Loader2, Copy, Download, ExternalLink } from 'lucide-react';
import { AppProject, ChatMessage } from '../types';

interface ChatInterfaceProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  project: AppProject | null;
}

const SAMPLE_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your AI app builder assistant. I can help you create web applications, mobile apps, APIs, and browser extensions. What would you like to build today?',
    timestamp: new Date(),
    type: 'text'
  }
];

const QUICK_PROMPTS = [
  'Build a todo app with React and TypeScript',
  'Create a weather dashboard with API integration',
  'Design a landing page for a SaaS product',
  'Build a simple e-commerce store',
  'Create a blog with CMS functionality',
  'Design a portfolio website'
];

export default function ChatInterface({ onGenerate, isGenerating, project }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'll help you build that! Let me generate the code and components for your request: "${userMessage.content}"`,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      onGenerate(userMessage.content);
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-slate-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">AI Assistant</h2>
            <p className="text-sm text-slate-500">
              {isGenerating ? 'Generating your app...' : 'Ready to help you build'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-900'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 ${
                message.role === 'user' ? 'text-blue-100' : 'text-slate-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-slate-500">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl px-4 py-3">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Generating your application...</p>
                  <p className="text-xs text-slate-500">This may take a few moments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-slate-600 mb-3">Try these quick prompts:</p>
          <div className="grid grid-cols-1 gap-2">
            {QUICK_PROMPTS.slice(0, 3).map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="text-left p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="bg-white border-t border-slate-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Describe the app you want to build..."
              className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              style={{ minHeight: '48px', maxHeight: '120px' }}
              disabled={isGenerating}
            />
            <div className="absolute right-3 bottom-3 text-xs text-slate-400">
              {input.length}/1000
            </div>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}