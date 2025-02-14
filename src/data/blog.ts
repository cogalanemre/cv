export interface BlogPost {
  title: string;
  link: string;
  pubDate: Date;
  description: string;
  thumbnail?: string;
  categories: string[];
  content: string;
  readingTime: {
    minutes: number;
  };
  guid: string;
}

export interface BlogData {
  posts: BlogPost[];
  loading: boolean;
  error?: string;
} 