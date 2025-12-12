import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; 
// Note: In a real production app, ensure this is handled securely. 
// For this demo, we assume the environment variable is injected.

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateAstronomyResponse = async (prompt: string): Promise<string> => {
  if (!ai) {
    return "AI service is not configured. Please check your API key.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a friendly, enthusiastic astronomy educator for beginners. Keep answers concise (under 100 words), engaging, and easy to understand. Use emojis occasionally.",
      }
    });

    return response.text || "I couldn't generate a response about that celestial object right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, there was a disturbance in the space-time continuum (API Error).";
  }
};