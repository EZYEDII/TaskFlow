
"use client";

interface Props {
  notificationsEnabled: boolean;
  remindersEnabled: boolean;
  onNotificationsChange: (value: boolean) => void;
  onRemindersChange: (value: boolean) => void;
}

export default function NotificationSettings({
  notificationsEnabled,
  remindersEnabled,
  onNotificationsChange,
  onRemindersChange,
}: Props) {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="font-semibold text-slate-900">
          Notifications
        </h3>
        <p className="text-sm text-slate-500">
          Manage your notification preferences.
        </p>
      </div>

      <label className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-sm">
            Enable notifications
          </p>
          <p className="text-xs text-slate-500">
            Receive notifications inside TaskFlow.
          </p>
        </div>

        <input
          type="checkbox"
          checked={notificationsEnabled}
          onChange={(e) =>
            onNotificationsChange(e.target.checked)
          }
          className="h-5 w-5 accent-indigo-600"
        />
      </label>

      <label className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-sm">
            Deadline reminders
          </p>
          <p className="text-xs text-slate-500">
            Receive reminders about upcoming deadlines.
          </p>
        </div>

        <input
          type="checkbox"
          checked={remindersEnabled}
          disabled={!notificationsEnabled}
          onChange={(e) =>
            onRemindersChange(e.target.checked)
          }
          className="h-5 w-5 accent-indigo-600"
        />
      </label>
    </section>
  );
}
