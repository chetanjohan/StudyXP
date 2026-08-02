"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Coins,
  Backpack,
  Volume2,
  VolumeX,
  Palette,
  Sparkles,
  Zap,
  Search,
  Bot,
} from "lucide-react";
import { useGameStore, ThemeType } from "@/store/useGameStore";
import { MOCK_AI_MENTOR_MODES } from "@/data/mockData";
import { useState } from "react";

const THEMES: Array<{ id: ThemeType; label: string; icon: string }> = [
  { id: "cyberpunk", label: "Cyberpunk", icon: "⚡" },
  { id: "library", label: "Ancient Library", icon: "📜" },
  { id: "space", label: "Space Academy", icon: "🌌" },
  { id: "wizard", label: "Wizard Tower", icon: "🔮" },
  { id: "hacker", label: "Hacker Base", icon: "💻" },
];

export default function Navbar() {
  const pathname = usePathname();
  const {
    username,
    avatar,
    level,
    rankTitle,
    currentXP,
    nextLevelXP,
    coins,
    streakDays,
    currentTheme,
    setTheme,
    soundEnabled,
    toggleSound,
    inventory,
    activeBuffs,
    toggleSearch,
    selectedAIModeId,
    setAIMode,
  } = useGameStore();

  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showAIMenu, setShowAIMenu] = useState(false);

  if (pathname === "/") return null;

  const xpPercentage = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));
  const totalItems = inventory.reduce((sum, item) => sum + item.count, 0);
  const currentAIMode = MOCK_AI_MENTOR_MODES.find((m) => m.id === selectedAIModeId) || MOCK_AI_MENTOR_MODES[0];

  return (
    <header className="h-16 sticky top-0 bg-card/60 backdrop-blur-xl border-b border-border px-6 flex items-center justify-between z-30">
      {/* Left: User Profile & Global Search */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{avatar}</span>
          <div>
            <h2 className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
              {username}
              <span className="text-[9px] px-2 py-0.2 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold">
                {rankTitle}
              </span>
            </h2>
            <p className="text-[10px] text-muted-foreground">LVL {level} Scholar</p>
          </div>
        </div>

        {/* Global Search Trigger Button */}
        <button
          onClick={toggleSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/40 border border-border/60 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
        >
          <Search className="w-3.5 h-3.5 text-primary" />
          <span className="hidden sm:inline">Search StudyXP...</span>
          <kbd className="hidden sm:inline text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">⌘K</kbd>
        </button>
      </div>

      {/* Center: XP Bar */}
      <div className="flex-1 max-w-xs mx-4 hidden md:flex items-center gap-3">
        <div className="text-xs font-extrabold text-primary flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 fill-primary animate-pulse" />
          <span>LVL {level}</span>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center text-[9px] font-extrabold text-muted-foreground mb-1">
            <span>XP</span>
            <span>{currentXP}/{nextLevelXP}</span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden p-0.5 border border-border/50">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-500 xp-bar-glow shadow-glow"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Right: AI Mode Selector, Themes & Badges */}
      <div className="flex items-center gap-2.5">
        {/* AI Mentor Mode Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAIMenu(!showAIMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/30 text-primary text-xs font-extrabold hover:bg-primary hover:text-background transition-all shadow-glow"
          >
            <span>{currentAIMode.avatar}</span>
            <span className="hidden lg:inline">{currentAIMode.name}</span>
          </button>

          {showAIMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-2xl p-2 z-50 space-y-1">
              <p className="text-[9px] font-extrabold text-muted-foreground uppercase px-2 py-1">
                Select AI Mentor Personality
              </p>
              {MOCK_AI_MENTOR_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setAIMode(mode.id);
                    setShowAIMenu(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                    selectedAIModeId === mode.id
                      ? "bg-primary/20 text-primary font-extrabold border border-primary/30"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <span className="text-lg">{mode.avatar}</span>
                  <div>
                    <p className="font-bold text-foreground">{mode.name}</p>
                    <p className="text-[9px] text-muted-foreground">{mode.badge}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Learning Streak */}
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-extrabold">
          <Flame className="w-3.5 h-3.5 fill-orange-500 animate-bounce" />
          <span>{streakDays}d</span>
        </div>

        {/* Coins */}
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold">
          <Coins className="w-3.5 h-3.5 fill-amber-400" />
          <span>{coins}</span>
        </div>

        {/* Inventory */}
        <Link
          href="/inventory"
          className="relative p-2 rounded-xl bg-muted/40 border border-border/60 text-muted-foreground hover:text-foreground transition-all"
        >
          <Backpack className="w-4 h-4" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-background font-extrabold text-[9px] flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Theme Picker */}
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="p-2 rounded-xl bg-muted/40 border border-border/60 text-muted-foreground hover:text-foreground transition-all"
          >
            <Palette className="w-4 h-4 text-primary" />
          </button>

          {showThemeMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-2xl shadow-2xl p-2 z-50 space-y-1">
              <p className="text-[9px] font-extrabold text-muted-foreground uppercase px-2 py-1">
                Select Theme
              </p>
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id);
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    currentTheme === theme.id
                      ? "bg-primary/20 text-primary font-bold border border-primary/30"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <span>{theme.icon}</span>
                  <span>{theme.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sound */}
        <button
          onClick={toggleSound}
          className="p-2 rounded-xl bg-muted/40 border border-border/60 text-muted-foreground hover:text-foreground transition-all"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>
    </header>
  );
}
