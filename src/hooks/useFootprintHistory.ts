import { useState, useEffect } from 'react';

export interface FootprintRecord {
  id: string;
  date: string;
  total: number;
  breakdown: Record<string, number>;
}

export interface Goal {
  target: number;
  period: 'daily' | 'weekly' | 'monthly';
}

const HISTORY_KEY = 'ecotrack_history';
const GOAL_KEY = 'ecotrack_goal';

export const useFootprintHistory = () => {
  const [history, setHistory] = useState<FootprintRecord[]>([]);
  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
    
    const storedGoal = localStorage.getItem(GOAL_KEY);
    if (storedGoal) {
      setGoal(JSON.parse(storedGoal));
    }
  }, []);

  const addRecord = (total: number, breakdown: Record<string, number>) => {
    const record: FootprintRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      total,
      breakdown,
    };

    const updatedHistory = [record, ...history].slice(0, 30); // Keep last 30 records
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const saveGoal = (newGoal: Goal) => {
    setGoal(newGoal);
    localStorage.setItem(GOAL_KEY, JSON.stringify(newGoal));
  };

  const clearGoal = () => {
    setGoal(null);
    localStorage.removeItem(GOAL_KEY);
  };

  const getWeeklyAverage = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weekRecords = history.filter(r => new Date(r.date) > weekAgo);
    if (weekRecords.length === 0) return 0;
    
    const sum = weekRecords.reduce((acc, r) => acc + r.total, 0);
    return sum / weekRecords.length;
  };

  const getMonthlyAverage = () => {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    
    const monthRecords = history.filter(r => new Date(r.date) > monthAgo);
    if (monthRecords.length === 0) return 0;
    
    const sum = monthRecords.reduce((acc, r) => acc + r.total, 0);
    return sum / monthRecords.length;
  };

  return {
    history,
    goal,
    addRecord,
    clearHistory,
    saveGoal,
    clearGoal,
    getWeeklyAverage,
    getMonthlyAverage,
  };
};
