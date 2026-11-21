import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="tf-card">
      <div className="flex items-center justify-between">
        <p className="tf-card-title">{title}</p>
        <div className="rounded-lg bg-cream p-3 text-teal">
          <Icon size={20} />
        </div>
      </div>
      <p className="tf-card-value">{value}</p>
    </div>
  );
}