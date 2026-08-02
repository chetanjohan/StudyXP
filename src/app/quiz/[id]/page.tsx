"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Zap,
  Coins,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Snowflake,
  ArrowRight,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { MOCK_QUIZZES } from "@/data/mockData";
import { useGameStore } from "@/store/useGameStore";
import confetti from "canvas-confetti";

export default function QuizPage() {
  const quiz = MOCK_QUIZZES["quiz-pointers"];
  const { addXP, addCoins, inventory, useItem, activeBuffs } = useGameStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitSeconds);
  const [eliminatedOptionIndex, setEliminatedOptionIndex] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const question = quiz.questions[currentQuestionIndex];

  // Timer countdown hook
  useEffect(() => {
    if (quizFinished || activeBuffs.freezeTimer) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuizFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizFinished, activeBuffs.freezeTimer]);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setEliminatedOptionIndex(null);
    } else {
      setQuizFinished(true);
      // Award XP & Coins based on accuracy
      const earnedXP = Math.round(quiz.xpReward * (score / quiz.questions.length));
      const earnedCoins = Math.round(quiz.coinReward * (score / quiz.questions.length));
      addXP(earnedXP, `Completed ${quiz.title}`);
      addCoins(earnedCoins);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleUseHint = () => {
    const hintItem = inventory.find((i) => i.id === "hint-potion");
    if (!hintItem || hintItem.count <= 0 || eliminatedOptionIndex !== null) return;

    useItem("hint-potion");
    // Find a wrong index to eliminate
    const wrongIndex = question.options.findIndex((_, idx) => idx !== question.correctIndex);
    setEliminatedOptionIndex(wrongIndex);
  };

  const handleFreezeTimer = () => {
    const freezeItem = inventory.find((i) => i.id === "freeze-timer");
    if (!freezeItem || freezeItem.count <= 0) return;
    useItem("freeze-timer");
  };

  const hintCount = inventory.find((i) => i.id === "hint-potion")?.count || 0;
  const freezeCount = inventory.find((i) => i.id === "freeze-timer")?.count || 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Quiz Header Bar */}
      <div className="glass-card p-6 rounded-3xl border border-border flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
            {quiz.difficulty} Difficulty
          </span>
          <h1 className="text-xl font-extrabold mt-2">{quiz.title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer Display */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-extrabold ${
              activeBuffs.freezeTimer
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse"
                : timeLeft < 15
                ? "bg-rose-500/20 text-rose-400 border-rose-500/40 animate-bounce"
                : "bg-muted/40 border-border text-foreground"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>

          <div className="text-right text-xs">
            <p className="font-extrabold text-primary flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> +{quiz.xpReward} XP
            </p>
            <p className="font-bold text-amber-400 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" /> +{quiz.coinReward} Coins
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Progress & Power-ups */}
      {!quizFinished && (
        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
          <span>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleUseHint}
              disabled={hintCount === 0 || eliminatedOptionIndex !== null}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold hover:bg-amber-500 hover:text-background transition-colors disabled:opacity-40 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hint Potion ({hintCount})</span>
            </button>

            <button
              onClick={handleFreezeTimer}
              disabled={freezeCount === 0 || activeBuffs.freezeTimer}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold hover:bg-cyan-500 hover:text-background transition-colors disabled:opacity-40 flex items-center gap-1.5"
            >
              <Snowflake className="w-3.5 h-3.5" />
              <span>Freeze Time ({freezeCount})</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Quiz Body */}
      {!quizFinished ? (
        <div className="glass-card p-8 rounded-3xl border border-primary/30 space-y-6">
          <h2 className="text-lg md:text-xl font-bold leading-snug">{question.question}</h2>

          {/* Options Grid */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctIndex;
              const isEliminated = idx === eliminatedOptionIndex;

              let btnStyle = "bg-card border-border text-foreground hover:border-primary/50";

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-glow";
                } else if (isSelected) {
                  btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold";
                }
              }

              if (isEliminated) {
                btnStyle = "bg-muted/20 border-border/30 text-muted-foreground opacity-30 cursor-not-allowed line-through";
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered || isEliminated}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-muted/60 flex items-center justify-center text-xs font-extrabold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2 text-xs"
            >
              <p className="font-extrabold text-primary uppercase">Explanation</p>
              <p className="text-muted-foreground leading-relaxed">{question.explanation}</p>
            </motion.div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <button
              onClick={handleNextQuestion}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-background font-extrabold text-sm shadow-glow hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <span>{currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "Complete Quiz"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        /* Quiz Finished Victory Screen */
        <div className="glass-card p-8 rounded-3xl border border-primary/40 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-primary to-accent p-1 shadow-glow">
            <div className="w-full h-full bg-card rounded-[22px] flex items-center justify-center">
              <Trophy className="w-10 h-10 text-primary animate-bounce" />
            </div>
          </div>

          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            QUIZ CONQUERED!
          </h2>

          <p className="text-sm text-muted-foreground font-semibold">
            You answered <span className="text-primary font-bold">{score}</span> out of {quiz.questions.length} questions correctly.
          </p>

          <div className="flex justify-center gap-6 py-4">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 min-w-[120px]">
              <p className="text-xs text-muted-foreground font-bold uppercase">XP Awarded</p>
              <p className="text-xl font-extrabold text-primary">+{Math.round(quiz.xpReward * (score / quiz.questions.length))}</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 min-w-[120px]">
              <p className="text-xs text-muted-foreground font-bold uppercase">Coins Earned</p>
              <p className="text-xl font-extrabold text-amber-400">+{Math.round(quiz.coinReward * (score / quiz.questions.length))}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-primary text-background font-extrabold text-xs shadow-glow hover:scale-105 transition-transform"
            >
              Return to Dashboard
            </Link>
            <Link
              href="/boss-battles"
              className="px-6 py-3 rounded-xl bg-secondary/20 text-secondary border border-secondary/30 font-extrabold text-xs hover:bg-secondary hover:text-background transition-all"
            >
              Face Boss Battle
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
