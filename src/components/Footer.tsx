export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--soel-color-primary-800)",
        padding: "var(--soel-space-8) 0",
      }}
    >
      <div
        className="soel-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--soel-font-display)",
            fontSize: "var(--soel-text-lg)",
            fontWeight: 900,
            color: "var(--soel-color-amber-500)",
          }}
        >
          SÕEL
        </span>
        <span
          className="soel-body-xs"
          style={{ color: "var(--soel-color-text-muted)" }}
        >
          AI-curated daily digest
        </span>
      </div>
    </footer>
  );
}
