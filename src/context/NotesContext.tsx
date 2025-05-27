import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Note, NotesContextType } from '../types';
import { summarizeWithVertexAI } from '../services/vertexAI';

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const DEFAULT_NOTE: Omit<Note, 'id'> = {
  title: 'Untitled Note',
  content: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
        
        // Set the most recently updated note as active if there are notes
        if (parsedNotes.length > 0) {
          const mostRecent = [...parsedNotes].sort((a, b) => b.updatedAt - a.updatedAt)[0];
          setActiveNoteId(mostRecent.id);
        }
      } catch (error) {
        console.error('Failed to parse saved notes:', error);
      }
    } else if (notes.length === 0) {
      // Create a welcome note if no notes exist
      const welcomeNote: Note = {
        id: uuidv4(),
        title: 'Welcome to Notes',
        content: 'Start writing your notes here. Select the AI icon to generate a summary of your note.',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setNotes([welcomeNote]);
      setActiveNoteId(welcomeNote.id);
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  // Update dark mode in localStorage and add/remove class to body
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addNote = () => {
    const newNote: Note = {
      ...DEFAULT_NOTE,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: Date.now() } 
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (activeNoteId === id) {
      const remainingNotes = notes.filter(note => note.id !== id);
      setActiveNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : null);
    }
  };

  const summarizeNote = async (id: string) => {
    const note = notes.find(n => n.id === id);
    if (!note || !note.content.trim()) return;

    // Set loading state
    updateNote(id, { isSummarizing: true });
    
    try {
      const summary = await summarizeWithVertexAI(note.content);
      updateNote(id, { summary, isSummarizing: false });
    } catch (error) {
      console.error('Failed to summarize note:', error);
      updateNote(id, { isSummarizing: false });
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <NotesContext.Provider 
      value={{ 
        notes, 
        activeNoteId, 
        isDarkMode,
        addNote, 
        updateNote, 
        deleteNote, 
        setActiveNoteId,
        summarizeNote,
        toggleDarkMode
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};