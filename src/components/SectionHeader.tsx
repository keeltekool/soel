interface SectionHeaderProps {
  title: string;
  count?: number;
}

export default function SectionHeader({ title, count }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "var(--soel-space-5)",
        paddingBottom: "var(--soel-space-3)",
        borderBottom: "2px solid var(--soel-color-border-brand)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--soel-font-display)",
          fontSize: "var(--soel-text-xl)",
          fontWeight: 700,
          color: "var(--soel-color-text-primary)",
        }}
      >
        {title}
      </h2>
      {count !== undefined && (
        <span
          className="soel-body-xs"
          style={{ color: "var(--soel-color-text-muted)" }}
        >
          {count} articles
        </span>
      )}
    </div>
  );
}
