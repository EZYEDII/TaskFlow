
"use client";

import type { Notification } from "../types/notification";
import NotificationItem from "./NotificationItem";

interface Props {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  onRead: (id: number) => void;
  onReadAll: () => void;
}

export default function NotificationList({
  notifications,
  loading,
  error,
  onRead,
  onReadAll,
}: Props) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-semibold text-slate-800">
          Notifications
        </h3>

        {notifications.some((item) => !item.is_read) && (
          <button
            onClick={onReadAll}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
          >
            Mark all as read
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="p-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading ? (
        <p className="p-6 text-center text-sm text-slate-500">
          Loading notifications...
        </p>
      ) : notifications.length === 0 ? (
        <div className="p-8 text-center">
          <p className="font-medium text-slate-700">
            You&apos;re all caught up!
          </p>
          <p className="mt-1 text-sm text-slate-500">
            No notifications available.
          </p>
        </div>
      ) : (
        <div className="max-h-96 divide-y overflow-y-auto">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={onRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
