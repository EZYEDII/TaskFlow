
import { Bell, Search } from "lucide-react";

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

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
        >
          <Bell size={20} />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
          TF
        </div>
      </div>
    </header>
  );
}
