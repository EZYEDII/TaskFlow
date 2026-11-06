
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
  high: "bg-red-50 text-red-600",
  medium: "bg-orange-50 text-orange-600",
  low: "bg-green-50 text-green-600",
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
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={() => onToggle(task)}
          aria-label="Toggle task completion"
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
            task.completed
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-slate-300"
          }`}
        >
          {task.completed && <Check size={15} />}
        </button>

        <div className="min-w-0">
          <p className={`font-medium ${
            task.completed
              ? "text-slate-400 line-through"
              : "text-slate-800"
          }`}>
            {task.title}
          </p>

          {task.description && (
            <p className="truncate text-sm text-slate-500">
              {task.description}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`rounded-md px-2 py-1 text-xs font-medium capitalize ${priorityStyles[task.priority]}`}>
              {task.priority}
            </span>

            {formattedDate && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <CalendarDays size={13} />
                {formattedDate}
              </span>
            )}

            {isOverdue && (
              <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
                Overdue
              </span>
            )}

            {isDueToday && (
              <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
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
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <Pencil size={17} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}
