import "dotenv/config";
import {
  Chat,
  Content,
  EmbedContentResponse,
  GenerateContentResponse,
  GoogleGenAI,
} from "@google/genai";

class GeminiClientLibrary {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });

  async generateEmbedding(input: string) {
    const response: EmbedContentResponse = await this.ai.models.embedContent({
      model: "gemini-embedding-2",
      contents: input,
    });

    return response;
  }
}

const geminiClientLibrary = new GeminiClientLibrary();
export { geminiClientLibrary };
