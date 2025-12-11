import React from 'react';
import { GitGraph, X } from 'lucide-react';

const StatusBar = ({ apiKey }) => (
  <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs select-none z-10 shrink-0">
    <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 cursor-pointer hover:bg-[#1f8ad2] px-1 h-full">
            <GitGraph size={12} />
            <span>main*</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:bg-[#1f8ad2] px-1 h-full">
            <X size={12} className="rotate-45" />
            <span>0</span>
            <div size={12} className="ml-1">⚠ 0</div>
        </div>
    </div>
    <div className="flex items-center gap-4">
            {apiKey && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400"></span> AI Ready</span>}
            <span className="cursor-pointer hover:bg-[#1f8ad2] px-1">UTF-8</span>
            <span className="cursor-pointer hover:bg-[#1f8ad2] px-1">Prettier</span>
    </div>
  </div>
);

export default StatusBar;