import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { AdventureBlueprint, AdventureDifficulty } from "@/types/adventure";
import { generateAdventureBlueprint } from "@/services/adventureGenerator";
import {
  DailyQuest,
  InventoryItem,
  SkillNode,
  Achievement,
  Boss,
  MOCK_DAILY_QUESTS,
  MOCK_INVENTORY,
  MOCK_SKILL_NODES,
  MOCK_ACHIEVEMENTS,
  MOCK_BOSSES,
  MOCK_AI_MENTOR_MODES,
  MOCK_CAREER_GOALS,
  MOCK_MEMORY_TOPICS,
  MOCK_COMPANY_ARENAS,
  MOCK_ROADMAP_NODES,
  MOCK_GUILD_MEMBERS,
  MemoryTopic,
  CompanyArena,
  RoadmapNode,
  GuildMember,
} from "@/data/mockData";

export type ThemeType = "cyberpunk" | "library" | "space" | "wizard" | "hacker";

export const RANK_TITLES: Record<number, string> = {
  1: "Student",
  2: "Apprentice",
  3: "Scholar",
  4: "Expert",
  5: "Master",
  6: "Interview Slayer",
  7: "Job Holder",
};

export interface XPToast {
  id: string;
  amount: number;
  reason: string;
}

export interface GameState {
  // User Profile
  username: string;
  avatar: string;
  level: number;
  rankTitle: string;
  currentXP: number;
  nextLevelXP: number;
  coins: number;
  streakDays: number;
  
  // Theme & Audio
  currentTheme: ThemeType;
  soundEnabled: boolean;
  searchOpen: boolean;

  // Level Up Modal State
  showLevelUpModal: boolean;
  newLevel: number;
  newRankTitle: string;

  // Toast / Floating XP
  xpToasts: XPToast[];

  // Adventure Creator State
  activeAdventure: AdventureBlueprint | null;
  adventures: AdventureBlueprint[];

  // Collections
  selectedAIModeId: string;
  selectedCareerGoalId: string;
  partyMembers: GuildMember[];
  partyActivityFeed: string[];
  memoryTopics: MemoryTopic[];
  companyArenas: CompanyArena[];
  roadmapNodes: RoadmapNode[];

  dailyQuests: DailyQuest[];
  inventory: InventoryItem[];
  skillNodes: SkillNode[];
  achievements: Achievement[];
  bosses: Boss[];

  // Active Buffs
  activeBuffs: {
    doubleXP: boolean;
    freezeTimer: boolean;
  };

  // Supabase Connection Status
  isSupabaseConnected: boolean;

  // Actions
  setTheme: (theme: ThemeType) => void;
  toggleSound: () => void;
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  setAIMode: (modeId: string) => void;
  setCareerGoal: (goalId: string) => void;
  togglePartyReady: (memberName: string) => void;
  addXP: (amount: number, reason?: string) => void;
  addCoins: (amount: number) => void;
  closeLevelUpModal: () => void;
  removeXPToast: (id: string) => void;

  setProfileFromSupabase: (profile: {
    username: string;
    level: number;
    rankTitle: string;
    currentXP: number;
    nextLevelXP: number;
    coins: number;
    streakDays: number;
  }) => void;

  logoutUser: () => Promise<void>;

  // Adventure Actions
  createAdventureFromSyllabus: (
    name: string,
    courseName: string,
    semester: string | undefined,
    difficulty: AdventureDifficulty,
    rawText: string
  ) => AdventureBlueprint;
  setActiveAdventure: (blueprint: AdventureBlueprint) => void;

  // Gamification Actions
  claimQuest: (questId: string) => void;
  buyItem: (itemId: string) => boolean;
  useItem: (itemId: string) => void;
  unlockNode: (nodeId: string) => boolean;
  damageBoss: (bossId: string, damage: number) => { defeated: boolean; rewardXP: number; rewardCoins: number };
  claimAchievement: (achievementId: string) => void;
}

