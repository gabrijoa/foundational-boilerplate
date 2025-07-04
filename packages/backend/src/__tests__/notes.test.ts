import request from 'supertest';
import app from '../server';
import prisma from '../prisma';

// Limpa a tabela ANTES de CADA teste
beforeEach(async () => {
  await prisma.note.deleteMany({});
});

// Desconecta do banco DEPOIS de TODOS os testes
afterAll(async () => {
  await prisma.$disconnect();
});

describe('Notes API - Integration Test', () => {

  // --- CREATE ---
  it('should create a new note', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send({ title: 'Nota de Integração' });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Nota de Integração');
  });

  // --- READ ---
  it('should get all notes', async () => {
    await prisma.note.create({ data: { title: 'Nota 1' } });
    const response = await request(app).get('/api/notes');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  // --- UPDATE ---
  it('should update a note', async () => {
    const note = await prisma.note.create({ data: { title: 'Original' } });
    const response = await request(app)
      .put(`/api/notes/${note.id}`)
      .send({ completed: true });

    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  // --- DELETE ---
  it('should delete a note', async () => {
    const note = await prisma.note.create({ data: { title: 'Para Deletar' } });
    const response = await request(app).delete(`/api/notes/${note.id}`);
    expect(response.status).toBe(204);

    const noteInDb = await prisma.note.findUnique({ where: { id: note.id } });
    expect(noteInDb).toBeNull();
  });
});