"use client";

import { DashboardCards } from "@/components/dashboard/DashboardCards";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  const { tasks, isHydrated } = useTasks();

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">ダッシュボード</h1>
        <p className="text-sm text-muted-foreground">
          タスクの状況をひと目で確認できます。
        </p>
      </div>

      <DashboardCards tasks={tasks} isHydrated={isHydrated} />
    </section>
  );
}
