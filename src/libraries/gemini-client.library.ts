import "dotenv/config";
import {
  Chat,
  Content,
  GenerateContentResponse,
  GoogleGenAI,
} from "@google/genai";

class GeminiClientLibrary {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });
}

const geminiClientLibrary = new GeminiClientLibrary();
export { geminiClientLibrary };
