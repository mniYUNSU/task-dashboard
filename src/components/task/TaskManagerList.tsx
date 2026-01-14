"use client";

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
import { TaskCard } from "@/components/task/TaskCard";
import { Switch } from "@/components/ui/switch";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/lib/types";

type TaskManagerListProps = {
  tasks: Task[];
  selectedTaskId: string | null;
  onEdit: (id: string) => void;
};

export function TaskManagerList({
  tasks,
  selectedTaskId,
  onEdit,
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

          return (
            <TaskCard
              key={task.id}
              task={task}
              now={isHydrated ? task.updatedAt : 0}
              highlighted={isSelected}
              actions={
                <>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Switch
                      checked={task.isCompleted}
                      onCheckedChange={() => toggleComplete(task.id)}
                      aria-label={`${task.title} を完了にする`}
                    />
                    <span>完了</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => onEdit(task.id)}>
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
                </>
              }
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
