import { Note } from '../types';

const NOTES_STORAGE_KEY = 'notes-app-storage';

export const saveNotes = (notes: Note[]): void => {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
};

export const getNotes = (): Note[] => {
  const notes = localStorage.getItem(NOTES_STORAGE_KEY);
  return notes ? JSON.parse(notes) : [];
};

export const addNote = (note: Omit<Note, 'id' | 'createdAt'>): Note[] => {
  const newNote: Note = {
    id: crypto.randomUUID(),
    title: note.title,
    content: note.content,
    createdAt: Date.now(),
  };
  
  const notes = getNotes();
  const updatedNotes = [newNote, ...notes];
  saveNotes(updatedNotes);
  
  return updatedNotes;
};

export const deleteNote = (id: string): Note[] => {
  const notes = getNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  saveNotes(filteredNotes);
  
  return filteredNotes;
};