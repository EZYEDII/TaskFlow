
interface ProgressCardProps {
  completed: number;
  total: number;
}

export default function ProgressCard({
  completed,
  total,
}: ProgressCardProps) {
  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">
          Overall Progress
        </h2>

        <span className="font-bold text-indigo-600">
          {percentage}%
        </span>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {completed} of {total} tasks completed
      </p>
    </div>
  );
}
