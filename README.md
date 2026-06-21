# NexusAI - Ultimate Futuristic AI Platform

A modern, feature-rich SaaS platform powered by advanced AI capabilities. Built with Next.js 15, React, TypeScript, and Tailwind CSS.

![NexusAI](https://img.shields.io/badge/NexusAI-v1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Features

### Core Features
- **AI Chat Assistant** - Conversational AI with streaming responses and markdown support
- **AI Designer** - Generate images in multiple styles (Realistic, Anime, Cyberpunk, Fantasy, Cartoon, 3D)
- **Code Generator** - AI-powered code generation for multiple programming languages
- **Converter Suite** - Convert images, videos, audio, PDF, units, currency, and more
- **Voice Synthesizer** - Text-to-speech with customizable voice, speed, and pitch
- **Task Manager** - Kanban board with drag-and-drop support
- **Download Hub** - Efficient file downloading with progress tracking

### Advanced Features
- **Modern UI** with glassmorphism, neon glow effects, and smooth animations
- **Dark Mode** by default with responsive design
- **User Authentication** via Email, Google OAuth, and GitHub OAuth
- **Dashboard** with analytics and quick actions
- **Real-time Updates** using WebSockets (coming soon)
- **API Routes** for seamless backend integration
- **Docker Support** for easy deployment
- **Production-Ready** with security best practices

---

## 📋 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Shadcn/UI** - Component library
- **Recharts** - Chart library
- **React Markdown** - Markdown rendering

### Backend
- **Next.js API Routes** - Serverless backend
- **Node.js** - Runtime
- **Prisma ORM** - Database ORM

### Database & Storage
- **PostgreSQL** - Primary database
- **Redis** - Caching (optional)
- **UploadThing** - File uploads

### Authentication & Security
- **NextAuth** - Authentication
- **Bcryptjs** - Password hashing
- **JWT** - Token-based auth

### AI & APIs
- **OpenAI** - ChatGPT and DALL-E integration
- **Cloudinary** - Image hosting

### Deployment
- **Docker** - Containerization
- **Vercel** - Production deployment
- **Heroku** - Alternative deployment

---

## 📦 Installation

### Prerequisites
- Node.js 18+ or higher
- PostgreSQL 12+
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nexusai.git
cd nexusai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nexusai"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"

# OpenAI
OPENAI_API_KEY="sk-your-openai-api-key"

# Other Services
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
UPLOADTHING_SECRET="your-uploadthing-secret"
NEXT_PUBLIC_UPLOADTHING_APP_ID="your-app-id"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 4. Setup Database

```bash
# Push Prisma schema to database
npm run db:push

# Generate Prisma Client
npm run db:generate

# (Optional) Seed database
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Create .env file with your credentials
cp .env.example .env

# Build and run containers
docker-compose up -d

# Run migrations
docker-compose exec nexusai npm run db:push

# View logs
docker-compose logs -f nexusai
```

The application will be available at `http://localhost:3000`

### Manual Docker Build

```bash
# Build image
docker build -t nexusai:latest .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  nexusai:latest
```

---

## 🚀 Production Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
# One-command deployment
npm run build && vercel --prod
```

### Deploy to AWS

```bash
# Using AWS ECS
docker tag nexusai:latest your-account-id.dkr.ecr.us-east-1.amazonaws.com/nexusai:latest
docker push your-account-id.dkr.ecr.us-east-1.amazonaws.com/nexusai:latest
```

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create nexusai

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:standard-0 --app nexusai

# Set environment variables
heroku config:set NEXTAUTH_SECRET="..." --app nexusai

# Deploy
git push heroku main
```

---

## 📚 API Routes

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth handler

### Health Check
- `GET /api/health` - Application health status

### Chat
- `POST /api/chat` - Send message to AI

### Images
- `POST /api/images/generate` - Generate image with AI
- `GET /api/images` - Get user's generated images

### Code
- `POST /api/code/generate` - Generate code

---

## 🎨 Customization

### Color Palette

Edit `tailwind.config.js`:

```js
colors: {
  primary: '#00F5FF',      // Cyan
  secondary: '#7C3AED',    // Purple
  accent: '#00FF88',       // Green
  background: '#050816',   // Dark Blue
  text: '#FFFFFF',         // White
}
```

### Animations

Custom animations in `app/globals.css`:

```css
@keyframes customAnimation {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🔐 Security

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ CSRF protection (NextAuth)
- ✅ SQL injection protection (Prisma ORM)
- ✅ XSS protection (React)
- ✅ Rate limiting (recommended: implement middleware)
- ✅ HTTPS ready
- ✅ Environment variable isolation

---

## 📊 Database Schema

### Main Tables
- **User** - User accounts and profiles
- **Account** - OAuth account linkage
- **Session** - User sessions
- **Conversation** - AI chat conversations
- **Message** - Chat messages
- **Task** - User tasks
- **GeneratedImage** - AI-generated images
- **ShortUrl** - URL shortener data
- **Note** - User notes
- **Analytics** - User activity tracking
- **UserSettings** - User preferences

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push     # Push schema to DB
npm run db:studio   # Open Prisma Studio
npm run db:seed     # Seed database
npm run db:generate # Generate Prisma Client

# Linting
npm run lint        # Run ESLint
npm run type-check  # TypeScript check

# Docker
npm run docker:build  # Build Docker image
npm run docker:run    # Run Docker container
```

### Project Structure

```
nexusai/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── dashboard/         # Dashboard pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── landing/           # Landing page sections
│   └── layout/            # Layout components
├── lib/                   # Utilities and libraries
│   ├── auth.ts           # NextAuth config
│   └── prisma.ts         # Prisma client
├── prisma/               # Database
│   └── schema.prisma     # Database schema
├── public/               # Static files
├── .env.example          # Environment template
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose config
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind CSS config
└── README.md             # This file
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Prisma](https://www.prisma.io/) - ORM
- [OpenAI](https://openai.com/) - AI models

---

## 📞 Support

For support, email support@nexusai.com or open an issue on GitHub.

---

## 🗺️ Roadmap

- [ ] Real-time notifications
- [ ] Team collaboration features
- [ ] Advanced analytics
- [ ] Custom AI model training
- [ ] Plugin marketplace
- [ ] Mobile app
- [ ] API documentation
- [ ] Community forum

---

**Made with ❤️ by NexusAI Team**
