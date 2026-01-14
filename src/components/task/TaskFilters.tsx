"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { defaultCategories } from "@/lib/types";

export type TaskFilterStatus = "all" | "completed" | "incomplete";
export type TaskSortKey = "newest" | "priority" | "incomplete";

type TaskFiltersProps = {
  category: string | "all";
  status: TaskFilterStatus;
  query: string;
  sortKey: TaskSortKey;
  onCategoryChange: (value: string | "all") => void;
  onStatusChange: (value: TaskFilterStatus) => void;
  onQueryChange: (value: string) => void;
  onSortChange: (value: TaskSortKey) => void;
};

const categoryLabels: Record<string, string> = {
  Work: "業務",
  Personal: "個人",
  Study: "学習",
};

export function TaskFilters({
  category,
  status,
  query,
  sortKey,
  onCategoryChange,
  onStatusChange,
  onQueryChange,
  onSortChange,
}: TaskFiltersProps) {
  return (
    <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">絞り込み</h2>
        <p className="text-sm text-muted-foreground">
          条件を組み合わせてタスクを検索できます。
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="task-search">
            タイトル検索
          </label>
          <Input
            id="task-search"
            placeholder="例：見積書"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">カテゴリ</label>
          <Select
            value={category}
            onValueChange={(value) => onCategoryChange(value as string | "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="カテゴリを選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              {defaultCategories.map((categoryItem) => (
                <SelectItem key={categoryItem} value={categoryItem}>
                  {categoryLabels[categoryItem] ?? categoryItem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">並び替え</label>
          <Select
            value={sortKey}
            onValueChange={(value) => onSortChange(value as TaskSortKey)}
          >
            <SelectTrigger>
              <SelectValue placeholder="並び替えを選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">新しい順</SelectItem>
              <SelectItem value="priority">優先度順</SelectItem>
              <SelectItem value="incomplete">未完了を優先</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">ステータス</p>
        <Tabs
          value={status}
          onValueChange={(value) => onStatusChange(value as TaskFilterStatus)}
        >
          <TabsList>
            <TabsTrigger value="all">すべて</TabsTrigger>
            <TabsTrigger value="completed">完了</TabsTrigger>
            <TabsTrigger value="incomplete">未完了</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
