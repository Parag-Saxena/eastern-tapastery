import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// The API key is strictly obtained from process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const summarizeContent = async (content: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key missing. Please configure process.env.API_KEY to use AI features.";
  }

  try {
    // Sanitize HTML tags roughly to save tokens, though the model handles HTML well.
    const cleanText = content.replace(/<[^>]*>?/gm, '').slice(0, 10000); // Limit context size

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Summarize the following article in a concise, engaging paragraph suitable for a newsletter preview. Keep it under 150 words.\n\nArticle Content:\n${cleanText}`,
      config: {
        temperature: 0.7,
        // Minimal thinking budget for fast summary
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "Failed to generate summary. Please try again later.";
  }
};