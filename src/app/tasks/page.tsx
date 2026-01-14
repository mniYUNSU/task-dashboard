"use client";

import { useEffect, useState } from "react";

import { TaskForm } from "@/components/task/TaskForm";
import { TaskManagerList } from "@/components/task/TaskManagerList";
import { useTasks } from "@/hooks/useTasks";

export default function TasksPage() {
  const { tasks } = useTasks();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? null;

  useEffect(() => {
    if (selectedTaskId && !selectedTask) {
      setSelectedTaskId(null);
    }
  }, [selectedTaskId, selectedTask]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">タスク管理</h1>
        <p className="text-sm text-muted-foreground">
          タスクの作成・編集・削除を行います。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <TaskForm
          key={selectedTaskId ?? "new"}
          selectedTask={selectedTask}
          onClearSelection={() => setSelectedTaskId(null)}
        />
        <TaskManagerList
          tasks={tasks}
          selectedTaskId={selectedTaskId}
          onSelect={setSelectedTaskId}
        />
      </div>
    </section>
  );
}
