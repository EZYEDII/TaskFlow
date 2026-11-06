
"use client";

import {
  User,
  Palette,
  Bell,
} from "lucide-react";

export type SettingsTab =
  | "profile"
  | "appearance"
  | "notifications";

interface Props {
  activeTab: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
] as const;

export default function SettingsSidebar({
  activeTab,
  onChange,
}: Props) {
  return (
    <nav className="flex gap-2 overflow-x-auto lg:flex-col">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium ${
            activeTab === id
              ? "bg-indigo-50 text-indigo-700"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Icon size={18} />
          {label}
        </button>
      ))}
    </nav>
  );
}
