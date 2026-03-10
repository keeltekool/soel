import { CATEGORIES } from "./constants";
import type { Article, SectionConfig } from "./types";

export function formatDateLong(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getCategoryStyle(category: string): { color: string; bg: string } {
  const cat = CATEGORIES.find((c) => c.value === category);
  if (!cat) return { color: "#374151", bg: "#F3F4F6" };
  return { color: cat.color, bg: cat.bg };
}

export function getCategoryLabel(category: string): string {
  const cat = CATEGORIES.find((c) => c.value === category);
  return cat?.label ?? category;
}

export function getArticlesForSection(
  articles: Article[],
  config: SectionConfig
): Article[] {
  let filtered = articles;

  if (config.categoryFilter) {
    filtered = filtered.filter((a) => a.category === config.categoryFilter);
  }
  if (config.sourceFilter) {
    filtered = filtered.filter((a) => a.source === config.sourceFilter);
  }
  if (config.minScore > 0) {
    filtered = filtered.filter((a) => a.score >= config.minScore);
  }

  filtered.sort((a, b) => b.score - a.score || new Date(b.date).getTime() - new Date(a.date).getTime());

  return filtered.slice(0, config.maxArticles);
}

export function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}
