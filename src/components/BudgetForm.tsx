import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

interface BudgetFormProps {
  currentBudget: number;
  onBudgetSet: (amount: number) => void;
}

export function BudgetForm({ currentBudget, onBudgetSet }: BudgetFormProps) {
  const [amount, setAmount] = useState(currentBudget.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBudgetSet(parseFloat(amount));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Presupuesto mensual</h2>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            className="block w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter budget amount"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Aplicar
        </button>
      </div>
    </form>
  );
}