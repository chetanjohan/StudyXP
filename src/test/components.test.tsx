import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LevelUpModal from "@/components/layout/LevelUpModal";
import XPToastManager from "@/components/layout/XPToastManager";
import { useGameStore } from "@/store/useGameStore";

describe("UI Components", () => {
  it("should render LevelUpModal when showLevelUpModal is true", () => {
    useGameStore.setState({
      showLevelUpModal: true,
      newLevel: 5,
      newRankTitle: "Master",
    });

    render(<LevelUpModal />);

    expect(screen.getByText("LEVEL UP!")).toBeDefined();
    expect(screen.getByText("Master")).toBeDefined();
  });

  it("should render XP toasts when xpToasts array is non-empty", () => {
    useGameStore.setState({
      xpToasts: [{ id: "toast-1", amount: 250, reason: "Defeated Dragon" }],
    });

    render(<XPToastManager />);

    expect(screen.getByText("+250 XP GAINED!")).toBeDefined();
    expect(screen.getByText("Defeated Dragon")).toBeDefined();
  });
});
