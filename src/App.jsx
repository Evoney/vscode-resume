import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import ActivityBar from './components/Layout/ActivityBar';
import Explorer from './components/Layout/Explorer';
import TabBar from './components/Layout/TabBar';
import StatusBar from './components/Layout/StatusBar';
import AIChat from './components/Features/AIChat';
import FileContent from './components/Editor/FileContent';

export default function App() {
  const [activeFile, setActiveFile] = useState('readme');
  const [activeView, setActiveView] = useState('explorer');
  const [apiKey, setApiKey] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleView = (view) => {
    if (activeView === view && sidebarOpen) {
      setSidebarOpen(false);
    } else {
      setActiveView(view);
      setSidebarOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e] text-[#cccccc] overflow-hidden font-sans">
      <div className="h-8 bg-[#3c3c3c] flex items-center justify-center text-xs text-[#cccccc] select-none shrink-0">
        <span>Evoney Mendonça - Visual Studio Code</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ActivityBar activeView={activeView} setActiveView={toggleView} />

        {sidebarOpen && (
            <>
                {activeView === 'explorer' && <Explorer activeFile={activeFile} setActiveFile={setActiveFile} isOpen={true} />}
                {activeView === 'ai_chat' && <AIChat apiKey={apiKey} setApiKey={setApiKey} />}
                {activeView === 'search' && <div className="w-64 bg-[#252526] border-r border-[#1e1e1e] p-4 text-xs">Search not implemented</div>}
            </>
        )}

        <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] relative">
            {isMobile && !sidebarOpen && (
                <div className="absolute top-2 left-2 z-50 p-2 bg-[#252526] rounded border border-[#3e3e42]" onClick={() => setSidebarOpen(true)}>
                    <Menu size={20} />
                </div>
            )}

            <TabBar activeFile={activeFile} />
            
            <div className="flex-1 overflow-hidden relative bg-[#1e1e1e]">
                {activeFile !== 'readme' && (
                    <div className="absolute inset-0 pointer-events-none opacity-5" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMDQgMEgwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')"}}></div>
                )}
                <FileContent activeFile={activeFile} />
            </div>
        </div>
      </div>

      <StatusBar apiKey={apiKey} />
    </div>
  );
}