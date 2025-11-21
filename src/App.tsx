import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PostCard } from './components/PostCard';
import { PostView } from './components/PostView';
import { SubscribeModal } from './components/SubscribeModal';
import { fetchFeed } from './services/rss';
import { FeedState, RssItem } from './types';
import { LayoutGrid, List, Search, AlertTriangle, WifiOff } from 'lucide-react';

// --- Main Content Component to handle Routing Logic ---
const MainContent = () => {
  const [feedState, setFeedState] = useState<FeedState>({
    data: null,
    loading: true,
    error: null
  });
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const data = await fetchFeed();
        setFeedState({ data, loading: false, error: null });
      } catch (err) {
        setFeedState({
          data: null,
          loading: false,
          error: 'Signal lost. The feed could not be retrieved.'
        });
      }
    };

    loadFeed();
  }, []);

  const handlePostClick = (item: RssItem) => {
    const slug = encodeURIComponent(item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    navigate(`/post/${slug}`, { state: { item } });
  };

  if (feedState.loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neo-bg gap-8">
        <div className="relative w-24 h-24">
           <div className="absolute inset-0 border-4 border-neo-black bg-neo-white translate-x-1 translate-y-1"></div>
           <div className="absolute inset-0 border-4 border-neo-black bg-neo-azure animate-bounce flex items-center justify-center font-bold text-2xl">
             ET
           </div>
        </div>
        <p className="text-neo-black font-black text-xl uppercase tracking-widest bg-neo-yellow px-4 py-1 border-2 border-neo-black shadow-neo">
          Loading...
        </p>
      </div>
    );
  }

  if (feedState.error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-neo-bg">
        <div className="bg-neo-white border-4 border-neo-black p-8 shadow-neo-xl max-w-md text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-4 bg-neo-pink border-b-4 border-neo-black"></div>
           <WifiOff size={64} className="mx-auto mb-6 text-neo-black" strokeWidth={1.5} />
           <h2 className="text-3xl font-black mb-2 uppercase bg-neo-pink inline-block px-2 border-2 border-neo-black transform -rotate-2">System Error</h2>
           <p className="font-bold text-lg mt-6 mb-8">{feedState.error}</p>
           <button
             onClick={() => window.location.reload()}
             className="w-full bg-neo-azure border-3 border-neo-black px-6 py-4 font-black hover:bg-neo-black hover:text-white transition-colors shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover uppercase tracking-wider"
           >
             Re-establish Connection
           </button>
        </div>
      </div>
    );
  }

  const feed = feedState.data?.feed;
  const items = feedState.data?.items || [];

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <Header
        title={feed?.title || "Eastern Tapestry"}
        onSubscribe={() => setIsSubscribeOpen(true)}
      />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={
            <main className="max-w-6xl mx-auto px-4 mt-6 md:mt-10 pb-10">
              {/* Hero Section for Blog Info */}
              <div className="text-center mb-8 md:mb-12 py-8 md:py-12 bg-neo-white border-3 border-neo-black shadow-neo-lg relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-neo-yellow rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-neo-azure rounded-full blur-2xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 px-4 md:px-8 max-w-full overflow-hidden">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-neo-black rounded-none rotate-3 mb-6 border-4 border-neo-white shadow-neo overflow-hidden group hover:rotate-0 transition-transform duration-300">
                      {feed?.image ? (
                        <img src={feed.image} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-black text-neo-white">ET</div>
                      )}
                  </div>

                  {/* Author Spotlight */}
                  {feed?.author && (
                    <div className="flex justify-center mb-4">
                      <span className="bg-neo-black text-neo-white px-3 py-1 text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-neo-white shadow-sm -rotate-1">
                        By {feed.author}
                      </span>
                    </div>
                  )}

                  <h2 className="text-3xl md:text-6xl font-black mb-6 text-neo-black uppercase tracking-tight drop-shadow-[3px_3px_0px_rgba(255,255,255,1)] break-words">
                    {feed?.title}
                  </h2>

                  {/* Description - Optimized for mobile overflow */}
                  <div className="max-w-2xl mx-auto">
                    <p className="text-base md:text-xl text-neo-black font-medium leading-relaxed px-6 py-2 bg-neo-green/20 inline-block border border-neo-green rounded-3xl break-words w-auto max-w-full">
                      {feed?.description || "Exploring the intersection of culture, technology, and eastern philosophy."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Toolbar: Search and View Toggle - Relative Positioning */}
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8 z-10">
                  <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={20} className="text-neo-black" />
                    </div>
                    <input
                      type="text"
                      placeholder="SEARCH ARTICLES..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border-3 border-neo-black bg-white text-neo-black placeholder-gray-500 focus:outline-none focus:shadow-neo focus:bg-neo-white font-bold uppercase"
                    />
                  </div>

                  {/* View Toggle - HIDDEN ON MOBILE */}
                  <div className="hidden md:flex items-center justify-end gap-0 bg-white border-3 border-neo-black shadow-neo">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 hover:bg-neo-yellow transition-colors border-r-3 border-neo-black ${viewMode === 'list' ? 'bg-neo-azure text-white' : 'text-neo-black'}`}
                      title="List View"
                    >
                      <List size={24} strokeWidth={3} />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 hover:bg-neo-yellow transition-colors ${viewMode === 'grid' ? 'bg-neo-azure text-white' : 'text-neo-black'}`}
                      title="Grid View"
                    >
                      <LayoutGrid size={24} strokeWidth={3} />
                    </button>
                  </div>
              </div>

              {/* Feed List Grid */}
              {filteredItems.length > 0 ? (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-6 md:gap-8"}>
                  {filteredItems.map((item, index) => (
                    <PostCard
                        key={item.guid || index}
                        item={item}
                        onClick={handlePostClick}
                        viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 border-3 border-dashed border-neo-black bg-neo-white/50">
                  <AlertTriangle size={48} className="text-neo-orange mb-4" strokeWidth={2} />
                  <p className="text-2xl font-black text-neo-black uppercase mb-2">Into the Void</p>
                  <p className="text-neo-black/70 font-bold">No articles match your search coordinates.</p>
                  <button
                     onClick={() => setSearchTerm('')}
                     className="mt-6 text-neo-blue hover:bg-neo-azure hover:text-white px-4 py-1 font-bold border-b-2 border-neo-blue transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </main>
          } />

          <Route path="/post/:slug" element={<PostWrapper />} />
        </Routes>
      </div>

      <Footer copyright={feed?.copyright} />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        blogTitle={feed?.title || "Eastern Tapestry"}
      />
    </div>
  );
};

// Wrapper to handle retrieving post data from location state or fallback
const PostWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item as RssItem;

  useEffect(() => {
    if (!item) {
      navigate('/');
    }
  }, [item, navigate]);

  if (!item) return null;

  return <PostView item={item} onBack={() => navigate('/')} />;
};

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

export default App;