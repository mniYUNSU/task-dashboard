'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TaskCard } from '@/components/task/TaskCard';
import { TaskDetailDialog } from '@/components/task/TaskDetailDialog';
import { getCategoryLabel } from '@/lib/labels';
import {
  getCompletionRate,
  getCountByCategory,
  getDueSoonTasks,
  getOverdueTasks,
  getIncompleteCountByPriority
} from '@/lib/tasks';
import { defaultCategories, type Task } from '@/lib/types';

const priorityLabels: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低'
};

type DashboardCardsProps = {
  tasks: Task[];
  isHydrated: boolean;
};

export function DashboardCards({ tasks, isHydrated }: DashboardCardsProps) {
  const router = useRouter();
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDetailOpenChange = (open: boolean) => {
    setDetailOpen(open);
    if (!open) {
      setDetailTask(null);
    }
  };

  const completionRate = getCompletionRate(tasks);
  const categoryCounts = getCountByCategory(tasks);
  const priorityCounts = getIncompleteCountByPriority(tasks);
  const now = tasks.reduce(
    (max, task) => Math.max(max, task.updatedAt, task.createdAt),
    0
  );
  const dueSoonTasks = getDueSoonTasks(tasks, now, 3).slice(0, 5);
  const overdueTasks = getOverdueTasks(tasks, now);

  if (!isHydrated) {
    return (
      <Card className='shadow-sm'>
        <CardHeader>
          <CardTitle className='text-base'>ダッシュボード</CardTitle>
        </CardHeader>
        <CardContent className='text-sm text-muted-foreground'>
          読み込み中...
        </CardContent>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className='shadow-sm'>
        <CardHeader>
          <CardTitle className='text-base'>ダッシュボード</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3 text-sm text-muted-foreground'>
          <p>まだタスクがありません。</p>
          <p>
            <Link
              className='font-medium text-primary hover:underline'
              href='/tasks'
            >
              タスク管理
            </Link>
            から最初のタスクを追加しましょう。
          </p>
        </CardContent>
      </Card>
    );
  }

  const maxCategoryCount = Math.max(1, ...Object.values(categoryCounts));
  const maxPriorityCount = Math.max(1, ...Object.values(priorityCounts));

  return (
    <>
      <div className='grid gap-4 lg:grid-cols-3'>
        <Card className='shadow-sm'>
          <CardHeader>
            <CardTitle className='text-base'>完了率</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Progress value={completionRate} />
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>完了タスク</span>
              <span className='font-semibold text-foreground'>
                {completionRate}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardHeader>
            <CardTitle className='text-base'>カテゴリ別タスク数</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {defaultCategories.map((category) => {
              const count = categoryCounts[category] ?? 0;
              const width = `${Math.round((count / maxCategoryCount) * 100)}%`;

              return (
                <div key={category} className='space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>
                      {getCategoryLabel(category)}
                    </span>
                    <span className='font-semibold text-foreground'>
                      {count}
                    </span>
                  </div>
                  <div className='h-2 rounded-full bg-muted'>
                    <div
                      className='h-full rounded-full bg-primary/70'
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardHeader>
            <CardTitle className='text-base'>優先度別の未完了</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {(
              Object.keys(priorityCounts) as Array<keyof typeof priorityCounts>
            ).map((priority) => {
              const count = priorityCounts[priority];
              const width = `${Math.round((count / maxPriorityCount) * 100)}%`;
              const badgeVariant =
                priority === 'high'
                  ? 'default'
                  : priority === 'medium'
                  ? 'secondary'
                  : 'outline';

              return (
                <div key={priority} className='space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-2'>
                      <Badge variant={badgeVariant}>
                        {priorityLabels[priority]}
                      </Badge>
                      <span className='text-muted-foreground'>未完了</span>
                    </div>
                    <span className='font-semibold text-foreground'>
                      {count}
                    </span>
                  </div>
                  <div className='h-2 rounded-full bg-muted'>
                    <div
                      className='h-full rounded-full bg-primary/60'
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className='shadow-sm lg:col-span-3'>
          <CardHeader>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <CardTitle className='text-base'>締切が近いタスク</CardTitle>
              <Link
                className='text-xs font-medium text-primary hover:underline'
                href='/list'
              >
                一覧で確認
              </Link>
            </div>
          </CardHeader>
          <CardContent className='space-y-3'>
            {dueSoonTasks.length === 0 && overdueTasks.length === 0 ? (
              <p className='text-sm text-muted-foreground'>
                期限が近いタスクはありません。
              </p>
            ) : null}

            {overdueTasks.length > 0 ? (
              <div className='space-y-2'>
                <p className='text-xs font-semibold text-destructive'>
                  期限超過
                </p>
                <div className='grid w-full max-w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2'>
                  {overdueTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      now={now}
                      onClick={() => {
                        setDetailTask(task);
                        setDetailOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {dueSoonTasks.length > 0 ? (
              <div className='space-y-2'>
                <p className='text-xs font-semibold text-amber-700 dark:text-amber-200'>
                  期限間近
                </p>
                <div className='grid w-full max-w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2'>
                  {dueSoonTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      now={now}
                      onClick={() => {
                        setDetailTask(task);
                        setDetailOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
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
