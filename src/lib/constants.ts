export const CATEGORIES = [
  { value: "claude-code", label: "Claude Code", color: "#1A1A2E", bg: "#E8E8F4" },
  { value: "ai-tools", label: "AI Tools", color: "#0D4F4F", bg: "#E6F5F5" },
  { value: "tutorials", label: "Tutorials", color: "#7B3F00", bg: "#FFF4E6" },
  { value: "news", label: "News", color: "#374151", bg: "#F3F4F6" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];
