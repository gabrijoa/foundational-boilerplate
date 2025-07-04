// packages/backend/src/server.ts
import express from 'express';
import noteRoutes from './note.routes'; // <-- IMPORTE AS ROTAS
import cors from 'cors'; // <-- Instale o cors para permitir requisições do front-end

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // <-- HABILITE O CORS
app.use(express.json()); // <-- Middleware para o Express entender JSON no corpo da requisição
app.use('/api', noteRoutes); // <-- CONECTE AS ROTAS

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running!' });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

export default app;