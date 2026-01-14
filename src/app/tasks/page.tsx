import type { Metadata } from "next";
import { Suspense } from "react";

import TasksPageClient from "./page.client";

export const metadata: Metadata = {
  title: "タスク管理",
  description: "タスクの作成・管理・進捗をひと目で確認できます。",
};

export default function TasksPage() {
  return (
    <Suspense
      fallback={<div className="text-sm text-muted-foreground">読み込み中...</div>}
    >
      <TasksPageClient />
    </Suspense>
  );
}
