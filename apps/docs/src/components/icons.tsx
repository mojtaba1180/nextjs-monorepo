// Simple icon component for file types
export function getIconForLanguageExtension(language: string): React.ReactNode {
  const iconMap: Record<string, string> = {
    tsx: "⚛️",
    ts: "📘",
    jsx: "⚛️",
    js: "📜",
    css: "🎨",
    html: "🌐",
    json: "📋",
    md: "📝",
  }

  return <span>{iconMap[language] || "📄"}</span>
}
