import React from 'react';
import { X, FileText, FileJson, FileCode } from 'lucide-react';

const TabBar = ({ activeFile }) => {
  const getFileInfo = (id) => {
    switch(id) {
        case 'readme': return { name: 'README.md', icon: <FileText size={14} className="text-blue-400 mr-2" /> };
        case 'experience': return { name: 'experience.json', icon: <FileJson size={14} className="text-yellow-400 mr-2" /> };
        case 'skills': return { name: 'skills.ts', icon: <FileCode size={14} className="text-blue-600 mr-2" /> };
        case 'snippets': return { name: 'snippets.sh', icon: <FileCode size={14} className="text-purple-300 mr-2" /> };
        case 'education': return { name: 'education.py', icon: <FileCode size={14} className="text-green-500 mr-2" /> };
        case 'contact': return { name: 'contact.css', icon: <FileCode size={14} className="text-blue-300 mr-2" /> };
        default: return { name: 'file', icon: null };
    }
  };
  const info = getFileInfo(activeFile);

  return (
    <div className="flex bg-[#252526] h-9 border-b border-[#1e1e1e] shrink-0">
        <div className="flex items-center px-3 bg-[#1e1e1e] text-white text-sm border-t border-[#007acc] min-w-[150px]">
            {info.icon}
            <span>{info.name}</span>
            <X size={14} className="ml-auto text-[#858585] hover:text-white cursor-pointer" />
        </div>
    </div>
  );
};

export default TabBar;
