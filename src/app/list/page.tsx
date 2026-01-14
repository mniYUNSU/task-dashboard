import type { Metadata } from "next";

import TaskListPageClient from "./page.client";

export const metadata: Metadata = {
  title: "タスク一覧",
  description: "タスクを検索・絞り込みして一覧で確認できます。",
};

export default function TaskListPage() {
  return <TaskListPageClient />;
}
