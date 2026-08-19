# HTMLCamp

> A live full-stack learning platform with course content, an in-browser Monaco editor, progress analytics, and a scoped lesson-aware assistant.

![Portfolio case study](https://img.shields.io/badge/status-portfolio_case_study-5cf2c1?labelColor=0a0e14)
![Live demo](https://img.shields.io/badge/live-demo-5cf2c1?labelColor=0a0e14)
![Backend](https://img.shields.io/badge/backend-PHP_8.2-5cf2c1?labelColor=0a0e14)
![Database](https://img.shields.io/badge/database-MySQL_8.0-5cf2c1?labelColor=0a0e14)

## Case file

**Live demo:** <https://htmlcamp.free.nf>

HTMLCamp is a self-paced course platform for HTML, CSS, JavaScript, PHP, Python, React, Node, SQL, and Git. A learner can browse a course, read a lesson, run code beside the explanation, ask a context-aware question, and track progress through points, badges, and streaks.

This repository is a **portfolio mirror**. The complete application source is private; the public material documents architecture, security decisions, live behavior, screenshots, and selected illustrative patterns.

## What I built

| Capability | Implementation evidence |
|:--|:--|
| **Learning flow** | Course catalogue, lesson content, exercises, progress tracking, and dashboard analytics. |
| **Interactive coding** | Monaco editor integrated beside the lesson content. |
| **Assistant** | Scoped CodeLlama request through Hugging Face, with lesson context and a small cache. |
| **Application security** | Sessions, role-based access, CSRF protection, prepared statements, uploads, and rate limiting. |
| **Backend** | PHP MVC structure, REST-style endpoints, and MySQL persistence. |
| **Deployment** | Public demo hosted on a constrained free tier, exposing real cold-start and traffic behavior. |

## Architecture

```text
Browser
  Monaco editor · Chart.js · lesson UI
        │ AJAX / fetch
        ▼
PHP application
  MVC · sessions · CSRF · rate limiting
        │                 │
        ▼                 ▼
MySQL 8              Hugging Face API
users · courses      CodeLlama, cached
progress · badges
```

For the detailed boundary map, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/TECHNOLOGIES.md`](docs/TECHNOLOGIES.md).

## Live walkthrough

1. Open the [live demo](https://htmlcamp.free.nf).
2. Register or use the available demo flow.
3. Browse the catalogue and open a lesson.
4. Run code in the Monaco editor beside the lesson.
5. Ask the assistant a lesson-scoped question.
6. Review progress, points, streaks, and mastery in the dashboard.

The free-tier host can be slow on the first request. A single reload after the cold start usually gives a better demonstration experience.

## Selected implementation patterns

```javascript
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

More selected material is available in [`code-snippets/`](code-snippets/).

## What this proves

HTMLCamp demonstrates end-to-end product delivery: authentication, stateful workflows, security controls, data modeling, client-side interaction, a bounded AI integration, and deployment under real infrastructure constraints. It is deliberately more than a CRUD screen collection.

## Roadmap

- [x] Authentication, courses, lessons, editor, assistant, dashboard, and gamification.
- [ ] Retrieval over course content for more grounded assistant responses.
- [ ] Collaborative coding rooms.
- [ ] Native mobile shell.
- [ ] Certificate generation per completed track.

## Private implementation boundary

The complete PHP, JavaScript, database, deployment, and configuration source is not redistributed. This public mirror exists to show the system design, security posture, live behavior, and selected implementation patterns.

## References

- [Live demo](https://htmlcamp.free.nf)
- [Portfolio](https://y-zahidi.github.io)
- [GitHub profile](https://github.com/y-zahidi)
- [LinkedIn](https://www.linkedin.com/in/yassir-zahidi/)
