import { useState, useEffect } from 'react';
import { MonthlyBudget } from '../types/budget';

export function useBudget() {
  const [budgets, setBudgets] = useState<MonthlyBudget>(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const setBudget = (month: string, amount: number) => {
    setBudgets(prev => ({
      ...prev,
      [month]: amount
    }));
  };

  const getBudget = (month: string): number => {
    return budgets[month] || 0;
  };

  return { setBudget, getBudget };
}