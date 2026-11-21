
"use client";

import type { Task } from "../types/task";
import { Check, Pencil, Trash2, CalendarDays } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const priorityStyles = {
  high: "bg-[var(--color-error)]/10 text-[var(--color-error)]",
  medium: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
  low: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
};

function getLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const today = getLocalDate();

  const isOverdue =
    !task.completed && !!task.due_date && task.due_date < today;

  const isDueToday =
    !task.completed && task.due_date === today;

  const formattedDate = task.due_date
    ? new Date(`${task.due_date}T00:00:00`).toLocaleDateString()
    : null;

  return (
    <div className="tf-task">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={() => onToggle(task)}
          aria-label="Toggle task completion"
          aria-pressed={task.completed}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
            task.completed
              ? "border-(--color-success) bg-(--color-success) text-white"
              : "border-beige text-teal"
          }`}
        >
          {task.completed && <Check size={15} />}
        </button>

        <div className="min-w-0">
          <p className={`font-medium ${
            task.completed
              ? "text-beige line-through"
              : "text-text"
          }`}>
            {task.title}
          </p>

          {task.description && (
            <p className="truncate text-sm tf-muted">
              {task.description}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md px-2 py-1 text-xs font-medium capitalize ${priorityStyles[task.priority]}`}
            >
              {task.priority}
            </span>

            {formattedDate && (
              <span className="flex items-center gap-1 text-xs tf-muted">
                <CalendarDays size={13} />
                {formattedDate}
              </span>
            )}

            {isOverdue && (
              <span className="rounded-md bg-(--color-error)/10 px-2 py-1 text-xs font-medium text-(--color-error)">
                Overdue
              </span>
            )}

            {isDueToday && (
              <span className="rounded-md bg-(--color-warning)/10 px-2 py-1 text-xs font-medium text-(--color-warning)">
                Due today
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
          className="rounded-lg p-2 text-teal transition hover:bg-cream"
        >
          <Pencil size={17} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          className="rounded-lg p-2 text-(--color-error) transition hover:bg-(--color-error)/10"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}
