export interface Subject {
  id: string;
  name: string;
  description: string;
  iconName: string;
  level: number;
  completion: number;
  xp: number;
  difficulty: "Beginner" | "Intermediate" | "Hard" | "Legendary";
  color: string;
  lessonsCount: number;
}

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  estimatedMinutes: number;
  xpReward: number;
  summary: string;
  contentMarkdown: string;
  codeSnippet?: string;
  simplifiedExplanation?: string;
  eli5Explanation?: string;
  flashcards: Array<{ front: string; back: string }>;
  mindMap: string[];
  cheatSheet: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subjectId: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xpReward: number;
  coinReward: number;
  timeLimitSeconds: number;
  questions: QuizQuestion[];
}

export interface SkillNode {
  id: string;
  label: string;
  category: "Computer Science" | "Java" | "Python" | "OS" | "DBMS" | "DSA";
  parentIds: string[];
  status: "unlocked" | "available" | "locked";
  costXP: number;
  costCoins: number;
  description: string;
  iconName: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  effect: string;
  price: number;
}

export interface DailyQuest {
  id: string;
  title: string;
  target: number;
  current: number;
  rewardXP: number;
  rewardCoins: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "Learning" | "Coding" | "Consistency" | "Speed" | "Boss Battles" | "Exploration";
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rewardXP: number;
}

export interface Boss {
  id: string;
  name: string;
  title: string;
  hp: number;
  maxHp: number;
  difficulty: "Normal" | "Hard" | "Nightmare" | "Legendary";
  avatar: string;
  rewardXP: number;
  rewardCoins: number;
  lootItem: string;
  lore: string;
  weakness: string;
  requiredSkills: string[];
  questions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    damage: number;
  }>;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  title: string;
  weeklyXP: number;
  level: number;
  isUser?: boolean;
}

export interface GuildMember {
  name: string;
  role: "Leader" | "Officer" | "Member";
  level: number;
  avatar: string;
  status: "online" | "offline" | "in-raid";
  isReady?: boolean;
}

export interface AIMentorMode {
  id: "teacher" | "exam" | "interviewer" | "rubber-duck" | "strict" | "buddy";
  name: string;
  description: string;
  avatar: string;
  accentColor: string;
  badge: string;
  greeting: string;
}

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
  readinessPercentage: number;
  completedSkills: string[];
  missingSkills: string[];
  recommendedNextSkill: string;
  estimatedInterviewReadiness: string;
  recommendedQuest: {
    title: string;
    bossName: string;
    rewardXP: number;
    rewardSkill: string;
  };
}

export interface MemoryTopic {
  id: string;
  title: string;
  subject: string;
  lastReviewedDaysAgo: number;
  retentionHealth: number; // 0-100
  status: "Strong" | "Review Due" | "Forgotten";
  nextReviewDate: string;
}

export interface CompanyArena {
  id: string;
  name: string;
  logo: string;
  difficulty: "Medium" | "Hard" | "Extreme";
  rewardXP: number;
  expectedSkills: string[];
  description: string;
  questions: QuizQuestion[];
}

export interface RoadmapNode {
  id: string;
  title: string;
  estimatedHours: number;
  xpRequired: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: "unlocked" | "current" | "locked";
  description: string;
}

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "cs",
    name: "Computer Science",
    description: "Core algorithms, data structures, and computer organization.",
    iconName: "Cpu",
    level: 4,
    completion: 72,
    xp: 2450,
    difficulty: "Intermediate",
    color: "from-cyan-500 to-blue-600",
    lessonsCount: 18,
  },
  {
    id: "os",
    name: "Operating Systems",
    description: "Processes, threads, memory management, and file systems.",
    iconName: "HardDrive",
    level: 3,
    completion: 45,
    xp: 1350,
    difficulty: "Hard",
    color: "from-purple-500 to-indigo-600",
    lessonsCount: 14,
  },
  {
    id: "math",
    name: "Mathematics",
    description: "Discrete math, linear algebra, calculus & probability.",
    iconName: "Binary",
    level: 5,
    completion: 88,
    xp: 3100,
    difficulty: "Intermediate",
    color: "from-amber-500 to-orange-600",
    lessonsCount: 22,
  },
  {
    id: "networking",
    name: "Networking",
    description: "TCP/IP OSI model, HTTP/3, sockets, routing & security.",
    iconName: "Network",
    level: 2,
    completion: 30,
    xp: 900,
    difficulty: "Beginner",
    color: "from-emerald-500 to-teal-600",
    lessonsCount: 12,
  },
  {
    id: "ml",
    name: "Machine Learning",
    description: "Neural networks, gradient descent, transformers & LLMs.",
    iconName: "BrainCircuit",
    level: 6,
    completion: 95,
    xp: 4200,
    difficulty: "Legendary",
    color: "from-pink-500 to-rose-600",
    lessonsCount: 25,
  },
];

