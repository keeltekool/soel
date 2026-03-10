export interface Article {
  id: string;
  date: string;
  title: string;
  author: string;
  url: string;
  imageUrl: string;
  source: string;
  sourceName: string;
  category: string;
  summary: string;
  score: number;
  scrapedAt: string;
  status: string;
}

export interface SectionConfig {
  sectionName: string;
  sourceFilter: string;
  categoryFilter: string;
  minScore: number;
  maxArticles: number;
  sortOrder: number;
  displayStyle: "hero" | "grid" | "list";
  enabled: boolean;
}
