import Link from "next/link";

export function Nav() {
  return (
    <nav className="border-b">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-3 text-sm font-medium">
        <Link
          className="text-foreground/80 transition-colors hover:text-foreground"
          href="/"
        >
          ダッシュボード
        </Link>
        <Link
          className="text-foreground/80 transition-colors hover:text-foreground"
          href="/tasks"
        >
          タスク管理
        </Link>
        <Link
          className="text-foreground/80 transition-colors hover:text-foreground"
          href="/list"
        >
          タスク一覧
        </Link>
      </div>
    </nav>
  );
}
