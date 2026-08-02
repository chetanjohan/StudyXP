"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Lock, CheckCircle2, Sparkles, Terminal, Cpu, Shield, Globe, Database, ArrowRight, X } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { SkillNode } from "@/data/mockData";

export default function SkillTreePage() {
  const { skillNodes, unlockNode, currentXP, coins, activeAdventure } = useGameStore();
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const handleUnlock = (nodeId: string) => {
    const success = unlockNode(nodeId);
    if (success && selectedNode) {
      setSelectedNode({ ...selectedNode, status: "unlocked" });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Network className="w-8 h-8 text-primary" />
            <span>Interactive Skill Tree</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {activeAdventure
              ? `Generated from syllabus: ${activeAdventure.name} (${activeAdventure.courseName})`
              : "Unlock prerequisite skill nodes to increase your XP multipliers and battle power."}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-card px-4 py-2 rounded-2xl border border-border">
          <div className="text-xs">
            <span className="text-muted-foreground font-semibold">Available XP: </span>
            <span className="font-extrabold text-primary">{currentXP}</span>
          </div>
          <div className="text-xs">
            <span className="text-muted-foreground font-semibold">Coins: </span>
            <span className="font-extrabold text-amber-400">{coins}</span>
          </div>
        </div>
      </div>

      {/* Skill Node Grid Canvas */}
      <div className="glass-card p-8 rounded-3xl border border-border min-h-[500px] relative overflow-hidden flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full relative z-10">
          {skillNodes.map((node) => {
            const isUnlocked = node.status === "unlocked";
            const isAvailable = node.status === "available";
            const isLocked = node.status === "locked";

            return (
              <motion.div
                key={node.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedNode(node)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                  isUnlocked
                    ? "bg-primary/10 border-primary shadow-glow-cyan"
                    : isAvailable
                    ? "bg-secondary/10 border-secondary shadow-glow-pink animate-pulse"
                    : "bg-card/40 border-border/60 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isUnlocked
                        ? "bg-primary text-background"
                        : isAvailable
                        ? "bg-secondary text-background"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Terminal className="w-5 h-5" />
                  </div>

                  {isUnlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : isAvailable ? (
                    <Sparkles className="w-5 h-5 text-secondary" />
                  ) : (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>

                <div>
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {node.category}
                  </span>
                  <h3 className="font-extrabold text-sm text-foreground mt-1">{node.label}</h3>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5">{node.description}</p>
                </div>

                <div className="pt-2 border-t border-border/40 flex justify-between items-center text-[10px] font-bold">
                  {isUnlocked ? (
                    <span className="text-primary uppercase tracking-wider">Unlocked</span>
                  ) : (
                    <span className="text-muted-foreground">
                      Cost: <span className="text-primary">{node.costXP} XP</span> •{" "}
                      <span className="text-amber-400">{node.costCoins} C</span>
                    </span>
                  )}
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Drawer Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card p-6 rounded-3xl border-2 border-primary/50 max-w-md w-full space-y-5 relative shadow-glow"
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-primary/20 text-primary">
                    {selectedNode.category}
                  </span>
                  <h3 className="font-black text-lg text-foreground mt-0.5">{selectedNode.label}</h3>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">{selectedNode.description}</p>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-bold">XP Cost:</span>
                  <span className="font-extrabold text-primary">{selectedNode.costXP} XP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-bold">Coins Cost:</span>
                  <span className="font-extrabold text-amber-400">{selectedNode.costCoins} Coins</span>
                </div>
              </div>

              {selectedNode.status === "unlocked" ? (
                <div className="py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Node Fully Mastered
                </div>
              ) : (
                <button
                  onClick={() => handleUnlock(selectedNode.id)}
                  disabled={currentXP < selectedNode.costXP || coins < selectedNode.costCoins}
                  className="w-full py-3.5 rounded-xl bg-primary text-background font-black text-xs shadow-glow hover:scale-105 transition-transform disabled:opacity-50"
                >
                  Unlock Skill Node
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
