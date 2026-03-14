export const LANG_COLORS = {
  JavaScript:"#f7df1e", TypeScript:"#3178c6", Python:"#3572a5", Rust:"#dea584",
  Go:"#00add8", Java:"#b07219", "C++":"#f34b7d", C:"#555555", "C#":"#178600",
  Ruby:"#701516", PHP:"#4f5d95", Swift:"#fa7343", Kotlin:"#7f52ff", Dart:"#00b4ab",
  HTML:"#e44b23", CSS:"#563d7c", Shell:"#89e051", Lua:"#000080", R:"#198ce7",
  default:"#888899",
};
export function getLangColor(lang) { return LANG_COLORS[lang] || LANG_COLORS.default; }
export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}
