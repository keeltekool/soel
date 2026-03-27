import type { Article, SectionConfig, Feed } from "./types";

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const FEED_TABS: Record<Feed, { articles: string; config: string }> = {
  "ai-tools": { articles: "Articles", config: "Config" },
  "indie-builders": { articles: "IndieArticles", config: "IndieConfig" },
};

async function fetchRange(tab: string, range: string): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${tab}!${range}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheets API error: ${res.status}`);
  const data = await res.json();
  return data.values || [];
}

export async function fetchArticlesFromSheets(feed: Feed = "ai-tools"): Promise<Article[]> {
  const tab = FEED_TABS[feed].articles;
  const rows = await fetchRange(tab, "A2:M1000");
  return rows.map((row, i) => ({
    id: `${feed}-${i + 1}`,
    date: row[0] || "",
    title: row[1] || "",
    author: row[2] || "",
    url: row[3] || "",
    imageUrl: row[4] || "",
    source: row[5] || "",
    sourceName: row[6] || "",
    category: row[7] || "",
    summary: row[8] || "",
    score: Number(row[9]) || 0,
    scrapedAt: row[11] || "",
    status: row[12] || "new",
  }));
}

export async function fetchConfigFromSheets(feed: Feed = "ai-tools"): Promise<SectionConfig[]> {
  const tab = FEED_TABS[feed].config;
  const rows = await fetchRange(tab, "A2:H100");
  return rows
    .map((row) => ({
      sectionName: row[0] || "",
      sourceFilter: row[1] || "",
      categoryFilter: row[2] || "",
      minScore: Number(row[3]) || 0,
      maxArticles: Number(row[4]) || 10,
      sortOrder: Number(row[5]) || 0,
      displayStyle: (row[6] || "grid") as SectionConfig["displayStyle"],
      enabled: row[7]?.toUpperCase() !== "FALSE",
    }))
    .filter((c) => c.enabled)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function isSheetsConfigured(): boolean {
  return Boolean(SHEET_ID && API_KEY);
}
