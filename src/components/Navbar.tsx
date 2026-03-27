import { Link, useLocation } from "react-router-dom";
import { formatDateLong, getTodayISO } from "@/lib/utils";

const FEEDS = [
  { path: "/", label: "AI Tools" },
  { path: "/indie", label: "Indie Builders" },
] as const;

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--soel-nav-height)",
        background: "rgba(245, 243, 238, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--soel-color-border-default)",
        zIndex: "var(--soel-z-nav)",
      }}
    >
      <div
        className="soel-container"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--soel-space-4)",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "var(--soel-font-display)",
            fontSize: "var(--soel-text-2xl)",
            fontWeight: 900,
            color: "var(--soel-color-primary-800)",
            letterSpacing: "var(--soel-tracking-tight)",
            flexShrink: 0,
          }}
        >
          SÕEL
        </Link>

        {/* Feed switcher */}
        <div
          style={{
            display: "flex",
            gap: "var(--soel-space-1)",
            background: "var(--soel-color-surface-raised, rgba(26, 26, 46, 0.06))",
            borderRadius: "var(--soel-radius-lg)",
            padding: "3px",
          }}
        >
          {FEEDS.map(({ path, label }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                style={{
                  fontFamily: "var(--soel-font-label)",
                  fontSize: "var(--soel-text-xs)",
                  fontWeight: 700,
                  letterSpacing: "var(--soel-tracking-wider)",
                  textTransform: "uppercase",
                  padding: "6px 12px",
                  borderRadius: "var(--soel-radius-lg)",
                  color: isActive ? "var(--soel-color-primary-800)" : "var(--soel-color-text-secondary)",
                  background: isActive ? "var(--soel-color-accent, #FFD166)" : "transparent",
                  transition: "all 0.15s ease",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <span
          className="soel-body-sm"
          style={{ color: "var(--soel-color-text-secondary)", display: "none" }}
        >
          {formatDateLong(getTodayISO())}
        </span>

        <Link
          to="/archive"
          style={{
            fontFamily: "var(--soel-font-label)",
            fontSize: "var(--soel-text-xs)",
            fontWeight: 700,
            letterSpacing: "var(--soel-tracking-wider)",
            textTransform: "uppercase" as const,
            color: "var(--soel-color-text-secondary)",
            flexShrink: 0,
          }}
        >
          Archive
        </Link>
      </div>
    </nav>
  );
}
