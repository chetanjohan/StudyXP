import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { prompt, mode, lessonTitle } = await req.json();

    // Access secret API key strictly on server side (never sent to client browser)
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    // Mode System Prompt Customization
    const modePrompts: Record<string, string> = {
      teacher: "You are a warm, highly knowledgeable Computer Science professor. Explain concepts with deep architectural clarity.",
      exam: "You are a strict examiner. Only ask probing verification questions to test retention.",
      interviewer: "You are a FAANG Senior Tech Interviewer. Evaluate system scalability and algorithmic complexity.",
      "rubber-duck": "You are a friendly debugging rubber duck. Quack! Guide the user line-by-line.",
      strict: "You give zero hand-holding. Demands exact technical precision.",
      buddy: "You are a super encouraging study buddy using simple analogies.",
    };

    const systemInstruction = modePrompts[mode] || modePrompts.teacher;

    if (process.env.GEMINI_API_KEY) {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: `${systemInstruction} Lesson Context: "${lessonTitle || "Computer Science"}"`,
      });

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return NextResponse.json({ response: text });
    }

    if (process.env.OPENAI_API_KEY) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: `${systemInstruction} Context: Lesson "${lessonTitle}"` },
            { role: "user", content: prompt },
          ],
          max_tokens: 300,
        }),
      });

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || "AI response generated.";
      return NextResponse.json({ response: text });
    }

    // Fallback response generator if API key is unconfigured
    let fallbackText = `[${mode.toUpperCase()} MENTOR]: Great question regarding ${lessonTitle || "this topic"}! Pointers access direct hardware RAM offsets. In C, always call free() to prevent heap exhaustion.`;
    
    if (mode === "exam") {
      fallbackText = `[EXAM MODE]: What is the exact return value of malloc() if heap memory is fully exhausted?`;
    } else if (mode === "interviewer") {
      fallbackText = `[INTERVIEWER]: How would you optimize this algorithm from O(N^2) time to O(N log N) using a Balanced Binary Search Tree?`;
    } else if (mode === "rubber-duck") {
      fallbackText = `Quack! 🦆 Walk me through what happens to memory on line 12 before dereferencing the pointer!`;
    }

    return NextResponse.json({ response: fallbackText });
  } catch (error) {
    console.error("AI Mentor Route Error:", error);
    return NextResponse.json(
      { response: "AI Mentor system encountered a processing error. Please check server logs." },
      { status: 500 }
    );
  }
}
