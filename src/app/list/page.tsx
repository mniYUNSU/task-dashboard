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
        <h1 className="text-2xl font-semibold">Task List</h1>
        <p className="text-sm text-muted-foreground">
          Filter and search tasks across all categories.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Search by title" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="study">Study</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Tabs defaultValue="all" className="space-y-3">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="rounded-lg border border-dashed p-4">
              <p className="text-sm text-muted-foreground">
                Task list placeholder. Results will render here.
              </p>
            </TabsContent>
            <TabsContent
              value="completed"
              className="rounded-lg border border-dashed p-4"
            >
              <p className="text-sm text-muted-foreground">
                Completed task results placeholder.
              </p>
            </TabsContent>
            <TabsContent
              value="incomplete"
              className="rounded-lg border border-dashed p-4"
            >
              <p className="text-sm text-muted-foreground">
                Incomplete task results placeholder.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
