
"use client";

import { useEffect, useState } from "react";
import {
  defaultSettings,
  type UserSettings,
} from "../types/settings";

const STORAGE_KEY = "taskflow-settings";

export function useSettings() {
  const [settings, setSettings] =
    useState<UserSettings>(defaultSettings);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved && active) {
          setSettings({
            ...defaultSettings,
            ...JSON.parse(saved),
          });
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        if (active) {
          setLoaded(true);
        }
      }

    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings)
      );
    }
  }, [settings, loaded]);

  function updateSettings(updates: Partial<UserSettings>) {
    setSettings((current) => ({
      ...current,
      ...updates,
    }));
  }

  return {
    settings,
    updateSettings,
    loaded,
  };
}
