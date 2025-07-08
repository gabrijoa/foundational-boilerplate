interface Note {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

export const noteService = {
  // GET - Buscar todas as notas
  async getAllNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes`);
    if (!response.ok) {
      // Tenta extrair o corpo da resposta para mostrar detalhes do erro
      let errorDetails = '';
      try {
        const errorBody = await response.json();
        errorDetails = JSON.stringify(errorBody);
      } catch {
        errorDetails = await response.text();
      }
      // Mostra o status e o corpo do erro no console
      console.error(`Erro ao buscar notas: ${response.status} - ${errorDetails}`);
      throw new Error(`Erro ao buscar notas: ${response.status} - ${errorDetails}`);
    }
    return response.json();
  },

  // POST - Criar nova nota
  async createNote(title: string, content: string): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar nota');
    }
    return response.json();
  },

  // PUT - Atualizar nota
  async updateNote(id: string, title: string, content: string, completed: boolean): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, completed }),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar nota');
    }
    return response.json();
  },

  // DELETE - Deletar nota
  async deleteNote(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar nota');
    }
  },
};

export type { Note }; 