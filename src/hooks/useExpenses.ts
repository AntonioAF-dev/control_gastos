import { useState, useEffect } from 'react';
import { Expense, MonthlyExpenses } from '../types/expense';

export function useExpenses() {
  const [expenses, setExpenses] = useState<MonthlyExpenses>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const monthKey = expense.date.substring(0, 7); // YYYY-MM
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    };

    setExpenses(prev => ({
      ...prev,
      [monthKey]: [...(prev[monthKey] || []), newExpense],
    }));
  };

  const deleteExpense = (monthKey: string, expenseId: string) => {
    setExpenses(prev => ({
      ...prev,
      [monthKey]: prev[monthKey].filter(exp => exp.id !== expenseId),
    }));
  };

  const getMonthlyTotal = (monthKey: string): number => {
    return expenses[monthKey]?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
  };

  return {
    expenses,
    addExpense,
    deleteExpense,
    getMonthlyTotal,
  };
}