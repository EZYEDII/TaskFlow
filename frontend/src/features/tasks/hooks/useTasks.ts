
"use client";

import { useCallback, useEffect, useState } from "react";

import { taskService } from "../services/task-service";

import type {
  Task,
  TaskCreate,
  TaskUpdate,
} from "../types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Retrieve all tasks
  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load tasks."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a task
  const createTask = async (data: TaskCreate) => {
    setIsMutating(true);
    setError(null);

    try {
      const newTask = await taskService.create(data);
      setTasks((current) => [...current, newTask]);
      return newTask;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create task."
      );
      return null;
    } finally {
      setIsMutating(false);
    }
  };

  // Update a task
  const updateTask = async (id: number, data: TaskUpdate) => {
    setIsMutating(true);
    setError(null);

    try {
      const updatedTask = await taskService.update(id, data);

      setTasks((current) =>
        current.map((task) =>
          task.id === id ? updatedTask : task
        )
      );

      return updatedTask;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update task."
      );
      return null;
    } finally {
      setIsMutating(false);
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    setIsMutating(true);
    setError(null);

    try {
      await taskService.delete(id);

      setTasks((current) =>
        current.filter((task) => task.id !== id)
      );

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete task."
      );
      return false;
    } finally {
      setIsMutating(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void reload();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [reload]);

  return {
    tasks,
    loading,
    isMutating,
    error,
    reload,
    createTask,
    updateTask,
    deleteTask,
  };
}
