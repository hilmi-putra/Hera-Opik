import i18n from "@/i18n";

export function LanguageSwitcher() {
  return (
    <select
      value={i18n.language.startsWith("id") ? "id" : "en"}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="rounded-md border bg-white px-3 py-2 text-sm"
    >
      <option value="en">English</option>
      <option value="id">Bahasa Indonesia</option>
    </select>
  );
}
