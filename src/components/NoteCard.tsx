import React from 'react';
import { motion } from 'framer-motion';
import { Note } from '../types';
import { FileText, Clock, Sparkles } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  isActive: boolean;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, isActive, onClick }) => {
  const formattedDate = new Date(note.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Extract a preview from the content
  const contentPreview = note.content.length > 60 
    ? `${note.content.substring(0, 60)}...` 
    : note.content || 'Empty note';

  // Check if the note has a summary
  const hasSummary = note.summary && note.summary.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`rounded-lg border p-4 mb-2 cursor-pointer 
        transition-all duration-200 ease-in-out
        ${isActive 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600' 
          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
        }
        dark:bg-gray-800 dark:text-gray-100`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg text-gray-900 dark:text-white">
          {note.title || 'Untitled Note'}
        </h3>
        
        {hasSummary && (
          <Sparkles className="h-4 w-4 text-blue-500 dark:text-blue-400" />
        )}
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
        {contentPreview}
      </p>
      
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Clock className="h-3 w-3 mr-1" />
        <span>{formattedDate}</span>
      </div>
    </motion.div>
  );
};

export default NoteCard;