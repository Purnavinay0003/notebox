import React, { useState, useRef, useEffect } from 'react';
import Navigation from './components/Navigation';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState<'add' | 'view'>('add');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const flipperRef = useRef<HTMLDivElement>(null);

  const handleViewChange = (view: 'add' | 'view') => {
    if (view !== activeView) {
      setIsFlipping(true);
      setTimeout(() => {
        setActiveView(view);
      }, 400); // half of the flip animation duration
    }
  };

  const handleNoteAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    if (isFlipping) {
      setTimeout(() => {
        setIsFlipping(false);
      }, 800); // full animation duration
    }
  }, [isFlipping]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-2">
            NoteMinder
          </h1>
          <p className="text-gray-600">Capture your thoughts with style</p>
        </header>

        <Navigation activeView={activeView} onViewChange={handleViewChange} />

        <div 
          ref={flipperRef} 
          className={`flipper-container ${isFlipping ? 'flipping' : ''}`}
        >
          <div className="flipper">
            <div className={`side front ${activeView === 'add' ? 'active' : ''}`}>
              <NoteForm onNoteAdded={handleNoteAdded} />
            </div>
            <div className={`side back ${activeView === 'view' ? 'active' : ''}`}>
              <NotesList refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;