"use client";

import { useMemo, useState } from "react";

import {
  TaskFilters,
  type TaskFilterStatus,
  type TaskSortKey,
} from "@/components/task/TaskFilters";
import { TaskList } from "@/components/task/TaskList";
import { useTasks } from "@/hooks/useTasks";
import { filterTasks, sortTasks } from "@/lib/tasks";

export default function TaskListPage() {
  const { tasks, isHydrated } = useTasks();
  const [category, setCategory] = useState<string | "all">("all");
  const [status, setStatus] = useState<TaskFilterStatus>("all");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<TaskSortKey>("newest");

  const filteredTasks = useMemo(
    () => filterTasks(tasks, { category, status, query }),
    [tasks, category, status, query]
  );
  const sortedTasks = useMemo(
    () => sortTasks(filteredTasks, sortKey),
    [filteredTasks, sortKey]
  );

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">タスク一覧</h1>
        <p className="text-sm text-muted-foreground">
          カテゴリやステータスで絞り込み、タイトル検索ができます。
        </p>
      </div>

      <TaskFilters
        category={category}
        status={status}
        query={query}
        sortKey={sortKey}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />

      <TaskList
        tasks={sortedTasks}
        totalCount={tasks.length}
        isHydrated={isHydrated}
      />
    </section>
  );
}
