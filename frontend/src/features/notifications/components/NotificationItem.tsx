
"use client";

import {
  AlertCircle,
  CalendarClock,
  CheckCircle,
  Clock,
} from "lucide-react";

import type { Notification } from "../types/notification";

interface Props {
  notification: Notification;
  onRead: (id: number) => void;
}

const styles = {
  overdue: {
    icon: AlertCircle,
    color: "text-red-600 bg-red-50",
  },
  due_today: {
    icon: CalendarClock,
    color: "text-orange-600 bg-orange-50",
  },
  upcoming: {
    icon: Clock,
    color: "text-blue-600 bg-blue-50",
  },
  completed: {
    icon: CheckCircle,
    color: "text-green-600 bg-green-50",
  },
};

export default function NotificationItem({
  notification,
  onRead,
}: Props) {
  const { icon: Icon, color } = styles[notification.type];

  return (
    <button
      type="button"
      onClick={() => {
        if (!notification.is_read) {
          onRead(notification.id);
        }
      }}
      className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50 ${
        !notification.is_read ? "bg-indigo-50/50" : ""
      }`}
    >
      <div className={`rounded-lg p-2 ${color}`}>
        <Icon size={19} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800">
          {notification.title}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {notification.message}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {new Date(notification.created_at).toLocaleString()}
        </p>
      </div>

      {!notification.is_read && (
        <span className="mt-2 h-2 w-2 rounded-full bg-indigo-600" />
      )}
    </button>
  );
}
