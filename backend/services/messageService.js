const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeMessage(message) {
  const prompt = `
You are a financial fraud detection AI.

Analyze the following message.

Return ONLY valid JSON.

{
  "riskScore": 0,
  "riskLevel": "Low | Medium | High",
  "reasons": [],
  "recommendation": ""
}

Message:
${message}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text.trim();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);
  } catch (err) {
    console.error(err);

    return {
      riskScore: 50,
      riskLevel: "Medium",
      reasons: ["Unable to analyze message"],
      recommendation: "Try again later.",
    };
  }
}

module.exports = { analyzeMessage };