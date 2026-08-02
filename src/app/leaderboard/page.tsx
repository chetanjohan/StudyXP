"use client";

import { Flame, Trophy, Award, Sparkles } from "lucide-react";
import { MOCK_LEADERBOARD } from "@/data/mockData";

export default function LeaderboardPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <Flame className="w-8 h-8 text-orange-500" />
          <span>Global & Friends Leaderboard</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Compete against fellow scholars. Top 3 scholars at weekly reset earn rare badges!
        </p>
      </div>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-3 gap-4 text-center items-end py-6">
        {/* 2nd place */}
        <div className="glass-card p-6 rounded-3xl border border-border space-y-3">
          <span className="text-4xl">🥈</span>
          <p className="font-extrabold text-sm text-foreground">{MOCK_LEADERBOARD[1].name}</p>
          <p className="text-xs text-primary font-bold">{MOCK_LEADERBOARD[1].weeklyXP} XP</p>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground">
            Rank #2
          </span>
        </div>

        {/* 1st place */}
        <div className="glass-card p-8 rounded-3xl border-2 border-amber-400 shadow-glow-gold space-y-3 bg-amber-500/10">
          <span className="text-5xl">👑</span>
          <p className="font-black text-lg text-foreground">{MOCK_LEADERBOARD[0].name}</p>
          <p className="text-sm text-amber-400 font-extrabold">{MOCK_LEADERBOARD[0].weeklyXP} XP</p>
          <span className="inline-block text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-500 text-background">
            Champion #1
          </span>
        </div>

        {/* 3rd place */}
        <div className="glass-card p-6 rounded-3xl border border-border space-y-3">
          <span className="text-4xl">🥉</span>
          <p className="font-extrabold text-sm text-foreground">{MOCK_LEADERBOARD[2].name}</p>
          <p className="text-xs text-primary font-bold">{MOCK_LEADERBOARD[2].weeklyXP} XP</p>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground">
            Rank #3
          </span>
        </div>
      </div>

      {/* Full Leaderboard List */}
      <div className="glass-card p-6 rounded-3xl border border-border space-y-3">
        {MOCK_LEADERBOARD.map((user) => (
          <div
            key={user.rank}
            className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
              user.isUser
                ? "bg-primary/20 border-primary/50 text-primary shadow-glow-cyan"
                : "bg-card border-border text-foreground hover:bg-muted/40"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 font-black text-base text-muted-foreground text-center">#{user.rank}</span>
              <span className="text-2xl">{user.avatar}</span>
              <div>
                <h4 className="font-extrabold text-sm flex items-center gap-2">
                  {user.name}
                  {user.isUser && <span className="text-[10px] px-2 py-0.5 rounded bg-primary text-background font-extrabold">YOU</span>}
                </h4>
                <p className="text-xs text-muted-foreground">Rank: {user.title} • Level {user.level}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-black text-base text-primary">{user.weeklyXP} XP</p>
              <p className="text-[10px] text-muted-foreground">Weekly Score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
