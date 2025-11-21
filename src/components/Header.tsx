import React from 'react';
import { Menu, Mail } from 'lucide-react';

interface HeaderProps {
  title: string;
  onSubscribe: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onSubscribe }) => {
  return (
    <header className="sticky top-0 z-50 bg-neo-white border-b-4 border-neo-black">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left: Brand - Always visible now */}
        <div className="flex-1 flex items-center justify-start">
          <div 
            className="text-base md:text-lg font-bold text-neo-black bg-neo-yellow px-3 py-1 border-2 border-neo-black shadow-sm -rotate-2 hover:rotate-0 transition-transform cursor-pointer whitespace-nowrap"
            onClick={() => window.location.hash = '#/'}
          >
            Eastern Tapestry
          </div>
        </div>

        {/* Center: Title - Hidden on mobile/tablet, visible on desktop */}
        <div className="flex-[2] text-center hidden lg:block px-4">
          <h1 
            className="text-2xl font-bold tracking-tight text-neo-black truncate cursor-pointer uppercase hover:text-neo-orange transition-colors" 
            onClick={() => window.location.hash = '#/'}
            style={{ textShadow: '2px 2px 0px #00C2FF' }}
          >
            {title}
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-3 flex-1">
          <button 
            onClick={onSubscribe}
            className="hidden md:flex items-center gap-2 bg-neo-orange text-neo-white font-bold border-2 border-neo-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover px-6 py-2 rounded-md transition-all active:bg-neo-black"
          >
            <span>Subscribe</span>
          </button>
          {/* Mobile Icon Button */}
          <button 
            className="md:hidden p-2 border-2 border-neo-black shadow-neo bg-white rounded-md hover:bg-neo-orange hover:text-white transition-colors" 
            onClick={onSubscribe}
          >
            <Mail size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
};