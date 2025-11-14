import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const roadMapAgent = async (prompt) => {
  const model = ai.models;

  let retries = 3;
  let delay = 1000;

  while (retries > 0) {
    try {
      const response = await model.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `Return strictly in only one JSON format like this:
                        {
                        "role": "Frontend Developer",
                        "skills": ["HTML", "CSS", "JavaScript"],
                        "duration": "3 months",
                        "weeklyHours": "10h",
                        "overview": "Short description",
                        "roadmap": [
                            {
                            "month": 1,
                            "title": "...",
                            "summary": "...",
                            "tasks": ["...","..."]
                            }
                        ]
        (no extra text, roadmap json))`,
        },
      });

      const text =
        response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      return text;
    } catch (error) {
      console.error("Gemini Error:", error.message);

      if (error.status === 503 || error.message.includes("overloaded")) {
        retries--;
        console.log(`Retrying... attempts left: ${retries}`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      } else {
        throw new Error("Gemini AI request failed");
      }
    }
  }

  throw new Error("Gemini API overloaded. Try again later.");
};

export default roadMapAgent;
