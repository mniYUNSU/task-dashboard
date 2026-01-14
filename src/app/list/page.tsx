import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TaskListPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">タスク一覧</h1>
        <p className="text-sm text-muted-foreground">
          カテゴリ別に絞り込み、タイトルで検索できます。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">フィルター</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="タイトルで検索" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="カテゴリ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="work">業務</SelectItem>
                <SelectItem value="personal">個人</SelectItem>
                <SelectItem value="study">学習</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Tabs defaultValue="all" className="space-y-3">
            <TabsList>
              <TabsTrigger value="all">すべて</TabsTrigger>
              <TabsTrigger value="completed">完了</TabsTrigger>
              <TabsTrigger value="incomplete">未完了</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="rounded-lg border border-dashed p-4">
              <p className="text-sm text-muted-foreground">
                タスク一覧の仮表示です。結果はここに表示されます。
              </p>
            </TabsContent>
            <TabsContent
              value="completed"
              className="rounded-lg border border-dashed p-4"
            >
              <p className="text-sm text-muted-foreground">
                完了タスクの結果（仮表示）です。
              </p>
            </TabsContent>
            <TabsContent
              value="incomplete"
              className="rounded-lg border border-dashed p-4"
            >
              <p className="text-sm text-muted-foreground">
                未完了タスクの結果（仮表示）です。
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
