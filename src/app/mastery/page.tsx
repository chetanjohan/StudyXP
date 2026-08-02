"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const XP_PROGRESSION_DATA = [
  { day: "Mon", xp: 450 },
  { day: "Tue", xp: 680 },
  { day: "Wed", xp: 520 },
  { day: "Thu", xp: 950 },
  { day: "Fri", xp: 1100 },
  { day: "Sat", xp: 870 },
  { day: "Sun", xp: 1350 },
];

const ACCURACY_BY_SUBJECT = [
  { subject: "CS", accuracy: 92 },
  { subject: "OS", accuracy: 68 },
  { subject: "Math", accuracy: 88 },
  { subject: "Networking", accuracy: 74 },
  { subject: "ML", accuracy: 96 },
];

export default function MasteryDashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" />
          <span>Mastery Analytics Dashboard</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Deep cognitive insights into your study habits, retention rate, and subject mastery.
        </p>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase">Study Time</span>
            <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-foreground">18.4 hrs</p>
          <p className="text-xs text-primary font-bold mt-1">+2.4 hrs vs last week</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase">Overall Accuracy</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-400">84.2%</p>
          <p className="text-xs text-emerald-400 font-bold mt-1">Top 5% among Scholars</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase">Quizzes Solved</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-400">142</p>
          <p className="text-xs text-amber-400 font-bold mt-1">98% Completion rate</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase">Skill Nodes</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-purple-400">12 / 18</p>
          <p className="text-xs text-purple-400 font-bold mt-1">3 Available to unlock</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Chart (7 cols): Weekly XP Progression */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Weekly XP Progression</h3>
              <p className="text-xs text-muted-foreground">Daily XP earned over the past 7 days</p>
            </div>
            <span className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-primary/20 text-primary border border-primary/30">
              5,920 Total XP
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={XP_PROGRESSION_DATA}>
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111726", borderColor: "rgba(0, 240, 255, 0.3)", borderRadius: "12px", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="xp" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#xpGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart (5 cols): Subject Accuracy Breakdown */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Accuracy By Subject</h3>
              <p className="text-xs text-muted-foreground">Quiz accuracy breakdown percentage</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ACCURACY_BY_SUBJECT}>
                <XAxis dataKey="subject" stroke="#6b7280" fontSize={12} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111726", borderColor: "rgba(0, 240, 255, 0.3)", borderRadius: "12px", fontSize: "12px" }}
                />
                <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
                  {ACCURACY_BY_SUBJECT.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.accuracy < 75 ? "#f59e0b" : "var(--primary)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Topic Mastery Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Topics */}
        <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5">
          <h3 className="font-bold text-base text-emerald-400 flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5" /> Strong Mastery Topics (90%+)
          </h3>
          <div className="space-y-3">
            {[
              { topic: "Neural Networks & Backpropagation", score: "96% Accuracy" },
              { topic: "Discrete Math & Truth Tables", score: "92% Accuracy" },
              { topic: "C Array Bounds & Memory Layout", score: "90% Accuracy" },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-card border border-border flex justify-between items-center text-xs font-semibold">
                <span>{item.topic}</span>
                <span className="text-emerald-400 font-extrabold">{item.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics */}
        <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-amber-500/5">
          <h3 className="font-bold text-base text-amber-400 flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" /> Topics Requiring Revision
          </h3>
          <div className="space-y-3">
            {[
              { topic: "Pointer Arithmetic & Heap Leaks", score: "55% Accuracy" },
              { topic: "OS Page Table Translation", score: "68% Accuracy" },
              { topic: "TCP 3-Way Handshake Flags", score: "74% Accuracy" },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-card border border-border flex justify-between items-center text-xs font-semibold">
                <span>{item.topic}</span>
                <span className="text-amber-400 font-extrabold">{item.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
