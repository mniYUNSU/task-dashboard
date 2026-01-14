export type Priority = "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  category: string;
  priority: Priority;
  isCompleted: boolean;
  description?: string;
  dueDate?: number | null;
  createdAt: number;
  updatedAt: number;
};

export const defaultCategories = ["Work", "Personal", "Study"] as const;

export function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `task_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function createNewTask(input: {
  title: string;
  category: string;
  priority: Priority;
  isCompleted?: boolean;
}): Task {
  const now = Date.now();

  return {
    id: generateId(),
    title: input.title,
    category: input.category,
    priority: input.priority,
    isCompleted: input.isCompleted ?? false,
    description: "",
    dueDate: null,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTask(
  prev: Task,
  patch: Partial<Omit<Task, "id" | "createdAt">>
): Task {
  return {
    ...prev,
    ...patch,
    updatedAt: Date.now(),
  };
}
