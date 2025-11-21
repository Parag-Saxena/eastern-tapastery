import { RssFeed } from "../types";

const RSS_URL = "https://easterntapestry.substack.com/feed";

// We use rss2json service to convert RSS XML to JSON and avoid CORS issues in the browser.
const API_BASE = "https://api.rss2json.com/v1/api.json";

export const fetchFeed = async (): Promise<RssFeed> => {
  try {
    const response = await fetch(
      `${API_BASE}?rss_url=${encodeURIComponent(RSS_URL)}`
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error("Failed to parse RSS feed");
    }

    return data as RssFeed;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    throw error;
  }
};

export const getRelativeTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
