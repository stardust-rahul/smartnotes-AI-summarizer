import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNotes } from '../context/NotesContext';
import { Sparkles, Trash2, Save } from 'lucide-react';

const NoteEditor: React.FC = () => {
  const { 
    notes, 
    activeNoteId, 
    updateNote, 
    deleteNote,
    summarizeNote
  } = useNotes();
  
  const activeNote = notes.find(note => note.id === activeNoteId);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  
  // Update local state when active note changes
  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
      setIsEditing(false);
    }
  }, [activeNoteId, activeNote]);
  
  // Save note changes when leaving edit mode
  useEffect(() => {
    if (!isEditing && activeNoteId) {
      updateNote(activeNoteId, { title, content });
    }
  }, [isEditing]);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsEditing(true);
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (activeNoteId) {
      updateNote(activeNoteId, { title, content });
      setIsEditing(false);
    }
  };
  
  const handleDelete = () => {
    if (activeNoteId) {
      if (window.confirm('Are you sure you want to delete this note?')) {
        deleteNote(activeNoteId);
      }
    }
  };
  
  const handleSummarize = async () => {
    if (activeNoteId) {
      await summarizeNote(activeNoteId);
    }
  };
  
  // If no note is selected
  if (!activeNote) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Select a note or create a new one to get started.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-gray-900">
      <div className="border-b dark:border-gray-700 p-4 flex justify-between items-center">
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleSave}
          className="text-xl font-semibold w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-white"
          placeholder="Untitled Note"
        />
        <div className="flex space-x-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSummarize}
            disabled={!content.trim() || activeNote.isSummarizing}
            className={`p-2 rounded-md text-white transition-colors
              ${activeNote.isSummarizing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'}`}
            aria-label="Summarize note"
          >
            <Sparkles className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={!isEditing}
            className={`p-2 rounded-md transition-colors
              ${isEditing 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700'}`}
            aria-label="Save note"
          >
            <Save className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
            aria-label="Delete note"
          >
            <Trash2 className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <textarea
          value={content}
          onChange={handleContentChange}
          onBlur={handleSave}
          className="w-full h-full min-h-[200px] bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-gray-700 dark:text-gray-300"
          placeholder="Start writing your note here..."
        />
      </div>
      
      {activeNote.isSummarizing && (
        <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center">
            <Sparkles className="h-4 w-4 text-blue-500 mr-2 animate-pulse" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Generating summary...</p>
          </div>
        </div>
      )}
      
      {activeNote.summary && !activeNote.isSummarizing && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-t dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20"
        >
          <div className="flex items-start">
            <Sparkles className="h-4 w-4 text-blue-500 mr-2 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">AI Summary</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{activeNote.summary}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NoteEditor;