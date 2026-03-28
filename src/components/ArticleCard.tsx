import { Link } from "react-router-dom";
import type { Article } from "@/lib/types";
import { getCategoryStyle, getCategoryLabel, formatRelativeTime } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
}

function CardWrapper({ article, children }: { article: Article; children: React.ReactNode }) {
  if (article.source === "youtube") {
    return <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{children}</a>;
  }
  return <Link to={`/article/${article.id}`} style={{ textDecoration: "none" }}>{children}</Link>;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const catStyle = getCategoryStyle(article.category);
  const isHighScore = article.score >= 8;

  return (
    <CardWrapper article={article}>
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: "var(--soel-color-bg-surface)",
          border: "1px solid var(--soel-color-border-default)",
          borderRadius: "var(--soel-radius-lg)",
          overflow: "hidden",
          transition: "var(--soel-transition-base)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "var(--soel-shadow-md)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            background: "var(--soel-color-primary-100)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--soel-color-primary-400)",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="12" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="M8 30l8-6 6 4 10-8 8 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* Category badge */}
          <span
            style={{
              position: "absolute",
              top: "var(--soel-space-3)",
              left: "var(--soel-space-3)",
              fontFamily: "var(--soel-font-label)",
              fontSize: "var(--soel-text-xs)",
              fontWeight: 700,
              letterSpacing: "var(--soel-tracking-widest)",
              textTransform: "uppercase" as const,
              padding: "2px var(--soel-space-2)",
              borderRadius: "var(--soel-radius-pill)",
              color: catStyle.color,
              background: catStyle.bg,
            }}
          >
            {getCategoryLabel(article.category)}
          </span>

          {/* Score badge */}
          <span
            style={{
              position: "absolute",
              top: "var(--soel-space-3)",
              right: "var(--soel-space-3)",
              fontFamily: "var(--soel-font-mono)",
              fontSize: "var(--soel-text-sm)",
              fontWeight: 500,
              padding: "2px var(--soel-space-2)",
              borderRadius: "var(--soel-radius-pill)",
              color: isHighScore ? "var(--soel-color-primary-900)" : "var(--soel-color-text-secondary)",
              background: isHighScore ? "var(--soel-color-amber-500)" : "var(--soel-color-bg-surface)",
            }}
          >
            {article.score}/10
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "var(--soel-space-4) var(--soel-space-5)", flex: 1 }}>
          <h3
            style={{
              fontFamily: "var(--soel-font-display)",
              fontSize: "var(--soel-text-lg)",
              fontWeight: 700,
              lineHeight: "var(--soel-leading-snug)",
              letterSpacing: "var(--soel-tracking-snug)",
              color: "var(--soel-color-text-primary)",
              marginBottom: "var(--soel-space-1)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {article.title}
          </h3>
          <p
            className="soel-body-xs"
            style={{
              color: "var(--soel-color-text-muted)",
              marginBottom: "var(--soel-space-2)",
            }}
          >
            by {article.author}
          </p>
          <p
            className="soel-body-sm"
            style={{
              color: "var(--soel-color-text-secondary)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {article.summary}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "var(--soel-space-3) var(--soel-space-5)",
            borderTop: "1px solid var(--soel-color-border-default)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            className="soel-label-md"
            style={{ color: "var(--soel-color-text-muted)" }}
          >
            {article.sourceName} · {formatRelativeTime(article.scrapedAt)}
          </span>
        </div>
      </article>
    </CardWrapper>
  );
}
