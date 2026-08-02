"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Upload, FileText, CheckCircle2, ShieldAlert, Swords, Compass, Layers, Wand2 } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { AdventureDifficulty } from "@/types/adventure";

export default function CreateAdventurePage() {
  const router = useRouter();
  const { createAdventureFromSyllabus } = useGameStore();

  const [advName, setAdvName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [semester, setSemester] = useState("");
  const [difficulty, setDifficulty] = useState<AdventureDifficulty>("Normal");

  const [rawText, setRawText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    "Parsing PDF Syllabus Structure...",
    "Detecting Units, Chapters & Topics...",
    "Constructing Dynamic Skill Tree Nodes...",
    "Spawning Unit Boss Battles...",
    "Building Quizzes, Flashcards & Slides...",
    "Adventure Blueprint Complete! Redirecting...",
  ];

  const sampleSyllabusText = `
Unit 1: Memory Architecture & System Foundations
• Memory Layout, Stack vs Heap
• Dynamic Pointer Allocation and Dereferencing
• Struct Alignment, Pointers to Functions

Unit 2: Operating System Internals & Process Management
• Process Control Blocks (PCB) & Context Switching
• Multithread Synchronization & Mutex Locking
• Deadlock Conditions & Banker's Algorithm

Unit 3: Computer Networks & Socket Architecture
• OSI 7-Layer Model & TCP/IP Stack
• TCP 3-Way Handshake & Windowing
• HTTP/3 & QUIC Protocol Implementation
  `;

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setRawText(text || sampleSyllabusText);
    };
    reader.readAsText(file);
  };

  const handleUseSample = () => {
    setAdvName("CS Core Infrastructure Quest");
    setCourseName("CS 301 - Operating Systems & Memory");
    setSemester("Fall 2026");
    setFileName("CS301_Syllabus_Official.pdf");
    setRawText(sampleSyllabusText);
  };

  const handleStartAdventure = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advName || !courseName) return;

    setIsProcessing(true);

    // Sequential Extraction Animation Sequence
    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    createAdventureFromSyllabus(
      advName,
      courseName,
      semester || undefined,
      difficulty,
      rawText || sampleSyllabusText
    );

    router.push("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-wider">
          <Wand2 className="w-4 h-4" /> Adventure Creator Engine
        </div>
        <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
          Transform Your Syllabus into a Game
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Upload any course PDF syllabus. StudyXP will parse topics into Skill Nodes, Quests, Unit Boss Battles, Flashcards, and an AI Revision Schedule.
        </p>
      </div>

      {/* Main Form & Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl border-2 border-primary/40 shadow-glow-cyan space-y-6"
      >
        <form onSubmit={handleStartAdventure} className="space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-extrabold uppercase text-muted-foreground block mb-1">
                Adventure Name *
              </label>
              <input
                type="text"
                required
                value={advName}
                onChange={(e) => setAdvName(e.target.value)}
                placeholder="e.g. OS Master Quest"
                className="w-full bg-muted/40 px-3.5 py-2.5 rounded-xl border border-border text-xs outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase text-muted-foreground block mb-1">
                Course Name *
              </label>
              <input
                type="text"
                required
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="e.g. CS 301 Operating Systems"
                className="w-full bg-muted/40 px-3.5 py-2.5 rounded-xl border border-border text-xs outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase text-muted-foreground block mb-1">
                Semester (Optional)
              </label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="e.g. Fall 2026"
                className="w-full bg-muted/40 px-3.5 py-2.5 rounded-xl border border-border text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold uppercase text-muted-foreground block">
              Adventure Difficulty Mode
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["Casual", "Normal", "Hardcore", "Legend"] as AdventureDifficulty[]).map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    difficulty === d
                      ? "bg-primary/20 border-primary text-primary font-black shadow-glow-cyan"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <p className="text-xs font-bold">{d}</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">
                    {d === "Casual" ? "0.8x XP" : d === "Normal" ? "1.0x XP" : d === "Hardcore" ? "1.5x XP" : "2.0x XP"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Syllabus Drag & Drop Area */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-extrabold uppercase text-muted-foreground">
                Syllabus PDF Document *
              </label>
              <button
                type="button"
                onClick={handleUseSample}
                className="text-xs font-extrabold text-primary hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" /> Use Sample Syllabus Preset
              </button>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
              }}
              className="border-2 border-dashed border-primary/40 rounded-3xl p-8 text-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer relative"
            >
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <div className="space-y-3 pointer-events-none">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-glow">
                  <Upload className="w-6 h-6 animate-bounce" />
                </div>
                {fileName ? (
                  <div>
                    <p className="text-xs font-black text-emerald-400 flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> {fileName} Loaded
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Click or drop another file to replace</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-bold text-foreground">Drag & drop your syllabus PDF here</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Supports PDF and TXT syllabus documents</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent text-background font-black text-sm shadow-glow hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Compass className="w-5 h-5" />
            <span>Generate Syllabus RPG Adventure</span>
          </button>
        </form>

        {/* Extraction Animation Overlay */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
            >
              <div className="glass-card p-8 rounded-3xl border-2 border-primary/50 max-w-md w-full text-center space-y-6 shadow-glow">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-glow animate-pulse">
                  <Wand2 className="w-8 h-8 animate-spin" />
                </div>

                <div>
                  <h3 className="text-lg font-black text-foreground">Building Adventure World</h3>
                  <p className="text-xs text-primary font-bold mt-1">{steps[currentStepIndex]}</p>
                </div>

                <div className="w-full h-3 bg-muted rounded-full overflow-hidden p-0.5 border border-border">
                  <div
                    className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
