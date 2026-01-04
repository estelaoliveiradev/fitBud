
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getWorkoutMotivation = async (userName: string, level: number, lastWorkoutType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `O usuário ${userName} está no nível ${level} e seu último treino foi ${lastWorkoutType}. 
      Dê uma frase de motivação curta e divertida em português, como se fosse um personal trainer que cuida de um avatar virtual (bonequinho de RPG). 
      Use no máximo 20 palavras.`
    });
    return response.text || "Bora treinar esse bonequinho!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "O progresso não para! Vamos pra cima!";
  }
};

export const suggestNextWorkout = async (history: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Com base nos treinos: ${history}. Sugira um próximo treino curto (1 frase) focado em equilibrar o corpo.`
    });
    return response.text || "Que tal um treino de pernas hoje?";
  } catch (error) {
    return "Bora fazer um cárdio hoje?";
  }
};
