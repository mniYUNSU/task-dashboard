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
