// client/src/services/conversationService.js
import { Conversation } from "@11labs/client";
import api from "../api";

class ConversationService {
  constructor() {
    this.conversation = null;
  }

  async requestMicrophonePermission() {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (error) {
      console.error("Microphone permission denied:", error);
      return false;
    }
  }

  async getSignedUrl(model = "karen") {
    try {
      const response = await api.get(`/signed-url?model=${model}`);
      return response.data.signedUrl;
    } catch (error) {
      console.error("Error getting signed URL:", error);
      throw error;
    }
  }

  async startConversation(model = "karen", callbacks = {}) {
    const hasPermission = await this.requestMicrophonePermission();
    if (!hasPermission) {
      throw new Error("Microphone permission is required");
    }

    const signedUrl = await this.getSignedUrl(model);

    this.conversation = await Conversation.startSession({
      signedUrl: signedUrl,
      onConnect: () => {
        console.log("Connected");
        callbacks.onConnect?.();
      },
      onDisconnect: () => {
        console.log("Disconnected");
        callbacks.onDisconnect?.();
      },
      onError: (error) => {
        console.error("Conversation error:", error);
        callbacks.onError?.(error);
      },
      onModeChange: (mode) => {
        console.log("Mode changed:", mode);
        callbacks.onModeChange?.(mode);
      },
    });

    return this.conversation;
  }

  async endConversation() {
    if (this.conversation) {
      await this.conversation.endSession();
      this.conversation = null;
    }
  }
}

export default new ConversationService();
