import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">ダッシュボード</h1>
        <p className="text-sm text-muted-foreground">
          タスクが登録されると、主要な指標がここに表示されます。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-base">完了率</CardTitle>
            <Badge className="w-fit" variant="secondary">
              準備中
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={0} />
            <p className="text-xs text-muted-foreground">完了 0%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">カテゴリ別タスク数</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>業務</span>
              <span>0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>個人</span>
              <span>0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>学習</span>
              <span>0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              優先度別の未完了タスク
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>高</span>
              <span>0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>中</span>
              <span>0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>低</span>
              <span>0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