export const MOCK_LESSONS: Record<string, Lesson> = {
  "pointers-memory": {
    id: "pointers-memory",
    subjectId: "cs",
    title: "Pointers & Memory Allocation in C",
    estimatedMinutes: 12,
    xpReward: 350,
    summary: "Master memory addresses, pointer arithmetic, dynamic stack vs heap allocation, and preventing memory leaks.",
    contentMarkdown: `## Understanding Memory & Pointers

In computer systems, memory is organized as a linear sequence of byte addresses. A **pointer** is a variable whose value is the physical memory address of another variable.

### 1. Pointer Basics
- \`&\` (Address-of operator): Obtains the memory location of a variable.
- \`*\` (Dereference operator): Accesses the value stored at the target memory address.

\`\`\`c
int value = 42;
int *ptr = &value; // ptr stores address of value

printf("Value: %d\\n", *ptr); // Outputs 42
printf("Address: %p\\n", (void*)ptr);
\`\`\`

### 2. Stack vs Heap Memory
- **Stack**: Ultra-fast, managed automatically by CPU stack pointer. Allocation is freed when function scope exits.
- **Heap**: Dynamic memory reserved manually using \`malloc()\`, \`calloc()\`, or \`realloc()\`. Must be explicitly freed with \`free()\` to avoid fatal memory leaks!

\`\`\`c
// Heap allocation
int *arr = (int*) malloc(5 * sizeof(int));
if (arr == NULL) {
    // Handle allocation failure
    return 1;
}

// Memory manipulation
for(int i=0; i<5; i++) {
    arr[i] = (i + 1) * 10;
}

// CRITICAL: Always release memory!
free(arr);
arr = NULL; // Prevents dangling pointer!
\`\`\`

### 3. Key Concepts to Remember
1. **Dangling Pointers**: Occurs when memory pointed to is freed, but the pointer still holds the address.
2. **Buffer Overflow**: Writing past the allocated memory boundary.
3. **Memory Leak**: Allocating heap memory without calling \`free()\`.`,
    simplifiedExplanation: "Think of memory like a massive apartment building. Variables are the items inside rooms, and pointers are the exact room numbers (addresses) on a map. If you don't return the keys when leaving (freeing memory), the building runs out of space!",
    eli5Explanation: "Imagine you have a treasure chest, but instead of carrying the chest everywhere, you carry a tiny note saying 'Treasure is under the big oak tree'. The note is a pointer!",
    flashcards: [
      { front: "What does the & operator do in C?", back: "Returns the memory address of a variable (Address-of operator)." },
      { front: "What does malloc() return if memory allocation fails?", back: "Returns NULL." },
      { front: "What is a Memory Leak?", back: "Failing to release dynamically allocated heap memory after it is no longer needed." },
      { front: "Difference between Stack and Heap?", back: "Stack is automatic and fast for local variables; Heap is manual, dynamic memory for large data." }
    ],
    mindMap: ["Pointers", "Address-of (&)", "Dereference (*)", "Heap Allocation (malloc)", "Freeing Memory (free)", "Memory Leaks", "Dangling Pointers"],
    cheatSheet: [
      "int *p = &x; // Store address",
      "*p = 10; // Modify value at address",
      "malloc(size) // Reserve heap memory",
      "free(p); p = NULL; // Clean up safely"
    ]
  }
};

export const MOCK_QUIZZES: Record<string, Quiz> = {
  "quiz-pointers": {
    id: "quiz-pointers",
    title: "Pointers & Memory Arena Quiz",
    subjectId: "cs",
    difficulty: "Medium",
    xpReward: 500,
    coinReward: 120,
    timeLimitSeconds: 60,
    questions: [
      {
        id: "q1",
        question: "What is the primary difference between Stack and Heap memory?",
        options: [
          "Stack is stored on the GPU while Heap is on the CPU",
          "Stack is automatic and fast; Heap is dynamically allocated and managed manually",
          "Heap can only store integers, Stack stores objects",
          "There is no difference in modern hardware"
        ],
        correctIndex: 1,
        explanation: "Stack allocation is managed automatically by CPU function call frames, whereas Heap memory is allocated at runtime using malloc/new and must be freed manually."
      },
      {
        id: "q2",
        question: "What does calling `free(ptr)` do in C?",
        options: [
          "Sets ptr to 0 automatically",
          "Deletes the variable definition from memory",
          "Deallocates heap memory previously reserved by malloc/calloc",
          "Encrypts the contents at the address"
        ],
        correctIndex: 2,
        explanation: "free() informs the memory allocator that the memory block at ptr is no longer needed and can be reused."
      },
      {
        id: "q3",
        question: "What operator is used to get the memory address of a variable in C?",
        options: ["*", "&", "->", "#"],
        correctIndex: 1,
        explanation: "The address-of operator '&' returns a pointer containing the memory location of the variable."
      }
    ]
  }
};

