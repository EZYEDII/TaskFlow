"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, CheckSquare, Settings, LogOut, Zap } from "lucide-react";

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
    <aside className="tf-sidebar">
      <Link href="/dashboard" className="mb-10 flex items-center gap-3 no-underline">
        <div className="rounded-lg border border-white/30 p-2 text-white">
          <Zap size={22} />
        </div>
        <span className="sidebar-brand-name text-xl font-bold text-white">TaskFlow</span>
      </Link>

      <p className="sidebar-section-label mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-white/70">
        Workspace
      </p>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              title={item.label}
              className={`tf-sidebar-link ${active ? "active" : ""}`}
            >
              <Icon size={19} />
              <span className="sidebar-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/20 pt-5">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          title="Sign out"
          className="tf-sidebar-link"
        >
          <LogOut size={19} />
          <span className="sidebar-label">
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </span>
        </button>
      </div>
    </aside>
  );
}