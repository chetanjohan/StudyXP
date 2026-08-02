"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Swords, Trophy, Zap, Coins, Clock } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import Link from "next/link";

const WEEKLY_CALENDAR = [
  { day: "Monday", quest: "Master 5 C Pointers Flashcards", xp: 150, coins: 40, completed: true, difficulty: "Easy" },
  { day: "Tuesday", quest: "Solve 10 Memory Quiz Questions", xp: 250, coins: 75, completed: true, difficulty: "Medium" },
  { day: "Wednesday", quest: "Defeat Memory Leak Dragon Boss", xp: 600, coins: 200, completed: true, difficulty: "Hard" },
  { day: "Thursday", quest: "Review 3 Memory Spaced Repetition Topics", xp: 200, coins: 50, completed: false, difficulty: "Medium" },
  { day: "Friday", quest: "Complete 1 FAANG Mock Interview", xp: 500, coins: 150, completed: false, difficulty: "Hard" },
  { day: "Saturday", quest: "Unlock 1 Node in Skill Tree", xp: 300, coins: 80, completed: false, difficulty: "Medium" },
  { day: "Sunday", quest: "Conquer Sunday Weekly Boss Raid", xp: 1000, coins: 350, completed: false, difficulty: "Nightmare" },
];

export default function WeeklyQuestsPage() {
  const { addXP } = useGameStore();

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <CalendarDays className="w-8 h-8 text-primary" />
          <span>Weekly Quest Calendar</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          7-day study curriculum map. Complete all 7 daily quests to unlock the Sunday Weekly Boss Raid & Legend Loot Chest!
        </p>
      </div>

      {/* Weekly Progress Banner */}
      <div className="glass-card p-6 rounded-3xl border border-primary/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-primary/20 text-primary">
            WEEKLY QUEST COMPLETION
          </span>
          <h2 className="text-xl font-black mt-1">3 of 7 Daily Quests Completed</h2>
          <p className="text-xs text-muted-foreground">Reward at 7/7: +1,500 Bonus XP & Legendary Loot Scroll</p>
        </div>

        <div className="w-full sm:w-48 h-3 bg-muted rounded-full overflow-hidden border border-border">
          <div className="h-full bg-gradient-to-r from-primary to-secondary xp-bar-glow" style={{ width: "42%" }} />
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WEEKLY_CALENDAR.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
              item.completed
                ? "bg-card border-emerald-500/40"
                : idx === 3
                ? "bg-card border-2 border-primary shadow-glow-cyan"
                : "bg-card border-border opacity-70"
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black text-primary uppercase">{item.day}</span>
                <span
                  className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                    item.difficulty === "Nightmare"
                      ? "bg-rose-500/20 text-rose-400"
                      : item.difficulty === "Hard"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-cyan-500/20 text-cyan-400"
                  }`}
                >
                  {item.difficulty}
                </span>
              </div>

              <h3 className="font-bold text-sm text-foreground mb-4">{item.quest}</h3>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-4">
                <span className="text-primary flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> +{item.xp} XP
                </span>
                <span className="text-amber-400 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" /> +{item.coins} Coins
                </span>
              </div>

              {item.completed ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs text-center border border-emerald-500/30 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Quest Completed
                </div>
              ) : idx === 3 ? (
                <Link
                  href="/quiz/quiz-pointers"
                  className="w-full py-2.5 rounded-xl bg-primary text-background font-extrabold text-xs text-center shadow-glow block hover:scale-105 transition-transform"
                >
                  Start Today's Quest
                </Link>
              ) : (
                <div className="p-2.5 rounded-xl bg-muted text-muted-foreground font-bold text-xs text-center">
                  Upcoming Day
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
