"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles, Zap, Award, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useGameStore } from "@/store/useGameStore";

export default function LevelUpModal() {
  const { showLevelUpModal, newLevel, newRankTitle, closeLevelUpModal } = useGameStore();

  useEffect(() => {
    if (showLevelUpModal) {
      // Trigger festive confetti explosion
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00F0FF", "#FF007F", "#7000FF", "#F59E0B"],
      });
    }
  }, [showLevelUpModal]);

  return (
    <AnimatePresence>
      {showLevelUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="w-full max-w-md bg-card border-2 border-primary rounded-3xl p-8 shadow-glow-cyan text-center relative overflow-hidden"
          >
            {/* Background Ray Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/30 rounded-full blur-3xl" />

            {/* Icon Header */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-primary via-secondary to-accent p-1 shadow-glow"
            >
              <div className="w-full h-full bg-card rounded-[22px] flex items-center justify-center">
                <Trophy className="w-12 h-12 text-primary animate-bounce" />
              </div>
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mb-2">
              LEVEL UP!
            </h2>
            <p className="text-sm font-semibold text-muted-foreground mb-6">
              You reached <span className="text-primary font-bold">Level {newLevel}</span>!
            </p>

            {/* Rank Card */}
            <div className="p-4 rounded-2xl bg-muted/40 border border-primary/30 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">New Rank Unlocked</p>
                  <p className="text-lg font-black text-foreground">{newRankTitle}</p>
                </div>
              </div>
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>

            {/* Claim Reward Button */}
            <button
              onClick={closeLevelUpModal}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-background font-extrabold text-base tracking-wide shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>CLAIM LEVEL REWARDS</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
