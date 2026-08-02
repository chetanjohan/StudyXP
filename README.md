<div align="center">

<img src="https://img.shields.io/badge/StudyXP-RPG%20Learning%20Platform-cyan?style=for-the-badge&logo=gamepad2&logoColor=white" alt="StudyXP" />

# 🎮 StudyXP

### *Turn Every Syllabus into an Adventure*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State%20Management-orange?style=flat-square)](https://zustand-demo.pmnd.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

**StudyXP** is a gamified RPG learning platform that transforms your course syllabus into an immersive adventure. Upload a PDF, gain XP, battle unit bosses, unlock skills, and level up as you master your coursework.

[🚀 Live Demo](#) · [📖 Documentation](#) · [🐛 Report Bug](https://github.com/chetanjohan/StudyXP/issues) · [✨ Request Feature](https://github.com/chetanjohan/StudyXP/issues)

</div>

---

## ✨ Features

### 🗺️ Adventure Creator
- **Syllabus-driven learning** — Upload any PDF syllabus and StudyXP generates your entire adventure blueprint
- **AI-powered parsing** — Gemini AI extracts topics, learning objectives, and difficulty curves
- **Difficulty modes** — Casual, Normal, Hardcore, and Legend tiers

### 🧙 RPG Progression System
- **XP & Leveling** — Earn experience points for completing lessons, quizzes, and challenges
- **Skill Tree** — Unlock abilities and branches as you progress through your syllabus
- **Achievements** — Earn badges and titles for academic milestones
- **Inventory** — Collect study items, power-ups, and learning artifacts

### ⚔️ Boss Battles
- **Unit Overlord Bosses** — Each syllabus unit culminates in a boss battle quiz
- **Adaptive difficulty** — Questions scale based on your performance history
- **XP rewards** — Defeat bosses to unlock the next chapter of your adventure

### 🧠 Study Modes
- **Flashcards** — Spaced repetition learning cards generated from your syllabus
- **Quests** — Daily and weekly challenge assignments
- **Memory Palace** — Visual memory training games
- **Mastery Tracker** — Topic-level confidence scoring

### 👥 Social & Competitive
- **Guild System** — Form study groups and tackle challenges together
- **Leaderboards** — Compete with classmates on XP rankings
- **Party Quests** — Collaborative group study missions
- **Real-time Party Chat** — Built on Supabase real-time

### 🤖 AI Mentor
- **Gemini AI integration** — Ask your AI mentor anything about your syllabus
- **Contextual hints** — Smart hints tied to your current lesson topic
- **Interview Readiness Coach** — AI-generated mock interview questions from your course content

---

## 📸 Screenshots

> *Coming soon — screenshots will be added after the first public release.*

| Login | Dashboard | Skill Tree |
|-------|-----------|------------|
| ![Login]() | ![Dashboard]() | ![Skill Tree]() |

| Create Adventure | Boss Battle | Flashcards |
|------------------|-------------|------------|
| ![Create]() | ![Boss]() | ![Flashcards]() |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Variables |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL + RLS) |
| **AI** | [Google Gemini API](https://ai.google.dev/) |
| **Animations** | CSS Keyframes + Canvas API |
| **Testing** | [Vitest](https://vitest.dev/) + React Testing Library |
| **Deployment** | [Vercel](https://vercel.com/) *(recommended)* |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [Supabase](https://supabase.com/) account (free tier works)
- A [Google Gemini API](https://ai.google.dev/) key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chetanjohan/StudyXP.git
   cd StudyXP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SECRET_KEY=your_supabase_service_role_key

   # Gemini AI
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up the database**

   Run the SQL migration in your Supabase project's SQL editor:
   ```bash
   # Copy and run the contents of supabase/schema.sql in the Supabase dashboard
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
StudyXP/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/
│   │   │   ├── login/          # Full-screen split auth
│   │   │   └── signup/         # Character creation
│   │   ├── dashboard/          # Main game dashboard
│   │   ├── skill-tree/         # Visual skill progression
│   │   ├── create-adventure/   # Syllabus upload & adventure creation
│   │   ├── boss-battles/       # Unit quiz boss fights
│   │   ├── flashcards/         # Spaced repetition study
│   │   ├── quests/             # Daily & weekly missions
│   │   ├── guild/              # Social study groups
│   │   ├── leaderboard/        # XP rankings
│   │   └── api/                # Next.js API routes (Gemini AI)
│   ├── components/
│   │   ├── auth/               # AuthProvider (Supabase session)
│   │   ├── layout/             # Sidebar, Navbar, AppLayoutWrapper
│   │   └── ui/                 # ParticleCanvas, GlobalSearchModal
│   ├── lib/
│   │   ├── supabase/           # Supabase client / server / admin
│   │   └── parsers/            # Syllabus PDF parser
│   ├── services/               # Adventure generator service
│   ├── store/                  # Zustand global game state
│   ├── types/                  # TypeScript interfaces
│   └── middleware.ts           # Route protection (auth guard)
├── supabase/
│   └── schema.sql              # Database migrations & RLS policies
├── .env.local                  # ⚠️ Never committed — local secrets only
└── .gitignore
```

---

## 🗺️ Roadmap

- [x] ✅ Core RPG UI — Sidebar, Navbar, XP/Level system
- [x] ✅ Supabase Auth — Email/password + persistent sessions
- [x] ✅ Adventure Creator — Syllabus PDF upload + AI parsing
- [x] ✅ Skill Tree — Visual topic progression
- [x] ✅ Boss Battles — Unit quiz system
- [x] ✅ Flashcards — Spaced repetition
- [x] ✅ AI Mentor — Gemini-powered Q&A
- [x] ✅ Guild & Leaderboard
- [ ] 🔜 Google OAuth login
- [ ] 🔜 Mobile-responsive layout
- [ ] 🔜 Vercel deployment pipeline
- [ ] 🔜 PDF export of progress reports
- [ ] 🔜 Multiplayer Boss Raids
- [ ] 🔜 Native mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to your branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style (TypeScript strict mode)
- Write tests for new features using Vitest
- Keep components focused and reusable
- Never commit `.env.local` or any secrets

---

## 🛡️ Security

- All secrets are stored in `.env.local` (never committed)
- Supabase Row Level Security (RLS) enforced on all tables
- Authentication routes protected by Next.js middleware
- Service role key only used server-side in API routes

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ and ☕ by [@chetanjohan](https://github.com/chetanjohan)

*Level up your studies. One syllabus at a time.* 🎮

</div>
