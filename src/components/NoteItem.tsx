import React, { useState } from 'react';
import { Note } from '../types';

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getContentPreview = (content: string) => {
    return content.length > 100 ? `${content.substring(0, 100)}...` : content;
  };
  
  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = () => {
    onDelete(note.id);
    setShowDeleteConfirm(false);
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg
        ${isExpanded ? 'scale-[1.02] z-10' : 'hover:scale-[1.01]'}`}
    >
      <div className="p-5 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 flex-grow">{note.title}</h3>
          <span className="text-xs text-gray-500">{formatDate(note.createdAt)}</span>
        </div>
        
        <div className="mt-2 text-gray-600 whitespace-pre-line">
          {isExpanded ? note.content : getContentPreview(note.content)}
        </div>
        
        {!isExpanded && note.content.length > 100 && (
          <button 
            className="mt-2 text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
          >
            Read more
          </button>
        )}
      </div>
      
      <div className="px-5 pb-4 flex justify-end">
        {!showDeleteConfirm ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200"
          >
            Delete
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                cancelDelete();
              }}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs rounded transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                confirmDelete();
              }}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors duration-200"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteItem;