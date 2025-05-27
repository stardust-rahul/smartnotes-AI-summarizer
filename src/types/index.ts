export interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  createdAt: number;
  updatedAt: number;
  isSummarizing?: boolean;
}

export interface NotesContextType {
  notes: Note[];
  activeNoteId: string | null;
  isDarkMode: boolean;
  addNote: () => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setActiveNoteId: (id: string | null) => void;
  summarizeNote: (id: string) => Promise<void>;
  toggleDarkMode: () => void;
}