import React from 'react';
import { motion } from 'framer-motion';
import { Plus, MoonStar, Sun } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import NoteCard from './NoteCard';

const NotesList: React.FC = () => {
  const { 
    notes, 
    activeNoteId, 
    setActiveNoteId, 
    addNote,
    isDarkMode,
    toggleDarkMode
  } = useNotes();

  const sortedNotes = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="w-full md:w-64 lg:w-80 border-r dark:border-gray-700 p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">My Notes</h2>
        <div className="flex space-x-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonStar className="h-5 w-5 text-gray-600" />
            )}
          </button>
          <button
            onClick={addNote}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            aria-label="Create new note"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        {sortedNotes.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-6">
            No notes yet. Create your first note!
          </p>
        ) : (
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {sortedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                isActive={note.id === activeNoteId}
                onClick={() => setActiveNoteId(note.id)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NotesList;