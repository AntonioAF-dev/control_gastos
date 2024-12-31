import { useState, useEffect } from 'react';
import { Note } from '../types/note';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (content: string, monthKey: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      content,
      createdAt: new Date().toISOString(),
      monthKey,
      converted: false,
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const markNoteConverted = (id: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, converted: true } : note
    ));
  };

  const getNotesByMonth = (monthKey: string) => {
    return notes.filter(note => note.monthKey === monthKey && !note.converted);
  };

  return { addNote, deleteNote, markNoteConverted, getNotesByMonth };
}