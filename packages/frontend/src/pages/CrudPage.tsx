/**
 * @fileoverview CRUD operations page for notes management
 * @description This component provides a complete interface for Create, Read, Update,
 * and Delete operations on notes, with form handling and state management.
 * @author Joa Gabri
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { noteService } from '../services/api';
import type { Note } from '../services/api';

/**
 * CRUD Page component for notes management
 * @description Complete interface for managing notes with full CRUD functionality.
 * Includes form for creating/editing notes and a list displaying all notes.
 * @component
 * @returns {JSX.Element} Complete CRUD interface with form and notes list
 * @example
 * // This component is rendered when user navigates to /crud route
 * // Provides:
 * // - Create new notes
 * // - Edit existing notes
 * // - Delete notes
 * // - Mark notes as completed/incomplete
 */
function CrudPage() {
  // State management for component data and UI
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Effect hook to load notes when component mounts
   * @description Automatically fetches all notes when the component is first rendered
   */
  useEffect(() => {
    loadNotes();
  }, []);

  /**
   * Loads all notes from the backend API
   * @description Fetches notes from the API and updates component state.
   * Handles loading state and error scenarios.
   * @async
   * @function loadNotes
   * @returns {Promise<void>} Promise that resolves when notes are loaded
   * @throws {Error} Shows alert on API error
   */
  const loadNotes = async () => {
    try {
      setLoading(true);
      const notesData = await noteService.getAllNotes();
      setNotes(notesData);
    } catch (error) {
      console.error('Erro ao carregar notas:', error);
      alert('Erro ao carregar notas');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles form submission for creating or updating notes
   * @description Processes form data to either create a new note or update existing one.
   * Validates input and manages form state reset.
   * @async
   * @function handleSubmit
   * @param {React.FormEvent} e - Form submission event
   * @returns {Promise<void>} Promise that resolves when operation completes
   * @throws {Error} Shows alert on validation or API errors
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Título e conteúdo são obrigatórios');
      return;
    }

    try {
      if (editingNote) {
        // Update existing note
        await noteService.updateNote(editingNote.id, title, content, editingNote.completed);
        setEditingNote(null);
      } else {
        // Create new note
        await noteService.createNote(title, content);
      }
      
      setTitle('');
      setContent('');
      await loadNotes();
    } catch (error) {
      console.error('Erro ao salvar nota:', error);
      alert('Erro ao salvar nota');
    }
  };

  /**
   * Initiates note editing mode
   * @description Sets up the form for editing an existing note by populating
   * form fields with current note data.
   * @function handleEdit
   * @param {Note} note - Note object to be edited
   * @returns {void}
   */
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  /**
   * Handles note deletion with confirmation
   * @description Prompts user for confirmation before deleting a note.
   * Refreshes the notes list after successful deletion.
   * @async
   * @function handleDelete
   * @param {string} id - Unique identifier of the note to delete
   * @returns {Promise<void>} Promise that resolves when deletion completes
   * @throws {Error} Shows alert on API error
   */
  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta nota?')) {
      try {
        await noteService.deleteNote(id);
        await loadNotes();
      } catch (error) {
        console.error('Erro ao deletar nota:', error);
        alert('Erro ao deletar nota');
      }
    }
  };

  /**
   * Cancels note editing and resets form
   * @description Clears editing state and resets form fields to initial values.
   * @function handleCancel
   * @returns {void}
   */
  const handleCancel = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
  };

  /**
   * Toggles note completion status
   * @description Changes the completed status of a note and updates it via API.
   * Refreshes the notes list to reflect changes.
   * @async
   * @function toggleComplete
   * @param {Note} note - Note object to toggle completion status
   * @returns {Promise<void>} Promise that resolves when update completes
   * @throws {Error} Shows alert on API error
   */
  const toggleComplete = async (note: Note) => {
    try {
      await noteService.updateNote(note.id, note.title, note.content, !note.completed);
      await loadNotes();
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
      alert('Erro ao atualizar nota');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">CRUD - Gerenciamento de Notas</h1>
        
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingNote ? 'Editar Nota' : 'Nova Nota'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o título da nota"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conteúdo
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o conteúdo da nota"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                {editingNote ? 'Atualizar' : 'Criar'}
              </button>
              
              {editingNote && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Notes List Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Notas Cadastradas</h2>
          
          {loading ? (
            <p className="text-gray-500">Carregando notas...</p>
          ) : notes.length === 0 ? (
            <p className="text-gray-500">Nenhuma nota encontrada</p>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div 
                  key={note.id}
                  className={`border rounded-lg p-4 ${note.completed ? 'bg-green-50 border-green-200' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className={`text-lg font-medium ${note.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {note.title}
                      </h3>
                      <p className={`text-gray-600 mt-2 ${note.completed ? 'line-through' : ''}`}>
                        {note.content}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Criado em: {new Date(note.createdAt).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => toggleComplete(note)}
                        className={`px-3 py-1 text-sm rounded ${
                          note.completed 
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                            : 'bg-green-500 text-white hover:bg-green-600'
                        } transition-colors`}
                      >
                        {note.completed ? 'Reabrir' : 'Concluir'}
                      </button>
                      
                      <button
                        onClick={() => handleEdit(note)}
                        className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition-colors"
                      >
                        Editar
                      </button>
                      
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition-colors"
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CrudPage; 