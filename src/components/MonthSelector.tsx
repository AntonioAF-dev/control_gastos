import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthSelectorProps {
  currentMonth: string;
  onMonthChange: (month: string) => void;
}

export function MonthSelector({ currentMonth, onMonthChange }: MonthSelectorProps) {
  // Ensure we create the date object correctly by appending the day
  const date = new Date(`${currentMonth}-01T00:00:00`);

  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();
    onMonthChange(`${year}-${month}`);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();
    onMonthChange(`${year}-${month}`);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      <button
        onClick={handlePrevMonth}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <h2 className="text-xl font-semibold">
        {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </h2>
      <button
        onClick={handleNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Next month"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}