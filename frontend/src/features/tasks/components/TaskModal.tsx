
"use client";

import { useState } from "react";
import type {
  Task,
  TaskCreate,
  TaskPriority,
} from "../types/task";

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSubmit: (data: TaskCreate) => Promise<unknown>;
  isSubmitting: boolean;
}

export default function TaskModal(props: TaskModalProps) {
  return (
    <TaskModalContent
      key={props.task?.id ?? "new-task"}
      {...props}
    />
  );
}

function TaskModalContent({
  task,
  onClose,
  onSubmit,
  isSubmitting,
}: TaskModalProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(
    task?.description ?? ""
  );
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority ?? "medium"
  );
  const [dueDate, setDueDate] = useState(
    task?.due_date ?? ""
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) return;

    await onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      priority,
      due_date: dueDate || null,
    });
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-indigo-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold text-slate-900">
          {task ? "Edit task" : "Create a task"}
        </h2>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            maxLength={100}
            placeholder="Enter task title"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            placeholder="Enter description"
            rows={3}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as TaskPriority)
            }
            className={inputClass}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Due date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-4 py-2 text-slate-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting || title.trim().length < 3}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
