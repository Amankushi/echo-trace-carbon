import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { CarbonCalculator } from "@/components/CarbonCalculator";
import { Results } from "@/components/Results";
import { Tips } from "@/components/Tips";

const Index = () => {
  const [results, setResults] = useState<{ total: number; breakdown: Record<string, number> } | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCalculate = (total: number, breakdown: Record<string, number>) => {
    setResults({ total, breakdown });
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      
      <div ref={calculatorRef}>
        <CarbonCalculator onCalculate={handleCalculate} />
      </div>
      
      {results && (
        <div ref={resultsRef}>
          <Results total={results.total} breakdown={results.breakdown} />
        </div>
      )}
      
      <Tips />
      
      <footer className="bg-muted/50 py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground">
            © 2025 echo track. Making every carbon count.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
