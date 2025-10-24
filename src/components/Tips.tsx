import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Tips = () => {
  const tips = [
    {
      category: "Transport",
      icon: "🚗",
      color: "bg-primary/10 text-primary border-primary/20",
      tips: [
        "Walk or bike for short trips under 2 miles",
        "Use public transportation when possible",
        "Carpool with colleagues or friends",
        "Consider an electric or hybrid vehicle",
        "Combine errands into one trip",
      ],
    },
    {
      category: "Energy",
      icon: "⚡",
      color: "bg-accent/10 text-accent border-accent/20",
      tips: [
        "Switch to LED bulbs throughout your home",
        "Unplug devices when not in use",
        "Use a programmable thermostat",
        "Improve home insulation",
        "Choose renewable energy providers",
      ],
    },
    {
      category: "Food",
      icon: "🍽️",
      color: "bg-secondary/10 text-secondary border-secondary/20",
      tips: [
        "Reduce meat consumption, especially beef",
        "Buy local and seasonal produce",
        "Minimize food waste with meal planning",
        "Compost organic waste",
        "Choose plant-based alternatives",
      ],
    },
    {
      category: "Waste",
      icon: "♻️",
      color: "bg-muted text-foreground border-border",
      tips: [
        "Recycle paper, plastic, glass, and metal",
        "Use reusable bags and containers",
        "Avoid single-use plastics",
        "Buy products with minimal packaging",
        "Repair items instead of replacing them",
      ],
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Reduce Your Impact</h2>
          <p className="text-lg text-muted-foreground">
            Small changes can make a big difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((section, index) => (
            <Card 
              key={section.category}
              className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{section.icon}</span>
                  {section.category}
                </CardTitle>
                <CardDescription>Ways to reduce your {section.category.toLowerCase()} emissions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <Badge variant="outline" className={`mt-0.5 ${section.color} shrink-0`}>
                        {tipIndex + 1}
                      </Badge>
                      <span className="text-sm text-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