export const MOCK_SKILL_NODES: SkillNode[] = [
  { id: "c-basics", label: "C Syntax & Types", category: "Computer Science", parentIds: [], status: "unlocked", costXP: 0, costCoins: 0, description: "Variables, primitive types, loops and conditionals.", iconName: "Terminal" },
  { id: "c-arrays", label: "Arrays & Strings", category: "Computer Science", parentIds: ["c-basics"], status: "unlocked", costXP: 100, costCoins: 25, description: "Contiguous memory blocks and null-terminated character strings.", iconName: "List" },
  { id: "c-pointers", label: "Pointers & References", category: "Computer Science", parentIds: ["c-arrays"], status: "unlocked", costXP: 250, costCoins: 50, description: "Memory addresses, pointer arithmetic, dereferencing.", iconName: "Compass" },
  { id: "c-structures", label: "Structures & Unions", category: "Computer Science", parentIds: ["c-pointers"], status: "available", costXP: 400, costCoins: 100, description: "Composite user-defined data structures and memory alignment.", iconName: "Layers" },
  { id: "c-memory", label: "Heap & Memory Management", category: "Computer Science", parentIds: ["c-structures"], status: "locked", costXP: 600, costCoins: 150, description: "malloc, calloc, realloc, free, preventing leaks.", iconName: "Cpu" },

  { id: "java-oop", label: "Java OOP Principles", category: "Java", parentIds: ["c-basics"], status: "unlocked", costXP: 300, costCoins: 60, description: "Encapsulation, Inheritance, Polymorphism, Abstraction.", iconName: "Coffee" },
  { id: "python-ds", label: "Python Data Science", category: "Python", parentIds: ["c-basics"], status: "available", costXP: 350, costCoins: 70, description: "NumPy, Pandas, Vectorized Math, Dataframes.", iconName: "Code2" },

  { id: "os-processes", label: "Processes & Threads", category: "OS", parentIds: ["c-pointers"], status: "available", costXP: 500, costCoins: 120, description: "Context switching, scheduling algorithms, thread pools.", iconName: "HardDrive" },
  { id: "dbms-sql", label: "Relational DBMS & SQL", category: "DBMS", parentIds: ["c-structures"], status: "locked", costXP: 550, costCoins: 130, description: "ACID properties, indexing, joins, normalization.", iconName: "Database" },
  { id: "dsa-trees", label: "Trees & Graphs DSA", category: "DSA", parentIds: ["c-pointers"], status: "locked", costXP: 800, costCoins: 200, description: "Binary search trees, AVL, Dijkstra, BFS/DFS.", iconName: "GitBranch" },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: "hint-potion", name: "Hint Potion", description: "Reveals one wrong option in any quiz question.", icon: "Sparkles", count: 3, rarity: "Common", effect: "Eliminate wrong answer", price: 50 },
  { id: "double-xp", name: "Double XP Scroll", description: "Doubles XP earned from all quizzes & lessons for 30 mins.", icon: "Zap", count: 2, rarity: "Epic", effect: "2x XP Multiplier", price: 150 },
  { id: "freeze-timer", name: "Time Freeze Crystal", description: "Pauses the quiz countdown timer for 30 seconds.", icon: "Snowflake", count: 4, rarity: "Rare", effect: "+30s Quiz Time", price: 80 },
  { id: "memory-crystal", name: "Memory Crystal", description: "Instantly unlocks full summary and cheat sheet for any lesson.", icon: "Gem", count: 1, rarity: "Epic", effect: "Instant Lesson Mastery", price: 200 },
  { id: "revision-compass", name: "Revision Compass", description: "Highlights your top 3 weak areas with tailored review paths.", icon: "Compass", count: 2, rarity: "Rare", effect: "Identify Weak Spots", price: 100 },
  { id: "golden-badge", name: "Golden Scholar Badge", description: "Showcase an epic glowing profile border in guild and leaderboards.", icon: "ShieldAlert", count: 1, rarity: "Legendary", effect: "Cosmetic Profile Glow", price: 500 },
];

