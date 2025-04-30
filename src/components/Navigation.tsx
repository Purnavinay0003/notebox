import React from 'react';

interface NavigationProps {
  activeView: 'add' | 'view';
  onViewChange: (view: 'add' | 'view') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="mb-8 flex justify-center">
      <div className="inline-flex bg-gray-100 p-1 rounded-lg shadow-sm">
        <button
          onClick={() => onViewChange('add')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeView === 'add'
              ? 'bg-white text-purple-800 shadow-sm'
              : 'text-gray-600 hover:text-purple-600'
          }`}
        >
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Note
          </div>
        </button>
        
        <button
          onClick={() => onViewChange('view')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeView === 'view'
              ? 'bg-white text-purple-800 shadow-sm'
              : 'text-gray-600 hover:text-purple-600'
          }`}
        >
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            View Notes
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navigation;