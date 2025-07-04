// packages/backend/src/__tests__/notes.test.ts
import { createNote } from '../note.controller' // Importamos a função diretamente
import { prismaMock } from './context' // Importamos nosso Prisma falso

// Mock dos objetos Request e Response do Express
const mockRequest = (body: any) => ({ body }) as any;
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('createNote Controller (Unit Test)', () => {

  it('should create a new note and return it with status 201', async () => {
    // 1. Arrange (Arranjar)
    const newNoteData = {
      id: 'some-cuid',
      title: 'Minha nota mockada',
      content: 'Conteúdo de teste.',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Dizemos ao nosso Prisma falso: "Quando a função 'create' for chamada,
    // prometa que você vai retornar o objeto 'newNoteData'".
    prismaMock.note.create.mockResolvedValue(newNoteData);

    const req = mockRequest({ title: 'Minha nota mockada', content: 'Conteúdo de teste.' });
    const res = mockResponse();

    // 2. Act (Agir)
    // Executamos a função do controller diretamente, passando os mocks
    await createNote(req, res);

    // 3. Assert (Afirmar)
    // Verificamos se a função se comportou como esperado
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Minha nota mockada',
    }));
  });

  it('should return status 500 if prisma fails', async () => {
    // 1. Arrange
    // Simulamos um erro no banco de dados
    prismaMock.note.create.mockRejectedValue(new Error('Database error'));

    const req = mockRequest({ title: 'Nota que vai falhar' });
    const res = mockResponse();

    // 2. Act
    await createNote(req, res);

    // 3. Assert
    // Verificamos se o nosso bloco 'catch' funcionou corretamente
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create note' });
  });
});