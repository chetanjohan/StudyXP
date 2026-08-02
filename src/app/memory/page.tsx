"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, AlertTriangle, CheckCircle2, RefreshCw, Clock } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";

export default function MemorySystemPage() {
  const { memoryTopics, addXP } = useGameStore();

  const handleReview = (topicId: string) => {
    addXP(100, "Spaced Repetition Review");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <Brain className="w-8 h-8 text-primary" />
          <span>Spaced Repetition Memory System</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Cognitive memory health tracking utilizing Ebbinghaus forgetting curve algorithms.
        </p>
      </div>

      {/* Memory Health Gauge */}
      <div className="glass-card p-8 rounded-3xl border border-primary/40 shadow-glow-cyan flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-primary/20 border-2 border-primary flex flex-col items-center justify-center text-primary shadow-glow">
            <span className="text-3xl font-black">82%</span>
            <span className="text-[9px] font-extrabold uppercase">HEALTH</span>
          </div>
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold">
              Strong Retention Status
            </span>
            <h2 className="text-2xl font-black mt-2">Overall Memory Retention</h2>
            <p className="text-xs text-muted-foreground">3 Topics Due for Review • 1 Overdue Topic</p>
          </div>
        </div>

        <button
          onClick={() => addXP(150, "Full Memory Deck Refresh")}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-background font-extrabold text-xs shadow-glow hover:scale-105 transition-transform flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Review Overdue Queue (+150 XP)</span>
        </button>
      </div>

      {/* Memory Spaced Repetition Queue */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold">Spaced Repetition Review Queue</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memoryTopics.map((topic) => (
            <div
              key={topic.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                topic.status === "Strong"
                  ? "bg-card border-emerald-500/40"
                  : topic.status === "Review Due"
                  ? "bg-amber-500/10 border-amber-500/40"
                  : "bg-rose-500/10 border-rose-500/40"
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">{topic.subject}</span>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      topic.status === "Strong"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : topic.status === "Review Due"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {topic.status}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-foreground mb-3">{topic.title}</h4>
              </div>

              <div>
                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground mb-1">
                  <span>RETENTION SCORE</span>
                  <span>{topic.retentionHealth}%</span>
                </div>

                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4 border border-border/40">
                  <div
                    className={`h-full ${
                      topic.retentionHealth > 75 ? "bg-emerald-400" : topic.retentionHealth > 50 ? "bg-amber-400" : "bg-rose-500"
                    }`}
                    style={{ width: `${topic.retentionHealth}%` }}
                  />
                </div>

                <button
                  onClick={() => handleReview(topic.id)}
                  className="w-full py-2.5 rounded-xl bg-card border border-border font-extrabold text-xs hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Review Topic Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