export const MOCK_DAILY_QUESTS: DailyQuest[] = [
  { id: "q1", title: "Complete 5 Flashcards", target: 5, current: 5, rewardXP: 100, rewardCoins: 30, completed: true, claimed: true, icon: "Layers" },
  { id: "q2", title: "Solve 10 Quiz Questions", target: 10, current: 7, rewardXP: 250, rewardCoins: 75, completed: false, claimed: false, icon: "CheckCircle2" },
  { id: "q3", title: "Defeat Today's Boss", target: 1, current: 0, rewardXP: 500, rewardCoins: 150, completed: false, claimed: false, icon: "Swords" },
  { id: "q4", title: "Study for 20 Minutes", target: 20, current: 15, rewardXP: 150, rewardCoins: 40, completed: false, claimed: false, icon: "Clock" },
  { id: "q5", title: "Earn 500 XP", target: 500, current: 350, rewardXP: 200, rewardCoins: 50, completed: false, claimed: false, icon: "Trophy" },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: "a1", title: "First Blood", description: "Complete your very first lesson quiz.", icon: "Flame", category: "Learning", unlocked: true, progress: 1, maxProgress: 1, rewardXP: 200 },
  { id: "a2", title: "7 Day Streak", description: "Maintain a study streak for 7 consecutive days.", icon: "Calendar", category: "Consistency", unlocked: true, progress: 7, maxProgress: 7, rewardXP: 500 },
  { id: "a3", title: "Concept Crusher", description: "Answer 50 quiz questions correctly.", icon: "Target", category: "Coding", unlocked: false, progress: 34, maxProgress: 50, rewardXP: 750 },
  { id: "a4", title: "Memory Master", description: "Unlock 5 nodes in the Computer Science skill tree.", icon: "Brain", category: "Learning", unlocked: false, progress: 3, maxProgress: 5, rewardXP: 600 },
  { id: "a5", title: "Interview Ready", description: "Defeat 3 Boss Monsters in Boss Battles.", icon: "Award", category: "Boss Battles", unlocked: false, progress: 1, maxProgress: 3, rewardXP: 1000 },
  { id: "a6", title: "Night Owl", description: "Complete a quiz after 10 PM.", icon: "Sparkles", category: "Speed", unlocked: true, progress: 1, maxProgress: 1, rewardXP: 300 },
  { id: "a7", title: "Algorithm Slayer", description: "Conquer the Recursion Hydra Boss.", icon: "Swords", category: "Boss Battles", unlocked: false, progress: 0, maxProgress: 1, rewardXP: 800 },
  { id: "a8", title: "Legend", description: "Reach Level 10 'Job Holder' rank.", icon: "Crown", category: "Exploration", unlocked: false, progress: 4, maxProgress: 10, rewardXP: 2500 },
];

