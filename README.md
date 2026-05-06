# 💻 HTMLCamp — Interactive Web Development Learning Platform

> A modern e-learning platform for web development, with an in-browser code editor (Monaco / VS Code engine) and an AI assistant powered by **CodeLlama**.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-htmlcamp.free.nf-brightgreen?style=for-the-badge)](https://htmlcamp.free.nf/)
![Status](https://img.shields.io/badge/Status-In_Development-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)

[🌐 Live Demo](https://htmlcamp.free.nf/) · [📸 Screenshots](screenshots/) · [📚 Architecture](docs/ARCHITECTURE.md) · [💻 Code samples](code-snippets/)

---

## At a glance

HTMLCamp is a full-stack e-learning platform I built to help students learn web development the way I wish I had been taught: **with a real editor, real previews, and a real AI mentor that explains your mistakes in plain language**.

- **9 technologies** covered — HTML, CSS, JavaScript, PHP, MySQL, Git, etc.
- **46+ courses** organized in progressive learning paths (Beginner → Intermediate → Advanced)
- **Monaco editor** in the browser (the same engine as VS Code)
- **AI assistant** powered by CodeLlama for context-aware help
- **Gamification** — points, badges, leaderboard, streaks
- **Built end-to-end**: PHP backend + JavaScript frontend + MySQL database

> 🌐 **Try it live:** <https://htmlcamp.free.nf/>

---

## Why I built this

Existing online coding tutorials are either passive (read-only) or trapped behind paywalls. I wanted to ship a platform that:

1. Lets students **write actual code in the browser**, not just read about it
2. Gives them **AI feedback on their attempts** instead of "did you read the docs?"
3. Tracks **real progress with analytics**, so they can see their growth
4. Stays **free or near-free** to host (so it can be used by anyone)

This was developed during the 2025-2026 academic year and is in active development.

---

## Screenshots

| Screen | Description |
| --- | --- |
| Course catalog | Browse 9 technologies, 46+ structured courses |
| Lesson view | Rich content + integrated Monaco editor + live preview |
| AI assistant | Ask questions, get explanations and code reviews |
| Dashboard | Personal analytics, streaks, achievements |
| Leaderboard | Global ranking with weekly/monthly/all-time views |

(Full gallery in `screenshots/`)

---

## Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    Frontend (Browser)                       │
│  HTML / CSS / Vanilla JS · Monaco Editor · Chart.js         │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS / JSON
                           ▼
┌────────────────────────────────────────────────────────────┐
│                  PHP Backend (REST-ish)                     │
│   Auth · Courses · Lessons · Progress · Gamification        │
└────────┬──────────────────────────────────┬─────────────────┘
         │                                  │
         ▼                                  ▼
┌──────────────────┐             ┌─────────────────────────┐
│   MySQL          │             │   CodeLlama (LLM)       │
│   (data layer)   │             │   AI assistant API      │
└──────────────────┘             └─────────────────────────┘
```

**Why this stack:**
- **PHP** because the target hosting (free / shared) ubiquitously supports it.
- **Vanilla JS + Monaco** because the in-browser editor is the heart of the UX, and Monaco is the industry standard.
- **MySQL** because relational data (users, courses, lessons, progress, achievements) is naturally relational.
- **CodeLlama** because it's an open model with permissive licensing — no per-token costs.

Full design notes in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Tech stack

| Layer | Tech |
|-------|------|
| Frontend | HTML5, CSS3, Vanilla JavaScript, Monaco Editor, Chart.js |
| Backend | PHP 8.x |
| Database | MySQL 8.0 |
| AI | CodeLlama (self-hostable) |
| Hosting | InfinityFree (demo) — production target: VPS or PaaS |

---

## Key features

### 📚 Comprehensive course system
Structured learning paths across 9 web technologies with 46+ courses and 200+ lessons.

### 💻 Advanced code editor
Monaco editor in the browser with syntax highlighting for 50+ languages, IntelliSense auto-completion, live preview, and a built-in JavaScript console.

### 🤖 AI-powered learning assistant
CodeLlama integration that gives context-aware help, detects errors, suggests fixes, and explains code in plain language.

### 📊 Analytics & progress tracking
Per-technology progress visualization, activity heatmaps, streak tracking, performance metrics, and a competitive leaderboard.

### 🎮 Gamification
Points for completing lessons, badges for milestones, streak rewards, and weekly/monthly leaderboards.

---

## What I learned building this

- **Hosting AI on free tiers is a research project of its own.** Inference latency was the single biggest UX problem; I had to add aggressive prompt caching and a "thinking…" UI to keep the perceived response time acceptable.
- **Monaco is a beast.** The editor is amazing, but pulling in the right subset of languages (instead of the whole ~5 MB bundle) required building a small loader.
- **PHP is fine.** Modern PHP 8 with strict types and PDO prepared statements is genuinely pleasant. The bad reputation is largely outdated.
- **Schema decisions are forever.** I had to do one painful migration when I realized that "lesson progress" needed to be a separate table from "course enrollment". Worth doing the ERD on paper twice before writing the first migration.

---

## Roadmap

- [ ] Real-time collaboration (multiple students editing the same exercise)
- [ ] Instructor mode (custom courses, private cohorts)
- [ ] Mobile-first PWA shell
- [ ] Offline support for lessons
- [ ] More languages (Rust, Go, Python)

---

## License

Proprietary — full source not publicly available. This repo is a portfolio showcase with documentation, screenshots, and selected code snippets. The [live demo](https://htmlcamp.free.nf/) is open for hands-on testing.

---

## About me

I'm **Yassir Zahidi**, Computer Engineering student at ISMAGI (Rabat) with a 2-year Cybersecurity background (ISMO Tétouan). Currently looking for a **PFE / internship in cybersecurity, DevSecOps or full-stack development** for 2026.

- 🌐 [LinkedIn](https://www.linkedin.com/in/yassir-zahidi/)
- 📧 yassirzahidi8@gmail.com
- 💻 [github.com/y-zahidi](https://github.com/y-zahidi)
