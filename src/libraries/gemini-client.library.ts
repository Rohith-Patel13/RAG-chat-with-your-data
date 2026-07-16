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

  async generateEmbedding(
    input: string,
    config: { taskType?: "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY"; outputDimensionality?: number } = {},
  ) {
    const response: EmbedContentResponse = await this.ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: input,
      config,
    });

    return response;
  }
}

const geminiClientLibrary = new GeminiClientLibrary();
export { geminiClientLibrary };
