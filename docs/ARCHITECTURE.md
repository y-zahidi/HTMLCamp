# HTMLCamp - System Architecture

## Overview

HTMLCamp is built on a modern three-tier architecture that separates presentation, business logic, and data storage while integrating AI capabilities through a microservice approach.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Browser    │  │    Mobile    │  │   Tablet     │      │
│  │  (Desktop)   │  │   (Phone)    │  │   (\)     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
                    ┌────────▼─────────┐
                    │   Load Balancer  │ (Future)
                    └────────┬─────────┘
                             │
┌────────────────────────────▼─────────────────────────────────┐
│                   APPLICATION LAYER                           │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Web Server (Apache/Nginx)                  │  │
│  └────────────────┬───────────────────────────────────────┘  │
│                   │                                           │
│  ┌────────────────▼──────────────┐  ┌────────────────────┐  │
│  │     PHP Application            │  │   AI Microservice  │  │
│  │  ┌──────────────────────────┐ │  │                    │  │
│  │  │   Presentation Layer     │ │  │   Python FastAPI   │  │
│  │  │  - Views (HTML/CSS)      │ │  │   - CodeLlama      │  │
│  │  │  - JavaScript (Monaco)   │ │  │   - RAG System     │  │
│  │  │  - Chart.js              │ │  │   - ChromaDB       │  │
│  │  └──────────────────────────┘ │  │                    │  │
│  │                                │  └────────────────────┘  │
│  │  ┌──────────────────────────┐ │                          │
│  │  │   Business Logic Layer   │ │                          │
│  │  │  - Controllers           │ │                          │
│  │  │  - Services              │ │                          │
│  │  │  - Validators            │ │                          │
│  │  └──────────────────────────┘ │                          │
│  │                                │                          │
│  │  ┌──────────────────────────┐ │                          │
│  │  │   Data Access Layer      │ │                          │
│  │  │  - Models                │ │                          │
│  │  │  - Repositories          │ │                          │
│  │  │  - Query Builders        │ │                          │
│  │  └──────────────────────────┘ │                          │
│  └────────────────┬───────────────┘                          │
└───────────────────┼──────────────────────────────────────────┘
                    │
┌───────────────────▼──────────────────────────────────────────┐
│                    DATA LAYER                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐  │
│  │  MySQL 8.0     │  │  File Cache    │  │  File Storage │  │
│  │  - Users       │  │  - API Cache   │  │  - Uploads    │  │
│  │  - Courses     │  │  - Sessions    │  │  - Logs       │  │
│  │  - Progress    │  │  - AI Cache    │  │  - Backups    │  │
│  └────────────────┘  └────────────────┘  └───────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Presentation Layer

**Technologies**: HTML5, CSS3, JavaScript ES6+

**Responsibilities**:
- User interface rendering
- Client-side validation
- Interactive features
- Responsive design
- User experience

**Key Components**:
- Monaco Editor integration
- Chart.js visualizations
- Real-time chat interface
- Progress dashboards
- Course navigation

### 2. Business Logic Layer

**Technologies**: PHP 8.2+, Custom Framework

**Responsibilities**:
- Request handling
- Business rules enforcement
- Data validation
- Authentication/Authorization
- API endpoints

**Design Patterns**:
- MVC (Model-View-Controller)
- Service Layer Pattern
- Repository Pattern
- Dependency Injection
- Singleton for database

### 3. Data Access Layer

**Technologies**: PDO, MySQL 8.0

**Responsibilities**:
- Database queries
- Data persistence
- Transaction management
- Caching strategy
- Query optimization

**Key Features**:
- Prepared statements (SQL injection prevention)
- Connection pooling
- Query caching
- Optimistic locking for concurrent updates

### 4. AI Microservice

**Technologies**: Python 3.11, FastAPI, ChromaDB

**Responsibilities**:
- Code analysis and suggestions
- Exercise generation
- Semantic search (RAG)
- Natural language processing

**Communication**: REST API over HTTP

## Data Flow

### User Registration Flow
```
1. User submits registration form
   ↓
2. JavaScript validates input client-side
   ↓
3. POST request to /api/register
   ↓
4. PHP validates input server-side
   ↓
5. Password hashed (bcrypt, cost 12)
   ↓
6. User record created in database
   ↓
7. Session created
   ↓
8. Response sent to client
   ↓
9. Redirect to dashboard
```