export const MOCK_BOSSES: Boss[] = [
  {
    id: "memory-leak-dragon",
    name: "Memory Leak Dragon",
    title: "Overlord of Unfreed Heap Memory",
    hp: 100,
    maxHp: 100,
    difficulty: "Normal",
    avatar: "🐉",
    rewardXP: 600,
    rewardCoins: 200,
    lootItem: "Double XP Scroll",
    lore: "Born from forgotten malloc() calls in legacy C codebases, the Memory Leak Dragon consumes all available RAM until the OS panics.",
    weakness: "Explicit free() & Smart Pointers",
    requiredSkills: ["C Pointers", "Heap Allocation"],
    questions: [
      {
        question: "The Dragon strikes with a Memory Leak! How do you prevent heap exhaustion?",
        options: ["Call free(ptr) and set ptr = NULL", "Delete the pointer declaration", "Restart the computer", "Use stack variables only"],
        correctIndex: 0,
        damage: 35
      },
      {
        question: "The Dragon breathes Dangling Pointers! What is a dangling pointer?",
        options: ["A pointer initialized to NULL", "A pointer referencing freed memory", "A pointer that points to a function", "An array index out of bounds"],
        correctIndex: 1,
        damage: 35
      },
      {
        question: "Final Strike! What does malloc(10 * sizeof(int)) allocate?",
        options: ["10 bits", "10 bytes", "Memory for 10 integers", "An array of 10 float values"],
        correctIndex: 2,
        damage: 30
      }
    ]
  },
  {
    id: "pointer-phantom",
    name: "Pointer Phantom",
    title: "Spectral Entity of Invalid Addresses",
    hp: 120,
    maxHp: 120,
    difficulty: "Hard",
    avatar: "👻",
    rewardXP: 850,
    rewardCoins: 300,
    lootItem: "Memory Crystal",
    lore: "Haunting null memory locations, this phantom triggers instant SIGSEGV crashes for unwary programmers.",
    weakness: "NULL Checks & Bounds Verification",
    requiredSkills: ["Pointer Arithmetic", "Buffer Protection"],
    questions: [
      {
        question: "The Phantom casts Segmentation Fault! What causes this error?",
        options: ["Accessing restricted or invalid memory addresses", "Syntax error in loop construct", "Dividing an integer by 2", "Missing semicolon"],
        correctIndex: 0,
        damage: 40
      },
      {
        question: "Dereferencing NULL pointer! What happens?",
        options: ["Returns 0", "Crashes with a crash/segfault", "Allocates new memory", "Converts to string"],
        correctIndex: 1,
        damage: 40
      },
      {
        question: "What is pointer arithmetic on int *ptr; ptr++?",
        options: ["Increments address by 1 byte", "Increments address by sizeof(int) bytes", "Increments value of int by 1", "No effect"],
        correctIndex: 1,
        damage: 40
      }
    ]
  },
  {
    id: "recursion-hydra",
    name: "Recursion Hydra",
    title: "Multi-Headed Beast of Infinite Stack Call Depth",
    hp: 150,
    maxHp: 150,
    difficulty: "Hard",
    avatar: "🐍",
    rewardXP: 1100,
    rewardCoins: 400,
    lootItem: "Golden Scholar Badge",
    lore: "With every function call without a base condition, two new call frames sprout from its infinite heads.",
    weakness: "Base Conditions & Tail Call Optimization",
    requiredSkills: ["Recursion Depth", "Call Stack"],
    questions: [
      {
        question: "The Hydra spawns infinite call frames! How do you stop a stack overflow?",
        options: ["Define a valid base condition", "Increase RAM size", "Use multi-threading", "Use global variables"],
        correctIndex: 0,
        damage: 50
      },
      {
        question: "Tail Call Optimization prevents which problem?",
        options: ["Memory leaks", "Growing call stack frames recursively", "Data race conditions", "Deadlocks"],
        correctIndex: 1,
        damage: 50
      },
      {
        question: "What is the time complexity of naive recursive Fibonacci?",
        options: ["O(N)", "O(N log N)", "O(2^N)", "O(1)"],
        correctIndex: 2,
        damage: 50
      }
    ]
  },
  {
    id: "deadlock-titan",
    name: "Deadlock Titan",
    title: "Monolith of Mutual Exclusion & Circular Wait",
    hp: 200,
    maxHp: 200,
    difficulty: "Nightmare",
    avatar: "🗿",
    rewardXP: 1500,
    rewardCoins: 600,
    lootItem: "Legendary Mastery Rune",
    lore: "Locking resources in circular dependency chains, the Titan freezes execution loops indefinitely.",
    weakness: "Resource Hierarchy & Banker's Algorithm",
    requiredSkills: ["OS Mutex Locks", "Concurrency"],
    questions: [
      {
        question: "Which of the following is NOT one of Coffman's 4 deadlock conditions?",
        options: ["Mutual Exclusion", "Hold and Wait", "Preemption Allowed", "Circular Wait"],
        correctIndex: 2,
        damage: 70
      },
      {
        question: "Banker's Algorithm is used for what purpose?",
        options: ["Deadlock Prevention / Avoidance", "Memory Defragmentation", "CPU Cache Flushing", "Database Indexing"],
        correctIndex: 0,
        damage: 70
      },
      {
        question: "What diagram detects deadlocks in single-resource systems?",
        options: ["Resource Allocation Graph (RAG) with cycles", "Venn Diagram", "State Machine Diagram", "UML Class Diagram"],
        correctIndex: 0,
        damage: 60
      }
    ]
  },
  {
    id: "stack-overflow-giant",
    name: "Stack Overflow Giant",
    title: "Behemoth of Exceeded Call Frame Limits",
    hp: 220,
    maxHp: 220,
    difficulty: "Nightmare",
    avatar: "🧌",
    rewardXP: 1800,
    rewardCoins: 750,
    lootItem: "Infinite Stack Crystal",
    lore: "Crushing memory stack frames under heavy local array buffers.",
    weakness: "Heap Allocation & Iterative Loops",
    requiredSkills: ["Stack Frames", "Buffer Limits"],
    questions: [
      {
        question: "Which memory region holds function local variables?",
        options: ["Call Stack", "Heap", "BSS Segment", "Text Segment"],
        correctIndex: 0,
        damage: 75
      },
      {
        question: "How do you avoid crashing when allocating a 100MB array?",
        options: ["Allocate on the Heap using malloc", "Declare as local variable on Stack", "Use inline assembly", "Increase CPU clock speed"],
        correctIndex: 0,
        damage: 75
      },
      {
        question: "What happens when stack memory collides with heap memory?",
        options: ["Stack Overflow / Out of Memory Crash", "Speeds up CPU", "Garbage collection triggers", "No effect"],
        correctIndex: 0,
        damage: 70
      }
    ]
  },
  {
    id: "race-condition-ninja",
    name: "Race Condition Ninja",
    title: "Shadow Assassin of Non-Deterministic Execution",
    hp: 250,
    maxHp: 250,
    difficulty: "Legendary",
    avatar: "🥷",
    rewardXP: 2200,
    rewardCoins: 900,
    lootItem: "Atomic Mutex Scroll",
    lore: "Striking when two threads access shared data concurrently without atomic locks.",
    weakness: "Semaphores & Atomic Operations",
    requiredSkills: ["Multithreading", "Atomic Variables"],
    questions: [
      {
        question: "What is a Critical Section in concurrent programming?",
        options: ["Code segment accessing shared mutable resources", "A syntax error block", "The main entry point", "Hardware RAM chip"],
        correctIndex: 0,
        damage: 85
      },
      {
        question: "Which synchronization primitive allows up to N threads access?",
        options: ["Counting Semaphore", "Mutex Lock", "Spinlock", "Volatile variable"],
        correctIndex: 0,
        damage: 85
      },
      {
        question: "What does an Atomic operation guarantee?",
        options: ["Executes as an indivisible single step without interruption", "Fast CPU cache execution", "Automatic memory deallocation", "Encryption"],
        correctIndex: 0,
        damage: 80
      }
    ]
  },
  {
    id: "garbage-collector-king",
    name: "Garbage Collector King",
    title: "Monarch of Stop-The-World Latency Spikes",
    hp: 300,
    maxHp: 300,
    difficulty: "Legendary",
    avatar: "👑",
    rewardXP: 2500,
    rewardCoins: 1200,
    lootItem: "Zero GC Rune",
    lore: "Pausing application execution threads while scanning object reference graphs.",
    weakness: "Object Pooling & Generational GC tuning",
    requiredSkills: ["JVM GC Tuning", "Object Lifecycles"],
    questions: [
      {
        question: "What is a 'Stop-The-World' pause in GC?",
        options: ["Execution of application threads is paused while GC cleans memory", "The server shuts down", "Disk read/write failure", "Network loss"],
        correctIndex: 0,
        damage: 100
      },
      {
        question: "In Generational GC, where are newly instantiated objects allocated?",
        options: ["Eden Space (Young Generation)", "Tenured / Old Generation", "Metaspace", "Stack"],
        correctIndex: 0,
        damage: 100
      },
      {
        question: "What reduces GC overhead in high-throughput systems?",
        options: ["Reusing objects with Object Pools", "Allocating millions of short-lived objects", "Disabling heap limits", "Increasing CPU cores"],
        correctIndex: 0,
        damage: 100
      }
    ]
  }
];

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: "Alex V.", avatar: "⚡", title: "Job Holder", weeklyXP: 14200, level: 8 },
  { rank: 2, name: "CyberNinja", avatar: "🥷", title: "Interview Slayer", weeklyXP: 12850, level: 7 },
  { rank: 3, name: "DevWizard", avatar: "🧙‍♂️", title: "Expert", weeklyXP: 11400, level: 6 },
  { rank: 4, name: "You (PixelHero)", avatar: "🚀", title: "Scholar", weeklyXP: 9850, level: 4, isUser: true },
  { rank: 5, name: "Sophia Code", avatar: "👩‍💻", title: "Apprentice", weeklyXP: 8200, level: 3 },
  { rank: 6, name: "ByteStorm", avatar: "🌪️", title: "Apprentice", weeklyXP: 6900, level: 3 },
  { rank: 7, name: "KernelPanic", avatar: "🤖", title: "Student", weeklyXP: 4500, level: 2 },
];

