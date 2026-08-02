"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Swords,
  GitBranch,
  Bot,
  Flame,
  ArrowRight,
  Shield,
  CheckCircle2,
  Play,
  Trophy,
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [demoXP, setDemoXP] = useState(650);
  const [demoLevel, setDemoLevel] = useState(3);
  const nextXP = demoLevel * 500;

  const handleGainDemoXP = () => {
    let newXP = demoXP + 250;
    if (newXP >= nextXP) {
      setDemoLevel(demoLevel + 1);
      setDemoXP(newXP - nextXP);
    } else {
      setDemoXP(newXP);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[600px] left-[-200px] w-[500px] h-[500px] bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[1200px] right-[-200px] w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center shadow-glow">
            <Sparkles className="w-6 h-6 text-background" />
          </div>
          <span className="font-extrabold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            STUDY<span className="text-foreground">XP</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-primary/15 text-primary border border-primary/30 font-extrabold text-sm hover:bg-primary hover:text-background transition-all shadow-glow flex items-center gap-2"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6 shadow-glow"
        >
          <Zap className="w-4 h-4 fill-primary" />
          <span>The Next Gen RPG Learning Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6"
        >
          Level Up Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            Knowledge.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Study with an AI mentor that turns boring textbooks into an RPG adventure. Complete daily quests, unlock skill trees, fight boss monsters, and earn real job-ready mastery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent text-background font-black text-lg tracking-wide shadow-glow hover:scale-105 transition-transform flex items-center justify-center gap-3 group"
          >
            <span>Start Adventure</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#interactive-demo"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-card border border-border text-foreground font-bold text-base hover:bg-muted/50 transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 text-primary fill-primary" />
            <span>Try Interactive Demo</span>
          </a>
        </motion.div>
      </section>

      {/* INTERACTIVE XP PROGRESS PREVIEW */}
      <section id="interactive-demo" className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="glass-card p-8 rounded-3xl border border-primary/40 shadow-glow-cyan text-center relative">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase mb-4">
            Live Preview Widget
          </div>
          <h3 className="text-2xl font-bold mb-2">Experience the XP Progression Loop</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Click the button below to complete a study micro-quest and watch your XP bar animate!
          </p>

          <div className="max-w-md mx-auto bg-card/80 p-6 rounded-2xl border border-border mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-extrabold text-primary flex items-center gap-1">
                <Trophy className="w-4 h-4" /> LVL {demoLevel} Scholar
              </span>
              <span className="text-xs font-bold text-muted-foreground">
                {demoXP} / {nextXP} XP
              </span>
            </div>

            <div className="w-full h-4 bg-muted rounded-full overflow-hidden p-0.5 border border-border/50">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full xp-bar-glow"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.round((demoXP / nextXP) * 100)}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </div>
          </div>

          <button
            onClick={handleGainDemoXP}
            className="px-6 py-3 rounded-xl bg-primary text-background font-extrabold text-sm shadow-glow hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
          >
            <Zap className="w-4 h-4 fill-background" />
            <span>Complete Quiz Task (+250 XP)</span>
          </button>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Gamified Learning Engineered for Focus
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            Combining cognitive science, space repetition, and AAA RPG mechanics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-border">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Mentor Companion</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Instant explanations, ELI5 modes, auto-generated flashcards, mind maps, and instant quiz creation.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-border">
            <div className="w-12 h-12 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center mb-4">
              <GitBranch className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Interactive Skill Trees</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Visualize your computer science journey with glowing node trees. Spend XP to unlock advanced concepts.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-border">
            <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent flex items-center justify-center mb-4">
              <Swords className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Epic Boss Battles</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Test your knowledge against Memory Leak Dragons and Recursion Hydras. Inflict damage with correct answers.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-6 py-16 relative z-10 border-t border-border/50">
        <h2 className="text-3xl font-extrabold text-center mb-12">How StudyXP Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Choose Subject", desc: "Select CS, OS, Math, Networking, or ML." },
            { step: "02", title: "Learn with AI", desc: "Read interactive summaries & ask the AI mentor." },
            { step: "03", title: "Solve Quests", desc: "Take timed quizzes and earn XP & gold coins." },
            { step: "04", title: "Slay Bosses", desc: "Conquer chapter bosses to reach Job Holder rank!" },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-card border border-border relative">
              <span className="text-3xl font-black text-primary/40 mb-2 block">{item.step}</span>
              <h4 className="font-bold text-lg mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <p>© 2026 StudyXP. Designed for the Future of Gamified Education.</p>
      </footer>
    </div>
  );
}
