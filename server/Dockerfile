FROM node:22-slim

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Expor a porta que o servidor usa
EXPOSE 8080

# Definir variável de ambiente para produção
ENV NODE_ENV=production
ENV PORT=8080

# Iniciar o servidor
CMD ["node", "backend/server.js"]