import { useState, useEffect } from "react";
import type { Article, SectionConfig } from "./types";
import { MOCK_ARTICLES, MOCK_CONFIG } from "./mock-data";
import { fetchArticlesFromSheets, fetchConfigFromSheets, isSheetsConfigured } from "./sheets";

let cachedArticles: Article[] | null = null;
let cachedConfig: SectionConfig[] | null = null;

async function loadArticles(): Promise<Article[]> {
  if (cachedArticles) return cachedArticles;
  if (isSheetsConfigured()) {
    cachedArticles = await fetchArticlesFromSheets();
  } else {
    cachedArticles = MOCK_ARTICLES;
  }
  return cachedArticles;
}

async function loadConfig(): Promise<SectionConfig[]> {
  if (cachedConfig) return cachedConfig;
  if (isSheetsConfigured()) {
    cachedConfig = await fetchConfigFromSheets();
  } else {
    cachedConfig = MOCK_CONFIG;
  }
  return cachedConfig;
}

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles()
      .then(setArticles)
      .catch(() => setArticles(MOCK_ARTICLES))
      .finally(() => setLoading(false));
  }, []);

  return { articles, loading };
}

export function useConfig() {
  const [config, setConfig] = useState<SectionConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfig()
      .then(setConfig)
      .catch(() => setConfig(MOCK_CONFIG))
      .finally(() => setLoading(false));
  }, []);

  return { config, loading };
}

export function useArticle(id: string) {
  const { articles, loading } = useArticles();
  const article = articles.find((a) => a.id === id) || null;
  return { article, articles, loading };
}

export function invalidateCache() {
  cachedArticles = null;
  cachedConfig = null;
}
