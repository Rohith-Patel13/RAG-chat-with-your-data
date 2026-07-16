
import "dotenv/config";

import { Pinecone, UpsertOptions } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

type RecordMetadata = Record<string, string | boolean | number | Array<string>>;
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

  async addDocument(
    indexName: string,
    document: any,
  ) {
    try {
      const index = await pc.index({ name: indexName });
      await index.upsert({ records: document });
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }

  async vectorSearch(indexName: string, vector: number[]) {
    try {
      const index = await pc.index({ name: indexName });
      const results = await index.query({ vector, topK: 5 });
      return results;
    } catch (error) {
      console.error("Error performing vector search:", error);
    }
  }
}

const pineconeClientLibrary = new PineconeClientLibrary();
export { pineconeClientLibrary };
