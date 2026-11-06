
export type NotificationType =
  | "overdue"
  | "due_today"
  | "upcoming"
  | "completed";

export interface Notification {
  id: number;
  task_id: number | null;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
