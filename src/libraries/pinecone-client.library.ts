
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

            },
            vectorType: "dense",
         })
      } catch (error) {
         console.error("Error creating index:", error);
      }
   }
}

const pineconeClientLibrary = new PineconeClientLibrary();
export { PineconeClientLibrary };
