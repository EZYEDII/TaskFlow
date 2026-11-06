
"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

import { useNotifications } from "../hooks/useNotifications";
import NotificationList from "./NotificationList";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Open notifications"
        aria-expanded={isOpen}
        className="relative rounded-xl p-2.5 text-slate-600 hover:bg-slate-100"
      >
        <Bell size={21} />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-12 z-50 w-[min(360px,calc(100vw-2rem))]">
            <NotificationList
              notifications={notifications}
              loading={loading}
              error={error}
              onRead={markAsRead}
              onReadAll={markAllAsRead}
            />
          </div>
        </>
      )}
    </div>
  );
}
