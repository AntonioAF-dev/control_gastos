import { Trash2 } from 'lucide-react';
import { Expense } from '../types/expense';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">{expense.description}</h3>
            <div className="flex space-x-4 text-sm text-gray-500">
              <span>{expense.category}</span>
              <span>{new Date(expense.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">S/.{expense.amount.toFixed(2)}</span>
            <button
              onClick={() => onDelete(expense.id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
      {expenses.length === 0 && (
        <p className="text-center text-gray-500">No hay gastos para este mes</p>
      )}
    </div>
  );
}