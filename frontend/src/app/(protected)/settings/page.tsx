
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
    return (
      <div className="tf-page flex min-h-screen">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Header />
          <div className="p-8">
            <p className="tf-heading">Loading settings...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="tf-page flex min-h-screen">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <div className="mx-auto max-w-6xl space-y-7 p-5 sm:p-6 lg:p-8">
          <section>
            <h2 className="tf-heading text-2xl font-bold">
              Settings
            </h2>
            <p className="mt-1 text-sm opacity-75">
              Customize your TaskFlow experience.
            </p>
          </section>

          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <div className="tf-card h-fit p-3">
              <SettingsSidebar
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </div>

            <div className="tf-card min-w-0 p-5 sm:p-7">
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
