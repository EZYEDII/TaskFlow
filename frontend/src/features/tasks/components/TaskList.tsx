
"use client";

import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({
  tasks,
  loading,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (loading) {
    return (
      <p className="tf-empty">
        Loading tasks...
      </p>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="tf-card tf-empty">
        <p className="font-semibold text-teal">
          No tasks yet
        </p>
        <p className="mt-2 text-sm">
          Create your first task and start organizing your work.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
