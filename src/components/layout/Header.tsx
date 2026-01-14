'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <Card className='rounded-none border-x-0 border-t-0'>
      <CardContent className='mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4'>
        <div className='flex items-center gap-3'>
          <div className='flex h-9 w-9 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground'>
            タ
          </div>
          <div>
            <p className='text-xs uppercase tracking-wide text-primary/80'>
              みんなのタスク管理
            </p>
            <p className='text-lg font-semibold'>
              みんなのタスク管理ダッシュボード
            </p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {isClient ? (
            <ToggleGroup type='single' value='theme'>
              <ToggleGroupItem
                value='theme'
                size='sm'
                variant='outline'
                aria-label={
                  isDark ? 'ライトテーマに切替' : 'ダークテーマに切替'
                }
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className='cursor-pointer'
              >
                {isDark ? (
                  <Sun className='size-4' />
                ) : (
                  <Moon className='size-4' />
                )}
              </ToggleGroupItem>
            </ToggleGroup>
          ) : (
            <div className='h-8 w-8' aria-hidden />
          )}
          <Button asChild size='sm'>
            <Link href='/tasks'>タスクを追加</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
