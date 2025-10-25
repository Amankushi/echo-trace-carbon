import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Goal } from "@/hooks/useFootprintHistory";
import { Target, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GoalsProps {
  goal: Goal | null;
  weeklyAverage: number;
  monthlyAverage: number;
  onSaveGoal: (goal: Goal) => void;
  onClearGoal: () => void;
}

export const Goals = ({ goal, weeklyAverage, monthlyAverage, onSaveGoal, onClearGoal }: GoalsProps) => {
  const [target, setTarget] = useState(goal?.target.toString() || "");
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>(goal?.period || 'daily');
  const { toast } = useToast();

  const handleSetGoal = () => {
    const targetValue = parseFloat(target);
    if (isNaN(targetValue) || targetValue <= 0) {
      toast({
        title: "Invalid target",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    onSaveGoal({ target: targetValue, period });
    toast({
      title: "Goal set!",
      description: `Your ${period} target is ${targetValue} kg CO₂`,
    });
  };

  const getCurrentValue = () => {
    if (period === 'weekly') return weeklyAverage;
    if (period === 'monthly') return monthlyAverage;
    return weeklyAverage; // Use weekly as proxy for daily
  };

  const getProgress = () => {
    if (!goal) return 0;
    const current = getCurrentValue();
    const percentage = Math.min(100, (current / goal.target) * 100);
    return 100 - percentage; // Invert so lower emissions = higher progress
  };

  const isOnTrack = () => {
    if (!goal) return false;
    return getCurrentValue() <= goal.target;
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Your Goals</h2>
          <p className="text-lg text-muted-foreground">
            Set targets and track your progress
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Set Your Goal
              </CardTitle>
              <CardDescription>Choose a carbon footprint target</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="target">Target (kg CO₂)</Label>
                <Input
                  id="target"
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="e.g., 10"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Period</Label>
                <div className="flex gap-2 mt-1">
                  {(['daily', 'weekly', 'monthly'] as const).map((p) => (
                    <Button
                      key={p}
                      variant={period === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPeriod(p)}
                      className="flex-1 capitalize"
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSetGoal} className="flex-1">
                  Set Goal
                </Button>
                {goal && (
                  <Button variant="outline" onClick={onClearGoal}>
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {goal && (
            <Card className={isOnTrack() ? "border-primary" : "border-destructive"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  Progress
                </CardTitle>
                <CardDescription>
                  {goal.period.charAt(0).toUpperCase() + goal.period.slice(1)} goal: {goal.target} kg CO₂
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Current Average</span>
                    <span className="font-semibold">
                      {Math.round(getCurrentValue())} kg CO₂
                    </span>
                  </div>
                  <Progress value={getProgress()} className="h-3" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium">Status</span>
                  <Badge variant={isOnTrack() ? "default" : "destructive"}>
                    {isOnTrack() ? "✓ On Track" : "⚠ Above Target"}
                  </Badge>
                </div>

                {!isOnTrack() && (
                  <div className="text-sm text-muted-foreground p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    You're {Math.round(getCurrentValue() - goal.target)} kg over your target. 
                    Check the tips below to reduce your footprint!
                  </div>
                )}

                {isOnTrack() && (
                  <div className="text-sm text-muted-foreground p-3 bg-primary/10 rounded-lg border border-primary/20">
                    Great job! You're meeting your {goal.period} goal. Keep it up!
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};
