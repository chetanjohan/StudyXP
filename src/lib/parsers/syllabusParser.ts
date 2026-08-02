export interface RawSyllabusStructure {
  courseTitle: string;
  units: Array<{
    unitNumber: number;
    unitTitle: string;
    description: string;
    topics: string[];
  }>;
}

export function parseSyllabusText(text: string, defaultCourseName: string): RawSyllabusStructure {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  let courseTitle = defaultCourseName;
  const units: RawSyllabusStructure["units"] = [];

  let currentUnit: RawSyllabusStructure["units"][0] | null = null;

  lines.forEach((line) => {
    // Check for Unit headers (e.g. Unit 1:, Module 1:, Chapter 1:)
    const unitMatch = line.match(/(?:Unit|Module|Chapter)\s*(\d+)[:\s]*(.*)/i);
    if (unitMatch) {
      if (currentUnit) units.push(currentUnit);
      currentUnit = {
        unitNumber: parseInt(unitMatch[1], 10) || units.length + 1,
        unitTitle: unitMatch[2] || `Unit ${unitMatch[1]} Core Concepts`,
        description: `Deep architectural exploration of ${unitMatch[2] || "unit topics"}.`,
        topics: [],
      };
      return;
    }

    // Check for topic bullet points
    if (currentUnit) {
      const topicClean = line.replace(/^[•\-*0-9.]+\s*/, "").trim();
      if (topicClean.length > 3) {
        currentUnit.topics.push(topicClean);
      }
    }
  });

  if (currentUnit) units.push(currentUnit);

  // Default fallback units if text structure was minimal
  if (units.length === 0) {
    units.push(
      {
        unitNumber: 1,
        unitTitle: "Unit 1: Fundamentals & Core Architecture",
        description: "Foundational principles, memory layouts, and basic abstractions.",
        topics: ["System Environment & Variables", "Memory Architecture & Stack Layout", "Basic Control Loops"],
      },
      {
        unitNumber: 2,
        unitTitle: "Unit 2: Advanced Data Structures & Memory",
        description: "Dynamic allocation, pointers, heap management, and pointer arithmetic.",
        topics: ["Dynamic Heap Allocation & malloc", "Pointers & Address-of Operators", "Struct Alignment & Unions"],
      },
      {
        unitNumber: 3,
        unitTitle: "Unit 3: Operating System Internals & Concurrency",
        description: "Processes, multithreading, mutex locks, and deadlock prevention.",
        topics: ["Process Context Switching", "Multithread Mutex Synchronization", "Deadlock Prevention Algorithms"],
      }
    );
  }

  return { courseTitle, units };
}
