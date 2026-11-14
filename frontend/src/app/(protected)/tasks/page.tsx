
"use client";

import { useMemo, useState, useEffect } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import TaskList from "@/features/tasks/components/TaskList";
import TaskModal from "@/features/tasks/components/TaskModal";
import { useTasks } from "@/features/tasks/hooks/useTasks";

import type {
  Task,
  TaskCreate,
  TaskPriority,
} from "@/features/tasks/types/task";

type StatusFilter = "all" | "pending" | "completed";
type DeadlineFilter =
  | "all"
  | "overdue"
  | "today"
  | "upcoming"
  | "no_date";

type SortOption = "newest" | "due_date" | "priority";

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

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [priority, setPriority] = useState<"all" | TaskPriority>("all");
  const [deadline, setDeadline] = useState<DeadlineFilter>("all");
  const [sort, setSort] = useState<SortOption>("newest");

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

const [today, setToday] = useState("");

useEffect(() => {
  const timer = window.setTimeout(() => {
    setToday(new Date().toLocaleDateString("en-CA"));
  }, 0);

  return () => window.clearTimeout(timer);
}, []);

const filteredTasks = useMemo(() => {
  const result = tasks.filter((task) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      (task.description ?? "").toLowerCase().includes(query);

      const matchesStatus =
        status === "all" ||
        (status === "pending" && !task.completed) ||
        (status === "completed" && task.completed);

      const matchesPriority =
        priority === "all" || task.priority === priority;

      let matchesDeadline = true;

      if (deadline === "overdue") {
        matchesDeadline =
          !task.completed &&
          !!task.due_date &&
          task.due_date < today;
      } else if (deadline === "today") {
        matchesDeadline =
          !task.completed && task.due_date === today;
      } else if (deadline === "upcoming") {
        matchesDeadline =
          !task.completed &&
          !!task.due_date &&
          task.due_date > today;
      } else if (deadline === "no_date") {
        matchesDeadline = !task.due_date;
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesDeadline
      );
    });

    return result.sort((a, b) => {
      if (sort === "priority") {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }

      if (sort === "due_date") {
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return a.due_date.localeCompare(b.due_date);
      }

      return b.id - a.id;
    });
  }, [tasks, search, status, priority, deadline, sort, today]);

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
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id);
    }
  }

  async function handleToggle(task: Task) {
    await updateTask(task.id, {
      completed: !task.completed,
    });
  }

  function resetFilters() {
    setSearch("");
    setStatus("all");
    setPriority("all");
    setDeadline("all");
    setSort("newest");
  }

  const selectClass =
    "rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <div className="mx-auto max-w-7xl space-y-7 p-6 lg:p-8">

          {/* Page heading */}
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                My Tasks
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search, organize and manage your activities.
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

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Stat label="Total tasks" value={tasks.length} />
            <Stat
              label="Pending"
              value={tasks.filter((t) => !t.completed).length}
            />
            <Stat
              label="Completed"
              value={tasks.filter((t) => t.completed).length}
            />
          </section>

          {/* Search */}
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <SlidersHorizontal size={18} />
              Search and filters
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Search size={18} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as StatusFilter)
                }
                className={selectClass}
              >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "all" | TaskPriority)
                }
                className={selectClass}
              >
                <option value="all">All priorities</option>
                <option value="high">High priority</option>
                <option value="medium">Medium priority</option>
                <option value="low">Low priority</option>
              </select>

              <select
                value={deadline}
                onChange={(e) =>
                  setDeadline(e.target.value as DeadlineFilter)
                }
                className={selectClass}
              >
                <option value="all">All deadlines</option>
                <option value="overdue">Overdue</option>
                <option value="today">Due today</option>
                <option value="upcoming">Upcoming</option>
                <option value="no_date">No due date</option>
              </select>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value as SortOption)
                }
                className={selectClass}
              >
                <option value="newest">Newest first</option>
                <option value="due_date">Due date</option>
                <option value="priority">Priority: High to Low</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-slate-500">
                Showing {filteredTasks.length} of {tasks.length} tasks
              </p>

              <button
                onClick={resetFilters}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                Reset filters
              </button>
            </div>
          </section>

          {/* Task list */}
          <section className="space-y-4">
            <h3 className="font-semibold text-slate-900">
              Tasks
            </h3>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {!loading && filteredTasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <Search className="mx-auto mb-3 text-slate-400" size={30} />
                <p className="font-medium text-slate-700">
                  No tasks found
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>
              </div>
            ) : (
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
            )}
          </section>
        </div>
      </main>

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

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
