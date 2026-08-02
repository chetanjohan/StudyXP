"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Network,
  Swords,
  BarChart3,
  ShoppingBag,
  Trophy,
  Sparkles,
  Zap,
  Briefcase,
  Map,
  Code,
  Brain,
  Upload,
  Users,
  Calendar,
  Layers,
  Wand2,
  LogOut,
} from "lucide-react";
import { useGameStore } from "@/store/useGameStore";

const navItems = [
  { name: "Create Adventure", href: "/create-adventure", icon: Wand2, highlight: true },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Career Path", href: "/career", icon: Briefcase },
  { name: "AI Roadmap", href: "/roadmap", icon: Map },
  { name: "Interview Arena", href: "/interview", icon: Code },
  { name: "Memory Retention", href: "/memory", icon: Brain },
  { name: "Document Upload", href: "/upload", icon: Upload },
  { name: "Study Party", href: "/party", icon: Users },
  { name: "Weekly Quests", href: "/weekly-quests", icon: Calendar },
  { name: "Subjects", href: "/subjects", icon: BookOpen },
  { name: "Skill Tree", href: "/skill-tree", icon: Network },
  { name: "Boss Battles", href: "/boss-battles", icon: Swords },
  { name: "Mastery Analytics", href: "/mastery", icon: BarChart3 },
  { name: "Item Shop", href: "/inventory", icon: ShoppingBag },
  { name: "Achievements", href: "/achievements", icon: Trophy },
  { name: "Leaderboard", href: "/leaderboard", icon: Zap },
  { name: "Flashcards", href: "/flashcards", icon: Layers },
];

export function Sidebar() {
  const pathname = usePathname();
  const { rankTitle, level, username, logoutUser, activeAdventure } = useGameStore();

  return (
    <aside className="w-64 border-r border-border bg-card/60 backdrop-blur-xl flex flex-col h-screen sticky top-0 z-40 hidden md:flex">
      {/* Brand Header */}
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-background" />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-wider text-foreground">
              STUDY<span className="text-primary">XP</span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-semibold">Syllabus RPG Engine</p>
          </div>
        </Link>
      </div>

      {/* Active Syllabus Indicator */}
      {activeAdventure && (
        <div className="mx-4 mt-4 p-3 rounded-2xl bg-primary/10 border border-primary/30 text-xs">
          <p className="text-[9px] font-extrabold text-primary uppercase tracking-wider">Active Adventure</p>
          <p className="font-bold text-foreground truncate mt-0.5">{activeAdventure.name}</p>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                item.highlight
                  ? "bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-primary/40 text-primary font-black shadow-glow-cyan"
                  : isActive
                  ? "bg-primary/15 text-primary border border-primary/30 font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className={`w-4 h-4 ${item.highlight ? "text-primary animate-pulse" : isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Profile & Logout Controls */}
      <div className="p-4 border-t border-border/50 space-y-2">
        <div className="p-3 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
              L{level}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-foreground truncate">{username}</p>
              <p className="text-[10px] text-muted-foreground truncate">{rankTitle}</p>
            </div>
          </div>

          <button
            onClick={() => logoutUser()}
            title="Log Out"
            className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-rose-400 hover:border-rose-400/50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
