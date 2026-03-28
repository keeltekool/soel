import { Link } from "react-router-dom";
import type { Article } from "@/lib/types";
import { getCategoryStyle, getCategoryLabel } from "@/lib/utils";

function ArticleLink({ article, children, style }: { article: Article; children: React.ReactNode; style?: React.CSSProperties }) {
  if (article.source === "youtube") {
    return <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", ...style }}>{children}</a>;
  }
  return <Link to={`/article/${article.id}`} style={{ textDecoration: "none", ...style }}>{children}</Link>;
}

interface HeroSectionProps {
  articles: Article[];
}

export default function HeroSection({ articles }: HeroSectionProps) {
  if (articles.length === 0) return null;

  const featured = articles[0];
  const secondary = articles.slice(1, 3);
  const catStyle = getCategoryStyle(featured.category);

  return (
    <div
      className="soel-hero-grid"
      style={{
        display: "grid",
        gridTemplateColumns: secondary.length > 0 ? "2fr 1fr" : "1fr",
        gap: "var(--soel-space-4)",
        minHeight: "400px",
      }}
    >
      {/* Main hero */}
      <ArticleLink article={featured}>
        <div
          style={{
            position: "relative",
            borderRadius: "var(--soel-radius-lg)",
            overflow: "hidden",
            height: "100%",
            minHeight: "400px",
            background: "var(--soel-color-primary-900)",
            cursor: "pointer",
          }}
        >
          {featured.imageUrl && (
            <img
              src={featured.imageUrl}
              alt={featured.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(transparent 30%, rgba(13, 13, 23, 0.9))",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "var(--soel-space-8)",
            }}
          >
            <div style={{ display: "flex", gap: "var(--soel-space-2)", marginBottom: "var(--soel-space-3)" }}>
              <span
                style={{
                  fontFamily: "var(--soel-font-label)",
                  fontSize: "var(--soel-text-xs)",
                  fontWeight: 700,
                  letterSpacing: "var(--soel-tracking-widest)",
                  textTransform: "uppercase",
                  padding: "4px var(--soel-space-3)",
                  borderRadius: "var(--soel-radius-pill)",
                  color: catStyle.color,
                  background: catStyle.bg,
                }}
              >
                {getCategoryLabel(featured.category)}
              </span>
              <span
                style={{
                  fontFamily: "var(--soel-font-mono)",
                  fontSize: "var(--soel-text-xs)",
                  fontWeight: 500,
                  padding: "4px var(--soel-space-3)",
                  borderRadius: "var(--soel-radius-pill)",
                  background: "var(--soel-color-amber-500)",
                  color: "var(--soel-color-primary-900)",
                }}
              >
                {featured.score}/10
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--soel-font-display)",
                fontSize: "clamp(24px, 4vw, 40px)",
                fontWeight: 900,
                lineHeight: "var(--soel-leading-tight)",
                color: "#fff",
                marginBottom: "var(--soel-space-2)",
              }}
            >
              {featured.title}
            </h2>
            <p
              style={{
                fontFamily: "var(--soel-font-body)",
                fontSize: "var(--soel-text-base)",
                color: "rgba(255,255,255,0.8)",
                marginBottom: "var(--soel-space-2)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as const,
                overflow: "hidden",
              }}
            >
              {featured.summary}
            </p>
            <p
              style={{
                fontFamily: "var(--soel-font-body)",
                fontSize: "var(--soel-text-sm)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              by {featured.author} · {featured.sourceName}
            </p>
          </div>
        </div>
      </ArticleLink>

      {/* Secondary cards */}
      {secondary.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--soel-space-4)" }}>
          {secondary.map((article) => {
            const sCatStyle = getCategoryStyle(article.category);
            return (
              <ArticleLink key={article.id} article={article} style={{ flex: 1 }}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: "var(--soel-radius-lg)",
                    overflow: "hidden",
                    height: "100%",
                    minHeight: "192px",
                    background: "var(--soel-color-primary-900)",
                    cursor: "pointer",
                  }}
                >
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(transparent 20%, rgba(13, 13, 23, 0.85))",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "var(--soel-space-4)",
                    }}
                  >
                    <div style={{ display: "flex", gap: "var(--soel-space-2)", marginBottom: "var(--soel-space-2)" }}>
                      <span
                        style={{
                          fontFamily: "var(--soel-font-label)",
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "var(--soel-tracking-widest)",
                          textTransform: "uppercase",
                          padding: "2px var(--soel-space-2)",
                          borderRadius: "var(--soel-radius-pill)",
                          color: sCatStyle.color,
                          background: sCatStyle.bg,
                        }}
                      >
                        {getCategoryLabel(article.category)}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--soel-font-mono)",
                          fontSize: "9px",
                          fontWeight: 500,
                          padding: "2px var(--soel-space-2)",
                          borderRadius: "var(--soel-radius-pill)",
                          background: article.score >= 8 ? "var(--soel-color-amber-500)" : "rgba(255,255,255,0.15)",
                          color: article.score >= 8 ? "var(--soel-color-primary-900)" : "rgba(255,255,255,0.8)",
                        }}
                      >
                        {article.score}/10
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--soel-font-display)",
                        fontSize: "var(--soel-text-lg)",
                        fontWeight: 700,
                        lineHeight: "var(--soel-leading-snug)",
                        color: "#fff",
                        marginBottom: "2px",
                      }}
                    >
                      {article.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--soel-font-body)",
                        fontSize: "var(--soel-text-xs)",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      by {article.author}
                    </p>
                  </div>
                </div>
              </ArticleLink>
            );
          })}
        </div>
      )}
    </div>
  );
}
