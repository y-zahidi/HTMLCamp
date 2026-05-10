# HTMLCamp

> Interactive web-development learning platform — PHP / MySQL backend, JavaScript front-end, Monaco editor, optional CodeLlama assistant. Built during the 2025–2026 academic year as a practical exercise in shipping a full LAMP application end-to-end.

![status](https://img.shields.io/badge/status-active-5cf2c1?labelColor=0a0e14)
![license](https://img.shields.io/badge/license-proprietary-5cf2c1?labelColor=0a0e14)
![php](https://img.shields.io/badge/php-8.2-5cf2c1?labelColor=0a0e14)
![mysql](https://img.shields.io/badge/mysql-8.0-5cf2c1?labelColor=0a0e14)

**Live demo:** <https://htmlcamp.free.nf>

## What it is

A self-paced course platform. A user signs up, browses courses (HTML, CSS, JS, PHP, Python, React, Node, SQL, Git), reads lessons, runs code in a Monaco editor right next to the lesson, and gets contextual hints from a CodeLlama-powered assistant when stuck. Progress, exercises and a small gamification layer (points, badges, streaks) sit on top.

This repo is a **portfolio mirror** — it contains the architecture write-up, screenshots and selected code samples. The full source is private.

## Why I built it

A real product to practice on, not a CRUD demo:

- **Full-stack realism.** Auth, sessions, RBAC, CSRF, prepared statements, file uploads, rate limiting — the surface area of a real app.
- **AI integration that's not hype.** A small, scoped LLM call (CodeLlama via HuggingFace), cached, with lesson context — not a "ChatGPT widget".
- **Live deployment.** Real users hit the URL above; cache, traffic spikes, free-tier outages are part of the package.

## Stack

- **Backend** — PHP 8.2, MVC layout, RESTful endpoints, MySQL 8 with prepared statements everywhere.
- **Frontend** — vanilla JS (ES6+), HTML5, CSS3, Monaco editor (the same engine VS Code uses), Chart.js for analytics.
- **AI** — CodeLlama via HuggingFace inference, with a small caching layer to keep latency tolerable on the free tier.
- **Hosting** — InfinityFree (demo). Real production would be a $5 VPS + Cloudflare in front; the architecture supports it.

## Architecture

```
┌────────────────────────────────────────┐
│  Browser — Monaco editor + Chart.js    │
└──────────────┬─────────────────────────┘
               │   AJAX / fetch
┌──────────────▼─────────────────────────┐
│  PHP 8.2 — MVC, REST endpoints,        │
│  session + CSRF + rate limit           │
└──────────────┬─────────────────────────┘
               │              │
        ┌──────▼──────┐  ┌────▼────────────┐
        │ MySQL 8     │  │ HuggingFace API │
        │ users,      │  │ CodeLlama       │
        │ courses,    │  │ (cached)        │
        │ progress    │  └─────────────────┘
        └─────────────┘
```

Detail: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/TECHNOLOGIES.md`](docs/TECHNOLOGIES.md).

## What you can try in the live demo

- Register and log in.
- Browse the course catalogue (9 technologies).
- Open a lesson — the right-hand pane is a Monaco editor that runs your code live.
- Ask the assistant a question; it reads the current lesson context.
- Open the dashboard for your progress, points, streak.

The free-tier hosting is slow on cold start. Reload once, then it's fine.

## Code samples

```javascript
// AI chat — context-aware, lesson-scoped
async function sendMessage(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, context: getCurrentCourse() }),
  });
  const data = await response.json();
  displayAIResponse(data.response);
}
```

```php
// Progress aggregation for the dashboard
function calculateUserProgress(int $userId): array {
    return [
        'lessons_completed' => getLessonsCompleted($userId),
        'exercises_solved'  => getExercisesSolved($userId),
        'total_points'      => getTotalPoints($userId),
        'current_streak'    => calculateStreak($userId),
        'mastery_level'     => calculateMasteryLevel($userId),
    ];
}
```

More: [`code-snippets/`](code-snippets/).

## Roadmap

- [x] Auth, courses, lessons, Monaco editor, AI assistant, dashboard, gamification.
- [ ] RAG over the course content (cleaner answers than raw CodeLlama).
- [ ] Collaborative coding rooms (WebRTC).
- [ ] Native mobile shell (React Native or Capacitor).
- [ ] Certificate generation per completed track.

## License

Proprietary. The mirror is here for portfolio and learning purposes; the source isn't redistributable.

— Yassir Zahidi · Rabat, Morocco · [portfolio](https://y-zahidi.github.io) · [linkedin](https://www.linkedin.com/in/yassir-zahidi/)
