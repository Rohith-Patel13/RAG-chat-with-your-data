import {
  createPartFromFunctionResponse,
  EmbedContentResponse,
  FunctionCall,
  FunctionDeclaration,
  GenerateContentResponse,
  Part,
} from "@google/genai";
import { geminiClientLibrary } from "../libraries/gemini-client.library";
import { pineconeClientLibrary } from "../libraries/pinecone-client.library";

async function getInfo(args: Record<string, unknown>) {
  const input = args.input as string
  const inputEmbedding = await geminiClientLibrary.generateEmbedding(input);
  const vectorSearch = await pineconeClientLibrary.vectorSearch(
    "test-index",
    inputEmbedding.embeddings[0],
  );
  return vectorSearch;
}

const availableFunctions: Record<
  string,
  (args: Record<string, unknown>) => unknown
> = {
  getInfo: getInfo,
};

const getInfoDeclaration: FunctionDeclaration = {
  name: "getInfo",
  description:
    "Get details about a topic like student details, club details, or university details.",
  parametersJsonSchema: {
    type: "object",
    properties: {
      input: { type: "string" },
    },
    additionalProperties: false,
    required: ["input"],
  },
};

const TOOLS = [
  {
    functionDeclarations: [getInfoDeclaration],
  },
];

let context = geminiClientLibrary.ai.chats.create({
  model: "gemini-2.5-flash",
  config: {
    systemInstruction: "you are a helpful chatbot",
    tools: TOOLS,
  },
});

// This line sets the encoding for the standard input stream to UTF-8, allowing the program to correctly interpret incoming text data.
process.stdin.setEncoding("utf-8");

// This event listener is set up to handle data received on the standard input stream.
// It will execute the provided async function each time data is received.
process.stdin.addListener("data", async (data) => {
  const input: string = data.toString().trim();

  const response: GenerateContentResponse = await context.sendMessage({
    message: input,
  });

  const functionCalls: FunctionCall[] | undefined = response.functionCalls;
  if (!functionCalls) {
    console.log("No function calls required.");
    console.log(response.text);
    return;
  }

  console.log(`tool call is required: ${functionCalls?.length}`);

  const functionResponseParts: Part[] = await Promise.all(
    functionCalls.map(async (call) => {
      console.log(`[tool] executing "${call.name}" with args:`, call.args);

      const fn = call.name ? availableFunctions[call.name] : undefined;
      const result = fn
        ? await fn(call.args ?? {})
        : { error: `Unknown function: ${call.name}` };

      console.log(`[tool] "${call.name}" result:`, result);

      // Package the local result back into the shape Gemini expects
      // (a Part containing a functionResponse keyed by call id/name).
      return createPartFromFunctionResponse(
        call.id ?? call.name!,
        call.name!,
        result as Record<string, unknown>,
      );
    }),
  );

  const toolResponse: GenerateContentResponse = await context.sendMessage({
    message: functionResponseParts,
  });

  console.log(toolResponse.text);
});
