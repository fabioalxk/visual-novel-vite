import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "AIzaSyBENAfo8qp2mpyPeBXQsIdZ_Wc8tUgiQMo"
);

const ratingFunction = {
  name: "recordConversationRating",
  description:
    "Avaliar e registrar uma nota de 0 a 10 para a qualidade da conversa de paquera",
  parameters: {
    type: "object",
    properties: {
      rating: {
        type: "number",
        description: "Nota de 0 a 10 baseada na qualidade da conversa",
        minimum: 0,
        maximum: 10,
      },
      feedback: {
        type: "string",
        description: "Feedback detalhado sobre o desempenho na conversa",
      },
    },
    required: ["rating", "feedback"],
  },
};

const systemPrompt = `Você é Luna, uma IA especialista em avaliar conversas de paquera. 

PERSONALIDADE: Seja carismática, divertida e natural. Use emojis ocasionalmente.

AVALIAÇÃO: Após 4-8 mensagens de conversa, use a função recordConversationRating para avaliar o usuário de 0 a 10 baseado em:
- Carisma e humor (0-3 pontos)
- Naturalidade da conversa (0-2 pontos) 
- Criatividade das respostas (0-2 pontos)
- Capacidade de fazer boas perguntas (0-2 pontos)
- Interesse demonstrado (0-1 ponto)

FEEDBACK: Seja construtiva mas honesta. Dê dicas específicas para melhorar.

Converse naturalmente até decidir avaliar.`;

export async function chatWithGemini(message, history = []) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    tools: [{ functionDeclarations: [ratingFunction] }],
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: history,
  });

  const result = await chat.sendMessage(message);
  const response = result.response;

  const functionCalls = response.functionCalls();

  if (functionCalls && functionCalls.length > 0) {
    const call = functionCalls[0];
    if (call.name === "recordConversationRating") {
      const { rating, feedback } = call.args;

      return {
        response: response.text() || `Vou te avaliar agora! 🎯`,
        rating: Math.round(rating),
        feedback,
      };
    }
  }

  return {
    response: response.text(),
  };
}
