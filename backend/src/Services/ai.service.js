require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, 
});

const instructionText = `Act as an AI bot generating authentic Google Maps reviews for "Chandra Prabha Travels" (a taxi service in Ghaziabad, Shop No 150, Bhur Bharat Nagar).

Your Goal: Write reviews mimicking happy Indian customers.

Strict Style Guidelines:
1. Output ONLY the review text. Do NOT write "Here are the reviews" or any intro. Use Hinglish.
2. Tone: Natural, polite, slightly imperfect English (Indian style). Use phrases like "Very use full service", "Need and clean car", "Driver behavior good".
3. Content: Mix different scenarios:
   - Trip to Agra/Mathura/Vrindavan
   - Wedding booking (Innova Crysta / Tempo Traveller)
   - Local / Outstation drop
4. Emojis: MUST use 🙏 and 👍
5. Verification words: "Safe journey", "On time", "Cooperative staff"
6. Maximum words: 40 only.
`;

async function generateContent(prompt) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // ✅ fast & free
      messages: [
        { role: "system", content: instructionText },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 120,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    // console.error("Groq Error:", error.message);
    return "Server busy, please refresh page 🙏";
  }
}

module.exports = generateContent;
