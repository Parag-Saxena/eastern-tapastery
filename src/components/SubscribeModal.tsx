import React from 'react';
import { X } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogTitle: string;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose, blogTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-neo-azure/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-neo-white w-full max-w-md border-4 border-neo-black shadow-neo-xl p-8 animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-neo-pink border-2 border-neo-black text-neo-black p-2 hover:bg-neo-white transition-colors shadow-neo z-10"
        >
          <X size={24} strokeWidth={3} />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-neo-yellow border-3 border-neo-black rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">📧</div>
          <h2 className="text-3xl font-black mb-2 uppercase transform -rotate-1 inline-block bg-neo-black text-neo-white px-2">{blogTitle}</h2>
          <p className="text-neo-black font-bold mt-4 mb-8 border-b-2 border-dashed border-neo-black pb-4">
            Join the cult. I mean, community.
          </p>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); alert('Subscribed!'); }}>
            <input 
              type="email" 
              required
              placeholder="ENTER YOUR EMAIL"
              className="w-full px-4 py-4 bg-gray-50 border-3 border-neo-black focus:outline-none focus:ring-0 focus:shadow-neo focus:bg-white transition-all font-bold placeholder:text-gray-400"
            />
            <button 
              type="submit"
              className="w-full bg-neo-orange hover:bg-neo-yellow hover:text-neo-black text-white border-3 border-neo-black font-black text-xl py-4 shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              SUBSCRIBE
            </button>
          </form>
          
          <p className="mt-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
            No spam. Only jams.
          </p>
        </div>
      </div>
    </div>
  );
};