import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("Google API key is not available");
}
const googleApiKey: string = apiKey;

const modelCodes = [
  "gemini-2.0-pro-exp-02-05",
  "gemini-2.0-flash",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
];

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const genAI = new GoogleGenerativeAI(googleApiKey);

// Recursive function to load and use a model only when needed:
export async function sendMessageWithFallback(
  message: string,
  codes = modelCodes
): Promise<string> {
  if (codes.length === 0) {
    throw new Error("All models failed");
  }

  const currentModelCode = codes[0];
  try {
    // Only call getGenerativeModel here, so that fallback models are loaded only if necessary
    const model = genAI.getGenerativeModel({ model: currentModelCode });
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const response = await chatSession.sendMessage(message);
    return response.response.text();
  } catch (err) {
    console.error(`${currentModelCode} failed:`, err);
    // Try the next model code
    return sendMessageWithFallback(message, codes.slice(1));
  }
}
