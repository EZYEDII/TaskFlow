"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import TaskList from "@/features/tasks/components/TaskList";
import TaskModal from "@/features/tasks/components/TaskModal";
import { useTasks } from "@/features/tasks/hooks/useTasks";

import type { Task, TaskCreate } from "@/features/tasks/types/task";

type Filter = "all" | "pending" | "completed";

export default function TasksPage() {
  const {
    tasks,
    loading,
    isMutating,
    error,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed);

      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  function openCreate() {
    setSelectedTask(null);
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
    if (window.confirm("Delete this task permanently?")) {
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

        <div className="mx-auto max-w-7xl space-y-7 p-6 lg:p-8">

          {/* Page header */}
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                My Tasks
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Organize and manage all your activities.
              </p>
            </div>

            <button
              onClick={openCreate}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={18} />
              New Task
            </button>
          </section>

          {/* Search and filters */}
          <section className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">

            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
              <Search size={18} className="text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as Filter)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm"
            >
              <option value="all">All tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </section>

          {/* Error message */}
          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Statistics */}
          <section className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700">
              Total: {tasks.length}
            </span>

            <span className="rounded-lg bg-orange-50 px-3 py-2 text-orange-700">
              Pending: {tasks.filter((task) => !task.completed).length}
            </span>

            <span className="rounded-lg bg-green-50 px-3 py-2 text-green-700">
              Completed: {tasks.filter((task) => task.completed).length}
            </span>
          </section>

          {/* Task list */}
          <section className="space-y-4">
            <h3 className="font-semibold text-slate-900">
              Tasks ({filteredTasks.length})
            </h3>

            <TaskList
              tasks={filteredTasks}
              loading={loading}
              onToggle={handleToggle}
              onEdit={(task) => {
                setSelectedTask(task);
                setModalOpen(true);
              }}
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