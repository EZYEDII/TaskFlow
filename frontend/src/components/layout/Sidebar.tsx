
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-200 bg-white p-5">
      <Link href="/dashboard" className="mb-10 flex items-center gap-3">
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
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut size={19} />
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