export const MOCK_GUILD_MEMBERS: GuildMember[] = [
  { name: "PixelHero (You)", role: "Officer", level: 4, avatar: "🚀", status: "online", isReady: true },
  { name: "Chetan (Party Leader)", role: "Leader", level: 9, avatar: "👑", status: "in-raid", isReady: true },
  { name: "Alex Code", role: "Officer", level: 7, avatar: "🔥", status: "online", isReady: true },
  { name: "SyntaxSlayer", role: "Member", level: 5, avatar: "⚔️", status: "offline", isReady: false },
  { name: "ByteWitch", role: "Member", level: 3, avatar: "🔮", status: "online", isReady: true },
];

export const MOCK_AI_MENTOR_MODES: AIMentorMode[] = [
  {
    id: "teacher",
    name: "Teacher",
    description: "Explains concepts deeply with rich context and comprehensive examples.",
    avatar: "👩‍🏫",
    accentColor: "#00F0FF",
    badge: "Comprehensive",
    greeting: "Hello Scholar! I am your Professor mentor. Let's break down concepts thoroughly with deep architectural insight."
  },
  {
    id: "exam",
    name: "Exam Mode",
    description: "Strictly asks technical verification questions to prepare you for tests.",
    avatar: "🎯",
    accentColor: "#FF007F",
    badge: "Testing",
    greeting: "Exam Mode engaged. I will test your retention with precise technical verification questions."
  },
  {
    id: "interviewer",
    name: "Interviewer",
    description: "Conducts FAANG-style mock technical interviews and evaluates algorithms.",
    avatar: "💼",
    accentColor: "#7000FF",
    badge: "FAANG Mock",
    greeting: "Welcome to your mock interview session. Explain your approach before writing any code."
  },
  {
    id: "rubber-duck",
    name: "Rubber Duck",
    description: "Interactive debugging companion that guides your step-by-step logic.",
    avatar: "🦆",
    accentColor: "#F59E0B",
    badge: "Debugging",
    greeting: "Quack! Tell me line by line what your code is supposed to do, and we'll spot the bug together."
  },
  {
    id: "strict",
    name: "Strict Professor",
    description: "Gives minimal hints and demands exact precision in technical answers.",
    avatar: "🧐",
    accentColor: "#EF4444",
    badge: "No Excuses",
    greeting: "No hand-holding here. Give exact, precise definitions or go back to the documentation."
  },
  {
    id: "buddy",
    name: "Friendly Buddy",
    description: "Uses intuitive analogies, simple language, and enthusiastic encouragement.",
    avatar: "🤖",
    accentColor: "#10B981",
    badge: "Encouraging",
    greeting: "Hey friend! Learning this stuff is super fun. Let's conquer this topic together step-by-step!"
  }
];

