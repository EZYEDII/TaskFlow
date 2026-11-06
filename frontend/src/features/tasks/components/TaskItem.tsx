
"use client";

import type { Task } from "../types/task";
import { Check, Pencil, Trash2 } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex min-w-0 items-center gap-3">
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
