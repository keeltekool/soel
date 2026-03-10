import { useParams, Link } from "react-router-dom";
import { useArticle } from "@/lib/data";
import { getCategoryStyle, getCategoryLabel, formatDateLong, getArticlesForSection } from "@/lib/utils";
import ArticleCard from "@/components/ArticleCard";

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { article, articles, loading } = useArticle(id || "");

  if (loading) {
    return (
      <main className="soel-container" style={{ paddingTop: "var(--soel-space-8)", paddingBottom: "var(--soel-space-16)" }}>
        <div className="soel-skeleton" style={{ height: "360px", marginBottom: "var(--soel-space-6)" }} />
        <div className="soel-skeleton" style={{ height: "200px" }} />
      </main>
    );
  }

  if (!article) {
    return (
      <main className="soel-container" style={{ paddingTop: "var(--soel-space-8)", paddingBottom: "var(--soel-space-16)", textAlign: "center" }}>
        <h1 className="soel-display-md" style={{ marginBottom: "var(--soel-space-4)" }}>Article not found</h1>
        <Link to="/" style={{ color: "var(--soel-color-primary-800)", fontWeight: 600 }}>Back to digest</Link>
      </main>
    );
  }

  const catStyle = getCategoryStyle(article.category);
  const isHighScore = article.score >= 8;

  // Related articles: same category, excluding this one
  const related = getArticlesForSection(
    articles.filter((a) => a.id !== article.id),
    { sectionName: "", sourceFilter: "", categoryFilter: article.category, minScore: 0, maxArticles: 3, sortOrder: 0, displayStyle: "grid", enabled: true }
  );

  return (
    <main style={{ paddingBottom: "var(--soel-space-16)" }}>
      {/* Hero image */}
      {article.imageUrl && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(200px, 40vw, 400px)",
            overflow: "hidden",
          }}
        >
          <img
            src={article.imageUrl}
            alt={article.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(transparent 50%, var(--soel-color-bg-base))",
            }}
          />
        </div>
      )}

      <div className="soel-container" style={{ maxWidth: "800px" }}>
        {/* Back link */}
        <Link
          to="/"
          style={{
            display: "inline-block",
            marginTop: article.imageUrl ? "var(--soel-space-4)" : "var(--soel-space-8)",
            marginBottom: "var(--soel-space-6)",
            fontFamily: "var(--soel-font-label)",
            fontSize: "var(--soel-text-xs)",
            fontWeight: 700,
            letterSpacing: "var(--soel-tracking-wider)",
            textTransform: "uppercase" as const,
            color: "var(--soel-color-text-secondary)",
          }}
        >
          ← Back to digest
        </Link>

        {/* Badges */}
        <div style={{ display: "flex", gap: "var(--soel-space-2)", marginBottom: "var(--soel-space-4)" }}>
          <span
            style={{
              fontFamily: "var(--soel-font-label)",
              fontSize: "var(--soel-text-xs)",
              fontWeight: 700,
              letterSpacing: "var(--soel-tracking-widest)",
              textTransform: "uppercase" as const,
              padding: "4px var(--soel-space-3)",
              borderRadius: "var(--soel-radius-pill)",
              color: catStyle.color,
              background: catStyle.bg,
            }}
          >
            {getCategoryLabel(article.category)}
          </span>
          <span
            style={{
              fontFamily: "var(--soel-font-mono)",
              fontSize: "var(--soel-text-xs)",
              fontWeight: 500,
              padding: "4px var(--soel-space-3)",
              borderRadius: "var(--soel-radius-pill)",
              background: isHighScore ? "var(--soel-color-amber-500)" : "var(--soel-color-bg-muted)",
              color: isHighScore ? "var(--soel-color-primary-900)" : "var(--soel-color-text-secondary)",
            }}
          >
            {article.score}/10
          </span>
        </div>

        {/* Title */}
        <h1
          className="soel-display-lg"
          style={{ marginBottom: "var(--soel-space-4)" }}
        >
          {article.title}
        </h1>

        {/* Metadata */}
        <p
          className="soel-body-sm"
          style={{
            color: "var(--soel-color-text-secondary)",
            marginBottom: "var(--soel-space-8)",
          }}
        >
          by {article.author} · {article.sourceName} · {formatDateLong(article.date)}
        </p>

        {/* Summary */}
        <div
          style={{
            borderLeft: "4px solid var(--soel-color-amber-500)",
            paddingLeft: "var(--soel-space-5)",
            marginBottom: "var(--soel-space-8)",
          }}
        >
          <p
            className="soel-body-lg"
            style={{
              color: "var(--soel-color-text-primary)",
              fontWeight: 400,
            }}
          >
            {article.summary}
          </p>
        </div>

        {/* Read Original CTA */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            fontFamily: "var(--soel-font-label)",
            fontSize: "var(--soel-text-sm)",
            fontWeight: 700,
            letterSpacing: "var(--soel-tracking-wider)",
            textTransform: "uppercase" as const,
            color: "var(--soel-color-text-inverse)",
            background: "var(--soel-color-primary-800)",
            padding: "var(--soel-space-3) var(--soel-space-8)",
            borderRadius: "var(--soel-radius-md)",
            transition: "var(--soel-transition-fast)",
            marginBottom: "var(--soel-space-16)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--soel-color-amber-500)";
            e.currentTarget.style.color = "var(--soel-color-primary-900)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--soel-color-primary-800)";
            e.currentTarget.style.color = "var(--soel-color-text-inverse)";
          }}
        >
          Read Original →
        </a>

        {/* Related Articles */}
        {related.length > 0 && (
          <section>
            <h2
              style={{
                fontFamily: "var(--soel-font-display)",
                fontSize: "var(--soel-text-xl)",
                fontWeight: 700,
                marginBottom: "var(--soel-space-5)",
                paddingBottom: "var(--soel-space-3)",
                borderBottom: "2px solid var(--soel-color-border-brand)",
              }}
            >
              Related Articles
            </h2>
            <div
              className="soel-article-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "var(--soel-space-6)",
              }}
            >
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
