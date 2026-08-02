"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Calendar, Target, Brain, Award, Crown, CheckCircle2, Zap } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";

const ICON_MAP: Record<string, any> = {
  Flame,
  Calendar,
  Target,
  Brain,
  Award,
  Crown,
};

export default function AchievementsPage() {
  const { achievements, claimAchievement } = useGameStore();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <Trophy className="w-8 h-8 text-amber-400" />
          <span>Achievements & Milestones</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Complete epic study feats to unlock legendary badges and massive XP rewards.
        </p>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => {
          const Icon = ICON_MAP[ach.icon] || Trophy;

          return (
            <div
              key={ach.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                ach.unlocked
                  ? "bg-card border-amber-500/50 shadow-glow-gold"
                  : "bg-muted/20 border-border/40 opacity-70"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                      ach.unlocked
                        ? "bg-amber-500 text-background shadow-glow"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-extrabold text-primary flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> +{ach.rewardXP} XP
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1">{ach.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{ach.description}</p>
              </div>

              <div>
                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground mb-1">
                  <span>PROGRESS</span>
                  <span>{ach.progress} / {ach.maxProgress}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4 border border-border/40">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    style={{ width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%` }}
                  />
                </div>

                {ach.unlocked ? (
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs text-center border border-amber-500/40 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Unlocked & Claimed
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-muted text-muted-foreground font-bold text-xs text-center">
                    Locked
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
