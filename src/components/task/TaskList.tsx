import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskCard } from "@/components/task/TaskCard";
import type { Task } from "@/lib/types";

type TaskListProps = {
  tasks: Task[];
  totalCount: number;
  isHydrated: boolean;
};

export function TaskList({ tasks, totalCount, isHydrated }: TaskListProps) {
  return (
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                now={isHydrated ? task.updatedAt : 0}
              />
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
