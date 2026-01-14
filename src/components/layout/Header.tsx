"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const themeLabel = resolvedTheme
    ? isDark
      ? "ライトに切替"
      : "ダークに切替"
    : "テーマ切替";

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
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <span suppressHydrationWarning>{themeLabel}</span>
          </Button>
          <Button asChild size="sm">
            <Link href="/tasks">タスクを追加</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
