"use client";

import { Settings, Palette, Volume2, VolumeX, Shield, User, Sparkles } from "lucide-react";
import { useGameStore, ThemeType } from "@/store/useGameStore";

const THEMES: Array<{ id: ThemeType; label: string; icon: string; desc: string }> = [
  { id: "cyberpunk", label: "Cyberpunk", icon: "⚡", desc: "Neon cyan and pink futuristic grid aesthetic" },
  { id: "library", label: "Ancient Library", icon: "📜", desc: "Mahogany, amber, and golden parchment RPG vibes" },
  { id: "space", label: "Space Academy", icon: "🌌", desc: "Deep indigo, violet, cosmic void gradients" },
  { id: "wizard", label: "Wizard Tower", icon: "🔮", desc: "Arcane purple and emerald magic runes" },
  { id: "hacker", label: "Hacker Base", icon: "💻", desc: "Matrix terminal neon green phosphor theme" },
];

export default function SettingsPage() {
  const { currentTheme, setTheme, soundEnabled, toggleSound, username, rankTitle, level } = useGameStore();

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary" />
          <span>Platform Settings & Themes</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your RPG visual theme, audio effects, and player profile configuration.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="glass-card p-6 rounded-3xl border border-border flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-3xl shadow-glow">
          🚀
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-foreground">{username}</h2>
          <p className="text-xs text-primary font-bold">{rankTitle} • Level {level}</p>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="glass-card p-6 rounded-3xl border border-border space-y-4">
        <h3 className="font-extrabold text-base flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <span>Visual Theme Picker</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;

            return (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  isSelected
                    ? "bg-primary/15 border-primary shadow-glow-cyan text-primary"
                    : "bg-card border-border text-foreground hover:border-primary/40"
                }`}
              >
                <span className="text-3xl">{theme.icon}</span>
                <div>
                  <h4 className="font-extrabold text-sm">{theme.label}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{theme.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Audio & Sound Preferences */}
      <div className="glass-card p-6 rounded-3xl border border-border flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base flex items-center gap-2">
            {soundEnabled ? <Volume2 className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
            <span>Sound Effects & Audio Feedback</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Play celebratory chimes on XP gain, level ups, and quiz answer verification.
          </p>
        </div>

        <button
          onClick={toggleSound}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
            soundEnabled ? "bg-primary text-background shadow-glow" : "bg-muted text-muted-foreground"
          }`}
        >
          {soundEnabled ? "Audio On" : "Audio Muted"}
        </button>
      </div>
    </div>
  );
}
