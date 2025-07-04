import request from 'supertest';
import app from '../server'; // Importa nosso app Express

describe('GET /', () => {
  it('should return 200 OK with a message', async () => {
    // Faz uma requisição para a rota raiz da nossa API
    const response = await request(app).get('/');

    // Verifica se o status da resposta é 200 (OK)
    expect(response.status).toBe(200);
    // Verifica se o corpo da resposta é o esperado
    expect(response.body).toEqual({ message: 'API is running!' });
  });
});