<div align="center">

# 🚀 HTMLCamp

### Interactive Web Development Learning Platform

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-htmlcamp.free.nf-brightgreen?style=for-the-badge)](https://htmlcamp.free.nf/)
[![Status](https://img.shields.io/badge/Status-In_Development-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](LICENSE)
[![CI](https://github.com/y-zahidi/HTMLCamp/actions/workflows/ci.yml/badge.svg)](https://github.com/y-zahidi/HTMLCamp/actions/workflows/ci.yml)

**A modern, full-featured e-learning platform designed to teach web development through interactive lessons, real-time code editing, and AI-powered assistance.**

[🌐 Live Demo](https://htmlcamp.free.nf/) • [📸 Screenshots](screenshots/) • [📚 Docs](docs/) • [💻 Code](code-snippets/)

</div>

---

## 🔗 Quick Access

| Resource | Description | Link |
|----------|-------------|------|
| 🌐 **Live Platform** | Try the platform yourself | **[htmlcamp.free.nf](https://htmlcamp.free.nf/)** |
| 📸 **Screenshots** | Visual showcase | [View Gallery](screenshots/) |
| 🏗️ **Architecture** | System design documentation | [Read More](docs/ARCHITECTURE.md) |
| 💻 **Code Samples** | Implementation examples | [View Snippets](code-snippets/) |
| 📚 **Tech Stack** | Technologies & justifications | [Read More](docs/TECHNOLOGIES.md) |

---

## 🌐 Live Demonstration

### **Experience HTMLCamp**: [https://htmlcamp.free.nf/](https://htmlcamp.free.nf/)

The platform is fully functional and deployed for hands-on exploration.

### What You Can Test

✅ **User Registration** - Create your account and get started  
✅ **Course Catalog** - Browse 9 technologies with 46+ courses  
✅ **Interactive Lessons** - Learn with rich, structured content  
✅ **Monaco Code Editor** - Professional editing powered by VS Code  
✅ **AI Code Assistant** - Real-time help from CodeLlama  
✅ **Progress Dashboard** - Track your learning journey with analytics  
✅ **Exercise System** - Practice with coding challenges  
✅ **Gamification** - Earn points, badges, and climb the leaderboard  

### Demo Environment

> **Hosting**: Free tier demonstration deployment  
> **Purpose**: Portfolio showcase and testing  
> **Note**: Performance optimized for demo. Production would use dedicated infrastructure.  
> **Data**: May be reset periodically for maintenance

---

## 📚 Project Overview

HTMLCamp is an advanced web development learning platform that combines traditional coursework with modern AI assistance and interactive coding environments. The platform was **developed during the 2025-2026 academic year for educational purposes** and continues to evolve with new features and improvements.

### Key Highlights

- **Full-Stack Application**: PHP backend, JavaScript frontend, MySQL database
- **AI Integration**: CodeLlama model for intelligent programming assistance
- **Professional Tools**: Monaco Editor (VS Code engine) for code editing
- **Real-Time Analytics**: Chart.js powered dashboards and progress tracking
- **Gamification**: Points, achievements, and competitive leaderboards
- **Modern Architecture**: Clean separation of concerns, secure by design

**Important**: This is a **proprietary project** currently in active development. The full source code is not publicly available. This repository serves as a **portfolio showcase** with selected code snippets, comprehensive documentation, and a [live demonstration](https://htmlcamp.free.nf/).

---

## ✨ Key Features

### 📚 **Comprehensive Course System**
- Structured learning paths across 9 web technologies
- Progressive difficulty levels (Beginner → Intermediate → Advanced)
- 46+ courses with 200+ detailed lessons
- Real-world project-based learning

### 💻 **Advanced Code Editor**
- Monaco Editor integration (VS Code engine)
- Syntax highlighting for 50+ languages
- IntelliSense auto-completion
- Live code preview and execution
- Built-in JavaScript console
- Dark/Light theme switching

### 🤖 **AI-Powered Learning Assistant**
- CodeLlama integration for intelligent help
- Context-aware programming assistance
- Code error detection and suggestions
- Natural language code explanations
- 24/7 availability for student support

### 📊 **Analytics & Progress Tracking**
- Detailed learning analytics dashboard
- Technology-specific progress visualization
- Activity heatmaps and streak tracking
- Performance metrics and insights
- Comparative leaderboard system

### 🎮 **Gamification**
- Points and XP system
- Achievement badges
- Level progression
- Global and course-specific leaderboards
- Daily streak rewards

### 🔐 **Robust Security**
- Secure authentication system
- Session management with httpOnly cookies
- CSRF protection on all forms
- SQL injection prevention (prepared statements)
- XSS filtering and input validation
- Rate limiting on API endpoints

---

## 🛠️ Tech Stack

### **Backend**
- **PHP 8.2+** - Server-side logic and API endpoints
- **MySQL 8.0** - Relational database management
- **Composer** - Dependency management

### **Frontend**
- **JavaScript (ES6+)** - Interactive features and dynamic content
- **HTML5 & CSS3** - Modern, responsive layouts
- **Monaco Editor** - Professional code editing experience
- **Chart.js** - Data visualization and analytics

### **AI Integration**
- **HuggingFace API** - CodeLlama model hosting
- **Custom Caching** - Optimized AI response times
- **Context System** - Lesson-aware assistance

### **Development**
- **XAMPP** - Local development environment
- **Git** - Version control
- **npm** - Frontend package management

---

## 📸 Screenshots

### Live Platform Interface

> 🌐 **See it yourself**: [htmlcamp.free.nf](https://htmlcamp.free.nf/)

*Screenshots showcase actual platform features from the live deployment*

---

## 🏗️ Architecture Overview

### System Design

```
┌─────────────────────────────────────┐
│         Client Layer                 │
│  (Browser / Mobile / Tablet)        │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│      Application Layer               │
│  ┌──────────────────────────────┐  │
│  │  PHP Backend                  │  │
│  │  - MVC Architecture           │  │
│  │  - RESTful API                │  │
│  │  - Session Management         │  │
│  └──────────────────────────────┘  │
│                                      │
│  ┌──────────────────────────────┐  │
│  │  Frontend (JavaScript)        │  │
│  │  - Monaco Editor              │  │
│  │  - Chart.js Analytics         │  │
│  │  - AJAX Communication         │  │
│  └──────────────────────────────┘  │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│         Data Layer                   │
│  - MySQL 8.0 Database               │
│  - File-based Caching               │
│  - Session Storage                  │
└──────────────────────────────────────┘
```

**Detailed Documentation**: [Architecture Guide](docs/ARCHITECTURE.md)

---

## 💡 Core Functionality

### Learning System Flow
```
1. Browse course catalog by technology
2. Enroll in structured learning path
3. Complete interactive lessons with code examples
4. Practice with coding exercises
5. Track progress on analytics dashboard
6. Earn points and unlock achievements
7. Get AI assistance when needed
```

### AI Assistant Capabilities
- **Code Explanation**: Break down complex code
- **Error Debugging**: Identify and explain mistakes
- **Best Practices**: Suggest improvements
- **Code Generation**: Help with boilerplate
- **Concept Clarification**: Explain programming concepts

### Exercise System
- Multiple choice questions
- Code completion challenges
- Bug fixing exercises
- Project-based challenges
- Automated testing with instant feedback

---

## 📊 Platform Statistics

- **9 Technologies**: HTML, CSS, JavaScript, PHP, Python, React, Node.js, SQL, Git
- **46+ Courses**: Beginner to Advanced levels
- **200+ Lessons**: Comprehensive learning content
- **150+ Exercises**: Hands-on practice challenges
- **AI-Powered**: Intelligent coding assistance
- **Multi-device**: Fully responsive design
- **🌐 Live Demo**: **[htmlcamp.free.nf](https://htmlcamp.free.nf/)**

---

## 🎓 Educational Purpose

This platform was created as part of an advanced web development curriculum, demonstrating:

- **Full-stack development** proficiency
- **Database design** and optimization
- **API architecture** and integration
- **Modern frontend** frameworks and tools
- **AI/ML integration** in web applications
- **Security best practices** implementation
- **Scalable architecture** design
- **User experience** optimization

The project showcases real-world application development including version control, documentation, testing strategies, and deployment.

---

## 🚀 Development Roadmap

### ✅ Completed Features (v1.5)
- [x] User authentication and authorization
- [x] Course and lesson management system
- [x] Interactive code editor with Monaco
- [x] AI chat assistant integration
- [x] Progress tracking and analytics
- [x] Gamification system
- [x] Responsive design
- [x] Dark mode support
- [x] Live deployment

### 🔄 In Progress (v2.0)
- [ ] Advanced RAG system for contextual AI
- [ ] Collaborative coding features
- [ ] Video lesson integration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Certificate generation system

### 📋 Planned Features (v2.5+)
- [ ] Live coding sessions
- [ ] Peer code review system
- [ ] GitHub integration
- [ ] Advanced project templates
- [ ] Multi-language support
- [ ] Instructor dashboard
- [ ] Premium subscription system

---

## 🚀 Deployment

### Live Instance

**Platform URL**: **[https://htmlcamp.free.nf/](https://htmlcamp.free.nf/)**

### Current Infrastructure
- **Hosting**: InfinityFree (Demonstration)
- **Database**: MySQL 8.0 (Remote)
- **PHP Version**: 8.2+
- **SSL**: Included

### Production Considerations

For full production deployment, the platform would utilize:
- Dedicated VPS or cloud hosting
- Redis caching layer
- CDN for static assets
- Load balancing for scalability
- Automated backups
- Comprehensive monitoring
- Database replication

---

## 💻 Code Samples

### AI Chat Integration
```javascript
async function sendMessage(message) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: message,
            context: getCurrentCourse()
        })
    });
    
    const data = await response.json();
    displayAIResponse(data.response);
}
```

### Progress Analytics
```php
function calculateUserProgress($userId) {
    $metrics = [
        'lessons_completed' => getLessonsCompleted($userId),
        'exercises_solved' => getExercisesSolved($userId),
        'total_points' => getTotalPoints($userId),
        'current_streak' => calculateStreak($userId),
        'mastery_level' => calculateMasteryLevel($userId)
    ];
    
    return $metrics;
}
```

**More examples**: [Code Snippets Directory](code-snippets/)

---

## 📚 Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)** - System design and structure
- **[Technology Stack](docs/TECHNOLOGIES.md)** - Detailed tech documentation
- **[Code Samples](code-snippets/)** - Implementation examples
- **[Screenshots](screenshots/)** - Visual showcase

---

## 🔒 License & Usage

**© 2025 HTMLCamp. All Rights Reserved.**

This project is **proprietary software** and not open source. This repository is for **portfolio and educational demonstration purposes only**.

### Permissions:
- ✅ View this repository
- ✅ Reference in portfolios and resumes
- ✅ Learn from architectural decisions
- ✅ Test the [live demo](https://htmlcamp.free.nf/)

### Restrictions:
- ❌ No commercial use
- ❌ No redistribution
- ❌ No derivative works
- ❌ No code copying

For collaboration inquiries or licensing questions, please contact the development team.

---

## 👥 Development

**Developed during the 2025-2026 academic year for educational purposes.**

The platform demonstrates advanced web development techniques and continues to evolve with ongoing improvements and feature additions.

---

## 🙏 Acknowledgments

- **Monaco Editor** by Microsoft
- **Chart.js** for data visualization
- **HuggingFace** for AI model hosting
- **CodeLlama** for intelligent assistance
- **InfinityFree** for demonstration hosting

---

## 📬 Contact

For questions about this project or collaboration opportunities:

- **Live Demo**: [htmlcamp.free.nf](https://htmlcamp.free.nf/)
- **GitHub**: This repository
- **Documentation**: [docs](docs/) folder

---

<div align="center">

**🌐 [Try HTMLCamp Live](https://htmlcamp.free.nf/) | 📸 [View Screenshots](screenshots/) | 📚 [Read Docs](docs/)**

*Made with ❤️ and countless hours of coding*

**Last Updated**: January 2025

</div>
