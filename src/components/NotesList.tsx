import React, { useState } from 'react';
import { ArrowRight, Trash2 } from 'lucide-react';
import { Note } from '../types/note';

interface NotesListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onConvert: (note: Note) => void;
}

export function NotesList({ notes, onDelete, onConvert }: NotesListProps) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-500">Notas rápidas</h3>
      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex items-center justify-between bg-yellow-50 p-3 rounded-md border border-yellow-100"
          >
            <span className="text-gray-800">{note.content}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onConvert(note)}
                className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                title="Convertir a gasto"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                title="Eliminar nota"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}