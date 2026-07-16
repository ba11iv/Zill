const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeScreenshot(imagePath) {

    const imageBase64 = fs.readFileSync(imagePath, {
        encoding: "base64",
    });

    try {

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `
You are a cybersecurity expert specialized in phishing detection and social engineering.

Analyze the uploaded screenshot.

If the image is NOT a chat, message, email, SMS, banking notification, or phishing-related screenshot, clearly indicate that.

Respond ONLY in JSON.

{
  "riskScore": 0,
  "riskLevel": "Low | Medium | High",
  "reasons": [],
  "recommendation": ""
}
`
                        },
                        {
                            inlineData: {
                                mimeType: "image/png",
                                data: imageBase64,
                            },
                        },
                    ],
                },
            ],
        });

        const cleanJson = response.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleanJson);

    } catch (error) {

        // Gemini server busy
        if (error.status === 503) {

            return {
                riskScore: null,
                riskLevel: "Unavailable",
                reasons: [
                    "AI service is temporarily unavailable."
                ],
                recommendation:
                    "Please try again in a few moments."
            };

        }

        // Invalid JSON returned by Gemini
        if (error instanceof SyntaxError) {

            return {
                riskScore: null,
                riskLevel: "Unknown",
                reasons: [
                    "The AI returned an invalid response."
                ],
                recommendation:
                    "Please try analyzing the image again."
            };

        }

        throw error;

    }

}

module.exports = {
    analyzeScreenshot,
};