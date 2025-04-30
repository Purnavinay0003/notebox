import React, { useState } from 'react';
import { addNote } from '../utils/localStorage';

interface NoteFormProps {
  onNoteAdded: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    
    // Add a small delay to show the submitting state
    setTimeout(() => {
      addNote({ title, content });
      setTitle('');
      setContent('');
      setIsSubmitting(false);
      onNoteAdded();
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 300);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-white">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Create New Note</h2>
            
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Note title..."
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 min-h-[150px]"
                placeholder="Write your note here..."
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className={`w-full bg-purple-600 text-white py-2 px-4 rounded-md font-medium transition-all duration-200 
                ${isSubmitting ? 'bg-purple-400 cursor-not-allowed' : 'hover:bg-purple-700 active:bg-purple-800'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : 'Save Note'}
            </button>
          </div>
        </div>
        
        {/* Success notification */}
        <div
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded transition-all duration-300 flex items-center ${
            showSuccess ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Note saved successfully!
        </div>
      </form>
    </div>
  );
};

export default NoteForm;