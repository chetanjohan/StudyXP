"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  HardDrive,
  Binary,
  Network,
  BrainCircuit,
  Trophy,
  Zap,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { MOCK_SUBJECTS, Subject } from "@/data/mockData";

const ICON_MAP: Record<string, any> = {
  Cpu,
  HardDrive,
  Binary,
  Network,
  BrainCircuit,
};

export default function SubjectsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight">Choose Your Quest Subject</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Select a domain to unlock lessons, conquer quizzes, and earn mastery XP.
        </p>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SUBJECTS.map((subject, index) => {
          const Icon = ICON_MAP[subject.iconName] || Cpu;

          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card glass-card-hover p-6 rounded-3xl border border-border flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Top Accent Gradient Pill */}
              <div className={`h-2.5 w-full bg-gradient-to-r ${subject.color} absolute top-0 left-0`} />

              <div>
                <div className="flex items-center justify-between mb-4 mt-2">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${subject.color} flex items-center justify-center text-white shadow-glow`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                      subject.difficulty === "Legendary"
                        ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                        : subject.difficulty === "Hard"
                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                        : "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                    }`}
                  >
                    {subject.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {subject.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  {subject.description}
                </p>

                {/* Subject Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-muted/40 border border-border mb-6 text-center text-xs">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Level</p>
                    <p className="font-extrabold text-foreground">{subject.level}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Completion</p>
                    <p className="font-extrabold text-primary">{subject.completion}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Earned XP</p>
                    <p className="font-extrabold text-amber-400">{subject.xp}</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar & CTA */}
              <div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4 border border-border/50">
                  <div
                    className={`h-full bg-gradient-to-r ${subject.color}`}
                    style={{ width: `${subject.completion}%` }}
                  />
                </div>

                <Link
                  href="/lesson/pointers-memory"
                  className="w-full py-3 rounded-xl bg-primary/15 text-primary border border-primary/30 font-bold text-xs hover:bg-primary hover:text-background transition-all flex items-center justify-center gap-2 group-hover:shadow-glow"
                >
                  <span>Start Subject Lessons</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
