import { useState, useEffect } from "react";
import type { Article, SectionConfig, Feed } from "./types";
import { MOCK_ARTICLES, MOCK_CONFIG } from "./mock-data";
import { fetchArticlesFromSheets, fetchConfigFromSheets, isSheetsConfigured } from "./sheets";

const cachedArticles: Record<string, Article[]> = {};
const cachedConfig: Record<string, SectionConfig[]> = {};

async function loadArticles(feed: Feed): Promise<Article[]> {
  if (cachedArticles[feed]) return cachedArticles[feed];
  if (isSheetsConfigured()) {
    cachedArticles[feed] = await fetchArticlesFromSheets(feed);
  } else {
    cachedArticles[feed] = MOCK_ARTICLES;
  }
  return cachedArticles[feed];
}

async function loadConfig(feed: Feed): Promise<SectionConfig[]> {
  if (cachedConfig[feed]) return cachedConfig[feed];
  if (isSheetsConfigured()) {
    cachedConfig[feed] = await fetchConfigFromSheets(feed);
  } else {
    cachedConfig[feed] = MOCK_CONFIG;
  }
  return cachedConfig[feed];
}

export function useArticles(feed: Feed = "ai-tools") {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadArticles(feed)
      .then(setArticles)
      .catch(() => setArticles(MOCK_ARTICLES))
      .finally(() => setLoading(false));
  }, [feed]);

  return { articles, loading };
}

export function useConfig(feed: Feed = "ai-tools") {
  const [config, setConfig] = useState<SectionConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadConfig(feed)
      .then(setConfig)
      .catch(() => setConfig(MOCK_CONFIG))
      .finally(() => setLoading(false));
  }, [feed]);

  return { config, loading };
}

export function useArticle(id: string) {
  const feed: Feed = id.startsWith("indie-builders-") ? "indie-builders" : "ai-tools";
  const { articles, loading } = useArticles(feed);
  const article = articles.find((a) => a.id === id) || null;
  return { article, articles, loading };
}

export function invalidateCache() {
  for (const key of Object.keys(cachedArticles)) delete cachedArticles[key];
  for (const key of Object.keys(cachedConfig)) delete cachedConfig[key];
}
