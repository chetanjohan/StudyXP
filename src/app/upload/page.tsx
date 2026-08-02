"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, Sparkles, CheckCircle2, Bot, ArrowRight, Layers, Presentation, Brain } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import Link from "next/link";

export default function DocumentUploadPage() {
  const { addXP } = useGameStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const STEPS = [
    "Parsing Document Text & Code Blocks...",
    "Generating AI Summary...",
    "Generating 10 Flashcards...",
    "Generating Interactive Quiz Questions...",
    "Generating Slide Deck Overview...",
    "Generating Concept Cheat Sheet & Mind Map...",
  ];

  const handleSimulatedUpload = (name: string) => {
    setFileName(name);
    setIsProcessing(true);
    setCurrentStep(0);
    setCompleted(false);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < STEPS.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setCompleted(true);
        addXP(300, "Imported AI Study Pack");
      }
    }, 900);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <UploadCloud className="w-8 h-8 text-primary" />
          <span>AI Document Import & Converter</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload any PDF, PPT, DOCX, TXT, or textbook image to automatically convert it into an interactive RPG study pack.
        </p>
      </div>

      {/* Drag & Drop Upload Zone */}
      {!isProcessing && !completed && (
        <div className="glass-card p-12 rounded-3xl border-2 border-dashed border-primary/40 text-center space-y-6 hover:border-primary transition-all relative overflow-hidden group">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/20 text-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <UploadCloud className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-foreground">Drag & Drop Your Study Files Here</h2>
            <p className="text-xs text-muted-foreground mt-1">Supports PDF, PPTX, DOCX, TXT, and JPG/PNG Images</p>
          </div>

          {/* Quick Demo Upload Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={() => handleSimulatedUpload("Operating_Systems_Chapter_4.pdf")}
              className="px-4 py-2 rounded-xl bg-card border border-border text-xs font-bold hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-primary" />
              <span>Operating_Systems_Chapter_4.pdf</span>
            </button>

            <button
              onClick={() => handleSimulatedUpload("Distributed_Systems_Lecture.pptx")}
              className="px-4 py-2 rounded-xl bg-card border border-border text-xs font-bold hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
            >
              <Presentation className="w-4 h-4 text-secondary" />
              <span>Distributed_Systems_Lecture.pptx</span>
            </button>
          </div>
        </div>
      )}

      {/* Processing Animated Progress State */}
      {isProcessing && (
        <div className="glass-card p-12 rounded-3xl border border-primary/40 text-center space-y-6">
          <Bot className="w-12 h-12 mx-auto text-primary animate-spin" />
          <h2 className="text-xl font-black text-foreground">Processing {fileName}</h2>

          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-primary">
              <span>{STEPS[currentStep]}</span>
              <span>{Math.round(((currentStep + 1) / STEPS.length) * 100)}%</span>
            </div>

            <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-border">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent xp-bar-glow shadow-glow"
                animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Generated Study Pack Preview */}
      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 rounded-3xl border-2 border-emerald-500/50 space-y-6 shadow-glow-cyan"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                AI Conversion Complete (+300 XP)
              </span>
              <h2 className="text-xl font-black text-foreground mt-1">{fileName} Study Pack</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-card border border-border">
              <p className="text-2xl font-black text-primary">10</p>
              <p className="text-[10px] text-muted-foreground font-bold">FLASHCARDS</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border">
              <p className="text-2xl font-black text-secondary">5</p>
              <p className="text-[10px] text-muted-foreground font-bold">QUIZ QUESTIONS</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border">
              <p className="text-2xl font-black text-amber-400">1</p>
              <p className="text-[10px] text-muted-foreground font-bold">CHEAT SHEET</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border">
              <p className="text-2xl font-black text-purple-400">1</p>
              <p className="text-[10px] text-muted-foreground font-bold">MIND MAP</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/lesson/pointers-memory"
              className="px-6 py-3.5 rounded-2xl bg-primary text-background font-extrabold text-xs shadow-glow hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span>Study Generated Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
