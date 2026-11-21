"use client";

import { useState } from "react";
import type { Task, TaskCreate, TaskPriority } from "../types/task";

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSubmit: (data: TaskCreate) => Promise<unknown>;
  isSubmitting: boolean;
}

export default function TaskModal(props: TaskModalProps) {
  return <TaskModalContent key={props.task?.id ?? "new-task"} {...props} />;
}

function TaskModalContent({ task, onClose, onSubmit, isSubmitting }: TaskModalProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? "medium");
  const [dueDate, setDueDate] = useState(task?.due_date ?? "");

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

  return (
    <div className="tf-modal-overlay">
      <form
        onSubmit={handleSubmit}
        className="tf-modal space-y-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        <div>
          <h2 id="task-modal-title" className="text-xl font-bold text-teal">
            {task ? "Edit task" : "Create a task"}
          </h2>
          <p className="mt-1 text-sm tf-muted">Organize your activities and priorities.</p>
        </div>

        <div>
          <label htmlFor="task-title" className="tf-label">Title</label>
          <input
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            maxLength={100}
            placeholder="Enter task title"
            className="tf-input"
          />
        </div>

        <div>
          <label htmlFor="task-desc" className="tf-label">Description</label>
          <textarea
            id="task-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            placeholder="Enter description"
            rows={3}
            className="tf-input resize-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="task-priority" className="tf-label">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="tf-input"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-due" className="tf-label">Due date</label>
            <input
              id="task-due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="tf-input"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="tf-secondary">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || title.trim().length < 3}
            className="tf-primary"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}