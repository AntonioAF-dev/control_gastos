import React from 'react';
import { TrendingDown } from 'lucide-react';

interface BudgetSummaryProps {
  budget: number;
  spent: number;
}

export function BudgetSummary({ budget, spent }: BudgetSummaryProps) {
  const remaining = budget - spent;
  const spentPercentage = budget > 0 ? (spent / budget) * 100 : 0;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Resumen mensual</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Presupuesto</p>
          <p className="text-2xl font-bold text-gray-900">S/. {budget.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Gastado</p>
          <p className="text-2xl font-bold text-blue-600">S/. {spent.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Restante</p>
          <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            S/. {remaining.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Presupuesto utilizado</span>
          <span>{spentPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              spentPercentage > 100 
                ? 'bg-red-600' 
                : spentPercentage > 80 
                  ? 'bg-yellow-400' 
                  : 'bg-green-600'
            }`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {remaining < 0 && (
        <div className="flex items-center gap-2 text-red-600 mt-2">
          <TrendingDown className="w-5 h-5" />
          <span className="text-sm font-medium">Exceso S/. {Math.abs(remaining).toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}