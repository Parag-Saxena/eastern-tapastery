import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({ copyright }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neo-black text-neo-white border-t-4 border-neo-azure mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand Block */}
        <div className="text-center md:text-left space-y-4 flex-1">
          <div className="inline-block bg-neo-yellow text-neo-black px-2 py-1 font-black text-lg border-2 border-neo-white -rotate-2 hover:rotate-0 transition-transform">
            EASTERN TAPESTRY
          </div>
          <p className="font-mono text-sm text-gray-400 max-w-md leading-relaxed">
             {copyright || `© ${currentYear} All rights reserved.`}
          </p>
        </div>

        {/* Design Credit */}
        <div className="flex flex-col items-center md:items-end justify-center">
           <div className="text-xs font-bold text-gray-500 flex items-center gap-1 bg-neo-white/10 px-3 py-1 rounded-full border border-neo-white/20">
             <span>DESIGNED WITH</span>
             <Heart size={12} className="fill-neo-pink text-neo-pink animate-pulse" />
             <span>BY <a href="https://iparag.in" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neo-white transition-colors decoration-2 underline-offset-2">PARAG SAXENA</a></span>
           </div>
        </div>

      </div>
      
      {/* Bottom Bar */}
      <div className="bg-neo-azure text-neo-black py-2 text-center font-bold text-xs uppercase tracking-widest border-t-2 border-neo-white">
        End of Transmission
      </div>
    </footer>
  );
};