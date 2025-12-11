import React from 'react';
import { ChevronDown, FileText, FileJson, FileCode } from 'lucide-react';

const Explorer = ({ activeFile, setActiveFile, isOpen }) => {
  const files = [
    { name: 'README.md', icon: <FileText size={16} className="text-blue-400" />, id: 'readme' },
    { name: 'experience.json', icon: <FileJson size={16} className="text-yellow-400" />, id: 'experience' },
    { name: 'skills.ts', icon: <FileCode size={16} className="text-blue-600" />, id: 'skills' },
    { name: 'snippets.sh', icon: <FileCode size={16} className="text-purple-300" />, id: 'snippets' },
    { name: 'education.py', icon: <FileCode size={16} className="text-green-500" />, id: 'education' },
    { name: 'contact.css', icon: <FileCode size={16} className="text-blue-300" />, id: 'contact' },
  ];

  if (!isOpen) return null;

  return (
    <div className="w-64 bg-[#252526] flex flex-col border-r border-[#1e1e1e] shrink-0">
      <div className="text-xs font-bold tracking-widest text-[#bbbbbb] p-3 pl-4 flex justify-between items-center">
        EXPLORER{' '}
        <span className="text-[10px] bg-[#007acc] text-white px-1 rounded">
          SRC
        </span>
      </div>
      
      <div className="flex items-center px-2 py-1 cursor-pointer text-[#cccccc] font-bold text-sm">
        <ChevronDown size={16} className="mr-1" />
        <span>evoney-project</span>
      </div>

      <div className="flex flex-col mt-1">
        {files.map(file => (
          <div 
            key={file.id}
            onClick={() => setActiveFile(file.id)}
            className={`flex items-center px-4 py-1 cursor-pointer text-sm hover:bg-[#2a2d2e] transition-colors ${activeFile === file.id ? 'bg-[#37373d] text-white border-l-2 border-[#007acc]' : 'text-[#cccccc] border-l-2 border-transparent'}`}
          >
            <span className="mr-2">{file.icon}</span>
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorer;
