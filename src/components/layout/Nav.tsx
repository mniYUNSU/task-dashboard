"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "ダッシュボード" },
    { href: "/tasks", label: "タスク管理" },
    { href: "/list", label: "タスク一覧" },
  ];

  return (
    <nav className="border-b bg-card">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-6 py-3 text-sm font-medium">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "rounded-md px-2 py-1 transition-colors",
                isActive
                  ? "bg-brand-soft text-primary"
                  : "text-foreground/70 hover:bg-brand-soft hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
