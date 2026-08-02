"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  Sparkles,
  Zap,
  BookOpen,
  Send,
  HelpCircle,
  Brain,
  FileText,
  Presentation,
  CheckCircle2,
  ArrowRight,
  Layers,
} from "lucide-react";
import { MOCK_LESSONS, MOCK_AI_MENTOR_MODES } from "@/data/mockData";
import { useGameStore } from "@/store/useGameStore";

interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

export default function LessonPage() {
  const lesson = MOCK_LESSONS["pointers-memory"];
  const { addXP, selectedAIModeId, setAIMode } = useGameStore();

  const currentAIMode = MOCK_AI_MENTOR_MODES.find((m) => m.id === selectedAIModeId) || MOCK_AI_MENTOR_MODES[0];

  const [activeTab, setActiveTab] = useState<"content" | "flashcards" | "mindmap" | "cheatsheet">("content");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: currentAIMode.greeting,
      timestamp: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "Great question! Pointers directly access hardware RAM addresses. In C, always verify that your pointers do not point to freed memory!";

      if (currentAIMode.id === "exam") {
        aiResponseText = "QUESTION FOR YOU: What does malloc(sizeof(int)) return if the system runs completely out of heap memory?";
      } else if (currentAIMode.id === "interviewer") {
        aiResponseText = "Good explanation. How would you design a thread-safe object pool to prevent memory fragmentation under 100k requests/sec?";
      } else if (currentAIMode.id === "rubber-duck") {
        aiResponseText = "Quack! Walk me through line 14 of your code snippet. Where is the memory address stored before calling free()?";
      } else if (currentAIMode.id === "strict") {
        aiResponseText = "Imprecise definition. Memory address pointers in C hold physical RAM offsets. Re-read the Stack vs Heap section above.";
      } else if (currentAIMode.id === "buddy") {
        aiResponseText = "You're crushing it! Think of pointers like house addresses on a street map. Makes total sense, right?";
      }

      if (query.includes("Simplify") || query.includes("simplified")) {
        aiResponseText = lesson.simplifiedExplanation || aiResponseText;
      } else if (query.includes("10") || query.includes("ELI5")) {
        aiResponseText = lesson.eli5Explanation || aiResponseText;
      } else if (query.includes("Flashcard")) {
        aiResponseText = "I've generated 4 key flashcards for this lesson! Check the 'Flashcards' tab above or click 'Take Quiz' when ready.";
        setActiveTab("flashcards");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: aiResponseText,
          timestamp: "Just now",
        },
      ]);
      setIsTyping(false);
      addXP(25, "Engaged AI Mentor");
    }, 900);
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col gap-4 max-w-[1600px] mx-auto overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-card p-4 rounded-2xl border border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-extrabold text-sm">
            C
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-foreground">{lesson.title}</h1>
            <p className="text-xs text-muted-foreground">Subject: Computer Science • Reward: +{lesson.xpReward} XP</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted border border-border text-xs font-bold">
            <span>{currentAIMode.avatar} Mode:</span>
            <span className="text-primary">{currentAIMode.name}</span>
          </div>

          <Link
            href="/quiz/quiz-pointers"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-background font-black text-xs shadow-glow hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-background" />
            <span>Generate & Take Quiz</span>
          </Link>
        </div>
      </div>

      {/* Main Split Window */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* LEFT WINDOW (7 cols): Content & Interactive Tabs */}
        <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-6 flex flex-col min-h-0 overflow-hidden shadow-sm">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 bg-muted/40 p-1 rounded-xl border border-border/50 mb-4 w-fit">
            <button
              onClick={() => setActiveTab("content")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "content" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview & Code
            </button>
            <button
              onClick={() => setActiveTab("flashcards")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "flashcards" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Flashcards ({lesson.flashcards.length})
            </button>
            <button
              onClick={() => setActiveTab("mindmap")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "mindmap" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mind Map
            </button>
            <button
              onClick={() => setActiveTab("cheatsheet")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "cheatsheet" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Cheat Sheet
            </button>
          </div>

          {/* Quick AI Trigger Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
            <button
              onClick={() => handleSendMessage("Simplify this lesson for me.")}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 font-extrabold text-[11px] hover:bg-primary hover:text-background transition-all whitespace-nowrap flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> Simplify
            </button>
            <button
              onClick={() => handleSendMessage("Explain like I'm 10 years old (ELI5).")}
              className="px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/30 font-extrabold text-[11px] hover:bg-secondary hover:text-background transition-all whitespace-nowrap flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3" /> ELI5
            </button>
            <button
              onClick={() => handleSendMessage("Generate Flashcards for this section.")}
              className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-extrabold text-[11px] hover:bg-amber-500 hover:text-background transition-all whitespace-nowrap flex items-center gap-1"
            >
              <Layers className="w-3 h-3" /> Generate Flashcards
            </button>
          </div>

          {/* Display Area */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {activeTab === "content" && (
              <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-4">
                <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                  <h3 className="text-base font-bold text-primary mb-1">Lesson Summary</h3>
                  <p className="text-xs text-muted-foreground">{lesson.summary}</p>
                </div>
                <div className="whitespace-pre-line font-sans">{lesson.contentMarkdown}</div>
              </div>
            )}

            {activeTab === "flashcards" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lesson.flashcards.map((card, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-card border border-primary/30 shadow-glow-cyan flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-primary">Card #{idx + 1}</span>
                      <h4 className="font-bold text-sm mt-1 mb-3">{card.front}</h4>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/60 text-xs font-semibold text-muted-foreground border border-border">
                      {card.back}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "mindmap" && (
              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <h3 className="font-bold text-sm text-primary flex items-center gap-2">
                  <Brain className="w-5 h-5" /> Mind Map Concept Architecture
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {lesson.mindMap.map((node, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-xl bg-primary/15 text-primary border border-primary/30 text-xs font-bold">
                        {node}
                      </span>
                      {i < lesson.mindMap.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "cheatsheet" && (
              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Quick Code Cheat Sheet
                </h3>
                <div className="space-y-2">
                  {lesson.cheatSheet.map((item, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-muted/50 text-xs font-mono border border-border/60">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT WINDOW (5 cols): AI Mentor Panel with Personality Switcher */}
        <div className="lg:col-span-5 bg-card border border-border rounded-3xl p-6 flex flex-col min-h-0 shadow-sm relative">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentAIMode.avatar}</span>
              <div>
                <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
                  AI Mentor ({currentAIMode.name})
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-muted-foreground">{currentAIMode.badge} • Tone: {currentAIMode.name}</p>
              </div>
            </div>
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "ai" && (
                  <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs shrink-0">
                    <span>{currentAIMode.avatar}</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed font-medium ${
                    msg.sender === "user"
                      ? "bg-primary text-background font-bold rounded-tr-none shadow-glow"
                      : "bg-muted/50 border border-border text-foreground rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Bot className="w-4 h-4 animate-spin text-primary" />
                <span>{currentAIMode.name} is thinking...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-muted/40 p-2 rounded-2xl border border-border"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Ask ${currentAIMode.name} mentor...`}
              className="flex-1 bg-transparent px-3 py-1.5 text-xs text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" className="p-2.5 rounded-xl bg-primary text-background font-bold hover:scale-105 transition-transform">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
