"use client";

import { useState } from "react";
import { Users, Swords, MessageSquare, Send, Sparkles, Trophy, Shield, Zap } from "lucide-react";
import { MOCK_GUILD_MEMBERS } from "@/data/mockData";

export default function GuildPage() {
  const [chatInput, setChatInput] = useState("");
  const [guildChat, setGuildChat] = useState([
    { sender: "NovaCoder", text: "Hey squad! Who's ready for today's Deadlock Titan raid?", time: "10:14 AM" },
    { sender: "AlgoMaster", text: "I've got my Double XP scroll equipped!", time: "10:15 AM" },
    { sender: "PixelHero (You)", text: "Count me in! Just unlocked Pointers in CS tree.", time: "10:16 AM" },
  ]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setGuildChat((prev) => [
      ...prev,
      { sender: "PixelHero (You)", text: chatInput, time: "Just now" },
    ]);
    setChatInput("");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            <span>Cyber Scholars Guild</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Team up in study parties, conquer weekly raid bosses, and complete shared guild quests.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/20 text-primary border border-primary/30 font-extrabold text-sm shadow-glow">
          <Shield className="w-4 h-4" />
          <span>Guild Rank #4 • Level 12 Guild</span>
        </div>
      </div>

      {/* Weekly Raid Progress Card */}
      <div className="glass-card p-6 rounded-3xl border border-secondary/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center text-3xl shadow-glow-pink">
              🗿
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30">
                Active Guild Raid Boss
              </span>
              <h3 className="text-xl font-black text-foreground mt-1">Deadlock Titan</h3>
              <p className="text-xs text-muted-foreground">Combined Guild Damage: 1,420 / 2,000 HP</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground font-bold">Raid Ends In</p>
            <p className="text-lg font-black text-secondary">2 Days 14 Hours</p>
          </div>
        </div>

        <div className="w-full h-4 bg-muted rounded-full overflow-hidden p-0.5 border border-border">
          <div className="h-full bg-gradient-to-r from-rose-500 via-secondary to-purple-600 rounded-full xp-bar-glow shadow-glow-pink" style={{ width: "71%" }} />
        </div>
      </div>

      {/* Grid: Guild Members & Live Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Guild Party Members (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-border space-y-4">
          <h3 className="font-extrabold text-base flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Study Party Members ({MOCK_GUILD_MEMBERS.length})</span>
          </h3>

          <div className="space-y-3">
            {MOCK_GUILD_MEMBERS.map((member, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-card border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{member.avatar}</span>
                  <div>
                    <h4 className="font-bold text-xs text-foreground flex items-center gap-1.5">
                      {member.name}
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-bold">{member.role}</span>
                    </h4>
                    <p className="text-[10px] text-muted-foreground">Level {member.level} Scholar</p>
                  </div>
                </div>

                <span className={`w-2.5 h-2.5 rounded-full ${member.status === "online" ? "bg-emerald-400 animate-pulse" : member.status === "in-raid" ? "bg-secondary animate-bounce" : "bg-muted-foreground"}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Guild Chat Simulator (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-border flex flex-col h-96">
          <h3 className="font-extrabold text-base flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span>Guild Live Chat</span>
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
            {guildChat.map((msg, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-muted/40 border border-border/50 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-extrabold text-primary">{msg.sender}</span>
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-foreground/90 font-medium">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Send message to guild..."
              className="flex-1 bg-muted/40 px-4 py-2.5 rounded-xl border border-border text-xs outline-none focus:border-primary"
            />
            <button type="submit" className="px-4 py-2.5 rounded-xl bg-primary text-background font-extrabold text-xs shadow-glow">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
