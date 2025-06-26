# Dating Chat App

Um jogo de paquera mobile com integração ElevenLabs AI.

## Estrutura do Projeto

```
project/
├── client/          # Frontend React
├── server/          # Backend API
└── README.md
```

## Como Executar

### 1. Configurar Backend

```bash
cd server
npm install
cp .env.example .env
# Configurar XI_API_KEY e AGENT_ID no .env
npm start
```

### 2. Configurar Frontend

```bash
cd client
npm install
npm start
```

### 3. Assets Necessários

Adicionar em `client/public/assets/`:

- `karen1.mp4` (vídeo de introdução)
- `karen1.jpg` (imagem de fundo da conversação)

## Fluxo da Aplicação

1. **Home** → Botões Start/Continue
2. **Introduction** → Reproduz karen1.mp4
3. **Conversation** → Chat com AI usando karen1.jpg como fundo

## Portas

- Frontend: http://localhost:3001
- Backend: http://localhost:3000
