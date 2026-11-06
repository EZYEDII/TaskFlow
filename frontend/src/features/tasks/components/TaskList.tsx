
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
    return <p className="py-6 text-center text-slate-500">
      Loading tasks...
    </p>;
  }

  if (tasks.length === 0) {
    return <p className="py-6 text-center text-slate-500">
      No tasks yet. Create your first task!
    </p>;
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
