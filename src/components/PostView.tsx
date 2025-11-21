import React, { useState } from 'react';
import { RssItem } from '../types';
import { ArrowLeft, Calendar, Maximize2, RefreshCw, X, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { GeminiSummary } from './GeminiSummary';

interface PostViewProps {
  item: RssItem;
  onBack: () => void;
}

export const PostView: React.FC<PostViewProps> = ({ item, onBack }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  // Helper to format full date
  const formattedDate = new Date(item.pubDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleRefreshImage = () => {
    // Visually simulate a refresh since the source is static
    setImageKey(prev => prev + 1);
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const url = encodeURIComponent(item.link);
    const title = encodeURIComponent(item.title);

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    } else {
      navigator.clipboard.writeText(item.link);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-300 pb-20 w-full overflow-x-hidden">
      {/* Fullscreen Image Modal */}
      {isExpanded && item.thumbnail && (
        <div className="fixed inset-0 z-[200] bg-neo-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsExpanded(false)}>
          <button className="absolute top-4 right-4 text-neo-white hover:text-neo-yellow transition-colors">
            <X size={48} strokeWidth={3} />
          </button>
          <img 
            src={item.thumbnail} 
            alt={item.title} 
            className="max-w-full max-h-[90vh] border-4 border-neo-white shadow-neo-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-8">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-neo-black font-bold hover:underline decoration-4 decoration-neo-azure mb-6 md:mb-8 bg-white px-3 py-2 md:px-4 border-2 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm md:text-base"
        >
          <ArrowLeft size={18} strokeWidth={3} />
          <span>BACK TO DASHBOARD</span>
        </button>

        {/* Header */}
        <header className="mb-8 md:mb-10 border-3 border-neo-black bg-white p-5 md:p-10 shadow-neo-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-neo-azure"></div>
          
          <h1 className="text-2xl md:text-5xl font-black text-neo-black leading-tight mb-6 md:mb-8 uppercase drop-shadow-[2px_2px_0px_rgba(0,194,255,0.5)] break-words">
            {item.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xs md:text-sm font-bold border-t-3 border-neo-black pt-6">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-neo-black bg-neo-purple overflow-hidden flex-shrink-0">
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.author}`} alt={item.author} />
               </div>
               <div className="flex flex-col items-start">
                 <span className="text-neo-black bg-neo-yellow px-2 truncate max-w-[150px]">{item.author}</span>
               </div>
             </div>
             
             <div className="hidden md:block w-3 h-3 bg-neo-black rotate-45"></div>

             <div className="flex items-center gap-2 bg-neo-azure/20 px-3 py-1 border-2 border-neo-azure text-neo-blue rounded-full flex-shrink-0">
                <Calendar size={16} />
                <span>{formattedDate}</span>
             </div>

             {/* Social Share Toolbar */}
             <div className="w-full md:w-auto md:ml-auto flex items-center gap-3 mt-4 md:mt-0 border-t-2 md:border-t-0 border-dashed border-gray-300 md:border-none pt-4 md:pt-0">
                <span className="font-bold uppercase text-xs text-gray-500">Share:</span>
                
                <button 
                  onClick={() => handleShare('twitter')}
                  className="group relative p-2 bg-neo-black text-white hover:bg-neo-azure hover:text-black transition-colors border-2 border-transparent hover:border-neo-black shadow-sm"
                  title="Share on X"
                >
                  <Twitter size={18} />
                </button>
                
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="group relative p-2 bg-neo-black text-white hover:bg-neo-azure hover:text-black transition-colors border-2 border-transparent hover:border-neo-black shadow-sm"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={18} />
                </button>

                <button 
                  onClick={() => handleShare('copy')}
                  className="group relative p-2 bg-neo-black text-white hover:bg-neo-azure hover:text-black transition-colors border-2 border-transparent hover:border-neo-black shadow-sm"
                  title="Copy Link"
                >
                  <LinkIcon size={18} />
                </button>
             </div>
          </div>
        </header>
        
        {/* Cover Image Section structured according to request */}
        {/* root └─ captioned-image-container └─ figure └─ a.image-link... └─ picture ... └─ button └─ svg └─ figcaption */}
        {item.thumbnail && (
          <div className="captioned-image-container mb-8 md:mb-12">
            <figure className="relative group">
              <a className="image-link image2 is-viewable-img cursor-zoom-in" onClick={() => setIsExpanded(true)}>
                <picture>
                  <img 
                    key={imageKey}
                    src={item.thumbnail} 
                    alt={item.title} 
                  />
                </picture>
              </a>
              
              {/* Controls: Buttons/SVG are siblings to the 'a' tag within figure */}
              <div className="absolute bottom-0 right-0 flex gap-0 z-10 p-2 md:p-0 md:bottom-[-20px] md:right-[-10px]">
                 <button 
                   onClick={(e) => { e.stopPropagation(); handleRefreshImage(); }}
                   className="bg-neo-white hover:bg-neo-yellow text-neo-black border-3 border-neo-black p-2 shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
                   title="Refresh Image"
                 >
                   <RefreshCw size={18} strokeWidth={3} />
                 </button>
                 <button 
                   onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                   className="bg-neo-azure hover:bg-neo-white text-neo-black border-y-3 border-r-3 border-neo-black p-2 shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-10 h-10 md:w-12 md:h-12 flex items-center justify-center ml-[-3px]" 
                   title="Expand Image"
                 >
                   <Maximize2 size={18} strokeWidth={3} />
                 </button>
              </div>

              <figcaption>
                 Fig. 1 — {item.title}
              </figcaption>
            </figure>
          </div>
        )}

        {/* AI Summary Section */}
        <GeminiSummary content={item.content || item.description} />

        {/* Content Body */}
        <article className="prose prose-lg md:prose-xl max-w-none 
          prose-headings:font-bold prose-headings:font-sans prose-headings:border-b-4 prose-headings:border-neo-azure prose-headings:pb-2 prose-headings:inline-block prose-headings:leading-tight
          prose-p:text-neo-black prose-p:leading-loose prose-p:text-base md:prose-p:text-xl
          prose-a:text-neo-blue prose-a:font-bold prose-a:no-underline prose-a:bg-neo-azure/20 prose-a:px-1 hover:prose-a:bg-neo-azure/50 prose-a:break-words
          prose-blockquote:border-l-4 prose-blockquote:border-neo-black prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:font-bold
          prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
          bg-white p-4 md:p-10 border-3 border-neo-black shadow-neo break-words">
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </article>

        {/* Footer / Subscribe CTA within post */}
        <div className="mt-12 md:mt-16 p-6 md:p-8 border-3 border-neo-black bg-neo-orange shadow-neo-lg text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase drop-shadow-md">Don't Miss Out!</h3>
            <p className="text-white font-bold mb-6 max-w-md mx-auto text-base md:text-lg">
              Get {item.author}'s hottest takes delivered straight to your inbox.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <input 
                type="email" 
                placeholder="Type your email..." 
                className="border-3 border-neo-black px-4 py-3 w-full md:w-64 focus:outline-none focus:shadow-neo shadow-sm font-bold text-neo-black"
              />
              <button className="bg-neo-azure hover:bg-white text-neo-black border-3 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] px-8 py-3 font-black uppercase transition-all">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};