import { Link } from "react-router-dom";
import type { Article } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";

function RowLink({ article, children }: { article: Article; children: React.ReactNode }) {
  if (article.source === "youtube") {
    return <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{children}</a>;
  }
  return <Link to={`/article/${article.id}`} style={{ textDecoration: "none" }}>{children}</Link>;
}

interface ArticleRowProps {
  article: Article;
}

export default function ArticleRow({ article }: ArticleRowProps) {
  const isHighScore = article.score >= 8;

  return (
    <RowLink article={article}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--soel-space-4)",
          padding: "var(--soel-space-4) var(--soel-space-5)",
          borderBottom: "1px solid var(--soel-color-border-default)",
          transition: "var(--soel-transition-fast)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--soel-color-bg-elevated)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        {/* Score */}
        <div
          style={{
            fontFamily: "var(--soel-font-mono)",
            fontSize: "var(--soel-text-xl)",
            fontWeight: 500,
            color: isHighScore ? "var(--soel-color-primary-900)" : "var(--soel-color-text-muted)",
            background: isHighScore ? "var(--soel-color-amber-500)" : "transparent",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--soel-radius-md)",
            flexShrink: 0,
          }}
        >
          {article.score}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: "var(--soel-font-display)",
              fontSize: "var(--soel-text-md)",
              fontWeight: 700,
              lineHeight: "var(--soel-leading-snug)",
              color: "var(--soel-color-text-primary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {article.title}
          </h3>
          <p
            className="soel-body-xs"
            style={{
              color: "var(--soel-color-text-muted)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {article.author} · {article.sourceName} · {formatRelativeTime(article.scrapedAt)}
          </p>
        </div>
      </div>
    </RowLink>
  );
}