export const MOCK_CAREER_GOALS: CareerGoal[] = [
  {
    id: "swe",
    title: "Software Engineer",
    description: "Master algorithms, system design, data structures, and object-oriented development.",
    icon: "💻",
    readinessPercentage: 78,
    completedSkills: ["Data Structures", "C Pointers", "Java OOP", "Git Version Control"],
    missingSkills: ["System Design", "Distributed Systems", "CI/CD Pipelines"],
    recommendedNextSkill: "Distributed Systems & Load Balancing",
    estimatedInterviewReadiness: "Strong (Ready for Level 2 Interviews)",
    recommendedQuest: {
      title: "Conquer Concurrency Deadlocks",
      bossName: "Deadlock Titan",
      rewardXP: 500,
      rewardSkill: "Operating Systems Mastery"
    }
  },
  {
    id: "ai-eng",
    title: "AI Engineer",
    description: "Build LLM applications, neural networks, PyTorch pipelines, and RAG architectures.",
    icon: "🧠",
    readinessPercentage: 84,
    completedSkills: ["Python Data Science", "Linear Algebra", "Transformers & LLMs", "Neural Networks"],
    missingSkills: ["Vector DB Indexing", "Model Fine-tuning (LoRA)", "TensorRT Optimization"],
    recommendedNextSkill: "Vector Database Indexing & HNSW Graphs",
    estimatedInterviewReadiness: "FAANG Ready",
    recommendedQuest: {
      title: "Master Garbage Collection Pauses",
      bossName: "Garbage Collector King",
      rewardXP: 750,
      rewardSkill: "Model Latency Optimization"
    }
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Statistical modeling, SQL queries, machine learning, and data visualization.",
    icon: "📊",
    readinessPercentage: 65,
    completedSkills: ["Python Data Science", "Probability & Statistics", "SQL Queries"],
    missingSkills: ["A/B Testing", "Spark Distributed Analytics", "Feature Engineering"],
    recommendedNextSkill: "Apache Spark & Distributed Data",
    estimatedInterviewReadiness: "Moderate",
    recommendedQuest: {
      title: "Conquer SQL & DBMS Indexes",
      bossName: "Deadlock Titan",
      rewardXP: 450,
      rewardSkill: "DBMS Query Tuning"
    }
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Engineer",
    description: "Network security, buffer overflow exploits, cryptography, and penetration testing.",
    icon: "🛡️",
    readinessPercentage: 58,
    completedSkills: ["Networking TCP/IP", "C Buffer Overflows", "Linux System Calls"],
    missingSkills: ["Cryptography Protocols", "Malware Reverse Engineering", "SIEM Monitoring"],
    recommendedNextSkill: "Buffer Overflow Exploit Mitigation",
    estimatedInterviewReadiness: "Developing",
    recommendedQuest: {
      title: "Defeat Race Condition Vulnerabilities",
      bossName: "Race Condition Ninja",
      rewardXP: 600,
      rewardSkill: "Race Attack Mitigation"
    }
  }
];

