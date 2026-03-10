import type { Article, SectionConfig } from "@/lib/types";
import { getArticlesForSection } from "@/lib/utils";
import SectionHeader from "./SectionHeader";
import HeroSection from "./HeroSection";
import ArticleCard from "./ArticleCard";
import ArticleRow from "./ArticleRow";

interface DigestSectionProps {
  config: SectionConfig;
  articles: Article[];
}

export default function DigestSection({ config, articles }: DigestSectionProps) {
  const filtered = getArticlesForSection(articles, config);

  if (filtered.length === 0) return null;

  return (
    <section style={{ marginBottom: "var(--soel-space-12)" }}>
      {config.displayStyle !== "hero" && (
        <SectionHeader title={config.sectionName} count={filtered.length} />
      )}

      {config.displayStyle === "hero" && (
        <HeroSection articles={filtered} />
      )}

      {config.displayStyle === "grid" && (
        <div
          className="soel-article-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "var(--soel-space-6)",
          }}
        >
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {config.displayStyle === "list" && (
        <div
          style={{
            background: "var(--soel-color-bg-surface)",
            borderRadius: "var(--soel-radius-lg)",
            border: "1px solid var(--soel-color-border-default)",
            overflow: "hidden",
          }}
        >
          {filtered.map((article) => (
            <ArticleRow key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
