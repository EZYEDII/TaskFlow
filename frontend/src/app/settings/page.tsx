
"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import { useSettings } from "@/features/settings/hooks/useSettings";

import SettingsSidebar, {
  type SettingsTab,
} from "@/features/settings/components/SettingsSidebar";

import ProfileSettings from "@/features/settings/components/ProfileSettings";
import AppearanceSettings from "@/features/settings/components/AppearanceSettings";
import NotificationSettings from "@/features/settings/components/NotificationSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] =
    useState<SettingsTab>("profile");

  const { settings, updateSettings, loaded } = useSettings();

  if (!loaded) {
    return <div className="p-8">Loading settings...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <div className="mx-auto max-w-6xl space-y-7 p-6 lg:p-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Settings
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Customize your TaskFlow experience.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <SettingsSidebar
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              {activeTab === "profile" && (
                <ProfileSettings
                  name={settings.name}
                  email={settings.email}
                  onNameChange={(name) =>
                    updateSettings({ name })
                  }
                />
              )}

              {activeTab === "appearance" && (
                <AppearanceSettings
                  theme={settings.theme}
                  language={settings.language}
                  onThemeChange={(theme) =>
                    updateSettings({ theme })
                  }
                  onLanguageChange={(language) =>
                    updateSettings({ language })
                  }
                />
              )}

              {activeTab === "notifications" && (
                <NotificationSettings
                  notificationsEnabled={
                    settings.notificationsEnabled
                  }
                  remindersEnabled={settings.remindersEnabled}
                  onNotificationsChange={(notificationsEnabled) =>
                    updateSettings({ notificationsEnabled })
                  }
                  onRemindersChange={(remindersEnabled) =>
                    updateSettings({ remindersEnabled })
                  }
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
