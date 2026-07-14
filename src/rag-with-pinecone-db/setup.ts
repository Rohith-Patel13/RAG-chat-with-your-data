import { pineconeClientLibrary } from "../libraries/pinecone-client.library";

async function createIndex() {
  return await pineconeClientLibrary.createIndex("test-index");
}

createIndex()
  .then(() => console.log("Index created successfully."))
  .catch((error) => console.error("Error creating index:", error));