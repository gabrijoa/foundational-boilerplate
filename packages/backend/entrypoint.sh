#!/bin/sh

# entrypoint serve para executar o script de migração do banco de dados e o comando principal que foi passado para o script.

# O comando 'set -e' garante que o script pare imediatamente se algum comando falhar.
set -e

# 1. Executa o comando de migração do banco de dados.
echo "INFO: Running database migrations..."
npx prisma migrate deploy

# 2. Se a migração foi bem-sucedida, executa o comando principal que foi passado para o script.
# O 'exec "$@"' executa o comando que está no CMD do nosso Dockerfile (node dist/server.js).
echo "INFO: Starting the application..."
exec "$@"