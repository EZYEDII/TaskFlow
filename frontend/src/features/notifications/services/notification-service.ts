
import { apiRequest } from "@/lib/api-client";
import type { Notification } from "../types/notification";

export const notificationService = {
  getAll: () =>
    apiRequest<Notification[]>("/notifications/"),

  getUnreadCount: () =>
    apiRequest<{ count: number }>("/notifications/unread-count"),

  markAsRead: (id: number) =>
    apiRequest<{ message: string }>(
      `/notifications/${id}/read`,
      { method: "PATCH" }
    ),

  markAllAsRead: () =>
    apiRequest<{ message: string }>(
      "/notifications/read-all",
      { method: "PATCH" }
    ),
};
