import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Key, Send } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

const SimpleMarkdown = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-[#569cd6]">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </span>
  );
};

const AIChat = ({ apiKey, setApiKey }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm Evoney's AI Assistant. Ask me anything about his experience, skills, or projects!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(!apiKey);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const callGemini = async (prompt) => {
    if (!apiKey) throw new Error("API Key is missing");
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const systemPrompt = `You are an AI assistant for Evoney Mendonça's interactive resume. 
    RESUME DATA: ${JSON.stringify(resumeData)}
    Guidelines: Be professional, concise, and enthusiastic. Use simplified markdown (bold only) if possible.`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error('Failed to fetch from Gemini API');
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  };

  const handleSend = async (text = input) => {
    if (!text.trim() || loading) return;
    if (!apiKey) {
        setMessages(prev => [...prev, { role: 'bot', text: "Please enter a Gemini API Key first in the settings (Key icon)." }]);
        setShowSettings(true);
        return;
    }

    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
        const response = await callGemini(text);
        setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (err) {
        setMessages(prev => [...prev, { role: 'bot', text: `Error: ${err.message}. Please check your API Key.` }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="w-64 md:w-80 bg-[#252526] flex flex-col border-r border-[#1e1e1e] shrink-0 h-full">
        <div className="p-3 bg-[#333333] text-xs font-bold text-[#cccccc] flex justify-between items-center shadow-md">
            <span className="flex items-center gap-2"><Sparkles size={14} className="text-yellow-400"/> COPILOT CHAT</span>
            <button onClick={() => setShowSettings(!showSettings)} className="hover:text-white">
                <Key size={14}/>
            </button>
        </div>

        {showSettings && (
            <div className="p-3 bg-[#1e1e1e] border-b border-[#3e3e42]">
                <label className="block text-[10px] text-[#858585] mb-1">GOOGLE GEMINI API KEY</label>
                <input 
                    type="password" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Paste API Key here..."
                    className="w-full bg-[#3c3c3c] text-white text-xs p-2 rounded border border-[#3e3e42] focus:border-[#007acc] outline-none"
                />
            </div>
        )}

        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            {messages.map((msg, idx) => (
                <div key={idx} className={`mb-3 p-2 rounded text-sm ${msg.role === 'user' ? 'bg-[#2b2d31] border-l-2 border-[#007acc]' : 'bg-[#3e3e42] border-l-2 border-[#d4d4d4]'}`}>
                    <div className="font-bold text-[10px] mb-1 text-[#858585]">{msg.role === 'user' ? 'YOU' : 'EVONEY AI'}</div>
                    <div className="whitespace-pre-wrap"><SimpleMarkdown text={msg.text} /></div>
                </div>
            ))}
            {loading && <div className="text-xs text-gray-500 animate-pulse">Generating...</div>}
            <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-[#1e1e1e] bg-[#252526]">
            <div className="relative">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about Evoney..."
                    className="w-full bg-[#3c3c3c] text-white text-sm p-2 pr-8 rounded border border-[#3e3e42] focus:border-[#007acc] outline-none"
                />
                <button onClick={() => handleSend()} className="absolute right-2 top-2 text-[#cccccc] hover:text-white">
                    <Send size={14} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default AIChat;