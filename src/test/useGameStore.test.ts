import { describe, it, expect, beforeEach } from "vitest";
import { useGameStore } from "@/store/useGameStore";
import { MOCK_DAILY_QUESTS } from "@/data/mockData";

describe("useGameStore - Gamification Engine", () => {
  beforeEach(() => {
    // Reset Zustand store state before each test
    useGameStore.setState({
      level: 4,
      currentXP: 850,
      nextLevelXP: 2000,
      coins: 450,
      streakDays: 7,
      showLevelUpModal: false,
      xpToasts: [],
      activeBuffs: { doubleXP: false, freezeTimer: false },
      dailyQuests: MOCK_DAILY_QUESTS.map((q) =>
        q.id === "q1" ? { ...q, completed: true, claimed: false } : q
      ),
    });
  });

  it("should add XP correctly without level up", () => {
    const store = useGameStore.getState();
    store.addXP(300, "Completed Lesson");

    const updated = useGameStore.getState();
    expect(updated.currentXP).toBe(1150);
    expect(updated.level).toBe(4);
    expect(updated.showLevelUpModal).toBe(false);
    expect(updated.xpToasts.length).toBe(1);
    expect(updated.xpToasts[0].amount).toBe(300);
  });

  it("should trigger Level Up when XP exceeds nextLevelXP threshold", () => {
    const store = useGameStore.getState();
    store.addXP(1500, "Boss Defeated");

    const updated = useGameStore.getState();
    expect(updated.level).toBe(5);
    expect(updated.showLevelUpModal).toBe(true);
    expect(updated.rankTitle).toBe("Master");
  });

  it("should double XP when doubleXP buff is active", () => {
    useGameStore.setState({ activeBuffs: { doubleXP: true, freezeTimer: false } });

    const store = useGameStore.getState();
    store.addXP(200, "Double Quest");

    const updated = useGameStore.getState();
    expect(updated.currentXP).toBe(1250); // 850 + 200*2 = 1250
  });

  it("should claim quest rewards and award XP & coins", () => {
    const store = useGameStore.getState();
    const initialCoins = store.coins;

    store.claimQuest("q1");

    const updated = useGameStore.getState();
    const claimedQuest = updated.dailyQuests.find((q) => q.id === "q1");
    expect(claimedQuest?.claimed).toBe(true);
    expect(updated.coins).toBe(initialCoins + 30);
  });

  it("should purchase item when sufficient coins available", () => {
    const store = useGameStore.getState();
    const initialItem = store.inventory.find((i) => i.id === "hint-potion");
    const initialCount = initialItem?.count || 0;

    const success = store.buyItem("hint-potion");

    const updated = useGameStore.getState();
    const updatedItem = updated.inventory.find((i) => i.id === "hint-potion");
    expect(success).toBe(true);
    expect(updatedItem?.count).toBe(initialCount + 1);
  });

  it("should damage boss HP and trigger victory loot when HP hits 0", () => {
    const store = useGameStore.getState();
    const result = store.damageBoss("memory-leak-dragon", 100);

    expect(result.defeated).toBe(true);
    const updatedBoss = useGameStore.getState().bosses.find((b) => b.id === "memory-leak-dragon");
    expect(updatedBoss?.hp).toBe(0);
  });
});
