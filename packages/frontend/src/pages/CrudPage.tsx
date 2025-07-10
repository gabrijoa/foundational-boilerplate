/**
 * @fileoverview CRUD operations page for notes management.
 * @description This component provides a complete interface for Create, Read, Update,
 * and Delete operations on notes, with form handling and state management.
 * @author Joa Gabri
 * @version 1.0.0
 */

import { useState, useEffect, useCallback } from 'react';
import { noteService, type Note } from '../services/api';

/**
 * A full-featured page for managing notes with CRUD functionality.
 * @returns {JSX.Element} The complete CRUD interface.
 */
function CrudPage() {
  // State management
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches all notes from the API and updates the component state.
   * Wrapped in useCallback to prevent re-creation on every render.
   */
  const loadNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const notesData = await noteService.getAllNotes();
      setNotes(notesData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load notes';
      setError(errorMessage);
      console.error('Failed to load notes:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load notes automatically when the component mounts.
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  /**
   * Clears the form and exits editing mode.
   */
  const resetForm = () => {
    setCurrentNote({ title: '', content: '' });
    setEditingNoteId(null);
  };

  /**
   * Handles form submission for both creating and updating notes.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentNote.title.trim()) {
      alert('Title is required');
      return;
    }

    try {
      if (editingNoteId) {
        // Update existing note
        const updatedNote = await noteService.updateNote(editingNoteId, currentNote);
        setNotes(notes.map((n) => (n.id === editingNoteId ? updatedNote : n)));
      } else {
        // Create new note
        const newNote = await noteService.createNote(currentNote);
        setNotes([...notes, newNote]);
      }
      resetForm();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save note';
      setError(errorMessage);
      console.error('Failed to save note:', errorMessage);
    }
  };

  /**
   * Sets up the form for editing an existing note.
   */
  const handleEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setCurrentNote({ title: note.title, content: note.content || '' });
  };

  /**
   * Handles the deletion of a note after confirmation.
   */
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await noteService.deleteNote(id);
        setNotes(notes.filter((note) => note.id !== id));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete note';
        setError(errorMessage);
        console.error('Failed to delete note:', errorMessage);
      }
    }
  };
  
  /**
   * Toggles the completion status of a note.
   */
  const toggleComplete = async (note: Note) => {
    try {
      const updatedNote = await noteService.updateNote(note.id, { completed: !note.completed });
      setNotes(notes.map((n) => (n.id === note.id ? updatedNote : n)));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update note status';
      setError(errorMessage);
      console.error('Failed to update note status:', errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Notes Management</h1>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">{error}</div>}

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingNoteId ? 'Edit Note' : 'Create New Note'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Note title"
            />
            <textarea
              value={currentNote.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Note content..."
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                {editingNoteId ? 'Update' : 'Create'}
              </button>
              {editingNoteId && (
                <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Notes List Section */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-gray-500">Loading notes...</p>
          ) : notes.length === 0 ? (
            <p className="text-gray-500">No notes found. Create one!</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className={`bg-white rounded-lg shadow-md p-4 flex justify-between items-start ${note.completed ? 'opacity-60' : ''}`}>
                <div className="flex-1">
                  <h3 className={`text-lg font-medium ${note.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{note.title}</h3>
                  <p className="text-gray-600 mt-2">{note.content}</p>
                  <p className="text-sm text-gray-400 mt-2">Last updated: {new Date(note.updatedAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 ml-4">
                  <button onClick={() => toggleComplete(note)} className={`px-3 py-1 text-sm rounded transition-colors ${note.completed ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-green-500 text-white hover:bg-green-600'}`}>
                    {note.completed ? 'Reopen' : 'Complete'}
                  </button>
                  <button onClick={() => handleEdit(note)} className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(note.id)} className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition-colors">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CrudPage;