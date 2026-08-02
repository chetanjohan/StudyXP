"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Flame, Swords, Brain, ArrowRight, Zap, Target, BookOpen, Clock, Wand2, Compass } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";

export default function DashboardPage() {
  const {
    username,
    avatar,
    level,
    rankTitle,
    currentXP,
    nextLevelXP,
    coins,
    streakDays,
    dailyQuests,
    bosses,
    activeAdventure,
  } = useGameStore();

  const activeBoss = bosses.find((b) => b.hp > 0) || bosses[0];
  const pendingQuests = dailyQuests.filter((q) => !q.claimed);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Banner: Active Adventure or Empty State CTA */}
      {activeAdventure ? (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border-2 border-primary/40 shadow-glow-cyan flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-primary/20 text-primary">
              ACTIVE SYLLABUS ADVENTURE • {activeAdventure.difficulty} MODE
            </span>
            <h1 className="text-3xl font-black tracking-tight text-foreground">{activeAdventure.name}</h1>
            <p className="text-xs text-muted-foreground">
              {activeAdventure.courseName} {activeAdventure.semester ? `(${activeAdventure.semester})` : ""} • {activeAdventure.units.length} Units • {activeAdventure.totalXP} XP World
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/create-adventure"
              className="px-4 py-2.5 rounded-xl bg-card border border-border text-xs font-bold hover:border-primary transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-primary" />
              <span>Switch Syllabus</span>
            </Link>
            <Link
              href="/skill-tree"
              className="px-5 py-2.5 rounded-xl bg-primary text-background font-extrabold text-xs shadow-glow hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span>Explore Skill Tree</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="glass-card p-8 rounded-3xl border-2 border-secondary/40 shadow-glow-pink flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-secondary/20 text-secondary">
              NO ADVENTURE CREATED YET
            </span>
            <h2 className="text-2xl font-black text-foreground">Transform Your Syllabus into a Game</h2>
            <p className="text-xs text-muted-foreground max-w-xl">
              Upload any course PDF syllabus to generate a dynamic Skill Tree, Quests, Unit Boss Battles, Flashcards, and an AI Study Plan!
            </p>
          </div>

          <Link
            href="/create-adventure"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent text-background font-black text-xs shadow-glow hover:scale-105 transition-transform flex items-center gap-2 shrink-0"
          >
            <Wand2 className="w-4 h-4" />
            <span>Create First Adventure</span>
          </Link>
        </div>
      )}

      {/* Hero Welcome & Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Welcome (7 cols) */}
        <div className="md:col-span-7 glass-card p-6 rounded-3xl border border-border flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl p-3 bg-muted rounded-2xl border border-border">{avatar}</span>
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Welcome back, {username}!</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Level {level} {rankTitle} • {currentXP} / {nextLevelXP} XP
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-extrabold">
              <span className="text-muted-foreground">Level Progression</span>
              <span className="text-primary">{Math.round((currentXP / nextLevelXP) * 100)}%</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden p-0.5 border border-border">
              <div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-500"
                style={{ width: `${(currentXP / nextLevelXP) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Stats Grid (5 cols) */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          <div className="glass-card p-5 rounded-3xl border border-border space-y-2">
            <div className="flex justify-between items-center text-amber-400">
              <Flame className="w-5 h-5 fill-amber-400" />
              <span className="text-xs font-bold">Streak</span>
            </div>
            <p className="text-2xl font-black text-foreground">{streakDays} Days</p>
            <p className="text-[10px] text-muted-foreground">1.2x XP Multiplier Active</p>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-border space-y-2">
            <div className="flex justify-between items-center text-amber-400">
              <Trophy className="w-5 h-5" />
              <span className="text-xs font-bold">Coins</span>
            </div>
            <p className="text-2xl font-black text-foreground">{coins}</p>
            <p className="text-[10px] text-muted-foreground">Ready for Item Shop</p>
          </div>
        </div>
      </div>

      {/* Quests & Upcoming Boss Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Syllabus Quests (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Syllabus Quests ({pendingQuests.length})</span>
            </h3>
            <Link href="/weekly-quests" className="text-xs font-bold text-primary hover:underline">
              View Calendar
            </Link>
          </div>

          <div className="space-y-3">
            {dailyQuests.map((quest) => (
              <div key={quest.id} className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-foreground">{quest.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Reward: +{quest.rewardXP} XP • +{quest.rewardCoins} Coins
                  </p>
                </div>

                <Link
                  href="/lesson/cs-pointers"
                  className="px-4 py-2 rounded-xl bg-primary/20 text-primary border border-primary/30 text-xs font-extrabold hover:bg-primary hover:text-background transition-colors"
                >
                  Start Quest
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Unit Boss Battle (5 cols) */}
        {activeBoss && (
          <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-secondary/40 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <Swords className="w-5 h-5 text-secondary" />
                <span>Upcoming Unit Boss</span>
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-secondary/20 text-secondary">
                {activeBoss.difficulty}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border text-center space-y-3">
              <span className="text-4xl">{activeBoss.avatar}</span>
              <div>
                <h4 className="font-extrabold text-sm text-foreground">{activeBoss.name}</h4>
                <p className="text-[10px] text-muted-foreground">{activeBoss.title}</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-muted-foreground">Boss Health</span>
                  <span className="text-secondary">{activeBoss.hp} / {activeBoss.maxHp} HP</span>
                </div>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden p-0.5 border border-border">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-accent rounded-full transition-all"
                    style={{ width: `${(activeBoss.hp / activeBoss.maxHp) * 100}%` }}
                  />
                </div>
              </div>

              <Link
                href="/boss-battles"
                className="w-full py-2.5 rounded-xl bg-secondary text-background font-black text-xs shadow-glow-pink hover:scale-105 transition-transform block"
              >
                Fight Unit Boss
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
