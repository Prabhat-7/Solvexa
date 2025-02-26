// First, load the environment variables
require("dotenv").config({ path: "./.env.local" });

// Then import your modules
import { GoogleGenerativeAI } from "@google/generative-ai";

// Log to verify the API key is available
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
console.log("API Key available:", !!apiKey); // This should print "true" if available

// Create a properly typed variable for the API key
const googleApiKey: string = apiKey || "";

// Check if we have a valid API key
if (!googleApiKey) {
  throw new Error("Google API key is not available");
}

// Use the API key
const genAI = new GoogleGenerativeAI(googleApiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text()
