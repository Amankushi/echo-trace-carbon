import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalculatorData {
  transport: {
    carMiles: number;
    flights: number;
    publicTransport: number;
  };
  energy: {
    electricity: number;
    gas: number;
  };
  food: {
    meat: number;
    dairy: number;
  };
  waste: {
    recycling: number;
  };
}

interface CarbonCalculatorProps {
  onCalculate: (total: number, breakdown: Record<string, number>) => void;
}

export const CarbonCalculator = ({ onCalculate }: CarbonCalculatorProps) => {
  const [data, setData] = useState<CalculatorData>({
    transport: { carMiles: 0, flights: 0, publicTransport: 0 },
    energy: { electricity: 0, gas: 0 },
    food: { meat: 0, dairy: 0 },
    waste: { recycling: 0 },
  });

  const updateField = (category: keyof CalculatorData, field: string, value: number) => {
    setData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const calculateFootprint = () => {
    // Simplified carbon calculations (kg CO2 per year)
    const transport = 
      data.transport.carMiles * 0.411 + // kg CO2 per mile
      data.transport.flights * 90 + // kg CO2 per flight
      data.transport.publicTransport * 0.089; // kg CO2 per mile
    
    const energy = 
      data.energy.electricity * 0.92 + // kg CO2 per kWh
      data.energy.gas * 5.3; // kg CO2 per therm
    
    const food = 
      data.food.meat * 25 + // kg CO2 per serving per week
      data.food.dairy * 10; // kg CO2 per serving per week
    
    const waste = Math.max(0, 500 - (data.waste.recycling * 50)); // base waste minus recycling benefit
    
    const breakdown = {
      transport: Math.round(transport),
      energy: Math.round(energy),
      food: Math.round(food),
      waste: Math.round(waste),
    };
    
    const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
    onCalculate(total, breakdown);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Calculate Your Carbon Footprint</h2>
          <p className="text-lg text-muted-foreground">Answer a few questions to estimate your annual emissions</p>
        </div>

        <Card className="border-2 border-border shadow-lg">
          <CardHeader>
            <CardTitle>Your Carbon Impact</CardTitle>
            <CardDescription>Enter your average monthly or yearly usage</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="transport" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="transport">🚗 Transport</TabsTrigger>
                <TabsTrigger value="energy">⚡ Energy</TabsTrigger>
                <TabsTrigger value="food">🍽️ Food</TabsTrigger>
                <TabsTrigger value="waste">♻️ Waste</TabsTrigger>
              </TabsList>

              <TabsContent value="transport" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="carMiles">Car miles per week</Label>
                  <Input
                    id="carMiles"
                    type="number"
                    min="0"
                    value={data.transport.carMiles}
                    onChange={(e) => updateField('transport', 'carMiles', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flights">Flights per year</Label>
                  <Input
                    id="flights"
                    type="number"
                    min="0"
                    value={data.transport.flights}
                    onChange={(e) => updateField('transport', 'flights', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publicTransport">Public transport miles per week</Label>
                  <Input
                    id="publicTransport"
                    type="number"
                    min="0"
                    value={data.transport.publicTransport}
                    onChange={(e) => updateField('transport', 'publicTransport', Number(e.target.value))}
                  />
                </div>
              </TabsContent>

              <TabsContent value="energy" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="electricity">Electricity (kWh per month)</Label>
                  <Input
                    id="electricity"
                    type="number"
                    min="0"
                    value={data.energy.electricity}
                    onChange={(e) => updateField('energy', 'electricity', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gas">Natural gas (therms per month)</Label>
                  <Input
                    id="gas"
                    type="number"
                    min="0"
                    value={data.energy.gas}
                    onChange={(e) => updateField('energy', 'gas', Number(e.target.value))}
                  />
                </div>
              </TabsContent>

              <TabsContent value="food" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="meat">Meat servings per week</Label>
                  <Input
                    id="meat"
                    type="number"
                    min="0"
                    value={data.food.meat}
                    onChange={(e) => updateField('food', 'meat', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dairy">Dairy servings per week</Label>
                  <Input
                    id="dairy"
                    type="number"
                    min="0"
                    value={data.food.dairy}
                    onChange={(e) => updateField('food', 'dairy', Number(e.target.value))}
                  />
                </div>
              </TabsContent>

              <TabsContent value="waste" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="recycling">Recycling percentage (0-100%)</Label>
                  <Input
                    id="recycling"
                    type="number"
                    min="0"
                    max="100"
                    value={data.waste.recycling}
                    onChange={(e) => updateField('waste', 'recycling', Number(e.target.value))}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={calculateFootprint} 
              className="w-full mt-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300"
              size="lg"
            >
              Calculate My Footprint
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
