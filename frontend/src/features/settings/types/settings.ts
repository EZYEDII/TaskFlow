
export type Theme = "light" | "dark";

export type Language = "en" | "fr";

export interface UserSettings {
  name: string;
  email: string;
  theme: Theme;
  language: Language;
  notificationsEnabled: boolean;
  remindersEnabled: boolean;
}

export const defaultSettings: UserSettings = {
  name: "TaskFlow User",
  email: "",
  theme: "light",
  language: "en",
  notificationsEnabled: true,
  remindersEnabled: true,
};
