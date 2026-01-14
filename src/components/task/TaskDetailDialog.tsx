'use client';

import { useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { formatDateUtc } from '@/lib/format';
import { getCategoryLabel } from '@/lib/labels';
import { getCategoryColor, isDueSoon, isOverdue } from '@/lib/tasks';
import { cn } from '@/lib/utils';
import type { Task } from '@/lib/types';

type TaskDetailDialogProps = {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoToManage: (taskId: string) => void;
  actionLabel?: string;
};

const priorityStyles: Record<string, string> = {
  high: 'bg-primary text-primary-foreground',
  medium: 'bg-brand-soft text-brand-soft-foreground',
  low: 'bg-muted text-muted-foreground'
};

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  incomplete: 'bg-slate-100 text-slate-700 border-slate-200'
};

export function TaskDetailDialog({
  task,
  open,
  onOpenChange,
  onGoToManage,
  actionLabel = 'タスク管理へ'
}: TaskDetailDialogProps) {
  const categoryColor = task ? getCategoryColor(task.category) : null;
  const referenceTime = task ? task.updatedAt : 0;
  const dueState = useMemo(() => {
    if (!task || !task.dueDate || referenceTime === 0) {
      return 'none' as const;
    }
    if (isOverdue(task, referenceTime)) {
      return 'overdue' as const;
    }
    if (isDueSoon(task, referenceTime, 3)) {
      return 'soon' as const;
    }
    return 'none' as const;
  }, [task, referenceTime]);

  const handleGoToManage = () => {
    if (!task) {
      return;
    }
    onGoToManage(task.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>タスク詳細</DialogTitle>
        </DialogHeader>
        {task ? (
          <div className='space-y-4 text-sm min-w-0 flex-1'>
            <div className='space-y-2'>
              <p className='text-base font-semibold text-foreground line-clamp-2 wrap-break-word'>
                {task.title}
              </p>
              <div className='flex flex-wrap items-center gap-2 text-xs'>
                <Badge
                  variant='outline'
                  className={cn(
                    'border',
                    categoryColor?.bg,
                    categoryColor?.text,
                    categoryColor?.border
                  )}
                >
                  {getCategoryLabel(task.category)}
                </Badge>
                <Badge className={priorityStyles[task.priority] ?? 'bg-muted'}>
                  {task.priority === 'high'
                    ? '高'
                    : task.priority === 'medium'
                    ? '中'
                    : '低'}
                </Badge>
                <Badge
                  variant='outline'
                  className={cn(
                    'border',
                    statusStyles[task.isCompleted ? 'completed' : 'incomplete']
                  )}
                >
                  {task.isCompleted ? '完了' : '未完了'}
                </Badge>
                {task.dueDate ? (
                  <Badge
                    className={cn(
                      dueState === 'overdue'
                        ? 'bg-destructive text-white'
                        : dueState === 'soon'
                        ? 'bg-brand-soft text-brand-soft-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {dueState === 'overdue'
                      ? '期限超過'
                      : dueState === 'soon'
                      ? '期限間近'
                      : '期限あり'}
                  </Badge>
                ) : null}
              </div>
            </div>

            <div className='rounded-md border border-border bg-background p-3'>
              <p className='text-xs font-medium text-muted-foreground'>説明</p>
              <p className='mt-2 whitespace-pre-wrap text-sm text-foreground line-clamp-4 wrap-break-word'>
                {task.description?.trim() || '説明は未登録です。'}
              </p>
            </div>

            <div className='grid gap-2 text-xs text-muted-foreground sm:grid-cols-2'>
              <div>
                <span className='font-medium text-foreground'>作成日:</span>{' '}
                {formatDateUtc(task.createdAt)}
              </div>
              <div>
                <span className='font-medium text-foreground'>更新日:</span>{' '}
                {formatDateUtc(task.updatedAt)}
              </div>
              <div>
                <span className='font-bold text-foreground'>期限:</span>{' '}
                {task.dueDate ? formatDateUtc(task.dueDate) : '未設定'}
              </div>
            </div>
          </div>
        ) : (
          <p className='text-sm text-muted-foreground'>
            タスクが選択されていません。
          </p>
        )}
        <DialogFooter className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              閉じる
            </Button>
          </DialogClose>
          <Button onClick={handleGoToManage} disabled={!task}>
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
