# packages/frontend/Dockerfile

FROM node:20-alpine AS builder
WORKDIR /app

# Mesma lógica de cópia simplificada
COPY package*.json ./
COPY packages/frontend/package.json ./packages/frontend/

RUN npm install

COPY . .

# Usamos o script que já corrigimos antes
RUN npm run build -w frontend

# --- Estágio de Produção ---
FROM nginx:stable-alpine
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]