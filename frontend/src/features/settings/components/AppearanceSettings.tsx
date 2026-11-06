
"use client";

import type { Theme, Language } from "../types/settings";

interface Props {
  theme: Theme;
  language: Language;
  onThemeChange: (theme: Theme) => void;
  onLanguageChange: (language: Language) => void;
}

export default function AppearanceSettings({
  theme,
  language,
  onThemeChange,
  onLanguageChange,
}: Props) {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="font-semibold text-slate-900">
          Appearance
        </h3>
        <p className="text-sm text-slate-500">
          Customize how TaskFlow looks.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Theme
        </label>

        <select
          value={theme}
          onChange={(e) =>
            onThemeChange(e.target.value as Theme)
          }
          className="w-full rounded-xl border p-3"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Language
        </label>

        <select
          value={language}
          onChange={(e) =>
            onLanguageChange(e.target.value as Language)
          }
          className="w-full rounded-xl border p-3"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </section>
  );
}
