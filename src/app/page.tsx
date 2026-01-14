import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          High-level task metrics will appear here once tasks exist.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-base">Completion rate</CardTitle>
            <Badge className="w-fit" variant="secondary">
              Placeholder
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={0} />
            <p className="text-xs text-muted-foreground">0% completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Task count by category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Work</span>
              <span>0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Personal</span>
              <span>0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Study</span>
              <span>0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Incomplete tasks by priority
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>High</span>
              <span>0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Medium</span>
              <span>0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Low</span>
              <span>0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
