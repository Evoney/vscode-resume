import { Files, Search, Bot, Settings } from 'lucide-react';

const ActivityBar = ({ activeView, setActiveView }) => (
  <div className="w-12 bg-[#333333] flex flex-col items-center py-4 justify-between h-full border-r border-[#1e1e1e] z-20 shrink-0">
    <div className="flex flex-col gap-6 text-[#858585]">
      <div 
        onClick={() => setActiveView('explorer')} 
        title="Explorer" 
        className={`cursor-pointer hover:text-white transition-all ${activeView === 'explorer' ? 'text-white border-l-2 border-white pl-[10px] ml-[-12px]' : ''}`}
      >
        <Files size={24} />
      </div>
      <div 
        onClick={() => setActiveView('search')} 
        title="Search" 
        className={`cursor-pointer hover:text-white transition-all ${activeView === 'search' ? 'text-white border-l-2 border-white pl-[10px] ml-[-12px]' : ''}`}
      >
        <Search size={24} />
      </div>
      <div 
        onClick={() => setActiveView('ai_chat')} 
        title="Ask Evoney AI" 
        className={`cursor-pointer hover:text-white transition-all ${activeView === 'ai_chat' ? 'text-[#007acc] border-l-2 border-[#007acc] pl-[10px] ml-[-12px]' : ''}`}
      >
        <Bot size={24} />
      </div>
    </div>
    <div className="flex flex-col gap-6 text-[#858585] mb-4">
      <Settings size={24} className="cursor-pointer hover:text-white" />
    </div>
  </div>
);

export default ActivityBar;