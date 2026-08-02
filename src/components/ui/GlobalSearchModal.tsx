"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X, BookOpen, Swords, GitBranch, Trophy, ArrowRight } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { MOCK_SUBJECTS, MOCK_LESSONS, MOCK_BOSSES, MOCK_SKILL_NODES, MOCK_ACHIEVEMENTS } from "@/data/mockData";

export function GlobalSearchModal() {
  const { searchOpen, setSearchOpen } = useGameStore();
  const [query, setQuery] = useState("");

  if (!searchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredSubjects = q ? MOCK_SUBJECTS.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) : [];
  const filteredLessons = q ? Object.values(MOCK_LESSONS).filter((l) => l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q)) : [];
  const filteredBosses = q ? MOCK_BOSSES.filter((b) => b.name.toLowerCase().includes(q) || b.title.toLowerCase().includes(q)) : [];
  const filteredNodes = q ? MOCK_SKILL_NODES.filter((n) => n.label.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)) : [];
  const filteredAch = q ? MOCK_ACHIEVEMENTS.filter((a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)) : [];

  const totalResults = filteredSubjects.length + filteredLessons.length + filteredBosses.length + filteredNodes.length + filteredAch.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-background/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-card border-2 border-primary/50 rounded-3xl shadow-glow-cyan overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 border-b border-border flex items-center gap-3 bg-muted/30">
          <Search className="w-5 h-5 text-primary" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, concepts, bosses, skill nodes, achievements..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button onClick={() => setSearchOpen(false)} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-xs text-muted-foreground">
              Type anything to search across StudyXP...
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="text-center py-8 text-xs text-muted-foreground">
              No RPG results found for "{query}".
            </div>
          )}

          {/* Lessons */}
          {filteredLessons.map((l) => (
            <Link
              key={l.id}
              href={`/lesson/${l.id}`}
              onClick={() => setSearchOpen(false)}
              className="p-3 rounded-2xl bg-muted/40 border border-border hover:border-primary/40 flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">{l.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{l.summary}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}

          {/* Bosses */}
          {filteredBosses.map((b) => (
            <Link
              key={b.id}
              href="/boss-battles"
              onClick={() => setSearchOpen(false)}
              className="p-3 rounded-2xl bg-muted/40 border border-border hover:border-secondary/40 flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3">
                <Swords className="w-5 h-5 text-secondary" />
                <div>
                  <h4 className="font-bold text-xs text-foreground group-hover:text-secondary transition-colors">{b.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{b.title}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}

          {/* Skill Nodes */}
          {filteredNodes.map((n) => (
            <Link
              key={n.id}
              href="/skill-tree"
              onClick={() => setSearchOpen(false)}
              className="p-3 rounded-2xl bg-muted/40 border border-border hover:border-amber-400 flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3">
                <GitBranch className="w-5 h-5 text-amber-400" />
                <div>
                  <h4 className="font-bold text-xs text-foreground group-hover:text-amber-400 transition-colors">{n.label}</h4>
                  <p className="text-[10px] text-muted-foreground">{n.description}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GlobalSearchModal;
