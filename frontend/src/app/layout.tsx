
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Geist } from "next/font/google";
import { AuthProvider } from "@/features/auth/context/AuthContext";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "TaskFlow",
  title: {
    default: "TaskFlow | Smart Task Management",
    template: "%s | TaskFlow",
  },
  description:
    "TaskFlow helps you organize your work, manage priorities, track deadlines and improve your productivity.",
  keywords: [
    "TaskFlow",
    "Task Management",
    "Productivity",
    "Project Management",
    "Task Organizer",
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 font-sans text-slate-900 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
