// packages/backend/jest.setup.ts
import { execSync } from 'child_process';
import path from 'path';

// Define o caminho para o seu banco de dados de teste.
// É a única URL que precisamos, diretamente no código.
const DATABASE_URL = "postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=public";

// Prepara o ambiente para o Prisma, passando a URL diretamente
const prismaBinary = path.resolve(__dirname, '../../node_modules/.bin/prisma');

// Este hook do Jest roda uma única vez antes de todos os testes
beforeAll(() => {
  console.log('INFO: Preparando o banco de dados de teste...');

  try {
    // Executa a migração, injetando a DATABASE_URL no ambiente do comando.
    // Usamos o caminho direto para o binário do Prisma para evitar problemas com o npx.
    execSync(`"${prismaBinary}" migrate deploy`, {
      env: {
        ...process.env,
        DATABASE_URL: DATABASE_URL,
      },
      stdio: 'inherit', // Mostra o output do comando no console
    });
    console.log('INFO: Banco de dados de teste pronto.');
  } catch (error) {
    console.error('ERRO: Falha ao executar prisma migrate deploy.', error);
    throw error;
  }
});