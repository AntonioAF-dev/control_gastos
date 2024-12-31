import React from 'react';
import { Trash2 } from 'lucide-react';
import { Expense } from '../types/expense';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  selectedExpenses: Set<string>;
  onToggleSelection: (id: string) => void;
  onDeleteSelected: () => void;
}

export function ExpenseList({
  expenses,
  onDelete,
  selectedExpenses,
  onToggleSelection,
  onDeleteSelected,
}: ExpenseListProps) {
  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Gastos</h2>
        {selectedExpenses.size > 0 && (
          <button
            onClick={onDeleteSelected}
            className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar Seleccionados ({selectedExpenses.size})
          </button>
        )}
      </div>

      <div className="space-y-2">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className={`flex items-center justify-between p-4 rounded-lg transition-colors cursor-pointer ${
              selectedExpenses.has(expense.id)
                ? 'bg-blue-50 border-blue-200'
                : 'bg-white hover:bg-gray-50 border-gray-200'
            } border`}
            onClick={() => onToggleSelection(expense.id)}
          >
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {expense.description}
              </h3>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>{expense.category}</span>
                <span>{new Date(expense.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">
                S/.{expense.amount.toFixed(2)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(expense.id);
                }}
                className="text-red-600 hover:text-red-800 transition-colors p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {expenses.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No hay gastos para este mes
          </p>
        )}
      </div>
    </div>
  );
}