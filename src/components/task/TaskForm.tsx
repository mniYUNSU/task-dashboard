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
  onClearSelection: () => void;
};

type TaskFormState = {
  title: string;
  category: string;
  priority: Priority;
  isCompleted: boolean;
};

const defaultState: TaskFormState = {
  title: "",
  category: defaultCategories[0],
  priority: "medium",
  isCompleted: false,
};

export function TaskForm({ selectedTask, onClearSelection }: TaskFormProps) {
  const { addTask, editTask } = useTasks();
  const initialState: TaskFormState = selectedTask
    ? {
        title: selectedTask.title,
        category: selectedTask.category,
        priority: selectedTask.priority,
        isCompleted: selectedTask.isCompleted,
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
      });
      onClearSelection();
      return;
    }

    addTask({
      title: trimmedTitle,
      category: form.category,
      priority: form.priority,
      isCompleted: form.isCompleted,
    });
    setForm(defaultState);
    setError(null);
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
              <Button type="button" variant="outline" onClick={onClearSelection}>
                編集をキャンセル
              </Button>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
