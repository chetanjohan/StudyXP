"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Swords,
  ShieldAlert,
  Zap,
  Coins,
  Trophy,
  Heart,
  Skull,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { Boss } from "@/data/mockData";
import confetti from "canvas-confetti";

export default function BossBattlesPage() {
  const { bosses, damageBoss } = useGameStore();

  const [activeBoss, setActiveBoss] = useState<Boss | null>(bosses[0]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>(["Battle commenced! Attack the dragon by answering tactical questions."]);
  const [victoryModal, setVictoryModal] = useState<{ show: boolean; xp: number; coins: number } | null>(null);

  if (!activeBoss) return null;

  const currentQuestion = activeBoss.questions[currentQuestionIdx];

  const handleAttack = (optIdx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(optIdx);

    const isCorrect = optIdx === currentQuestion.correctIndex;

    if (isCorrect) {
      const result = damageBoss(activeBoss.id, currentQuestion.damage);
      setBattleLog((prev) => [
        `CRITICAL HIT! You dealt ${currentQuestion.damage} damage to ${activeBoss.name}!`,
        ...prev,
      ]);

      if (result.defeated) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        setVictoryModal({ show: true, xp: result.rewardXP, coins: result.rewardCoins });
      }
    } else {
      setBattleLog((prev) => [
        `MISSED! ${activeBoss.name} retaliates with counter damage!`,
        ...prev,
      ]);
    }
  };

  const handleNextTurn = () => {
    setSelectedOpt(null);
    if (currentQuestionIdx < activeBoss.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setCurrentQuestionIdx(0);
    }
  };

  const hpPercentage = Math.round((activeBoss.hp / activeBoss.maxHp) * 100);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <Swords className="w-8 h-8 text-secondary" />
          <span>Boss Battle Arena</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Conquer chapter boss monsters to earn legendary loot, gold, and massive XP boosts.
        </p>
      </div>

      {/* Boss Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bosses.map((boss) => {
          const isSelected = activeBoss.id === boss.id;
          const isDefeated = boss.hp === 0;

          return (
            <button
              key={boss.id}
              onClick={() => {
                setActiveBoss(boss);
                setCurrentQuestionIdx(0);
                setSelectedOpt(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-secondary/20 border-secondary shadow-glow-pink"
                  : "bg-card border-border hover:border-secondary/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{boss.avatar}</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  {boss.difficulty}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-foreground truncate">{boss.name}</h3>
              <p className="text-[11px] text-muted-foreground">HP: {boss.hp} / {boss.maxHp}</p>
            </button>
          );
        })}
      </div>

      {/* Active Battle Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Arena (7 cols): Boss HP Bar & Questions */}
        <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-secondary/40 space-y-6 relative overflow-hidden">
          {/* Boss Display Banner */}
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <span className="text-5xl animate-bounce">{activeBoss.avatar}</span>
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30">
                  {activeBoss.difficulty} Chapter Boss
                </span>
                <h2 className="text-2xl font-black text-foreground mt-1">{activeBoss.name}</h2>
                <p className="text-xs text-muted-foreground">{activeBoss.title}</p>
              </div>
            </div>

            <div className="text-right text-xs font-bold">
              <p className="text-primary flex items-center justify-end gap-1">
                <Zap className="w-3.5 h-3.5" /> +{activeBoss.rewardXP} XP
              </p>
              <p className="text-amber-400 flex items-center justify-end gap-1">
                <Coins className="w-3.5 h-3.5" /> +{activeBoss.rewardCoins} Coins
              </p>
            </div>
          </div>

          {/* Boss Animated HP Bar */}
          <div>
            <div className="flex justify-between items-center text-xs font-extrabold mb-2">
              <span className="text-secondary flex items-center gap-1">
                <Heart className="w-4 h-4 fill-secondary" /> BOSS HEALTH
              </span>
              <span>
                {activeBoss.hp} / {activeBoss.maxHp} HP ({hpPercentage}%)
              </span>
            </div>
            <div className="w-full h-5 bg-muted rounded-full overflow-hidden p-1 border border-border">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: `${hpPercentage}%` }}
                transition={{ type: "spring", stiffness: 100 }}
                className="h-full bg-gradient-to-r from-rose-500 via-secondary to-purple-600 rounded-full xp-bar-glow shadow-glow-pink"
              />
            </div>
          </div>

          {/* Tactical Quiz Question */}
          {activeBoss.hp > 0 ? (
            <div className="space-y-4 pt-2">
              <h3 className="font-extrabold text-base leading-snug">{currentQuestion.question}</h3>

              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOpt === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;

                  let style = "bg-card border-border hover:border-secondary/50 text-foreground";
                  if (selectedOpt !== null) {
                    if (isCorrect) style = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                    else if (isSelected) style = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedOpt !== null}
                      onClick={() => handleAttack(idx)}
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
                  onClick={handleNextTurn}
                  className="w-full py-3 rounded-xl bg-secondary text-background font-extrabold text-xs shadow-glow-pink hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <span>Continue Attack Turn</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-center font-extrabold text-base">
              🎉 BOSS DEFEATED! Chapter Cleared!
            </div>
          )}
        </div>

        {/* Right Panel (5 cols): Battle Log & Loot Drop */}
        <div className="lg:col-span-5 space-y-6">
          {/* Loot Card */}
          <div className="glass-card p-6 rounded-3xl border border-amber-500/40">
            <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" /> Boss Loot Drop Preview
            </h3>
            <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                🎁
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{activeBoss.lootItem}</p>
                <p className="text-[10px] text-muted-foreground">Rare RPG Power-up item</p>
              </div>
            </div>
          </div>

          {/* Battle Console Log */}
          <div className="glass-card p-6 rounded-3xl border border-border h-64 flex flex-col">
            <h3 className="font-bold text-xs text-muted-foreground uppercase mb-3">Battle Combat Log</h3>
            <div className="flex-1 overflow-y-auto space-y-2 text-xs font-mono">
              {battleLog.map((log, i) => (
                <p key={i} className="p-2 rounded-lg bg-muted/40 text-foreground/90 border border-border/40">
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Victory Modal */}
      {victoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-card border-2 border-secondary rounded-3xl p-8 shadow-glow-pink text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-secondary flex items-center justify-center text-4xl shadow-glow-pink">
              👑
            </div>
            <h2 className="text-3xl font-black text-secondary">VICTORY CONQUERED!</h2>
            <p className="text-xs text-muted-foreground">You defeated {activeBoss.name}!</p>
            <div className="flex justify-center gap-4">
              <span className="text-primary font-extrabold text-base">+{victoryModal.xp} XP</span>
              <span className="text-amber-400 font-extrabold text-base">+{victoryModal.coins} Coins</span>
            </div>
            <button
              onClick={() => setVictoryModal(null)}
              className="w-full py-3 rounded-xl bg-secondary text-background font-extrabold text-xs shadow-glow-pink"
            >
              Collect Boss Loot
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
