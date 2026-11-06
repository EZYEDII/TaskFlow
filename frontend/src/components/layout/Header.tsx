
import { Search } from "lucide-react";
import NotificationBell from "@/features/notifications/components/NotificationBell";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Manage your productivity in one place.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 sm:flex">
          <Search size={17} className="text-slate-400" />
          <span className="text-sm text-slate-400">
            Search tasks...
          </span>
        </div>

        <NotificationBell />

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
          TF
        </div>
      </div>
    </header>
  );
}
