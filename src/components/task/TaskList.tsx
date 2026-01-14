import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Task } from "@/lib/types";

type TaskListProps = {
  tasks: Task[];
  totalCount: number;
  isHydrated: boolean;
};

const categoryLabels: Record<string, string> = {
  Work: "業務",
  Personal: "個人",
  Study: "学習",
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

        {tasks.map((task) => {
          const categoryLabel = categoryLabels[task.category] ?? task.category;
          const priorityVariant = task.priority === "high" ? "default" : "secondary";
          const priorityLabel =
            task.priority === "high" ? "高" : task.priority === "medium" ? "中" : "低";

          return (
            <div
              key={task.id}
              className="rounded-lg border bg-card p-4 shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {task.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant={priorityVariant}>{priorityLabel}</Badge>
                    <span>{categoryLabel}</span>
                    <span>{task.isCompleted ? "完了" : "未完了"}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
