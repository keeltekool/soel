export const CATEGORIES = [
  // AI Tools feed (Articles tab)
  { value: "claude-code", label: "Claude Code", color: "#1A1A2E", bg: "#E8E8F4" },
  { value: "ai-tools", label: "AI Tools", color: "#0D4F4F", bg: "#E6F5F5" },
  { value: "tutorials", label: "Tutorials", color: "#7B3F00", bg: "#FFF4E6" },
  { value: "news", label: "News", color: "#374151", bg: "#F3F4F6" },
  // YouTube feed (YouTubeVideos tab) — shared: claude-code, ai-tools, tutorials, news
  { value: "webdev", label: "Web Dev", color: "#1D4ED8", bg: "#DBEAFE" },
  { value: "api-design", label: "API Design", color: "#047857", bg: "#D1FAE5" },
  // Indie Builders feed (IndieArticles tab)
  { value: "shipping", label: "Shipping & Launches", color: "#7C3AED", bg: "#EDE9FE" },
  { value: "building", label: "Building in Public", color: "#059669", bg: "#D1FAE5" },
  { value: "tools", label: "Tools & Stack", color: "#0284C7", bg: "#E0F2FE" },
  { value: "revenue", label: "Revenue & Business", color: "#D97706", bg: "#FEF3C7" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];
