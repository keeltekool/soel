import { useArticles, useConfig } from "@/lib/data";
import { formatDateLong, getTodayISO } from "@/lib/utils";
import DigestSection from "@/components/DigestSection";

export default function DigestPage() {
  const { articles, loading: articlesLoading } = useArticles();
  const { config, loading: configLoading } = useConfig();
  const loading = articlesLoading || configLoading;

  return (
    <main
      className="soel-container"
      style={{
        paddingTop: "var(--soel-space-8)",
        paddingBottom: "var(--soel-space-16)",
      }}
    >
      {/* Date header */}
      <h1
        className="soel-display-lg"
        style={{
          marginBottom: "var(--soel-space-10)",
          color: "var(--soel-color-text-primary)",
        }}
      >
        {formatDateLong(getTodayISO())}
      </h1>

      {/* Loading skeletons */}
      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--soel-space-8)" }}>
          <div className="soel-skeleton" style={{ height: "400px" }} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "var(--soel-space-6)",
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="soel-skeleton" style={{ height: "320px" }} />
            ))}
          </div>
        </div>
      )}

      {/* Sections */}
      {!loading &&
        config.map((sectionConfig) => (
          <DigestSection
            key={sectionConfig.sectionName}
            config={sectionConfig}
            articles={articles}
          />
        ))}

      {/* Empty state */}
      {!loading && articles.length === 0 && (
        <div style={{ textAlign: "center", padding: "var(--soel-space-16) var(--soel-space-4)" }}>
          <h2 className="soel-display-sm" style={{ marginBottom: "var(--soel-space-2)" }}>
            No articles today
          </h2>
          <p className="soel-body-md" style={{ color: "var(--soel-color-text-secondary)" }}>
            Check back later — the research loops are always running.
          </p>
        </div>
      )}
    </main>
  );
}
