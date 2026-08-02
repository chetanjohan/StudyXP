"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Lock, Sparkles, Zap, ArrowDown, Clock } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";

export default function RoadmapPage() {
  const { roadmapNodes, currentXP } = useGameStore();

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <MapPin className="w-8 h-8 text-primary" />
          <span>AI Career Path Roadmap</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Automated AI curriculum roadmap mapping your journey from Python fundamentals to Production AI inference deployment.
        </p>
      </div>

      {/* Node Path Timeline */}
      <div className="space-y-6 relative">
        {roadmapNodes.map((node, index) => {
          const isUnlocked = node.status === "unlocked";
          const isCurrent = node.status === "current";
          const isLocked = node.status === "locked";

          return (
            <div key={node.id} className="relative flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-full p-6 rounded-3xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                  isCurrent
                    ? "bg-card border-2 border-primary shadow-glow-cyan"
                    : isUnlocked
                    ? "bg-card border-emerald-500/40"
                    : "bg-muted/20 border-border/40 opacity-60"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                      isUnlocked
                        ? "bg-emerald-500 text-background"
                        : isCurrent
                        ? "bg-primary text-background shadow-glow"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-foreground">{node.title}</h3>
                      <span
                        className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          isUnlocked
                            ? "bg-emerald-500/20 text-emerald-400"
                            : isCurrent
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">{node.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold shrink-0">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {node.estimatedHours} hrs
                  </span>
                  <span className="text-primary flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> {node.xpRequired} XP
                  </span>

                  {isUnlocked && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {isCurrent && <Sparkles className="w-5 h-5 text-primary animate-pulse" />}
                  {isLocked && <Lock className="w-5 h-5 text-muted-foreground" />}
                </div>
              </motion.div>

              {index < roadmapNodes.length - 1 && (
                <div className="my-2 flex flex-col items-center">
                  <ArrowDown className="w-5 h-5 text-primary/40 animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
