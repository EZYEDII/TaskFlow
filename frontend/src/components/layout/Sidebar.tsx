
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-200 bg-white p-5">
      <Link href="/" className="mb-10 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-600 p-2 text-white">
          <Zap size={23} />
        </div>
        <span className="text-xl font-bold text-slate-900">
          TaskFlow
        </span>
      </Link>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Workspace
      </p>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={19} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-100 pt-5">
        <button
          type="button"
          disabled
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400"
        >
          <LogOut size={19} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
