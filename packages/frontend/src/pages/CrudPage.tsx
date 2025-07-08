import { useState, useEffect } from 'react';
import { noteService } from '../services/api';
import type { Note } from '../services/api';

function CrudPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);

  // Carregar notas ao montar o componente
  useEffect(() => {
    loadNotes();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Título e conteúdo são obrigatórios');
      return;
    }

    try {
      if (editingNote) {
        // Atualizar nota existente
        await noteService.updateNote(editingNote.id, title, content, editingNote.completed);
        setEditingNote(null);
      } else {
        // Criar nova nota
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

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

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

  const handleCancel = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
  };

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
        
        {/* Formulário */}
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

        {/* Lista de Notas */}
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