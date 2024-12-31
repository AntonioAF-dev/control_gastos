import { useState, useEffect } from 'react';
import { Expense, MonthlyExpenses } from '../types/expense';

export function useExpenses() {
  const [expenses, setExpenses] = useState<MonthlyExpenses>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedExpenses, setSelectedExpenses] = useState<Set<string>>(new Set());

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const monthKey = expense.date.substring(0, 7);
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
    setSelectedExpenses(prev => {
      const next = new Set(prev);
      next.delete(expenseId);
      return next;
    });
  };

  const deleteSelectedExpenses = (monthKey: string) => {
    setExpenses(prev => ({
      ...prev,
      [monthKey]: prev[monthKey].filter(exp => !selectedExpenses.has(exp.id)),
    }));
    setSelectedExpenses(new Set());
  };

  const toggleExpenseSelection = (expenseId: string) => {
    setSelectedExpenses(prev => {
      const next = new Set(prev);
      if (next.has(expenseId)) {
        next.delete(expenseId);
      } else {
        next.add(expenseId);
      }
      return next;
    });
  };

  const getMonthlyTotal = (monthKey: string): number => {
    return expenses[monthKey]?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
  };

  return {
    expenses,
    addExpense,
    deleteExpense,
    deleteSelectedExpenses,
    toggleExpenseSelection,
    selectedExpenses,
    getMonthlyTotal,
  };
}