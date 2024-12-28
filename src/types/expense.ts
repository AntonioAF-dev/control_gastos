export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface MonthlyExpenses {
  [key: string]: Expense[];
}