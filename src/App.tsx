import React, { useState } from 'react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { MonthSelector } from './components/MonthSelector';
import { useExpenses } from './hooks/useExpenses';

function App() {
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().substring(0, 7)
  );
  const { expenses, addExpense, deleteExpense, getMonthlyTotal } = useExpenses();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Seguimiento de gastos mensuales
        </h1>

        <div className="grid gap-8 md:grid-cols-[1fr,2fr]">
          <div className="space-y-8">
            <ExpenseForm
              onSubmit={(expense) => addExpense(expense)}
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Resumen mensual</h2>
              <p className="text-3xl font-bold text-blue-600">
                ${getMonthlyTotal(currentMonth).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <MonthSelector
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
            />

            <ExpenseList
              expenses={expenses[currentMonth] || []}
              onDelete={(id) => deleteExpense(currentMonth, id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;