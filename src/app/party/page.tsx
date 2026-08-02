"use client";

import { useState, useEffect } from "react";
import { Users, Mic, MicOff, Swords, MessageSquare, Clock, CheckCircle2, XCircle, Sparkles, Play } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { createClient } from "@/lib/supabase/client";

interface PartyMsg {
  id?: string;
  sender_name: string;
  message_text: string;
  created_at?: string;
}

export default function StudyPartyPage() {
  const { partyMembers, togglePartyReady, partyActivityFeed, addXP } = useGameStore();

  const [isMicOn, setIsMicOn] = useState(false);
  const [studyTimerSeconds, setStudyTimerSeconds] = useState(1200);
  const [timerRunning, setTimerRunning] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<PartyMsg[]>([
    { sender_name: "Chetan (Party Leader)", message_text: "Welcome to today's Study Party! Everyone hit Ready before we start the 20-min Focus Timer." },
    { sender_name: "Alex Code", message_text: "Ready! Reviewing OS Page Tables today." },
    { sender_name: "PixelHero (You)", message_text: "Ready! Studying C Pointers & Memory." },
  ]);

  // Supabase Realtime Subscription Hook
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    // 1. Fetch historical messages from Supabase PostgreSQL table
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("party_messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(20);

      if (data && data.length > 0) {
        setChatMessages(data);
      }
    };
    fetchMessages();

    // 2. Subscribe to live WebSocket realtime inserts
    const channel = supabase
      .channel("party-realtime-chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "party_messages" },
        (payload) => {
          const newMsg = payload.new as PartyMsg;
          setChatMessages((prev) => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Focus Timer Countdown Hook
  useEffect(() => {
    if (!timerRunning) return;
    const timer = setInterval(() => {
      setStudyTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerRunning(false);
          addXP(250, "Completed Party Focus Session");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerRunning, addXP]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: PartyMsg = {
      sender_name: "PixelHero (You)",
      message_text: chatInput,
    };

    const supabase = createClient();
    if (supabase) {
      // Insert to Supabase PostgreSQL table -> triggers Realtime to all clients!
      await supabase.from("party_messages").insert([newMsg]);
    } else {
      setChatMessages((prev) => [...prev, newMsg]);
    }

    setChatInput("");
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            <span>Multiplayer Study Party Hub</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Connected to Supabase Realtime Project <code className="text-primary font-mono text-xs">auvrrmsrnrykvtvfkcdh</code>!
          </p>
        </div>

        {/* Voice Channel Controls */}
        <div className="flex items-center gap-3 bg-card p-3 rounded-2xl border border-border shadow-glow-cyan">
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-2.5 rounded-xl transition-all ${
              isMicOn ? "bg-emerald-500 text-background font-bold" : "bg-muted text-muted-foreground"
            }`}
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>
          <div className="text-xs">
            <p className="font-extrabold text-foreground">Voice Channel</p>
            <p className="text-[10px] text-emerald-400 font-bold">{isMicOn ? "Connected (4 Online)" : "Muted"}</p>
          </div>
        </div>
      </div>

      {/* Shared Focus Timer & Party Raid Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Study Together Timer (7 cols) */}
        <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-primary/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-primary/20 text-primary">
              PARTY FOCUS SESSION
            </span>
            <h2 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
              {formatTimer(studyTimerSeconds)}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">All party members earn 1.5x XP during focus session!</p>
          </div>

          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className={`px-6 py-3.5 rounded-2xl font-black text-xs shadow-glow hover:scale-105 transition-transform flex items-center gap-2 ${
              timerRunning ? "bg-amber-500 text-background" : "bg-primary text-background"
            }`}
          >
            {timerRunning ? <Clock className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-background" />}
            <span>{timerRunning ? "Pause Timer" : "Start Party Focus"}</span>
          </button>
        </div>

        {/* Weekly Shared Quest Bar (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-secondary/40 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <h3 className="font-extrabold text-secondary flex items-center gap-1.5">
              <Swords className="w-4 h-4" /> Shared Party Quest
            </h3>
            <span className="font-extrabold text-amber-400">+1,500 XP Reward</span>
          </div>

          <p className="text-xs font-bold text-foreground">Defeat 5 Bosses as a Party</p>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden p-0.5 border border-border">
            <div className="h-full bg-gradient-to-r from-secondary to-accent rounded-full" style={{ width: "80%" }} />
          </div>
          <p className="text-[10px] text-muted-foreground text-right font-bold">4 / 5 Bosses Slain</p>
        </div>
      </div>

      {/* Grid: Members & Live Realtime Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Party Members (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-border space-y-4">
          <h3 className="font-extrabold text-base flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Party Members ({partyMembers.length})</span>
          </h3>

          <div className="space-y-3">
            {partyMembers.map((member, i) => (
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

                <button
                  onClick={() => togglePartyReady(member.name)}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                    member.isReady
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {member.isReady ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  <span>{member.isReady ? "Ready" : "Not Ready"}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Activity Feed */}
          <div className="pt-4 border-t border-border space-y-2">
            <h4 className="font-extrabold text-xs text-muted-foreground uppercase">Party Live Activity Feed</h4>
            <div className="space-y-1.5 text-[11px] font-semibold text-foreground/90">
              {partyActivityFeed.map((feed, i) => (
                <div key={i} className="p-2 rounded-xl bg-muted/30 border border-border/40 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{feed}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Supabase Realtime Party Chat (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-border flex flex-col h-[500px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span>Live Supabase Realtime Chat</span>
            </h3>
            <span className="text-[10px] font-extrabold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WebSockets Active</span>
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
            {chatMessages.map((msg, idx) => (
              <div key={msg.id || idx} className="p-3.5 rounded-2xl bg-muted/40 border border-border/50 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-extrabold text-primary">{msg.sender_name}</span>
                </div>
                <p className="text-foreground/90 font-medium">{msg.message_text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type message to sync in real-time..."
              className="flex-1 bg-muted/40 px-4 py-2.5 rounded-xl border border-border text-xs outline-none focus:border-primary"
            />
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-background font-extrabold text-xs shadow-glow">
              Send Live
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
