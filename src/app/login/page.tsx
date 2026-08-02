"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, LogIn, Chrome, Swords, Network, Wand2, Shield, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("Character Authenticated! Entering Adventure World...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } else {
      setSuccessMsg("Demo Mode Login Active. Entering World...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    if (supabase) {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-background relative overflow-hidden">
      {/* LEFT SIDE: RPG Hero Showcase (7 cols) */}
      <div className="lg:col-span-7 relative p-8 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border/40 bg-gradient-to-br from-background via-background/95 to-primary/10 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Brand Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center shadow-glow">
            <Sparkles className="w-6 h-6 text-background" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-wider text-foreground">
              STUDY<span className="text-primary">XP</span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-semibold">Syllabus RPG Engine</p>
          </div>
        </div>

        {/* Hero Tagline & Showcase Visuals */}
        <div className="relative z-10 my-12 space-y-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-wider border border-primary/30 shadow-glow-cyan">
            <Wand2 className="w-4 h-4" /> Next-Gen AI Gamified Learning
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
            Turn Every Syllabus into an <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Adventure.</span>
          </h2>

          <p className="text-sm text-muted-foreground font-medium leading-relaxed">
            Upload any course PDF syllabus. StudyXP automatically constructs an interactive Skill Tree, Quest System, Unit Boss Battles, Flashcards, and AI Mentors.
          </p>

          {/* Key Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md space-y-1.5 shadow-glow-cyan">
              <div className="flex items-center gap-2 text-primary font-black text-xs">
                <Network className="w-4 h-4" />
                <span>Dynamic Skill Trees</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Topics unlock progressively according to prerequisite relationships.</p>
            </div>

            <div className="p-4 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md space-y-1.5 shadow-glow-pink">
              <div className="flex items-center gap-2 text-secondary font-black text-xs">
                <Swords className="w-4 h-4" />
                <span>Unit Boss Battles</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Fight Unit Overlords combining concepts to unlock subsequent units.</p>
            </div>
          </div>
        </div>

        {/* Footer Footprint */}
        <div className="relative z-10 text-[11px] text-muted-foreground font-semibold flex items-center justify-between border-t border-border/40 pt-4">
          <span>Level Up Your Academic Career</span>
          <span className="text-primary">v2.0 Production Ready</span>
        </div>
      </div>

      {/* RIGHT SIDE: Clean Glassmorphic Auth Card (5 cols) */}
      <div className="lg:col-span-5 p-6 sm:p-12 lg:p-16 flex items-center justify-center relative bg-card/30 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-card p-8 rounded-3xl border-2 border-primary/40 shadow-glow-cyan space-y-6 relative z-10"
        >
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black tracking-tight text-foreground">Begin Your Journey</h3>
            <p className="text-xs text-muted-foreground">
              Sign in with your character credentials to enter your syllabus world.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold text-center">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold text-center">
              {successMsg}
            </div>
          )}

          {/* Continue with Google */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 rounded-xl bg-card border border-border text-foreground font-bold text-xs hover:border-primary hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2.5"
          >
            <Chrome className="w-4 h-4 text-primary" />
            <span>Continue with Google</span>
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-[10px] font-extrabold text-muted-foreground uppercase">OR EMAIL LOGIN</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-extrabold uppercase text-muted-foreground block mb-1">
                Character Email
              </label>
              <div className="flex items-center gap-2 bg-muted/40 px-3.5 py-2.5 rounded-xl border border-border focus-within:border-primary">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="scholar@studyxp.com"
                  className="flex-1 bg-transparent text-xs text-foreground outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase text-muted-foreground block mb-1">
                Password
              </label>
              <div className="flex items-center gap-2 bg-muted/40 px-3.5 py-2.5 rounded-xl border border-border focus-within:border-primary">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-xs text-foreground outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-background font-black text-xs shadow-glow hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? "Authenticating..." : "Begin Adventure"}</span>
            </button>
          </form>

          {/* Create Character Link */}
          <div className="pt-2 text-center text-xs text-muted-foreground">
            New to StudyXP?{" "}
            <Link href="/signup" className="text-primary font-black hover:underline flex items-center justify-center gap-1 mt-1">
              <span>Create Character</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
