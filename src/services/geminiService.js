// src/services/geminiService.js
import {
  GEMINI_API_KEY,
  GEMINI_API_URL,
  KATE_SYSTEM_PROMPT,
  FUNCTION_DEFINITIONS,
  MIN_MESSAGES_BEFORE_DECISION,
} from "../utils/constants";

class GeminiService {
  constructor() {
    this.conversationHistory = [];
    this.userMessageCount = 0;
    this.initializeConversation();
  }

  initializeConversation() {
    this.conversationHistory = [
      {
        role: "user",
        parts: [{ text: KATE_SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [
          { text: "Eu... eu não aguento mais... Todo mundo me odeia agora..." },
        ],
      },
    ];
    this.userMessageCount = 0;
  }

  async sendMessage(userMessage) {
    if (!GEMINI_API_KEY) {
      throw new Error("API key do Gemini não configurada");
    }

    this.userMessageCount++;

    this.conversationHistory.push({
      role: "user",
      parts: [{ text: userMessage }],
    });

    try {
      const requestBody = {
        contents: this.conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        },
      };

      /* MODIFICADO: Adiciona function calling apenas após número mínimo de mensagens */
      if (this.userMessageCount >= MIN_MESSAGES_BEFORE_DECISION) {
        requestBody.tools = [
          {
            functionDeclarations: FUNCTION_DEFINITIONS,
          },
        ];
      }

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      const candidate = data.candidates[0];

      /* MODIFICADO: Verifica se Gemini chamou uma função */
      if (candidate.content.parts[0].functionCall) {
        const functionCall = candidate.content.parts[0].functionCall;

        if (functionCall.name === "decide_kate_fate") {
          const outcome = functionCall.args.outcome;
          const reason = functionCall.args.reason;

          const finalMessage =
            outcome === "success"
              ? "Obrigada... você me ajudou a ver que ainda há esperança..."
              : "Eu... eu sinto muito, mas não consigo mais...";

          this.conversationHistory.push({
            role: "model",
            parts: [{ text: finalMessage }],
          });

          return {
            message: finalMessage,
            sceneChange: outcome,
            reason: reason,
          };
        }
      }

      /* MODIFICADO: Resposta normal de conversa */
      const reply = candidate.content.parts[0].text;

      this.conversationHistory.push({
        role: "model",
        parts: [{ text: reply }],
      });

      return {
        message: reply,
        sceneChange: null,
        messagesRemaining: Math.max(
          0,
          MIN_MESSAGES_BEFORE_DECISION - this.userMessageCount
        ),
      };
    } catch (error) {
      console.error("Erro ao comunicar com Gemini:", error);
      throw error;
    }
  }

  resetConversation() {
    this.initializeConversation();
  }

  getMessageCount() {
    return this.userMessageCount;
  }

  canMakeDecision() {
    return this.userMessageCount >= MIN_MESSAGES_BEFORE_DECISION;
  }
}

export default new GeminiService();
