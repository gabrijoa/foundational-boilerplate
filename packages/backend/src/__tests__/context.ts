import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

const prisma = new PrismaClient();

// Diz ao Jest para simular o nosso singleton do prisma
jest.mock('../prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock) // Limpa o mock antes de cada teste
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>