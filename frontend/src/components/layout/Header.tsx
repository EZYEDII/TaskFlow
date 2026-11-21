
import { Search } from "lucide-react";
import NotificationBell from "@/features/notifications/components/NotificationBell";

export default function Header() {
  return (
    <header className="tf-header">
      <div>
        <h1 className="text-xl font-bold text-teal">
          Dashboard
        </h1>

        <p className="mt-1 text-sm tf-muted">
          Manage your productivity in one place.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-lg border border-beige bg-white px-3 py-2 sm:flex">
          <Search size={17} className="text-beige" />

          <span className="text-sm tf-muted">
            Search tasks...
          </span>
        </div>

        <NotificationBell />

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
          TF
        </div>
      </div>
    </header>
  );
}
