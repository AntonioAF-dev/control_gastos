import React, { useState } from 'react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { MonthSelector } from './components/MonthSelector';
import { BudgetForm } from './components/BudgetForm';
import { BudgetSummary } from './components/BudgetSummary';
import { QuickNote } from './components/QuickNote';
import { NotesList } from './components/NotesList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Container } from './components/layout/Container';
import { useExpenses } from './hooks/useExpenses';
import { useBudget } from './hooks/useBudget';
import { useNotes } from './hooks/useNotes';

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().substring(0, 7)
  );
  const {
    expenses,
    addExpense,
    deleteExpense,
    deleteSelectedExpenses,
    toggleExpenseSelection,
    selectedExpenses,
    getMonthlyTotal,
  } = useExpenses();
  const { setBudget, getBudget } = useBudget();
  const { addNote, deleteNote, markNoteConverted, getNotesByMonth } = useNotes();

  const monthlyTotal = getMonthlyTotal(currentMonth);
  const currentBudget = getBudget(currentMonth);
  const currentNotes = getNotesByMonth(currentMonth);

  const handleNoteConvert = (note: { id: string; content: string }) => {
    markNoteConverted(note.id);
    addExpense({
      description: note.content,
      amount: 0,
      category: 'Other',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow py-8">
        <Container>
          <div className="min-h-[80vh]">
            <div className="grid gap-8 md:grid-cols-[1fr,2fr]">
              <div className="space-y-8">
                <section id="notes" className="p-6 bg-white rounded-lg shadow-sm">
                  <QuickNote
                    onAdd={(content) => addNote(content, currentMonth)}
                  />
                </section>

                <section id="expenses" className="space-y-6">
                  <ExpenseForm
                    onSubmit={(expense) => addExpense(expense)}
                  />
                  
                  <BudgetForm
                    currentBudget={currentBudget}
                    onBudgetSet={(amount) => setBudget(currentMonth, amount)}
                  />

                  <BudgetSummary
                    budget={currentBudget}
                    spent={monthlyTotal}
                  />
                </section>
              </div>

              <div className="space-y-6">
                <MonthSelector
                  currentMonth={currentMonth}
                  onMonthChange={setCurrentMonth}
                />
                
                <NotesList
                  notes={currentNotes}
                  onDelete={deleteNote}
                  onConvert={handleNoteConvert}
                />

                <ExpenseList
                  expenses={expenses[currentMonth] || []}
                  onDelete={(id) => deleteExpense(currentMonth, id)}
                  selectedExpenses={selectedExpenses}
                  onToggleSelection={toggleExpenseSelection}
                  onDeleteSelected={() => deleteSelectedExpenses(currentMonth)}
                />
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}