import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { fileName, fileContent } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: { responseMimeType: "application/json" },
      });

      const prompt = `Analyze the document "${fileName || "Study Material"}" with content snippet: "${fileContent || "Core concepts overview"}".
Return a JSON object with this exact structure:
{
  "title": "Study Pack Title",
  "flashcardsCount": 10,
  "quizCount": 5,
  "cheatSheetCount": 1,
  "mindMapCount": 1,
  "flashcards": [
    {"front": "Question 1", "back": "Answer 1"},
    {"front": "Question 2", "back": "Answer 2"}
  ]
}`;

      const result = await model.generateContent(prompt);
      const jsonResponse = JSON.parse(result.response.text());
      return NextResponse.json({ success: true, studyPack: jsonResponse });
    }

    // Fallback response if GEMINI_API_KEY is unconfigured
    const studyPack = {
      title: `${fileName || "Document"} Study Pack`,
      flashcardsCount: 10,
      quizCount: 5,
      cheatSheetCount: 1,
      mindMapCount: 1,
      flashcards: [
        { front: `What is the core concept of ${fileName}?`, back: "Key architectural breakdown and implementation principles." },
        { front: "What is the primary performance tradeoff?", back: "Latency vs Memory Footprint trade-off." }
      ]
    };

    return NextResponse.json({ success: true, studyPack });
  } catch (error) {
    console.error("Document Converter Error:", error);
    return NextResponse.json({ success: false, error: "Document AI conversion failed." }, { status: 500 });
  }
}
