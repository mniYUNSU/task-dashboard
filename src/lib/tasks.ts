import type { Priority, Task } from "@/lib/types";

// Example: getCompletionRate([{ isCompleted: true }, { isCompleted: false }]) => 50
export function getCompletionRate(tasks: Task[]): number {
  if (tasks.length === 0) {
    return 0;
  }

  const completed = tasks.filter((task) => task.isCompleted).length;
  const rate = (completed / tasks.length) * 100;

  return Math.round(Math.min(100, Math.max(0, rate)));
}

// Example: getCountByCategory([{ category: "Work" }]) => { Work: 1 }
export function getCountByCategory(tasks: Task[]): Record<string, number> {
  return tasks.reduce<Record<string, number>>((acc, task) => {
    acc[task.category] = (acc[task.category] ?? 0) + 1;
    return acc;
  }, {});
}

// Example: getIncompleteCountByPriority([{ priority: "high", isCompleted: false }]) => { high: 1, medium: 0, low: 0 }
export function getIncompleteCountByPriority(
  tasks: Task[]
): Record<Priority, number> {
  const counts: Record<Priority, number> = {
    high: 0,
    medium: 0,
    low: 0,
  };

  for (const task of tasks) {
    if (!task.isCompleted) {
      counts[task.priority] += 1;
    }
  }

  return counts;
}

// Example: filterTasks(tasks, { category: "Work", status: "completed", query: "plan" })
export function filterTasks(
  tasks: Task[],
  params: {
    category: string | "all";
    status: "all" | "completed" | "incomplete";
    query: string;
  }
): Task[] {
  const query = params.query.trim().toLowerCase();

  return tasks.filter((task) => {
    if (params.category !== "all" && task.category !== params.category) {
      return false;
    }

    if (params.status === "completed" && !task.isCompleted) {
      return false;
    }

    if (params.status === "incomplete" && task.isCompleted) {
      return false;
    }

    if (query.length > 0 && !task.title.toLowerCase().includes(query)) {
      return false;
    }

    return true;
  });
}

const priorityOrder: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

// Example: sortTasks(tasks, "priority") => high first, then medium, then low
export function sortTasks(
  tasks: Task[],
  sortKey: "newest" | "priority" | "incomplete"
): Task[] {
  const copy = [...tasks];

  return copy.sort((a, b) => {
    if (sortKey === "newest") {
      return b.createdAt - a.createdAt;
    }

    if (sortKey === "priority") {
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      return priorityDiff !== 0 ? priorityDiff : b.createdAt - a.createdAt;
    }

    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }

    return b.createdAt - a.createdAt;
  });
}

// Example: isOverdue(task, Date.now()) => true
export function isOverdue(task: Task, now: number): boolean {
  if (task.isCompleted || task.dueDate == null) {
    return false;
  }

  return task.dueDate < now;
}

// Example: isDueSoon(task, Date.now(), 3) => true
export function isDueSoon(task: Task, now: number, days = 3): boolean {
  if (task.isCompleted || task.dueDate == null) {
    return false;
  }

  const windowMs = Math.max(0, days) * 24 * 60 * 60 * 1000;
  return task.dueDate >= now && task.dueDate <= now + windowMs;
}

// Example: getDueSoonTasks(tasks, Date.now()) => [Task, Task]
export function getDueSoonTasks(
  tasks: Task[],
  now: number,
  days = 3
): Task[] {
  return tasks
    .filter((task) => isDueSoon(task, now, days))
    .sort((a, b) => (a.dueDate ?? 0) - (b.dueDate ?? 0));
}

// Example: getOverdueTasks(tasks, Date.now()) => [Task, Task]
export function getOverdueTasks(tasks: Task[], now: number): Task[] {
  return tasks
    .filter((task) => isOverdue(task, now))
    .sort((a, b) => (a.dueDate ?? 0) - (b.dueDate ?? 0));
}

// Example: getCompletedCount(tasks) => 4
export function getCompletedCount(tasks: Task[]): number {
  return tasks.filter((task) => task.isCompleted).length;
}

// Example: getIncompleteCount(tasks) => 2
export function getIncompleteCount(tasks: Task[]): number {
  return tasks.filter((task) => !task.isCompleted).length;
}

// Example: getCompletionRateByCategory(tasks) => { Work: 50 }
export function getCompletionRateByCategory(
  tasks: Task[]
): Record<string, number> {
  const totals: Record<string, number> = {};
  const completed: Record<string, number> = {};

  for (const task of tasks) {
    totals[task.category] = (totals[task.category] ?? 0) + 1;
    if (task.isCompleted) {
      completed[task.category] = (completed[task.category] ?? 0) + 1;
    }
  }

  return Object.keys(totals).reduce<Record<string, number>>((acc, category) => {
    const total = totals[category] ?? 0;
    const done = completed[category] ?? 0;
    acc[category] = total === 0 ? 0 : Math.round((done / total) * 100);
    return acc;
  }, {});
}

// Example: getCompletionRateByPriority(tasks) => { high: 0, medium: 50, low: 100 }
export function getCompletionRateByPriority(
  tasks: Task[]
): Record<Priority, number> {
  const totals: Record<Priority, number> = { high: 0, medium: 0, low: 0 };
  const completed: Record<Priority, number> = { high: 0, medium: 0, low: 0 };

  for (const task of tasks) {
    totals[task.priority] += 1;
    if (task.isCompleted) {
      completed[task.priority] += 1;
    }
  }

  return {
    high:
      totals.high === 0 ? 0 : Math.round((completed.high / totals.high) * 100),
    medium:
      totals.medium === 0
        ? 0
        : Math.round((completed.medium / totals.medium) * 100),
    low: totals.low === 0 ? 0 : Math.round((completed.low / totals.low) * 100),
  };
}

const categoryPalette = [
  {
    bg: "bg-brand-soft/70",
    border: "border-brand-soft/60",
    text: "text-brand-soft-foreground",
  },
  { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800" },
  { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800" },
  {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
  },
  { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-800" },
  { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-800" },
  { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700" },
];

function hashCategory(value: string): number {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return hash >>> 0;
}

// Example: getCategoryColor("Work") => { bg: "...", border: "...", text: "..." }
export function getCategoryColor(category: string): {
  bg: string;
  border: string;
  text: string;
} {
  const index = hashCategory(category) % categoryPalette.length;
  return categoryPalette[index];
}
