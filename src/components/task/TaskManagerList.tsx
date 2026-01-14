"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  Work: "業務",
  Personal: "個人",
  Study: "学習",
};

const priorityStyles: Record<string, string> = {
  high: "bg-primary text-primary-foreground",
  medium: "bg-brand-soft text-brand-soft-foreground",
  low: "bg-muted text-muted-foreground",
};

function formatDateUtc(timestamp: number) {
  return new Date(timestamp).toISOString().slice(0, 10).replaceAll("-", "/");
}

type TaskManagerListProps = {
  tasks: Task[];
  selectedTaskId: string | null;
  onSelect: (id: string) => void;
};

export function TaskManagerList({
  tasks,
  selectedTaskId,
  onSelect,
}: TaskManagerListProps) {
  const { deleteTask, toggleComplete, isHydrated } = useTasks();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">タスク一覧</CardTitle>
        <CardDescription>登録済みのタスクを管理できます。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {!isHydrated ? (
          <div className="rounded-lg border border-dashed bg-background p-4 text-sm text-muted-foreground">
            読み込み中...
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-background p-4 text-sm text-muted-foreground">
            まだタスクがありません。フォームから追加してください。
          </div>
        ) : null}

        {tasks.map((task) => {
          const isSelected = selectedTaskId === task.id;
          const categoryLabel = categoryLabels[task.category] ?? task.category;
          const priorityLabel =
            task.priority === "high" ? "高" : task.priority === "medium" ? "中" : "低";
          const priorityClassName = priorityStyles[task.priority] ?? "bg-muted";

          return (
            <div
              key={task.id}
              className={`rounded-lg border bg-card p-4 shadow-sm transition-colors ${
                isSelected ? "border-primary/50 bg-brand-soft/40" : "border-border"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold leading-relaxed text-foreground">
                    {task.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge className={priorityClassName}>{priorityLabel}</Badge>
                    <span>{categoryLabel}</span>
                    <span>{task.isCompleted ? "完了" : "未完了"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    作成日: {formatDateUtc(task.createdAt)}
                  </span>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-input accent-primary"
                      checked={task.isCompleted}
                      onChange={() => toggleComplete(task.id)}
                    />
                    完了
                  </label>
                  <Button size="sm" variant="outline" onClick={() => onSelect(task.id)}>
                    編集
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost">
                        削除
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>タスクを削除</DialogTitle>
                        <DialogDescription>
                          「{task.title}」を削除します。よろしいですか？
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            キャンセル
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => deleteTask(task.id)}
                          >
                            削除する
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
