"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, RotateCcw, CheckCircle2, XCircle, Zap, Sparkles } from "lucide-react";
import { MOCK_LESSONS } from "@/data/mockData";
import { useGameStore } from "@/store/useGameStore";
import confetti from "canvas-confetti";

export default function FlashcardsPage() {
  const flashcards = MOCK_LESSONS["pointers-memory"].flashcards;
  const { addXP } = useGameStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const card = flashcards[currentIndex];

  const handleAnswer = (known: boolean) => {
    setIsFlipped(false);
    setReviewedCount((prev) => prev + 1);

    if (known) {
      addXP(50, "Mastered Flashcard");
    }

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <Layers className="w-8 h-8 text-primary" />
          <span>Interactive 3D Flashcards</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review core memory and C concepts with space repetition. Earn +50 XP per mastered card!
        </p>
      </div>

      {/* Progress & Deck status */}
      <div className="flex justify-between items-center text-xs font-extrabold text-muted-foreground">
        <span>Card {currentIndex + 1} of {flashcards.length}</span>
        <span className="text-primary">Total Reviewed: {reviewedCount}</span>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-80 cursor-pointer perspective-1000"
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full glass-card border-2 border-primary/40 rounded-3xl p-8 shadow-glow-cyan flex flex-col justify-between text-center relative overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Card Front */}
          {!isFlipped ? (
            <div className="my-auto space-y-4">
              <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
                QUESTION (CLICK TO FLIP)
              </span>
              <h2 className="text-2xl font-bold leading-relaxed">{card.front}</h2>
            </div>
          ) : (
            /* Card Back */
            <div className="my-auto space-y-4 transform rotate-y-180">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                ANSWER DEFINITION
              </span>
              <h2 className="text-xl font-semibold text-foreground leading-relaxed">{card.back}</h2>
            </div>
          )}

          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
            Tap anywhere to flip card
          </div>
        </motion.div>
      </div>

      {/* Self Assessment Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleAnswer(false)}
          className="flex-1 py-4 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 font-extrabold text-sm hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <XCircle className="w-5 h-5" />
          <span>Still Reviewing</span>
        </button>

        <button
          onClick={() => handleAnswer(true)}
          className="flex-1 py-4 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold text-sm hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center gap-2 shadow-glow"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Got It Right (+50 XP)</span>
        </button>
      </div>
    </div>
  );
}
