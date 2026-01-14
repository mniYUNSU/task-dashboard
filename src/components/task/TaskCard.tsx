import type { KeyboardEvent, ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getCategoryColor, isDueSoon, isOverdue } from '@/lib/tasks';
import type { Task } from '@/lib/types';

type TaskCardProps = {
  task: Task;
  now?: number;
  highlighted?: boolean;
  actions?: ReactNode;
  onClick?: () => void;
  domId?: string;
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

const categoryLabels: Record<string, string> = {
  Work: '業務',
  Personal: '個人',
  Study: '学習'
};

function formatDateUtc(timestamp: number) {
  return new Date(timestamp).toISOString().slice(0, 10).replaceAll('-', '/');
}

export function TaskCard({
  task,
  now = 0,
  highlighted,
  actions,
  onClick,
  domId
}: TaskCardProps) {
  const categoryColor = getCategoryColor(task.category);
  const priorityLabel =
    task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低';
  const statusKey = task.isCompleted ? 'completed' : 'incomplete';
  const description = task.description?.trim();
  const dueLabel = task.dueDate ? formatDateUtc(task.dueDate) : null;
  const canEvaluateDue = now > 0 && task.dueDate != null;
  const overdue = canEvaluateDue ? isOverdue(task, now) : false;
  const dueSoon = canEvaluateDue ? isDueSoon(task, now) : false;

  const dueClassName = overdue
    ? 'text-destructive'
    : dueSoon
    ? 'text-primary'
    : 'text-muted-foreground';

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={cn(
        'w-full rounded-lg border p-4 shadow-sm',
        categoryColor.cardBg,
        categoryColor.cardBorder,
        highlighted && 'border-primary/50 ring-2 ring-primary/20',
        onClick && 'cursor-pointer transition-colors hover:border-primary/40'
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      id={domId}
    >
      <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
        <div className='min-w-0 flex-1 space-y-2'>
          <div className='text-sm font-semibold leading-relaxed text-foreground truncate'>
            {task.title}
          </div>
          <div className='flex flex-wrap items-center gap-2 text-xs'>
            <Badge
              variant='outline'
              className={cn(
                'border',
                categoryColor.bg,
                categoryColor.text,
                categoryColor.border
              )}
            >
              {categoryLabels[task.category] ?? task.category}
            </Badge>
            <Badge className={priorityStyles[task.priority] ?? 'bg-muted'}>
              {priorityLabel}
            </Badge>
            <Badge
              variant='outline'
              className={cn('border', statusStyles[statusKey])}
            >
              {task.isCompleted ? '完了' : '未完了'}
            </Badge>
          </div>
          <p className='text-xs text-muted-foreground line-clamp-2'>
            {description || '説明は未登録です。'}
          </p>
          <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
            <span>作成: {formatDateUtc(task.createdAt)}</span>
            <span>更新: {formatDateUtc(task.updatedAt)}</span>
            {dueLabel ? (
              <span className={cn('font-bold', dueClassName)}>
                期限: {dueLabel}
              </span>
            ) : null}
          </div>
        </div>
        {actions ? (
          <div
            className='flex shrink-0 flex-wrap items-center gap-2'
            onClick={(event) => event.stopPropagation()}
          >
            {actions}
          </div>
        ) : null}
      </div>
    </div>
  );
}
