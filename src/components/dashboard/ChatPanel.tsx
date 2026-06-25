'use client';

import React, { useEffect, useState, useRef } from 'react';
import chatService, { ChatMessage } from '@/services/chatService';
import { useAuth } from '@/context/AuthContext';

interface ChatPanelProps {
  ticketId: number | string;
}

export function ChatPanel({ ticketId }: ChatPanelProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMessages = async () => {
    try {
      const data = await chatService.getMessages(ticketId);
      setMessages(data);
    } catch (error) {
      console.error('Failed to load chat messages:', error);
    }
  };

  // Poll for new messages every 3 seconds
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [ticketId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedFile) return;

    setSending(true);
    try {
      await chatService.sendMessage(ticketId, inputText, selectedFile || undefined);
      setInputText('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      await fetchMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-[350px] bg-slate-900/10 dark:bg-black/10 border border-white/10 dark:border-white/5 rounded-2xl overflow-hidden mt-4">
      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="text-center text-xs text-slate-400 py-12">
            No messages yet. Send a message to start live communication.
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.user_id === user?.id;
            const senderName = msg.user?.name || (isMe ? 'You' : 'Participant');
            
            return (
              <div 
                key={msg.id} 
                className={`flex flex-col max-w-[80%] ${
                  isMe ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                {/* Sender Tag */}
                <span className="text-[9px] font-bold text-slate-400 mb-0.5 uppercase tracking-wide px-1">
                  {senderName} • {new Date(msg.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                </span>

                {/* Bubble Container */}
                <div 
                  className={`px-4 py-2.5 rounded-2xl text-xs font-medium border ${
                    isMe 
                      ? 'bg-amber-500 text-white border-amber-600 rounded-tr-none shadow-md shadow-amber-500/10' 
                      : 'bg-white/40 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 border-white/10 rounded-tl-none'
                  }`}
                >
                  {msg.message_text && <p className="leading-relaxed">{msg.message_text}</p>}
                  
                  {/* File Attachment view */}
                  {msg.attachment_path && (
                    <div className={`mt-2 flex items-center gap-2 p-2 rounded-xl text-[10px] border ${
                      isMe 
                        ? 'bg-amber-600/30 border-amber-600/20 text-white' 
                        : 'bg-white/20 dark:bg-black/30 border-white/5 text-amber-500 dark:text-amber-400'
                    }`}>
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <a 
                        href={chatService.getAttachmentUrl(msg.attachment_path)}
                        target="_blank"
                        rel="noreferrer"
                        className="underline font-bold truncate max-w-[120px]"
                        title={msg.attachment_name || 'Download file'}
                      >
                        {msg.attachment_name || 'Download Attachment'}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input panel Form */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 dark:border-white/5 flex items-center gap-2 bg-white/5 dark:bg-black/10">
        
        {/* Hidden File Input */}
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Paperclip Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2 rounded-xl border border-white/10 hover:bg-white/20 hover:text-amber-500 transition-colors flex-shrink-0 cursor-pointer ${
            selectedFile ? 'text-green-500 border-green-500/20' : 'text-slate-400'
          }`}
          title={selectedFile ? `Attached: ${selectedFile.name}` : 'Attach document'}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Text Input */}
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={selectedFile ? `File attached: ${selectedFile.name}` : 'Write a message...'}
          className="flex-1 bg-white/10 dark:bg-slate-900/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={sending || (!inputText.trim() && !selectedFile)}
          className="p-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-xl transition-all cursor-pointer flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
}