### AI Chat Interaction Flow
```
1. User types question in chat
   ↓
2. JavaScript sends POST to /api/chat
   ↓
3. PHP validates session & rate limit
   ↓
4. Check cache for similar questions
   ↓
5. If not cached:
   a. Extract lesson context
   b. Call Python AI service
   c. AI processes with CodeLlama
   d. Generate response
   ↓
6. Cache response (15 min TTL)
   ↓
7. Log conversation to database
   ↓
8. Send response to client
   ↓
9. JavaScript renders formatted response
```

### Progress Calculation Flow
```
1. User completes lesson
   ↓
2. POST to /api/complete-lesson
   ↓
3. Update user_progress table
   ↓
4. Calculate points earned
   ↓
5. Update leaderboard
   ↓
6. Check for new badges
   ↓
7. Invalidate analytics cache
   ↓
8. Return updated progress
   ↓
9. Update UI with new stats
```

## Database Schema

### Core Tables

**users**
- id (PK)
- username (unique)
- email (unique)
- password (hashed)
- created_at
- last_login

**courses**
- id (PK)
- title
- technology
- difficulty
- description
- order_index
- is_published

**lessons**
- id (PK)
- course_id (FK)
- title
- content (markdown)
- order_index
- estimated_time

**exercises**
- id (PK)
- lesson_id (FK)
- type (mcq, code, project)
- question
- test_cases
- solution
- points

**user_progress**
- id (PK)
- user_id (FK)
- lesson_id (FK)
- completed (boolean)
- score
- time_spent
- completed_at

**leaderboard**
- user_id (PK, FK)
- total_points
- lessons_completed
- rank
- last_updated

## Security Measures

### Authentication
- Password hashing: bcrypt (cost 12)
- Session management: secure, httpOnly, sameSite
- Remember me: signed tokens
- Account lockout: 5 failed attempts

### Input Validation
- Client-side: JavaScript validation
- Server-side: PHP validation
- SQL: Prepared statements
- XSS: HTML escaping
- CSRF: Token validation

### API Security
- Rate limiting: 100 requests/hour per user
- API authentication: Session-based
- CORS: Restricted origins
- Input sanitization: All endpoints

### Data Protection
- Passwords: Never stored in plain text
- Sensitive data: Encrypted at rest
- API keys: Environment variables
- Logs: Sanitized, no sensitive data

## Performance Optimization

### Caching Strategy
- **Page cache**: Static pages (5 min)
- **API cache**: Frequent queries (15 min)
- **AI cache**: Similar questions (1 hour)
- **Session cache**: Active sessions (30 min)

### Database Optimization
- Indexes on foreign keys
- Composite indexes for common queries
- Query optimization
- Connection pooling
- Pagination for large datasets

### Frontend Optimization
- Asset minification
- Lazy loading images
- Code splitting
- Browser caching
- CDN for libraries

## Scalability Considerations

### Current Capacity
- 1000 concurrent users
- 10,000 daily active users
- 100,000 API requests/day

### Scaling Strategy

**Horizontal Scaling** (Future):
- Load balancer (Nginx/HAProxy)
- Multiple application servers
- Database replication (master-slave)
- Redis cluster for distributed cache

**Vertical Scaling** (Current):
- Optimize queries
- Increase server resources
- Implement caching
- Code optimization

## Monitoring & Logging

### Application Logs
- Error logs: PHP errors, exceptions
- Access logs: All HTTP requests
- AI logs: Model interactions
- Security logs: Failed logins, suspicious activity

### Metrics Tracked
- Response times
- Error rates
- Active users
- API usage
- Database query performance

### Alerting
- Error spike detection
- Performance degradation
- Security incidents
- Resource exhaustion

## Future Enhancements

### Phase 2
- WebSocket for real-time collaboration
- Video lesson integration
- Advanced analytics with ML
- Mobile apps (React Native)

### Phase 3
- Microservices architecture
- Kubernetes deployment
- GraphQL API
- ElasticSearch for content search

---

*This architecture is designed for growth while maintaining code quality, security, and performance.*
