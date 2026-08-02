"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Zap, Clock, CheckCircle2, XCircle, ArrowRight, Trophy, Sparkles } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { CompanyArena } from "@/data/mockData";
import confetti from "canvas-confetti";

export default function InterviewArenaPage() {
  const { companyArenas, addXP, addCoins } = useGameStore();

  const [activeArena, setActiveArena] = useState<CompanyArena | null>(null);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleStartInterview = (arena: CompanyArena) => {
    setActiveArena(arena);
    setCurrentQIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setFinished(false);
  };

  const handleSelectOption = (idx: number) => {
    if (!activeArena || selectedOpt !== null) return;
    setSelectedOpt(idx);

    const question = activeArena.questions[currentQIdx];
    if (idx === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activeArena) return;
    if (currentQIdx < activeArena.questions.length - 1) {
      setCurrentQIdx((prev) => prev + 1);
      setSelectedOpt(null);
    } else {
      setFinished(true);
      const earnedXP = Math.round(activeArena.rewardXP * (score / activeArena.questions.length));
      addXP(earnedXP, `Mock Interview: ${activeArena.name}`);
      addCoins(200);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-primary" />
          <span>FAANG Technical Interview Arena</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Test your algorithm performance under high-pressure simulated company interview environments.
        </p>
      </div>

      {/* Company Arenas Grid */}
      {!activeArena && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companyArenas.map((arena) => (
            <motion.div
              key={arena.id}
              whileHover={{ y: -4 }}
              className="glass-card glass-card-hover p-6 rounded-3xl border border-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{arena.logo}</span>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {arena.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{arena.name} Arena</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{arena.description}</p>

                <div className="space-y-1 mb-6">
                  <p className="text-[10px] font-extrabold uppercase text-muted-foreground">Expected Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {arena.expectedSkills.map((s, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-muted text-primary font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleStartInterview(arena)}
                className="w-full py-3 rounded-xl bg-primary text-background font-extrabold text-xs shadow-glow hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <span>Enter Interview Simulation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Active Interview Simulation View */}
      {activeArena && !finished && (
        <div className="glass-card p-8 rounded-3xl border border-primary/40 max-w-3xl mx-auto space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeArena.logo}</span>
              <div>
                <h2 className="text-xl font-black">{activeArena.name} Technical Assessment</h2>
                <p className="text-xs text-muted-foreground">Question {currentQIdx + 1} of {activeArena.questions.length}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveArena(null)}
              className="text-xs text-muted-foreground hover:text-foreground font-bold"
            >
              Exit Arena
            </button>
          </div>

          <h3 className="text-lg font-bold">{activeArena.questions[currentQIdx].question}</h3>

          <div className="space-y-3">
            {activeArena.questions[currentQIdx].options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === activeArena.questions[currentQIdx].correctIndex;

              let style = "bg-card border-border hover:border-primary/50 text-foreground";
              if (selectedOpt !== null) {
                if (isCorrect) style = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                else if (isSelected) style = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold";
              }

              return (
                <button
                  key={idx}
                  disabled={selectedOpt !== null}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {selectedOpt !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {selectedOpt !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <button
              onClick={handleNextQuestion}
              className="w-full py-3.5 rounded-xl bg-primary text-background font-extrabold text-xs shadow-glow hover:scale-105 transition-transform"
            >
              Submit Answer & Continue
            </button>
          )}
        </div>
      )}

      {/* Finished Summary */}
      {activeArena && finished && (
        <div className="glass-card p-8 rounded-3xl border border-emerald-500/50 text-center max-w-xl mx-auto space-y-6">
          <div className="text-5xl">🎉</div>
          <h2 className="text-3xl font-black text-emerald-400">INTERVIEW PASSED!</h2>
          <p className="text-sm text-muted-foreground">
            You scored {score} out of {activeArena.questions.length} questions correctly in {activeArena.name} Arena!
          </p>

          <button
            onClick={() => setActiveArena(null)}
            className="px-6 py-3 rounded-xl bg-primary text-background font-extrabold text-xs shadow-glow"
          >
            Return to Arena Selection
          </button>
        </div>
      )}
    </div>
  );
}
