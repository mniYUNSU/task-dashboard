"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { TaskForm } from "@/components/task/TaskForm";
import { TaskManagerList } from "@/components/task/TaskManagerList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTasks } from "@/hooks/useTasks";

export default function TasksPageClient() {
  const { tasks } = useTasks();
  const searchParams = useSearchParams();
  const focusId = searchParams.get("focus");
  const handledFocusRef = useRef<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    if (!focusId || handledFocusRef.current === focusId) {
      return;
    }

    const target = document.getElementById(`task-${focusId}`);
    if (!target) {
      return;
    }

    handledFocusRef.current = focusId;
    target.scrollIntoView({ behavior: "smooth", block: "center" });

    const highlightClasses =
      "ring-2 ring-primary/60 ring-offset-2 ring-offset-background".split(" ");
    target.classList.add(...highlightClasses);

    const timeoutId = window.setTimeout(() => {
      target.classList.remove(...highlightClasses);
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [focusId, tasks]);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? null;
  const isEditOpen = editOpen && Boolean(selectedTask);

  const handleEdit = (id: string) => {
    setSelectedTaskId(id);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedTaskId(null);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">タスク管理</h1>
          <p className="text-sm text-muted-foreground">
            タスクの作成・編集・削除を行います。
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button>タスク追加</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>タスクを追加</DialogTitle>
            </DialogHeader>
            <TaskForm
              key={addOpen ? "new-open" : "new"}
              selectedTask={null}
              onSuccess={() => setAddOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => (open ? setEditOpen(true) : handleCloseEdit())}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>タスクを編集</DialogTitle>
          </DialogHeader>
          {selectedTask ? (
            <TaskForm
              key={selectedTask.id}
              selectedTask={selectedTask}
              onSuccess={handleCloseEdit}
              onCancel={handleCloseEdit}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <div className="grid gap-6">
        <TaskManagerList
          tasks={tasks}
          selectedTaskId={selectedTaskId}
          onEdit={handleEdit}
        />
      </div>
    </section>
  );
}
