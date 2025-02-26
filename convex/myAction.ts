"use node";
import { v } from "convex/values";
import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
export const ingest = action({
  args: { chunks: v.array(v.string()), fileId: v.any() },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.chunks,
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyBOT6MnA15VLuyX-LPt18SPHYEAedwzo_U",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "Embeddings stored succesfully";
  },
});
export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyBOT6MnA15VLuyX-LPt18SPHYEAedwzo_U",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    const resultOne = await vectorStore.similaritySearch(args.query, 1);
    return JSON.stringify(resultOne);
  },
});
