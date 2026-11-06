
import { apiRequest } from "@/lib/api-client";

import type {
  Task,
  TaskCreate,
  TaskUpdate,
} from "../types/task";

export const taskService = {
  getAll: (skip = 0, limit = 100) =>
    apiRequest<Task[]>(`/tasks/?skip=${skip}&limit=${limit}`),

  getById: (id: number) =>
    apiRequest<Task>(`/tasks/${id}`),

  create: (data: TaskCreate) =>
    apiRequest<Task>("/tasks/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: TaskUpdate) =>
    apiRequest<Task>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    apiRequest<void>(`/tasks/${id}`, {
      method: "DELETE",
    }),
};
