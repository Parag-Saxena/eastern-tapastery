import React, { useState } from 'react';
import { Sparkles, Terminal } from 'lucide-react';
import { summarizeContent } from '../services/gemini';

interface GeminiSummaryProps {
  content: string;
}

export const GeminiSummary: React.FC<GeminiSummaryProps> = ({ content }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSummarize = async () => {
    if (summary) {
      setExpanded(!expanded);
      return;
    }

    setLoading(true);
    setExpanded(true);
    try {
      const result = await summarizeContent(content);
      setSummary(result);
    } catch (err) {
      setSummary("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 bg-neo-yellow border-3 border-neo-black shadow-neo p-0 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-neo-black text-neo-white border-b-3 border-neo-black">
        <div className="flex items-center gap-2 font-bold uppercase tracking-widest">
           <Terminal size={20} className="text-neo-azure" />
           <span>AI_SUMMARY.EXE</span>
        </div>
        <button 
          onClick={handleSummarize}
          disabled={loading}
          className="text-xs font-bold bg-neo-white text-neo-black px-4 py-1 border-2 border-transparent hover:border-neo-azure hover:text-neo-blue transition-colors disabled:opacity-50 shadow-[2px_2px_0px_0px_#FFFFFF]"
        >
          {loading ? 'PROCESSING...' : summary ? (expanded ? 'HIDE' : 'SHOW') : 'RUN'}
        </button>
      </div>

      {expanded && (
        <div className="p-6 font-mono text-neo-black leading-relaxed">
          {loading ? (
             <div className="space-y-3">
               <div className="h-4 bg-neo-black/10 w-3/4 animate-pulse"></div>
               <div className="h-4 bg-neo-black/10 w-full animate-pulse"></div>
               <div className="h-4 bg-neo-black/10 w-5/6 animate-pulse"></div>
             </div>
          ) : (
            <div className="relative">
               <Sparkles className="absolute -top-4 -left-2 text-neo-azure w-6 h-6 -rotate-12" />
               <p className="pl-6 border-l-4 border-neo-azure">{summary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};