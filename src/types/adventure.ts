import { Boss, DailyQuest, InventoryItem, Quiz, SkillNode } from "@/data/mockData";

export type AdventureDifficulty = "Casual" | "Normal" | "Hardcore" | "Legend";

export interface SyllabusTopic {
  id: string;
  unitId: string;
  unitTitle: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  xpReward: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prerequisites: string[];
  subtopics: string[];
  flashcards: Array<{ front: string; back: string }>;
  cheatSheet: string[];
}

export interface SyllabusUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  topics: SyllabusTopic[];
  boss: Boss;
}

export interface AdventureBlueprint {
  id: string;
  name: string;
  courseName: string;
  semester?: string;
  difficulty: AdventureDifficulty;
  createdAt: string;
  totalXP: number;
  estimatedHours: number;
  units: SyllabusUnit[];
  skillNodes: SkillNode[];
  quests: DailyQuest[];
  flashcards: Array<{ id: string; front: string; back: string; topicId: string; unitTitle: string }>;
  slides: Array<{ id: string; unitTitle: string; title: string; bulletPoints: string[] }>;
  quizzes: Record<string, Quiz>;
  completedTopicIds: string[];
  completedUnitIds: string[];
}
