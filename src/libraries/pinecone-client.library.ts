
import "dotenv/config";

import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

class PineconeClientLibrary {
   async createIndex(name: string) {
      try {
         const index = await pc.createIndex({
         name,
         dimension: 768,
         metric: "cosine",
         spec: {
            serverless: {
               cloud: "aws", // or "gcp" / "azure" — match what you picked in the console
               region: "us-east-1", // match your selected region
            },
         },
         vectorType: "dense",
         });
      } catch (error) {
         console.error("Error creating index:", error);
      }
   }
}

const pineconeClientLibrary = new PineconeClientLibrary();
export { pineconeClientLibrary };
