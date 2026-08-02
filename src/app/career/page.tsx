"use client";

import { motion } from "framer-motion";
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ArrowRight,
  Briefcase,
  Trophy,
  Sparkles,
  Swords,
  ShieldCheck,
} from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { MOCK_CAREER_GOALS } from "@/data/mockData";
import Link from "next/link";

export default function CareerPathPage() {
  const { selectedCareerGoalId, setCareerGoal } = useGameStore();

  const activeGoal = MOCK_CAREER_GOALS.find((g) => g.id === selectedCareerGoalId) || MOCK_CAREER_GOALS[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <Target className="w-8 h-8 text-primary" />
          <span>Career Readiness Path</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Transform your earned XP and mastered skill tree nodes into job-ready engineering competence.
        </p>
      </div>

      {/* Target Goal Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {MOCK_CAREER_GOALS.map((goal) => {
          const isSelected = selectedCareerGoalId === goal.id;

          return (
            <button
              key={goal.id}
              onClick={() => setCareerGoal(goal.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-primary/20 border-primary shadow-glow-cyan text-primary"
                  : "bg-card border-border hover:border-primary/40 text-foreground"
              }`}
            >
              <div className="text-3xl mb-2">{goal.icon}</div>
              <h3 className="font-extrabold text-sm truncate">{goal.title}</h3>
              <p className="text-[11px] text-muted-foreground font-bold mt-1">
                {goal.readinessPercentage}% Readiness
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Readiness Overview Card */}
      <div className="glass-card p-8 rounded-3xl border border-primary/40 shadow-glow-cyan relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Animated Circular Readiness Meter */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="14"
                  className="text-muted/40"
                  fill="transparent"
                />
                <motion.circle
                  cx="88"
                  cy="88"
                  r="70"
                  stroke="url(#readinessGrad)"
                  strokeWidth="14"
                  strokeDasharray="440"
                  initial={{ strokeDashoffset: 440 }}
                  animate={{ strokeDashoffset: 440 - (440 * activeGoal.readinessPercentage) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                  fill="transparent"
                />
                <defs>
                  <linearGradient id="readinessGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {activeGoal.readinessPercentage}%
                </span>
                <span className="text-[10px] font-extrabold uppercase text-muted-foreground">OVERALL READINESS</span>
              </div>
            </div>

            <span className="mt-4 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold">
              {activeGoal.estimatedInterviewReadiness}
            </span>
          </div>

          {/* Goal Details & Skill Gaps */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeGoal.icon}</span>
                <h2 className="text-2xl font-black">{activeGoal.title} Target</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{activeGoal.description}</p>
            </div>

            {/* Completed vs Missing Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-card border border-border">
                <h4 className="font-extrabold text-xs text-emerald-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4" /> Completed Skills ({activeGoal.completedSkills.length})
                </h4>
                <div className="space-y-1.5">
                  {activeGoal.completedSkills.map((s, i) => (
                    <div key={i} className="text-xs font-semibold text-foreground/90 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border">
                <h4 className="font-extrabold text-xs text-amber-400 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4" /> Missing Skill Gaps ({activeGoal.missingSkills.length})
                </h4>
                <div className="space-y-1.5">
                  {activeGoal.missingSkills.map((s, i) => (
                    <div key={i} className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Quest Box */}
            <div className="p-5 rounded-2xl bg-muted/40 border border-primary/30 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-primary">RECOMMENDED CAREER QUEST</span>
                <h4 className="font-bold text-sm text-foreground">{activeGoal.recommendedQuest.title}</h4>
                <p className="text-xs text-muted-foreground">
                  Boss: {activeGoal.recommendedQuest.bossName} • Reward: +{activeGoal.recommendedQuest.rewardXP} XP & {activeGoal.recommendedQuest.rewardSkill}
                </p>
              </div>

              <Link
                href="/boss-battles"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-background font-extrabold text-xs shadow-glow hover:scale-105 transition-transform flex items-center gap-1.5 shrink-0"
              >
                <Swords className="w-4 h-4" />
                <span>Begin Quest</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
