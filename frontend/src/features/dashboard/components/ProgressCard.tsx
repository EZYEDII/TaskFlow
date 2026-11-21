
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
    <div className="tf-card">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-teal">
          Overall Progress
        </h2>

        <span className="font-bold text-plum">
          {percentage}%
        </span>
      </div>

      <div
        className="tf-progress-track mt-5"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Task completion progress"
      >
        <div
          className="tf-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-3 text-sm tf-muted">
        {completed} of {total} tasks completed
      </p>
    </div>
  );
}
