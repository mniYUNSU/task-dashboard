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

type CategoryColorTokens = {
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  badgeText: string;
  accent: string;
};

export type CategoryColor = {
  bg: string;
  border: string;
  text: string;
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  badgeText: string;
  accent: string;
};

const categoryPalette: CategoryColorTokens[] = [
  {
    cardBg: "bg-orange-50/80 dark:bg-orange-950/40",
    cardBorder: "border-orange-200/80 dark:border-orange-900/60",
    badgeBg: "bg-orange-100 dark:bg-orange-900/50",
    badgeText: "text-orange-900 dark:text-orange-100",
    accent: "text-orange-700 dark:text-orange-200",
  },
  {
    cardBg: "bg-amber-50/80 dark:bg-amber-950/40",
    cardBorder: "border-amber-200/80 dark:border-amber-900/60",
    badgeBg: "bg-amber-100 dark:bg-amber-900/50",
    badgeText: "text-amber-900 dark:text-amber-100",
    accent: "text-amber-700 dark:text-amber-200",
  },
  {
    cardBg: "bg-emerald-50/80 dark:bg-emerald-950/40",
    cardBorder: "border-emerald-200/80 dark:border-emerald-900/60",
    badgeBg: "bg-emerald-100 dark:bg-emerald-900/50",
    badgeText: "text-emerald-900 dark:text-emerald-100",
    accent: "text-emerald-700 dark:text-emerald-200",
  },
  {
    cardBg: "bg-sky-50/80 dark:bg-sky-950/40",
    cardBorder: "border-sky-200/80 dark:border-sky-900/60",
    badgeBg: "bg-sky-100 dark:bg-sky-900/50",
    badgeText: "text-sky-900 dark:text-sky-100",
    accent: "text-sky-700 dark:text-sky-200",
  },
  {
    cardBg: "bg-rose-50/80 dark:bg-rose-950/40",
    cardBorder: "border-rose-200/80 dark:border-rose-900/60",
    badgeBg: "bg-rose-100 dark:bg-rose-900/50",
    badgeText: "text-rose-900 dark:text-rose-100",
    accent: "text-rose-700 dark:text-rose-200",
  },
  {
    cardBg: "bg-slate-50 dark:bg-slate-900/40",
    cardBorder: "border-slate-200 dark:border-slate-800",
    badgeBg: "bg-slate-100 dark:bg-slate-800/70",
    badgeText: "text-slate-800 dark:text-slate-100",
    accent: "text-slate-700 dark:text-slate-200",
  },
];

function hashCategory(value: string): number {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return hash >>> 0;
}

function buildCategoryColor(tokens: CategoryColorTokens): CategoryColor {
  return {
    bg: tokens.badgeBg,
    border: tokens.cardBorder,
    text: tokens.badgeText,
    ...tokens,
  };
}

const categoryOverrides: Record<string, CategoryColor> = {
  Work: buildCategoryColor({
    cardBg: "bg-orange-50/80 dark:bg-orange-950/40",
    cardBorder: "border-orange-200/80 dark:border-orange-900/60",
    badgeBg: "bg-orange-100 dark:bg-orange-900/50",
    badgeText: "text-orange-900 dark:text-orange-100",
    accent: "text-orange-700 dark:text-orange-200",
  }),
  仕事: buildCategoryColor({
    cardBg: "bg-orange-50/80 dark:bg-orange-950/40",
    cardBorder: "border-orange-200/80 dark:border-orange-900/60",
    badgeBg: "bg-orange-100 dark:bg-orange-900/50",
    badgeText: "text-orange-900 dark:text-orange-100",
    accent: "text-orange-700 dark:text-orange-200",
  }),
  Personal: buildCategoryColor({
    cardBg: "bg-sky-50/80 dark:bg-sky-950/40",
    cardBorder: "border-sky-200/80 dark:border-sky-900/60",
    badgeBg: "bg-sky-100 dark:bg-sky-900/50",
    badgeText: "text-sky-900 dark:text-sky-100",
    accent: "text-sky-700 dark:text-sky-200",
  }),
  個人: buildCategoryColor({
    cardBg: "bg-sky-50/80 dark:bg-sky-950/40",
    cardBorder: "border-sky-200/80 dark:border-sky-900/60",
    badgeBg: "bg-sky-100 dark:bg-sky-900/50",
    badgeText: "text-sky-900 dark:text-sky-100",
    accent: "text-sky-700 dark:text-sky-200",
  }),
  Study: buildCategoryColor({
    cardBg: "bg-emerald-50/80 dark:bg-emerald-950/40",
    cardBorder: "border-emerald-200/80 dark:border-emerald-900/60",
    badgeBg: "bg-emerald-100 dark:bg-emerald-900/50",
    badgeText: "text-emerald-900 dark:text-emerald-100",
    accent: "text-emerald-700 dark:text-emerald-200",
  }),
  勉強: buildCategoryColor({
    cardBg: "bg-emerald-50/80 dark:bg-emerald-950/40",
    cardBorder: "border-emerald-200/80 dark:border-emerald-900/60",
    badgeBg: "bg-emerald-100 dark:bg-emerald-900/50",
    badgeText: "text-emerald-900 dark:text-emerald-100",
    accent: "text-emerald-700 dark:text-emerald-200",
  }),
};

// Example: getCategoryColor("Work") => { bg, border, text, cardBg, cardBorder, badgeBg, badgeText, accent }
export function getCategoryColor(category: string): CategoryColor {
  const override = categoryOverrides[category];
  if (override) {
    return override;
  }
  const index = hashCategory(category) % categoryPalette.length;
  return buildCategoryColor(categoryPalette[index]);
}
