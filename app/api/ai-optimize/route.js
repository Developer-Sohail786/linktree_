import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

export async function POST(req) {

    try {

        const body = await req.json();

        const { desc, links } = body;

        if (!links?.length) {
            return Response.json({
                success: false,
                message: "Missing fields",
            });
        }

        const prompt = `
You are a professional personal branding expert.

Your task:
1. Optimize the bio professionally
2. Improve link titles for better engagement

Rules:
- Return ONLY valid JSON
- No markdown
- No explanation
- Keep bio concise
- Keep titles short but attractive

Response format:
{
  "bio": "optimized bio",
  "links": [
    {
      "title": "optimized title"
    }
  ]
}

Bio:
${desc}

Links:
${links.map((link, index) =>
            `${index + 1}. ${link.title}`
        ).join("\n")}
`;

        const models = [
            "gemini-2.5-flash",
            "gemini-3.1-pro-preview",
            "gemini-2.0-flash",
        ];

        let parsed = null;

        let lastError = null;

        for (const modelName of models) {

            try {

                console.log(`Trying model: ${modelName}`);

                const model = genAI.getGenerativeModel({
                    model: modelName,
                });

                const result = await model.generateContent(prompt);

                const response = await result.response;

                const text = response.text();

                const cleaned = text
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

                parsed = JSON.parse(cleaned);

                console.log(`Success with: ${modelName}`);

                break;

            } catch (error) {

                console.log(`Failed model: ${modelName}`);

                lastError = error;
            }
        }

        if (!parsed) {
            throw lastError;
        }

        return Response.json({
            success: true,
            data: parsed,
        });

    } catch (error) {

        console.log("AI ERROR:", error);

        return Response.json({
            success: false,
            message: "AI service unavailable right now due to high traffic.",
        });
    }
}