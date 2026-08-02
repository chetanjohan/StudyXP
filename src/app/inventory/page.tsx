"use client";

import { motion } from "framer-motion";
import {
  Backpack,
  Sparkles,
  Zap,
  Snowflake,
  Gem,
  Compass,
  ShieldAlert,
  Coins,
  CheckCircle2,
} from "lucide-react";
import { useGameStore } from "@/store/useGameStore";

const ICON_MAP: Record<string, any> = {
  Sparkles,
  Zap,
  Snowflake,
  Gem,
  Compass,
  ShieldAlert,
};

export default function InventoryPage() {
  const { inventory, coins, buyItem, useItem, activeBuffs } = useGameStore();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Backpack className="w-8 h-8 text-primary" />
            <span>RPG Inventory & Item Shop</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Equip scrolls, potions, and crystals to boost your study performance and quiz speed.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-sm">
          <Coins className="w-4 h-4 fill-amber-400" />
          <span>{coins} Gold Coins</span>
        </div>
      </div>

      {/* Active Buffs Alert */}
      {(activeBuffs.doubleXP || activeBuffs.freezeTimer) && (
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/40 flex items-center gap-3 text-xs font-bold text-primary">
          <Sparkles className="w-5 h-5 animate-spin" />
          <span>Active Buffs: {activeBuffs.doubleXP ? "⚡ 2X XP Scroll (30s) " : ""}{activeBuffs.freezeTimer ? "❄️ Freeze Timer (15s)" : ""}</span>
        </div>
      )}

      {/* Inventory Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => {
          const Icon = ICON_MAP[item.icon] || Sparkles;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="glass-card glass-card-hover p-6 rounded-3xl border border-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-bold shadow-glow">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                      item.rarity === "Legendary"
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                        : item.rarity === "Epic"
                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                        : "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                    }`}
                  >
                    {item.rarity}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <span className="text-xs font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    Owned: {item.count}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                <div className="p-2.5 rounded-xl bg-muted/40 text-[11px] font-semibold text-primary mb-6 border border-border">
                  Effect: {item.effect}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  disabled={item.count <= 0}
                  onClick={() => useItem(item.id)}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-background font-extrabold text-xs shadow-glow disabled:opacity-40 hover:scale-105 transition-transform"
                >
                  Use Item ({item.count})
                </button>

                <button
                  disabled={coins < item.price}
                  onClick={() => buyItem(item.id)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 font-extrabold text-xs disabled:opacity-40 hover:bg-amber-500 hover:text-background transition-colors flex items-center gap-1"
                >
                  <Coins className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.price}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
