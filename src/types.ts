export interface RssItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
  enclosure?: {
    link: string;
    type: string;
    length: number;
  };
}

export interface RssFeed {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
    copyright?: string;
  };
  items: RssItem[];
}

export interface FeedState {
  data: RssFeed | null;
  loading: boolean;
  error: string | null;
}