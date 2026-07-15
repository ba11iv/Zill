const axios = require("axios");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeLink(url) {

    try {

        let riskScore = 0;
        let reasons = [];

        const domain = new URL(url).hostname;

        // ==========================
        // WHOIS API
        // ==========================

        const response = await axios.get(
            "https://www.whoisxmlapi.com/whoisserver/WhoisService",
            {
                params: {
                    apiKey: process.env.WHOIS_API_KEY,
                    domainName: domain,
                    outputFormat: "JSON",
                },
            }
        );

        // ==========================
        // Registration Date
        // ==========================

        const registrationDate =
            response.data.WhoisRecord?.createdDate ||
            response.data.WhoisRecord?.registryData?.createdDate ||
            "Unknown";

        const formattedRegistrationDate =
            registrationDate !== "Unknown"
                ? new Date(registrationDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  })
                : "Unknown";

        // ==========================
        // Domain Age
        // ==========================

        const age =
            registrationDate !== "Unknown"
                ? Math.floor(
                      (Date.now() - new Date(registrationDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                  )
                : 0;

        let domainAgeText = "";

        if (age >= 365) {

            domainAgeText = `${Math.floor(age / 365)} years`;

        } else if (age >= 30) {

            domainAgeText = `${Math.floor(age / 30)} months`;

        } else {

            domainAgeText = `${age} days`;

        }

        // ==========================
        // Domain Age Risk
        // ==========================

        if (age < 30) {

            riskScore += 30;
            reasons.push("The domain is very new.");

        } else if (age < 365) {

            riskScore += 15;
            reasons.push("The domain is less than one year old.");

        }

        // ==========================
        // HTTPS Check
        // ==========================

        const https = url.startsWith("https://");

        if (!https) {

            riskScore += 10;
            reasons.push("The website does not use HTTPS.");

        }

        // ==========================
        // Gemini AI Analysis
        // ==========================

        let aiResult = {
            riskScore: 0,
            reason: "",
        };

        try {

            const geminiResponse = await ai.models.generateContent({
                model: "gemini-3.5-flash",
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `
You are a cybersecurity expert.

Analyze this URL for:
- Phishing
- Fake banking websites
- Brand impersonation
- Social engineering
- Suspicious login pages

URL:
${url}

Respond ONLY in JSON:

{
  "riskScore": 0,
  "reason": ""
}
`
                            }
                        ]
                    }
                ]
            });

            const cleanJson = geminiResponse.text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            aiResult = JSON.parse(cleanJson);

        } catch (error) {
console.error(error);
            reasons.push("AI analysis is temporarily unavailable.");

        }

        riskScore += aiResult.riskScore || 0;

        if (aiResult.reason) {

            reasons.push(aiResult.reason);

        }

        // منع تجاوز 100
        riskScore = Math.min(riskScore, 100);

        // ==========================
        // Risk Level
        // ==========================

        let riskLevel = "Low";

        if (riskScore >= 60) {

            riskLevel = "High";

        } else if (riskScore >= 30) {

            riskLevel = "Medium";

        }

        return {

            url,
            registrationDate: formattedRegistrationDate,
            domainAge: domainAgeText,
            https,
            riskScore,
            riskLevel,
            reasons,
            recommendation:
                riskScore > 0
                    ? "Verify the website before opening it."
                    : "No immediate security concerns were detected.",

        };

    } catch (error) {

        throw new Error("Unable to analyze the link.");

    }

}

module.exports = {
    analyzeLink,
};