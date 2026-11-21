"use client";

import { useState } from "react";
import { Plus, ListTodo, CheckCircle2, Clock3 } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCard from "@/features/dashboard/components/StatCard";
import ProgressCard from "@/features/dashboard/components/ProgressCard";
import TaskList from "@/features/tasks/components/TaskList";
import TaskModal from "@/features/tasks/components/TaskModal";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import type { Task, TaskCreate } from "@/features/tasks/types/task";

export default function DashboardPage() {
  const { tasks, loading, isMutating, error, createTask, updateTask, deleteTask } = useTasks();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;
  const rate = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  function closeModal() {
    setModalOpen(false);
    setSelectedTask(null);
  }

  function openCreateModal() {
    setSelectedTask(null);
    setModalOpen(true);
  }

  function openEditModal(task: Task) {
    setSelectedTask(task);
    setModalOpen(true);
  }

  async function handleSubmit(data: TaskCreate) {
    const result = selectedTask
      ? await updateTask(selectedTask.id, data)
      : await createTask(data);
    if (result) closeModal();
    return result;
  }

  async function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id);
    }
  }

  async function handleToggle(task: Task) {
    await updateTask(task.id, { completed: !task.completed });
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <div className="mx-auto max-w-7xl space-y-8 p-5 lg:p-8">
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-teal">Welcome to TaskFlow</h2>
              <p className="mt-1 text-sm tf-muted">Track your tasks and stay productive.</p>
            </div>

            <button onClick={openCreateModal} className="tf-primary">
              <Plus size={18} />
              Create Task
            </button>
          </section>

          {error && <div role="alert" className="tf-error">{error}</div>}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Tasks" value={tasks.length} icon={ListTodo} />
            <StatCard title="Completed" value={completed} icon={CheckCircle2} />
            <StatCard title="Pending" value={pending} icon={Clock3} />
            <StatCard title="Completion Rate" value={rate} icon={CheckCircle2} />
          </section>

          <ProgressCard completed={completed} total={tasks.length} />

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-teal">Recent Tasks</h2>
                <p className="text-sm tf-muted">Manage your daily activities.</p>
              </div>
              <span className="rounded-lg border border-beige bg-white px-3 py-2 text-sm font-medium text-teal">
                {tasks.length} tasks
              </span>
            </div>

            <TaskList
              tasks={tasks}
              loading={loading}
              onToggle={handleToggle}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </main>

      {modalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isSubmitting={isMutating}
        />
      )}
    </div>
  );
}