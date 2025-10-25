import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FootprintRecord } from "@/hooks/useFootprintHistory";
import { Trash2 } from "lucide-react";

interface HistoryProps {
  history: FootprintRecord[];
  onClearHistory: () => void;
}

export const History = ({ history, onClearHistory }: HistoryProps) => {
  if (history.length === 0) {
    return null;
  }

  const chartData = history
    .slice(0, 10)
    .reverse()
    .map((record) => ({
      date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total: Math.round(record.total),
      transport: Math.round(record.breakdown.transport || 0),
      energy: Math.round(record.breakdown.energy || 0),
      food: Math.round(record.breakdown.food || 0),
      waste: Math.round(record.breakdown.waste || 0),
    }));

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-foreground">Your History</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Track your progress over time
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={onClearHistory}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear History
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Emissions Trend</CardTitle>
              <CardDescription>Daily carbon footprint over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Total CO₂ (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emissions by Category</CardTitle>
              <CardDescription>Breakdown of your last 10 calculations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="transport" fill="hsl(var(--primary))" name="Transport" />
                  <Bar dataKey="energy" fill="hsl(var(--accent))" name="Energy" />
                  <Bar dataKey="food" fill="hsl(var(--secondary))" name="Food" />
                  <Bar dataKey="waste" fill="hsl(var(--muted-foreground))" name="Waste" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Calculations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.slice(0, 5).map((record) => (
                <div 
                  key={record.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {Math.round(record.total)} kg CO₂
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      🚗 {Math.round(record.breakdown.transport || 0)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ⚡ {Math.round(record.breakdown.energy || 0)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      🍽️ {Math.round(record.breakdown.food || 0)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ♻️ {Math.round(record.breakdown.waste || 0)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
