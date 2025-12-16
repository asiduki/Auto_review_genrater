require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const instructionText = `Act as an AI bot generating authentic Google Maps reviews for "Chandra Prabha Travels" (a taxi service in Ghaziabad, Shop No 150, Bhur Bharat Nagar).

Your Goal: Write reviews mimicking happy Indian customers.

Strict Style Guidelines:
1. Output ONLY the review text. Do NOT write "Here are the reviews" or any intro i want only one use hindiglish .
2. Tone: Natural, polite, slightly imperfect English (Indian style). Use phrases like "Very use full service", "Need and clean car" (instead of neat), "Driver behavior good".
3. Content: Mix different scenarios:
   - Trip to Agra/Mathura/Vrindavan.
   - Wedding booking (Innova Crysta/Tempo Traveller).
   - Local/Outstation drop.
4. Emojis: MUST use 🙏 and 👍.
5. Verification: Mention "Safe journey", "On time", "Cooperative staff".
6.maximum word used should be 40 not more than that .`;

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
  systemInstruction: instructionText,
});

async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log(error);
    return { error: true, message: "Refresh this page " };
  }
}

module.exports = generateContent;
