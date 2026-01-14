"use client";

import { useMemo, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTasks } from "@/hooks/useTasks";
import { defaultCategories, type Priority, type Task } from "@/lib/types";

const priorityOptions: Array<{ value: Priority; label: string }> = [
  { value: "high", label: "高" },
  { value: "medium", label: "中" },
  { value: "low", label: "低" },
];

const categoryLabels: Record<string, string> = {
  Work: "業務",
  Personal: "個人",
  Study: "学習",
};

type TaskFormProps = {
  selectedTask: Task | null;
  onSuccess: () => void;
  onCancel?: () => void;
};

type TaskFormState = {
  title: string;
  category: string;
  priority: Priority;
  isCompleted: boolean;
  description: string;
  dueDate: number | null;
};

const defaultState: TaskFormState = {
  title: "",
  category: defaultCategories[0],
  priority: "medium",
  isCompleted: false,
  description: "",
  dueDate: null,
};

function formatDateInputValue(timestamp: number | null) {
  if (!timestamp) {
    return "";
  }
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toEndOfDayTimestamp(value: string) {
  if (!value) {
    return null;
  }
  const date = new Date(`${value}T23:59:59.999`);
  return Number.isNaN(date.getTime()) ? null : date.getTime();
}

export function TaskForm({
  selectedTask,
  onSuccess,
  onCancel,
}: TaskFormProps) {
  const { addTask, editTask } = useTasks();
  const initialState: TaskFormState = selectedTask
    ? {
        title: selectedTask.title,
        category: selectedTask.category,
        priority: selectedTask.priority,
        isCompleted: selectedTask.isCompleted,
        description: selectedTask.description ?? "",
        dueDate: selectedTask.dueDate ?? null,
      }
    : defaultState;
  const [form, setForm] = useState<TaskFormState>(initialState);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(selectedTask);

  const categoryOptions = useMemo(
    () =>
      defaultCategories.map((category) => ({
        value: category,
        label: categoryLabels[category] ?? category,
      })),
    []
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = form.title.trim();

    if (!trimmedTitle) {
      setError("タイトルを入力してください。");
      return;
    }

    if (selectedTask) {
      editTask(selectedTask.id, {
        title: trimmedTitle,
        category: form.category,
        priority: form.priority,
        isCompleted: form.isCompleted,
        description: form.description,
        dueDate: form.dueDate,
      });
      onSuccess();
      return;
    }

    addTask({
      title: trimmedTitle,
      category: form.category,
      priority: form.priority,
      isCompleted: form.isCompleted,
      description: form.description,
      dueDate: form.dueDate,
    });
    setForm(defaultState);
    setError(null);
    onSuccess();
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">
          {isEditing ? "タスクを編集" : "タスクを追加"}
        </CardTitle>
        <CardDescription>
          必須項目を入力してタスクを保存してください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="task-title">
              タイトル
            </label>
            <Input
              id="task-title"
              placeholder="例：見積書を作成"
              value={form.title}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, title: event.target.value }))
              }
            />
            {error ? (
              <p className="text-xs text-destructive">{error}</p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">カテゴリ</label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリを選択" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">優先度</label>
              <Select
                value={form.priority}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, priority: value as Priority }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="優先度を選択" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="task-description">
              説明
            </label>
            <textarea
              id="task-description"
              className="min-h-[96px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              placeholder="補足や背景を入力"
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, description: event.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="task-due-date">
              期限
            </label>
            <Input
              id="task-due-date"
              type="date"
              value={formatDateInputValue(form.dueDate)}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  dueDate: toEndOfDayTimestamp(event.target.value),
                }))
              }
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 rounded border-input accent-primary"
              checked={form.isCompleted}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  isCompleted: event.target.checked,
                }))
              }
            />
            完了として登録する
          </label>

          <div className="flex flex-wrap gap-2">
            <Button type="submit">
              {isEditing ? "変更を保存" : "追加する"}
            </Button>
            {isEditing ? (
              <Button type="button" variant="outline" onClick={onCancel}>
                編集をキャンセル
              </Button>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
