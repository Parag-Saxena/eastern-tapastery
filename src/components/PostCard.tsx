import React from "react";
import { RssItem } from "../types";
import { getRelativeTime } from "../services/rss";
import { Share2, ArrowUpRight } from "lucide-react";

interface PostCardProps {
  item: RssItem;
  onClick: (item: RssItem) => void;
  viewMode: "list" | "grid";
}

export const PostCard: React.FC<PostCardProps> = ({
  item,
  onClick,
  viewMode,
}) => {
  // Extract first image from content if thumbnail is missing or generic
  const imageSrc = item.thumbnail || "https://picsum.photos/800/600";

  // Simple cleanup for description
  const previewText =
    item.description.replace(/<[^>]*>?/gm, "").slice(0, 180) + "...";

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: item.title,
          text: item.description.replace(/<[^>]*>?/gm, "").slice(0, 100),
          url: item.link,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(item.link);
      alert("Link copied to clipboard!");
    }
  };

  const isGrid = viewMode === "grid";

  return (
    <div
      onClick={() => onClick(item)}
      className={`group cursor-pointer bg-neo-white border-3 border-neo-black shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all duration-200 rounded-none md:rounded-lg p-0 overflow-hidden flex relative ${
        isGrid ? "flex-col h-full" : "flex-col md:flex-row mb-8"
      }`}
    >
      <div className="absolute top-0 right-0 bg-neo-yellow border-l-3 border-b-3 border-neo-black px-3 py-1 z-10">
        <ArrowUpRight
          size={20}
          className="group-hover:scale-125 transition-transform"
        />
      </div>

      {imageSrc && (
        <div
          className={`${
            isGrid
              ? "w-full h-48 border-b-3"
              : "w-full md:w-64 h-48 md:h-auto border-b-3 md:border-b-0 md:border-r-3"
          } flex-shrink-0 border-neo-black bg-gray-100 relative overflow-hidden`}
        >
          <img
            src={imageSrc}
            alt={item.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-neo-azure/20 mix-blend-multiply group-hover:bg-transparent transition-all"></div>
        </div>
      )}

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-neo-black text-neo-white text-xs font-bold uppercase px-2 py-0.5">
            Post
          </span>
          <span className="text-xs font-bold text-neo-black border-b-2 border-neo-azure">
            {getRelativeTime(item.pubDate)}
          </span>
        </div>

        <h2
          className={`${
            isGrid ? "text-xl" : "text-2xl md:text-3xl"
          } font-bold text-neo-black mb-3 leading-tight group-hover:text-neo-blue transition-colors`}
        >
          {item.title}
        </h2>

        <p
          className={`text-gray-800 font-medium text-base leading-relaxed mb-6 flex-grow ${
            isGrid ? "line-clamp-3" : "line-clamp-3"
          }`}
        >
          {previewText}
        </p>

        <div className="flex items-center gap-4 pt-4 border-t-3 border-neo-black border-dashed mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-none border-2 border-neo-black bg-neo-pink overflow-hidden">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.author}`}
                alt={item.author}
              />
            </div>
            <span className="text-sm font-bold text-neo-black bg-neo-green px-1 truncate max-w-[100px]">
              {item.author}
            </span>
          </div>

          <div className="flex-1"></div>

          {/* Share Action Only */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-neo-black bg-neo-white hover:bg-neo-pink px-3 py-1 border-2 border-neo-black shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all font-bold text-sm"
          >
            <Share2 size={16} strokeWidth={3} />
            <span className="uppercase">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
