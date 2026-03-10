import { Link } from "react-router-dom";
import { useArticles } from "@/lib/data";
import { formatDateLong } from "@/lib/utils";

export default function ArchivePage() {
  const { articles, loading } = useArticles();

  // Group articles by date
  const byDate = new Map<string, number>();
  for (const article of articles) {
    const date = article.date;
    byDate.set(date, (byDate.get(date) || 0) + 1);
  }
  const dates = Array.from(byDate.entries()).sort(
    (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
  );

  return (
    <main
      className="soel-container"
      style={{
        paddingTop: "var(--soel-space-8)",
        paddingBottom: "var(--soel-space-16)",
        maxWidth: "640px",
      }}
    >
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "var(--soel-space-6)",
          fontFamily: "var(--soel-font-label)",
          fontSize: "var(--soel-text-xs)",
          fontWeight: 700,
          letterSpacing: "var(--soel-tracking-wider)",
          textTransform: "uppercase" as const,
          color: "var(--soel-color-text-secondary)",
        }}
      >
        ← Back to today
      </Link>

      <h1 className="soel-display-lg" style={{ marginBottom: "var(--soel-space-8)" }}>
        Archive
      </h1>

      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--soel-space-3)" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="soel-skeleton" style={{ height: "56px" }} />
          ))}
        </div>
      )}

      {!loading && dates.length === 0 && (
        <p className="soel-body-md" style={{ color: "var(--soel-color-text-secondary)" }}>
          No archived digests yet.
        </p>
      )}

      {!loading && (
        <div
          style={{
            background: "var(--soel-color-bg-surface)",
            borderRadius: "var(--soel-radius-lg)",
            border: "1px solid var(--soel-color-border-default)",
            overflow: "hidden",
          }}
        >
          {dates.map(([date, count]) => (
            <Link
              key={date}
              to={`/?date=${date}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "var(--soel-space-4) var(--soel-space-5)",
                borderBottom: "1px solid var(--soel-color-border-default)",
                transition: "var(--soel-transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--soel-color-bg-elevated)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--soel-font-display)",
                  fontSize: "var(--soel-text-md)",
                  fontWeight: 700,
                  color: "var(--soel-color-text-primary)",
                }}
              >
                {formatDateLong(date)}
              </span>
              <span
                className="soel-label-md"
                style={{ color: "var(--soel-color-text-muted)" }}
              >
                {count} articles
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
