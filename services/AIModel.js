import { GoogleGenerativeAI } from "@google/generative-ai"


const API_KEY = import.meta.env.VITE_AI_API_KEY

const genAI = new GoogleGenerativeAI(API_KEY);

export async function run(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    apiVersion: "v1",
    
  });
  

  const result = await model.generateContent(
   `${prompt}`
  );
  const response = await result.response;

  const ans = await response.text()

return ans
}


