import type { Priority, Task } from "@/lib/types";

const STORAGE_KEY = "task-dashboard:v1";

const priorityValues: Priority[] = ["high", "medium", "low"];

function isPriority(value: unknown): value is Priority {
  return priorityValues.includes(value as Priority);
}

function normalizeTask(raw: unknown): Task | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const task = raw as Record<string, unknown>;
  const id = typeof task.id === "string" ? task.id : "";
  const title = typeof task.title === "string" ? task.title : "";
  const category = typeof task.category === "string" ? task.category : "";

  if (!id || !title || !category) {
    return null;
  }

  const now = Date.now();
  const createdAt = typeof task.createdAt === "number" ? task.createdAt : now;
  const updatedAt = typeof task.updatedAt === "number" ? task.updatedAt : now;

  return {
    id,
    title,
    category,
    priority: isPriority(task.priority) ? task.priority : "medium",
    isCompleted: typeof task.isCompleted === "boolean" ? task.isCompleted : false,
    description: typeof task.description === "string" ? task.description : "",
    dueDate:
      typeof task.dueDate === "number" || task.dueDate === null
        ? task.dueDate
        : null,
    createdAt,
    updatedAt,
  };
}

export function loadTasks(): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(normalizeTask)
      .filter((task): task is Task => task !== null);
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
