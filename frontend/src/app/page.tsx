"use client";

import { useState } from "react";
import {
  Plus,
  ListTodo,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import StatCard from "@/features/dashboard/components/StatCard";
import ProgressCard from "@/features/dashboard/components/ProgressCard";

import TaskList from "@/features/tasks/components/TaskList";
import TaskModal from "@/features/tasks/components/TaskModal";

import { useTasks } from "@/features/tasks/hooks/useTasks";

import type { Task, TaskCreate } from "@/features/tasks/types/task";

export default function DashboardPage() {
  const {
    tasks,
    loading,
    isMutating,
    error,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

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

    if (result) {
      setModalOpen(false);
      setSelectedTask(null);
    }

    return result;
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      await deleteTask(id);
    }
  }

  async function handleToggle(task: Task) {
    await updateTask(task.id, {
      completed: !task.completed,
    });
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">

          {/* Welcome section */}
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Welcome to TaskFlow
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Track your tasks and stay productive.
              </p>
            </div>

            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Plus size={19} />
              Create Task
            </button>
          </section>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Statistics */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Tasks"
              value={tasks.length}
              icon={ListTodo}
              color="bg-indigo-100 text-indigo-600"
            />

            <StatCard
              title="Completed"
              value={completed}
              icon={CheckCircle2}
              color="bg-green-100 text-green-600"
            />

            <StatCard
              title="Pending"
              value={pending}
              icon={Clock3}
              color="bg-orange-100 text-orange-600"
            />

            <StatCard
              title="Completion Rate"
              value={
                tasks.length === 0
                  ? 0
                  : Math.round((completed / tasks.length) * 100)
              }
              icon={CheckCircle2}
              color="bg-purple-100 text-purple-600"
            />
          </section>

          {/* Progress */}
          <section>
            <ProgressCard
              completed={completed}
              total={tasks.length}
            />
          </section>

          {/* Tasks */}
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Tasks
                </h2>
                <p className="text-sm text-slate-500">
                  Manage your daily activities.
                </p>
              </div>

              <span className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600">
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

      {/* Create / Edit modal */}
      {modalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setModalOpen(false);
            setSelectedTask(null);
          }}
          onSubmit={handleSubmit}
          isSubmitting={isMutating}
        />
      )}
    </div>
  );
}