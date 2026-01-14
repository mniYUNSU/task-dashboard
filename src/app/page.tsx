import type { Metadata } from 'next';

import DashboardPageClient from './page.client';

export const metadata: Metadata = {
  title: 'ダッシュボード | みんなのタスク管理',
  description: 'タスクの進捗をひと目で確認できます。'
};

export default function Home() {
  return <DashboardPageClient />;
}
