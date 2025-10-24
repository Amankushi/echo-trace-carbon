import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ResultsProps {
  total: number;
  breakdown: Record<string, number>;
}

export const Results = ({ total, breakdown }: ResultsProps) => {
  const average = 16000; // Average annual carbon footprint in kg CO2
  const percentage = Math.round((total / average) * 100);
  
  const categories = [
    { name: "Transport", value: breakdown.transport, icon: "🚗", color: "bg-primary" },
    { name: "Energy", value: breakdown.energy, icon: "⚡", color: "bg-accent" },
    { name: "Food", value: breakdown.food, icon: "🍽️", color: "bg-secondary" },
    { name: "Waste", value: breakdown.waste, icon: "♻️", color: "bg-muted" },
  ];

  const getImpactLevel = () => {
    if (percentage < 70) return { text: "Excellent!", color: "text-primary", message: "You're well below average!" };
    if (percentage < 100) return { text: "Good", color: "text-accent", message: "You're doing better than average" };
    if (percentage < 130) return { text: "Average", color: "text-secondary", message: "There's room for improvement" };
    return { text: "High", color: "text-destructive", message: "Consider making some changes" };
  };

  const impact = getImpactLevel();

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Your Carbon Footprint</h2>
          <div className={`text-6xl font-bold mb-2 ${impact.color}`}>
            {total.toLocaleString()} kg
          </div>
          <p className="text-xl text-muted-foreground">CO₂ per year</p>
          <p className={`text-lg font-semibold mt-4 ${impact.color}`}>
            {impact.text} - {impact.message}
          </p>
        </div>

        <Card className="mb-8 border-2 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <CardHeader>
            <CardTitle>Compared to Average</CardTitle>
            <CardDescription>
              The average carbon footprint is {average.toLocaleString()} kg CO₂ per year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Your footprint</span>
                <span className="font-semibold">{percentage}% of average</span>
              </div>
              <Progress value={Math.min(percentage, 100)} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.name}
              className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {category.value.toLocaleString()} kg
                </div>
                <Progress 
                  value={(category.value / total) * 100} 
                  className="h-2"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {Math.round((category.value / total) * 100)}% of your total footprint
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
