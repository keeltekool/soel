import { Link } from "react-router-dom";
import { formatDateLong, getTodayISO } from "@/lib/utils";

export default function Navbar() {
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

        <span
          className="soel-body-sm"
          style={{ color: "var(--soel-color-text-secondary)" }}
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
