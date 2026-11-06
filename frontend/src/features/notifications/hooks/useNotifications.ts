
"use client";

import { useCallback, useEffect, useState } from "react";

import { notificationService } from "../services/notification-service";
import type { Notification } from "../types/notification";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setError(null);

      const [items, unread] = await Promise.all([
        notificationService.getAll(),
        notificationService.getUnreadCount(),
      ]);

      setNotifications(items);
      setUnreadCount(unread.count);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load notifications."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      await reload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update notification."
      );
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      await reload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update notifications."
      );
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void reload();
    }, 0);

    const intervalId = window.setInterval(() => {
      void reload();
    }, 60_000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [reload]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    reload,
    markAsRead,
    markAllAsRead,
  };
}