export const useGameStore = create<GameState>((set, get) => {
  const supabase = typeof window !== "undefined" ? createClient() : null;

  return {
    username: "PixelHero",
    avatar: "🚀",
    level: 4,
    rankTitle: RANK_TITLES[4],
    currentXP: 850,
    nextLevelXP: 2000,
    coins: 450,
    streakDays: 7,

    currentTheme: "cyberpunk",
    soundEnabled: true,
    searchOpen: false,

    showLevelUpModal: false,
    newLevel: 4,
    newRankTitle: RANK_TITLES[4],

    xpToasts: [],

    activeAdventure: null,
    adventures: [],

    selectedAIModeId: "teacher",
    selectedCareerGoalId: "swe",
    partyMembers: MOCK_GUILD_MEMBERS,
    partyActivityFeed: [
      "Chetan defeated Pointer Phantom in 45s!",
      "Alex Code mastered Binary Trees DSA node.",
      "PixelHero earned 500 XP from Quiz Arena.",
      "ByteWitch joined the Study Party."
    ],
    memoryTopics: MOCK_MEMORY_TOPICS,
    companyArenas: MOCK_COMPANY_ARENAS,
    roadmapNodes: MOCK_ROADMAP_NODES,

    dailyQuests: MOCK_DAILY_QUESTS,
    inventory: MOCK_INVENTORY,
    skillNodes: MOCK_SKILL_NODES,
    achievements: MOCK_ACHIEVEMENTS,
    bosses: MOCK_BOSSES,

    activeBuffs: {
      doubleXP: false,
      freezeTimer: false,
    },

    isSupabaseConnected: !!supabase,

    setProfileFromSupabase: (profile) =>
      set({
        username: profile.username,
        level: profile.level,
        rankTitle: profile.rankTitle,
        currentXP: profile.currentXP,
        nextLevelXP: profile.nextLevelXP,
        coins: profile.coins,
        streakDays: profile.streakDays,
      }),

    logoutUser: async () => {
      const client = createClient();
      if (client) {
        await client.auth.signOut();
      }
      set({
        username: "Guest",
        level: 1,
        rankTitle: RANK_TITLES[1],
        currentXP: 0,
        nextLevelXP: 1000,
        coins: 100,
        activeAdventure: null,
      });
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },

    setTheme: (theme) => {
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", theme);
      }
      set({ currentTheme: theme });
    },

    toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
    toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
    setSearchOpen: (open) => set({ searchOpen: open }),

    setAIMode: (modeId) => set({ selectedAIModeId: modeId }),
    setCareerGoal: (goalId) => set({ selectedCareerGoalId: goalId }),

    togglePartyReady: (memberName) => set((state) => ({
      partyMembers: state.partyMembers.map((m) =>
        m.name === memberName ? { ...m, isReady: !m.isReady } : m
      ),
    })),

    createAdventureFromSyllabus: (name, courseName, semester, difficulty, rawText) => {
      const blueprint = generateAdventureBlueprint(name, courseName, semester, difficulty, rawText);

      set((state) => ({
        activeAdventure: blueprint,
        adventures: [blueprint, ...state.adventures],
        skillNodes: blueprint.skillNodes.length > 0 ? blueprint.skillNodes : state.skillNodes,
        dailyQuests: blueprint.quests.length > 0 ? blueprint.quests : state.dailyQuests,
        bosses: blueprint.units.map((u) => u.boss).length > 0 ? blueprint.units.map((u) => u.boss) : state.bosses,
      }));

      get().addXP(500, `Created Adventure: ${blueprint.name}`);
      return blueprint;
    },

    setActiveAdventure: (blueprint) => {
      set({
        activeAdventure: blueprint,
        skillNodes: blueprint.skillNodes.length > 0 ? blueprint.skillNodes : get().skillNodes,
        dailyQuests: blueprint.quests.length > 0 ? blueprint.quests : get().dailyQuests,
        bosses: blueprint.units.map((u) => u.boss).length > 0 ? blueprint.units.map((u) => u.boss) : get().bosses,
      });
    },

    addXP: (amount, reason = "Quest Completed") => {
      const state = get();
      let finalAmount = amount;

      if (state.activeBuffs.doubleXP) {
        finalAmount *= 2;
      }

      let newXP = state.currentXP + finalAmount;
      let newLevel = state.level;
      let newNextLevelXP = state.nextLevelXP;
      let leveledUp = false;

      while (newXP >= newNextLevelXP) {
        newXP -= newNextLevelXP;
        newLevel += 1;
        newNextLevelXP = newLevel * 500;
        leveledUp = true;
      }

      const toastId = Math.random().toString(36).substring(2, 9);
      const newRankTitle = RANK_TITLES[Math.min(newLevel, 7)];

      set({
        currentXP: newXP,
        level: newLevel,
        rankTitle: newRankTitle,
        nextLevelXP: newNextLevelXP,
        showLevelUpModal: leveledUp ? true : state.showLevelUpModal,
        newLevel: leveledUp ? newLevel : state.newLevel,
        newRankTitle: leveledUp ? newRankTitle : state.newRankTitle,
        xpToasts: [...state.xpToasts, { id: toastId, amount: finalAmount, reason }],
      });

      // Sync updated XP to Supabase PostgreSQL table
      const client = createClient();
      if (client) {
        client.auth.getUser().then(({ data: { user } }) => {
          if (user) {
            client.from("profiles").update({
              current_xp: newXP,
              level: newLevel,
              rank_title: newRankTitle,
              next_level_xp: newNextLevelXP,
            }).eq("user_id", user.id);
          }
        });
      }
    },

    addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

    closeLevelUpModal: () => set({ showLevelUpModal: false }),

    removeXPToast: (id) =>
      set((state) => ({ xpToasts: state.xpToasts.filter((t) => t.id !== id) })),

    claimQuest: (questId) => {
      const state = get();
      const quest = state.dailyQuests.find((q) => q.id === questId);
      if (!quest || quest.claimed || !quest.completed) return;

      set({
        dailyQuests: state.dailyQuests.map((q) =>
          q.id === questId ? { ...q, claimed: true } : q
        ),
      });

      state.addXP(quest.rewardXP, `Quest: ${quest.title}`);
      state.addCoins(quest.rewardCoins);
    },

    buyItem: (itemId) => {
      const state = get();
      const item = state.inventory.find((i) => i.id === itemId);
      if (!item || state.coins < item.price) return false;

      set({
        coins: state.coins - item.price,
        inventory: state.inventory.map((i) =>
          i.id === itemId ? { ...i, count: i.count + 1 } : i
        ),
      });
      return true;
    },

    useItem: (itemId) => {
      const state = get();
      const item = state.inventory.find((i) => i.id === itemId);
      if (!item || item.count <= 0) return;

      set({
        inventory: state.inventory.map((i) =>
          i.id === itemId ? { ...i, count: i.count - 1 } : i
        ),
      });

      if (itemId === "double-xp") {
        set((s) => ({ activeBuffs: { ...s.activeBuffs, doubleXP: true } }));
        setTimeout(() => {
          set((s) => ({ activeBuffs: { ...s.activeBuffs, doubleXP: false } }));
        }, 30000);
      } else if (itemId === "freeze-timer") {
        set((s) => ({ activeBuffs: { ...s.activeBuffs, freezeTimer: true } }));
        setTimeout(() => {
          set((s) => ({ activeBuffs: { ...s.activeBuffs, freezeTimer: false } }));
        }, 15000);
      }
    },

    unlockNode: (nodeId) => {
      const state = get();
      const node = state.skillNodes.find((n) => n.id === nodeId);
      if (!node || node.status === "unlocked") return false;
      if (state.currentXP < node.costXP || state.coins < node.costCoins) return false;

      set({
        currentXP: state.currentXP - node.costXP,
        coins: state.coins - node.costCoins,
        skillNodes: state.skillNodes.map((n) => {
          if (n.id === nodeId) return { ...n, status: "unlocked" };
          if (n.parentIds.includes(nodeId) && n.status === "locked") {
            return { ...n, status: "available" };
          }
          return n;
        }),
      });

      state.addXP(150, `Unlocked Node: ${node.label}`);
      return true;
    },

    damageBoss: (bossId, damage) => {
      const state = get();
      const boss = state.bosses.find((b) => b.id === bossId);
      if (!boss) return { defeated: false, rewardXP: 0, rewardCoins: 0 };

      const newHp = Math.max(0, boss.hp - damage);
      const isDefeated = newHp === 0;

      set({
        bosses: state.bosses.map((b) =>
          b.id === bossId ? { ...b, hp: newHp } : b
        ),
      });

      if (isDefeated) {
        state.addXP(boss.rewardXP, `Defeated ${boss.name}!`);
        state.addCoins(boss.rewardCoins);
      }

      return {
        defeated: isDefeated,
        rewardXP: boss.rewardXP,
        rewardCoins: boss.rewardCoins,
      };
    },

    claimAchievement: (achievementId) => {
      const state = get();
      const ach = state.achievements.find((a) => a.id === achievementId);
      if (!ach || !ach.unlocked) return;

      state.addXP(ach.rewardXP, `Achievement: ${ach.title}`);
    },
  };
});
