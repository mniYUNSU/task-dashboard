"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskCard } from "@/components/task/TaskCard";
import { TaskDetailDialog } from "@/components/task/TaskDetailDialog";
import type { Task } from "@/lib/types";

type TaskListProps = {
  tasks: Task[];
  totalCount: number;
  isHydrated: boolean;
};

export function TaskList({ tasks, totalCount, isHydrated }: TaskListProps) {
  const router = useRouter();
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDetailOpenChange = (open: boolean) => {
    setDetailOpen(open);
    if (!open) {
      setDetailTask(null);
    }
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">タスク一覧</CardTitle>
          <CardDescription>
            {totalCount === 0
              ? "登録済みのタスクはありません。"
              : `表示中: ${tasks.length}件 / 全${totalCount}件`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!isHydrated ? (
            <div className="rounded-lg border border-dashed bg-background p-4 text-sm text-muted-foreground">
              読み込み中...
            </div>
          ) : totalCount === 0 ? (
            <div className="rounded-lg border border-dashed bg-background p-4 text-sm text-muted-foreground">
              まずはタスクを追加してください。
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-background p-4 text-sm text-muted-foreground">
              条件に一致するタスクがありません。
            </div>
          ) : null}

          {tasks.length > 0 ? (
            <div className="grid w-full max-w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  now={isHydrated ? task.updatedAt : 0}
                  onClick={() => {
                    setDetailTask(task);
                    setDetailOpen(true);
                  }}
                />
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
      <TaskDetailDialog
        task={detailTask}
        open={detailOpen}
        onOpenChange={handleDetailOpenChange}
        onGoToManage={(taskId) =>
          router.push(`/tasks?focus=${encodeURIComponent(taskId)}`)
        }
      />
    </>
  );
}
