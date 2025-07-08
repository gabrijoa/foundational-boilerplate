# packages/backend/Dockerfile

# --- Estágio 1: Builder ---
    FROM node:20-alpine AS builder
    WORKDIR /app
    COPY package*.json ./
    COPY packages/backend/package.json ./packages/backend/
    RUN npm install
    COPY . .
    RUN npx prisma generate --schema=./packages/backend/prisma/schema.prisma
    RUN npm run build -w backend
    
    # --- Estágio 2: Runner ---
    FROM node:20-alpine
    WORKDIR /app
    
    # Copia os manifestos de dependência
    COPY package*.json ./
    COPY packages/backend/package.json ./packages/backend/
    
    # Copia a pasta node_modules INTEIRA e JÁ GERADA do estágio de build
    COPY --from=builder /app/node_modules ./node_modules
    
    # REMOVI A LINHA QUE DAVA ERRO AQUI
    
    # Executa 'npm prune' para remover dependências de desenvolvimento
    RUN npm prune --omit=dev
    
    # Copia o código da aplicação já compilado
    COPY --from=builder /app/packages/backend/dist ./dist
    
    COPY ./packages/backend/prisma ./prisma/

    COPY ./packages/backend/entrypoint.sh ./entrypoint.sh
    RUN chmod +x ./entrypoint.sh

    EXPOSE 3000
    ENTRYPOINT ["./entrypoint.sh"]
    CMD [ "node", "dist/server.js" ]