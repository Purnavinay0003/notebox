import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import { getNotes, deleteNote } from '../utils/localStorage';
import NoteItem from './NoteItem';

interface NotesListProps {
  refreshTrigger: number;
}

const NotesList: React.FC<NotesListProps> = ({ refreshTrigger }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small delay to simulate loading and make transitions smoother
    setTimeout(() => {
      setNotes(getNotes());
      setIsLoading(false);
    }, 300);
  }, [refreshTrigger]);

  const handleDelete = (id: string) => {
    const updatedNotes = deleteNote(id);
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter(
    note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Your Notes</h2>
        
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <svg className="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <NoteItem key={note.id} note={note} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            {searchTerm ? (
              <>
                <p className="text-lg text-gray-600 mb-2">No notes matching "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-purple-600 font-medium hover:text-purple-800 transition-colors duration-200"
                >
                  Clear search
                </button>
              </>
            ) : (
              <p className="text-lg text-gray-600">You don't have any notes yet. Create your first note!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesList;