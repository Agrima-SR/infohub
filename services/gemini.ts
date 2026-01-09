
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  async refinePost(title: string, rawContent: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a professional college administrative assistant. Please refine and professionalize the following college announcement. Make it clear, concise, and helpful for students. 
        Title: ${title}
        Content: ${rawContent}`,
      });
      return response.text || rawContent;
    } catch (error) {
      console.error("Gemini refinement failed", error);
      return rawContent;
    }
  },

  async summarizeForStudent(content: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Please provide a one-sentence summary of this college announcement: ${content}`,
      });
      return response.text || content;
    } catch (error) {
      console.error("Gemini summarization failed", error);
      return content;
    }
  }
};
