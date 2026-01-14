import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Header() {
  return (
    <Card className="rounded-none border-x-0 border-t-0">
      <CardContent className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
            タ
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-primary/80">
              タスク管理
            </p>
            <p className="text-lg font-semibold">タスク管理ダッシュボード</p>
          </div>
        </div>
        <Button asChild size="sm">
          <Link href="/tasks">タスクを追加</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
