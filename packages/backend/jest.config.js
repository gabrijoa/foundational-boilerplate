module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: { '^.+\\.ts$': 'ts-jest' },
    // Diz ao Jest para rodar nosso script de setup antes dos testes
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testTimeout: 20000, // Aumenta o tempo limite para o banco iniciar
  };