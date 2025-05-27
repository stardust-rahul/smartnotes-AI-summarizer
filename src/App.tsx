import React from 'react';
import { motion } from 'framer-motion';
import { NotesProvider } from './context/NotesContext';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';

function App() {
  return (
    <NotesProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700"
        >
          <div className="container mx-auto px-4 py-3 flex items-center">
            <div className="flex items-center gap-2">
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 text-blue-500"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
              <h1 className="text-xl font-semibold">Smart Notes</h1>
            </div>
          </div>
        </motion.header>
        
        <main className="container mx-auto flex flex-col md:flex-row h-[calc(100vh-57px)]">
          <NotesList />
          <NoteEditor />
        </main>
      </div>
    </NotesProvider>
  );
}

export default App;