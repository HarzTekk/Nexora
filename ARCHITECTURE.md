# NexusAI Architecture

Complete technical architecture documentation for NexusAI.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js 15)                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Pages & Components (React + TypeScript)                  │  │
│  │  - Landing Pages                                          │  │
│  │  - Dashboard                                              │  │
│  │  - Feature Pages (Chat, Designer, etc.)                   │  │
│  │  - Authentication Pages                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  UI Components (Shadcn/UI + Tailwind CSS)                 │  │
│  │  - Forms, Buttons, Cards                                  │  │
│  │  - Animations (Framer Motion)                             │  │
│  │  - Charts (Recharts)                                      │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (Next.js API Routes)                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Authentication                                           │  │
│  │  - NextAuth.js (JWT + OAuth)                              │  │
│  │  - Email/Password, Google, GitHub                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  API Routes                                               │  │
│  │  - /api/auth/* (Authentication)                           │  │
│  │  - /api/user/* (User management)                          │  │
│  │  - /api/conversations/* (Chat)                            │  │
│  │  - /api/tasks/* (Task management)                         │  │
│  │  - /api/health (Health checks)                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Business Logic & Utilities                               │  │
│  │  - lib/auth.ts (NextAuth config)                          │  │
│  │  - lib/utils.ts (Helper functions)                        │  │
│  │  - lib/hooks.ts (Custom React hooks)                      │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Database Layer (Prisma ORM)                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Prisma Client                                            │  │
│  │  - Type-safe database queries                             │  │
│  │  - Automatic migrations                                   │  │
│  │  - Built-in validation                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Database Schema                                          │  │
│  │  - User management                                        │  │
│  │  - OAuth accounts                                         │  │
│  │  - Conversations & messages                               │  │
│  │  - Tasks                                                  │  │
│  │  - Files & images                                         │  │
│  │  - Short URLs                                             │  │
│  │  - Notes                                                  │  │
│  │  - Analytics                                              │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     PostgreSQL Database                         │
│  - User accounts & authentication                               │
│  - Application data                                             │
│  - Conversation history                                         │
│  - Task management                                              │
│  - Analytics data                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    External Services                            │
│  - OpenAI API (ChatGPT, DALL-E)                                │
│  - Google OAuth                                                 │
│  - GitHub OAuth                                                 │
│  - Cloudinary (Image storage)                                  │
│  - UploadThing (File uploads)                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
nexusai/
├── app/                           # Next.js 15 App Router
│   ├── api/                       # API routes
│   │   ├── auth/                  # Authentication endpoints
│   │   ├── user/                  # User management
│   │   ├── conversations/         # Chat conversations
│   │   ├── tasks/                 # Task management
│   │   ├── images/                # Image generation
│   │   └── health/                # Health check
│   │
│   ├── dashboard/                 # Protected routes
│   │   ├── page.tsx               # Dashboard home
│   │   ├── chat/                  # AI Chat feature
│   │   ├── designer/              # Image generation
│   │   ├── code-generator/        # Code generation
│   │   ├── converters/            # File converters
│   │   ├── voice/                 # Voice synthesizer
│   │   ├── tasks/                 # Task manager
│   │   ├── downloader/            # Download hub
│   │   └── settings/              # User settings
│   │
│   ├── auth/                      # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   │
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── providers.tsx              # NextAuth provider
│   └── globals.css                # Global styles
│
├── components/                    # React components
│   ├── dashboard/                 # Dashboard components
│   │   ├── DashboardLayout.tsx
│   │   ├── QuickActions.tsx
│   │   ├── RecentActivity.tsx
│   │   └── AnalyticsOverview.tsx
│   │
│   ├── landing/                   # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── CTASection.tsx
│   │
│   └── layout/                    # Layout components
│       ├── Navbar.tsx
│       └── Footer.tsx
│
├── lib/                           # Utility functions
│   ├── auth.ts                    # NextAuth configuration
│   ├── prisma.ts                  # Prisma client
│   ├── utils.ts                   # Helper functions
│   └── hooks.ts                   # Custom React hooks
│
├── prisma/                        # Database
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Seed data
│
├── public/                        # Static files
│   └── ...                        # Images, icons, etc.
│
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore
├── .dockerignore                  # Docker ignore
├── .eslintrc.json                 # ESLint config
├── docker-compose.yml             # Docker Compose
├── Dockerfile                     # Docker config
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── tailwind.config.js             # Tailwind CSS config
├── postcss.config.js              # PostCSS config
├── next.config.js                 # Next.js config
├── README.md                      # Documentation
├── SETUP.md                       # Setup guide
├── DEPLOYMENT.md                  # Deployment guide
├── CONTRIBUTING.md                # Contributing guide
└── ARCHITECTURE.md                # This file
```

---

## Data Flow

### Authentication Flow

```
User Registration
↓
[POST /api/auth/signup]
↓
Validate Input (Zod)
↓
Hash Password (bcryptjs)
↓
Create User (Prisma)
↓
Create Default Settings
↓
Return Success

User Login
↓
[POST /api/auth/[...nextauth]]
↓
NextAuth Credentials Provider
↓
Query User (Prisma)
↓
Compare Password (bcryptjs)
↓
Create Session (JWT)
↓
Return Session
```

### Chat Flow

```
User Types Message
↓
[Send to /api/conversations/[id]]
↓
Verify Authentication
↓
Save User Message (Prisma)
↓
Call OpenAI API
↓
Stream Response
↓
Save Assistant Message (Prisma)
↓
Update Conversation Updated Time
↓
Return Response to Frontend
```

### Image Generation Flow

```
User Enters Prompt
↓
Select Style & Settings
↓
[POST /api/images/generate]
↓
Verify Authentication
↓
Call OpenAI DALL-E API
↓
Save Image Record (Prisma)
↓
Store Image URL (Cloudinary)
↓
Return Image to Frontend
↓
Display in Gallery
```

---

## Authentication

### NextAuth Configuration

```typescript
// lib/auth.ts
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Credentials (Email/Password)
    CredentialsProvider({
      // Email/password login
    }),
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
```

### Session Access

```typescript
// In API routes
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // User authenticated, access session.user
}

// In Client components
import { useSession } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'unauthenticated') return <div>Not signed in</div>;
  
  return <div>Welcome {session?.user?.name}</div>;
}
```

---

## Database Schema

### Key Tables

```sql
-- Users (with OAuth)
Users
├── id (PK)
├── email (UNIQUE)
├── name
├── password (hashed)
├── image (URL)
├── role (USER | ADMIN | MODERATOR)
├── createdAt
└── updatedAt

-- OAuth Accounts
Accounts
├── id (PK)
├── userId (FK)
├── provider
├── providerAccountId
└── accessToken, refreshToken

-- Sessions
Sessions
├── id (PK)
├── userId (FK)
├── sessionToken
└── expires

-- Conversations
Conversations
├── id (PK)
├── userId (FK)
├── title
├── folder
├── createdAt
└── updatedAt

-- Messages
Messages
├── id (PK)
├── conversationId (FK)
├── userId (FK)
├── content (TEXT)
├── role (user | assistant)
└── createdAt

-- Tasks
Tasks
├── id (PK)
├── userId (FK)
├── title
├── description
├── status (TODO | IN_PROGRESS | COMPLETED)
├── priority (LOW | MEDIUM | HIGH | URGENT)
├── dueDate
├── createdAt
└── updatedAt

-- Generated Images
GeneratedImages
├── id (PK)
├── userId (FK)
├── prompt (TEXT)
├── imageUrl (TEXT)
├── style (REALISTIC | ANIME | CYBERPUNK | ...)
├── createdAt
└── updatedAt

-- Short URLs
ShortUrls
├── id (PK)
├── userId (FK)
├── code (UNIQUE)
├── originalUrl (TEXT)
├── customAlias
├── clicks
├── expiresAt
├── qrCode
└── createdAt

-- Analytics
Analytics
├── id (PK)
├── userId (FK)
├── event
├── data (JSON)
└── createdAt
```

---

## API Endpoints

### Authentication

```
POST   /api/auth/signup              # Register
POST   /api/auth/[...nextauth]       # NextAuth handler
GET    /api/auth/session             # Get session
POST   /api/auth/callback/google     # Google OAuth callback
POST   /api/auth/callback/github     # GitHub OAuth callback
```

### User Management

```
GET    /api/user                     # Get user profile
PUT    /api/user                     # Update profile
GET    /api/user/settings            # Get settings
PUT    /api/user/settings            # Update settings
```

### Conversations

```
GET    /api/conversations            # List conversations
POST   /api/conversations            # Create conversation
GET    /api/conversations/[id]       # Get conversation
POST   /api/conversations/[id]       # Add message
DELETE /api/conversations/[id]       # Delete conversation
```

### Tasks

```
GET    /api/tasks                    # List tasks
POST   /api/tasks                    # Create task
PUT    /api/tasks/[id]               # Update task
DELETE /api/tasks/[id]               # Delete task
```

### Utilities

```
GET    /api/health                   # Health check
```

---

## Component Architecture

### Dashboard Layout

```
DashboardLayout
├── Sidebar
│   ├── Logo
│   ├── Navigation Menu
│   └── Settings & Logout
├── Top Bar
│   ├── Menu Toggle
│   ├── Notifications
│   └── User Profile
└── Main Content
    └── Page Children
```

### Feature Pages

Each feature page follows the same pattern:

```
Page Component
├── Header
├── Main Content Area
│   ├── Input/Control Panel
│   └── Results/Gallery
└── Footer (if needed)
```

---

## State Management

### Context API (if needed)

For global state like user settings, notifications, etc.

### Hooks (Recommended)

```typescript
// Custom hooks for common operations
useProtected()      // Protected route guard
useFetch()          // API data fetching
useMutation()       // API mutations
useLocalStorage()   // Persistent state
useDarkMode()       // Dark mode toggle
useDebounced()      // Debounce values
useAsync()          // Async operations
```

---

## Performance Optimization

### Frontend

- **Code Splitting:** Next.js automatic code splitting
- **Image Optimization:** `next/image` component
- **Lazy Loading:** `dynamic()` for heavy components
- **Memoization:** `React.memo()` for expensive renders
- **Caching:** Browser cache + service workers

### Backend

- **Database Indexing:** Indexed common queries
- **Query Optimization:** Select only needed fields
- **Caching:** Redis for frequently accessed data
- **Rate Limiting:** Prevent abuse
- **Pagination:** Handle large datasets

---

## Security Measures

1. **Authentication**
   - JWT tokens with short expiry
   - Refresh tokens stored securely
   - CSRF protection via NextAuth

2. **Authorization**
   - Session checks on all protected routes
   - User ownership verification

3. **Data Protection**
   - Password hashing with bcryptjs
   - SQL injection prevention (Prisma ORM)
   - XSS protection (React + CSP headers)

4. **API Security**
   - Input validation (Zod schemas)
   - Rate limiting middleware
   - CORS configuration

---

## Monitoring & Logging

### Application Logs

```typescript
// Error logging
console.error('Error message', error);

// Info logging
console.log('User created:', userId);

// Production: Use services like Sentry, LogRocket
```

### Health Checks

```
GET /api/health
Response:
{
  "status": "ok",
  "uptime": 123456,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Metrics to Monitor

- API response times
- Database query performance
- Error rates
- User session metrics
- Feature usage statistics

---

## Deployment Architecture

### Docker

```
Dockerfile
└── Multi-stage build
    ├── Build stage (node:18-alpine)
    └── Runtime stage (node:18-alpine)

docker-compose.yml
├── nexusai service
├── postgres service
└── redis service (optional)
```

### Environment-Specific Configs

- **Development:** Fast rebuild, logging
- **Production:** Optimized build, security hardened

---

## Future Enhancements

- [ ] Real-time features (WebSockets)
- [ ] GraphQL API
- [ ] Mobile app (React Native)
- [ ] CLI tool
- [ ] Browser extension
- [ ] Plugins/Extensions system
- [ ] Team collaboration features
- [ ] Advanced analytics

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

---

**Last Updated:** 2024
**Version:** 1.0.0
