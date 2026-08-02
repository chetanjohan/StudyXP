import { AdventureBlueprint, AdventureDifficulty, SyllabusUnit, SyllabusTopic } from "@/types/adventure";
import { parseSyllabusText, RawSyllabusStructure } from "@/lib/parsers/syllabusParser";
import { Boss, DailyQuest, Quiz, SkillNode } from "@/data/mockData";

export function generateAdventureBlueprint(
  adventureName: string,
  courseName: string,
  semester: string | undefined,
  difficulty: AdventureDifficulty,
  rawText: string
): AdventureBlueprint {
  const parsed: RawSyllabusStructure = parseSyllabusText(rawText, courseName);

  const multiplier = difficulty === "Legend" ? 2.0 : difficulty === "Hardcore" ? 1.5 : difficulty === "Normal" ? 1.0 : 0.8;

  const generatedUnits: SyllabusUnit[] = [];
  const generatedSkillNodes: SkillNode[] = [];
  const generatedQuests: DailyQuest[] = [];
  const generatedFlashcards: AdventureBlueprint["flashcards"] = [];
  const generatedSlides: AdventureBlueprint["slides"] = [];
  const generatedQuizzes: Record<string, Quiz> = {};

  let totalXP = 0;
  let estimatedHours = 0;
  let previousNodeId: string | null = null;

  parsed.units.forEach((u, uIdx) => {
    const unitId = `unit-${u.unitNumber}`;

    const topics: SyllabusTopic[] = u.topics.map((tName, tIdx) => {
      const topicId = `topic-${u.unitNumber}-${tIdx + 1}`;
      const xp = Math.round((200 + tIdx * 50) * multiplier);
      const minutes = 15 + tIdx * 10;

      totalXP += xp;
      estimatedHours += minutes / 60;

      // 1. Skill Tree Node
      const nodeId = `node-${topicId}`;
      generatedSkillNodes.push({
        id: nodeId,
        label: tName,
        category: uIdx % 2 === 0 ? "Computer Science" : "OS",
        parentIds: previousNodeId ? [previousNodeId] : [],
        status: uIdx === 0 && tIdx === 0 ? "unlocked" : uIdx === 0 ? "available" : "locked",
        costXP: Math.round(150 * multiplier),
        costCoins: Math.round(40 * multiplier),
        description: `Master ${tName} from ${u.unitTitle}.`,
        iconName: "Terminal",
      });
      previousNodeId = nodeId;

      // 2. Daily Quest
      generatedQuests.push({
        id: `quest-${topicId}`,
        title: `Master ${tName}`,
        target: 1,
        current: 0,
        rewardXP: xp,
        rewardCoins: Math.round(xp / 4),
        completed: false,
        claimed: false,
        icon: "CheckCircle2",
      });

      // 3. Flashcards
      generatedFlashcards.push(
        {
          id: `fc-${topicId}-1`,
          topicId,
          unitTitle: u.unitTitle,
          front: `What is the core definition of ${tName}?`,
          back: `${tName} represents a foundational concept in ${courseName}.`,
        },
        {
          id: `fc-${topicId}-2`,
          topicId,
          unitTitle: u.unitTitle,
          front: `What is a common pitfall when implementing ${tName}?`,
          back: `Failing to check memory boundaries and state synchronization.`,
        }
      );

      // 4. Topic Quiz
      const quizId = `quiz-${topicId}`;
      generatedQuizzes[quizId] = {
        id: quizId,
        title: `${tName} Assessment`,
        subjectId: "cs",
        difficulty: difficulty === "Legend" ? "Hard" : "Medium",
        xpReward: xp,
        coinReward: Math.round(xp / 3),
        timeLimitSeconds: 60,
        questions: [
          {
            id: `q-${topicId}-1`,
            question: `What is the primary function of ${tName}?`,
            options: [
              `Facilitates efficient runtime execution for ${tName}`,
              "Increases CPU voltage",
              "Compresses disk storage",
              "None of the above",
            ],
            correctIndex: 0,
            explanation: `${tName} enables controlled memory and execution access.`,
          },
        ],
      };

      return {
        id: topicId,
        unitId,
        unitTitle: u.unitTitle,
        title: tName,
        description: `Explore principles of ${tName}.`,
        estimatedMinutes: minutes,
        xpReward: xp,
        difficulty: tIdx % 2 === 0 ? "Beginner" : "Intermediate",
        prerequisites: [],
        subtopics: [`Key ${tName} concepts`, "Implementation rules"],
        flashcards: [
          { front: `Define ${tName}`, back: `Core concept in ${u.unitTitle}.` },
        ],
        cheatSheet: [`// ${tName} quick reference`, `init_${tName.toLowerCase().replace(/\s+/g, "_")}();`],
      };
    });

    // 5. Unit Boss Battle
    const boss: Boss = {
      id: `boss-${unitId}`,
      name: `${u.unitTitle} Overlord`,
      title: `Monarch of ${u.unitTitle}`,
      hp: Math.round(100 * (u.unitNumber * 0.5 + 0.5)),
      maxHp: Math.round(100 * (u.unitNumber * 0.5 + 0.5)),
      difficulty: u.unitNumber > 2 ? "Hard" : "Normal",
      avatar: u.unitNumber === 1 ? "🐉" : u.unitNumber === 2 ? "👻" : "🗿",
      rewardXP: Math.round(600 * multiplier),
      rewardCoins: Math.round(200 * multiplier),
      lootItem: `${u.unitTitle} Mastery Rune`,
      lore: `Guarding the portal at the end of ${u.unitTitle}. Defeat to unlock the next unit.`,
      weakness: `Mastery of ${topics[0]?.title || "unit concepts"}`,
      requiredSkills: [topics[0]?.title || "Unit Core"],
      questions: topics.map((t, idx) => ({
        question: `The Boss attacks with ${t.title}! How do you counter?`,
        options: [
          `Apply ${t.title} best practices and memory safety`,
          "Ignore error checking",
          "Restart the process",
          "Delete the codebase",
        ],
        correctIndex: 0,
        damage: 40,
      })),
    };

    // 6. Unit Slides
    generatedSlides.push({
      id: `slide-${unitId}`,
      unitTitle: u.unitTitle,
      title: `${u.unitTitle} Executive Summary`,
      bulletPoints: [
        `Learning Objectives for ${u.unitTitle}`,
        `Core Concepts: ${topics.map((t) => t.title).join(", ")}`,
        "Key Definitions and Memory Safety Rules",
        "Unit Revision Summary & Exam Checklist",
      ],
    });

    generatedUnits.push({
      id: unitId,
      unitNumber: u.unitNumber,
      title: u.unitTitle,
      description: u.description,
      topics,
      boss,
    });
  });

  return {
    id: `adv-${Date.now()}`,
    name: adventureName,
    courseName,
    semester,
    difficulty,
    createdAt: new Date().toISOString(),
    totalXP,
    estimatedHours: Math.round(estimatedHours * 10) / 10,
    units: generatedUnits,
    skillNodes: generatedSkillNodes,
    quests: generatedQuests,
    flashcards: generatedFlashcards,
    slides: generatedSlides,
    quizzes: generatedQuizzes,
    completedTopicIds: [],
    completedUnitIds: [],
  };
}
