"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, UserPlus, User, Shield, Wand2, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username) return;

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            avatar: "🚀",
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("Character Created! Entering Adventure World...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1200);
      }
    } else {
      setSuccessMsg("Character Registered (Demo Mode)! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-background relative overflow-hidden">
      {/* LEFT SIDE: Character Creation Hero Showcase (7 cols) */}
      <div className="lg:col-span-7 relative p-8 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border/40 bg-gradient-to-br from-background via-background/95 to-secondary/10 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Brand Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-secondary via-accent to-primary flex items-center justify-center shadow-glow">
            <Sparkles className="w-6 h-6 text-background" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-wider text-foreground">
              STUDY<span className="text-secondary">XP</span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-semibold">Character Creation</p>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 my-12 space-y-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary text-xs font-black uppercase tracking-wider border border-secondary/30 shadow-glow-pink">
            <Shield className="w-4 h-4" /> Start as a Level 1 Scholar
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
            Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-primary">Character.</span>
          </h2>

          <p className="text-sm text-muted-foreground font-medium leading-relaxed">
            Begin your gamified study journey. Earn XP, unlock skill tree nodes, defeat unit bosses, and transform your real-world syllabus into career readiness.
          </p>

          {/* Perks Grid */}
          <div className="space-y-3 pt-2">
            {[
              "Free dynamic syllabus PDF adventure generator",
              "Interactive CS Skill Tree with unlockable nodes",
              "Multiplayer Study Party with Realtime WebSockets",
              "6 AI Mentor Personalities for continuous revision",
            ].map((perk, i) => (
              <div key={i} className="flex items-center gap-3 text-xs font-extrabold text-foreground/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-muted-foreground font-semibold border-t border-border/40 pt-4">
          Join Scholars Building Their RPG Learning Path
        </div>
      </div>

      {/* RIGHT SIDE: Clean Glassmorphic Signup Card (5 cols) */}
      <div className="lg:col-span-5 p-6 sm:p-12 lg:p-16 flex items-center justify-center relative bg-card/30 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-card p-8 rounded-3xl border-2 border-secondary/40 shadow-glow-pink space-y-6 relative z-10"
        >
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black tracking-tight text-foreground">Character Registration</h3>
            <p className="text-xs text-muted-foreground">
              Choose your player name and email to initialize your profile.
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

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-[10px] font-extrabold uppercase text-muted-foreground block mb-1">
                Player Username
              </label>
              <div className="flex items-center gap-2 bg-muted/40 px-3.5 py-2.5 rounded-xl border border-border focus-within:border-secondary">
                <User className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="PixelHero"
                  className="flex-1 bg-transparent text-xs text-foreground outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase text-muted-foreground block mb-1">
                Character Email
              </label>
              <div className="flex items-center gap-2 bg-muted/40 px-3.5 py-2.5 rounded-xl border border-border focus-within:border-secondary">
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
              <div className="flex items-center gap-2 bg-muted/40 px-3.5 py-2.5 rounded-xl border border-border focus-within:border-secondary">
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
              className="w-full py-4 rounded-xl bg-gradient-to-r from-secondary via-accent to-primary text-background font-black text-xs shadow-glow-pink hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? "Creating Character..." : "Create Character"}</span>
            </button>
          </form>

          {/* Login Link */}
          <div className="pt-2 text-center text-xs text-muted-foreground">
            Already have a character?{" "}
            <Link href="/login" className="text-secondary font-black hover:underline flex items-center justify-center gap-1 mt-1">
              <span>Sign In to Existing Character</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