export const MOCK_MEMORY_TOPICS: MemoryTopic[] = [
  { id: "m1", title: "Pointer Arithmetic & Memory Addresses", subject: "Computer Science", lastReviewedDaysAgo: 1, retentionHealth: 92, status: "Strong", nextReviewDate: "In 3 Days" },
  { id: "m2", title: "Stack vs Heap Dynamic Allocation", subject: "Computer Science", lastReviewedDaysAgo: 2, retentionHealth: 85, status: "Strong", nextReviewDate: "In 2 Days" },
  { id: "m3", title: "Coffman Deadlock Conditions", subject: "Operating Systems", lastReviewedDaysAgo: 5, retentionHealth: 55, status: "Review Due", nextReviewDate: "Today" },
  { id: "m4", title: "TCP 3-Way Handshake SYN/ACK", subject: "Networking", lastReviewedDaysAgo: 7, retentionHealth: 38, status: "Forgotten", nextReviewDate: "Overdue" },
  { id: "m5", title: "Neural Network Backpropagation", subject: "Machine Learning", lastReviewedDaysAgo: 1, retentionHealth: 96, status: "Strong", nextReviewDate: "In 5 Days" },
];

export const MOCK_COMPANY_ARENAS: CompanyArena[] = [
  {
    id: "google",
    name: "Google",
    logo: "🌐",
    difficulty: "Extreme",
    rewardXP: 1000,
    expectedSkills: ["Graph Algorithms", "Dynamic Programming", "System Scalability"],
    description: "Test your algorithmic rigor against Google-style graph optimization & dynamic programming challenges.",
    questions: [
      {
        id: "g1",
        question: "What is the time complexity of Dijkstra's algorithm with a Fibonacci Heap?",
        options: ["O(V^2)", "O(E + V log V)", "O(E log V)", "O(V log E)"],
        correctIndex: 1,
        explanation: "Using a Fibonacci heap reduces the decrease-key operation to amortized O(1), yielding O(E + V log V)."
      },
      {
        id: "g2",
        question: "In distributed system design, what does the CAP Theorem state?",
        options: [
          "You can only guarantee 2 out of 3: Consistency, Availability, Partition Tolerance",
          "CPU, Memory, and Disk cannot be scaled simultaneously",
          "Caching always guarantees 100% data consistency",
          "None of the above"
        ],
        correctIndex: 0,
        explanation: "CAP theorem states a distributed store can provide at most two guarantees from Consistency, Availability, and Partition Tolerance."
      }
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "🪟",
    difficulty: "Hard",
    rewardXP: 800,
    expectedSkills: ["Object-Oriented Design", "OS Memory", "Trees & Graphs"],
    description: "Focus on clean OOP architecture, system internals, and tree traversal algorithms.",
    questions: [
      {
        id: "ms1",
        question: "Which OOP principle allows a subclass to provide a specific implementation of a parent method?",
        options: ["Polymorphism", "Encapsulation", "Abstraction", "Aggregation"],
        correctIndex: 0,
        explanation: "Polymorphism (specifically method overriding) enables dynamic dispatch of subclass implementations."
      }
    ]
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "📦",
    difficulty: "Hard",
    rewardXP: 850,
    expectedSkills: ["Leadership Principles", "Data Structures", "System Design"],
    description: "Combines data structure efficiency with scalable microservices architecture.",
    questions: [
      {
        id: "amz1",
        question: "Which data structure is optimal for implementing an LRU Cache with O(1) ops?",
        options: ["HashMap + Doubly Linked List", "Binary Search Tree", "Array", "Stack"],
        correctIndex: 0,
        explanation: "Combining a HashMap for O(1) lookup with a Doubly Linked List for O(1) node eviction gives O(1) LRU Cache operations."
      }
    ]
  }
];

export const MOCK_ROADMAP_NODES: RoadmapNode[] = [
  { id: "r1", title: "1. Python & Fundamentals", estimatedHours: 15, xpRequired: 0, difficulty: "Beginner", status: "unlocked", description: "Control flow, data structures, and object orientation in Python." },
  { id: "r2", title: "2. Linear Algebra & Calculus", estimatedHours: 20, xpRequired: 300, difficulty: "Beginner", status: "unlocked", description: "Vectors, matrices, dot products, derivatives, gradient descent." },
  { id: "r3", title: "3. Machine Learning Core", estimatedHours: 30, xpRequired: 600, difficulty: "Intermediate", status: "current", description: "Supervised & unsupervised learning, scikit-learn, evaluation metrics." },
  { id: "r4", title: "4. Deep Learning & PyTorch", estimatedHours: 40, xpRequired: 1000, difficulty: "Advanced", status: "locked", description: "Tensors, backpropagation, CNNs, Transformers, and PyTorch." },
  { id: "r5", title: "5. Large Language Models & RAG", estimatedHours: 35, xpRequired: 1500, difficulty: "Advanced", status: "locked", description: "LangChain, LlamaIndex, Vector DBs, fine-tuning, and prompt engineering." },
  { id: "r6", title: "6. Production AI Deployment", estimatedHours: 25, xpRequired: 2000, difficulty: "Advanced", status: "locked", description: "ONNX, FastAPI, Docker, and TensorRT inference serving." }
];
