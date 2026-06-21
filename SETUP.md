# NexusAI Setup Guide

Complete setup instructions for getting NexusAI running on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - https://nodejs.org/
- **PostgreSQL 12+** - https://www.postgresql.org/
- **Git** - https://git-scm.com/
- **npm or yarn** - Comes with Node.js

Verify installation:

```bash
node --version      # Should be v18 or higher
npm --version       # Should be 9 or higher
psql --version      # Should be 12 or higher
```

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/nexusai.git
cd nexusai
```

---

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages from `package.json`.

---

## Step 3: Setup PostgreSQL Database

### Option A: Using Local PostgreSQL

1. **Create a new database**

```bash
psql -U postgres
CREATE DATABASE nexusai;
CREATE USER nexusai_user WITH PASSWORD 'secure_password';
ALTER ROLE nexusai_user SET client_encoding TO 'utf8';
ALTER ROLE nexusai_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE nexusai_user SET default_transaction_deferrable TO on;
ALTER ROLE nexusai_user SET default_time_zone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE nexusai TO nexusai_user;
\q
```

2. **Verify connection**

```bash
psql -U nexusai_user -d nexusai
\q
```

### Option B: Using Docker (Recommended)

```bash
docker run --name nexusai-postgres \
  -e POSTGRES_USER=nexusai_user \
  -e POSTGRES_PASSWORD=secure_password \
  -e POSTGRES_DB=nexusai \
  -p 5432:5432 \
  -d postgres:15-alpine
```

---

## Step 4: Configure Environment Variables

1. **Create `.env.local` from template**

```bash
cp .env.example .env.local
```

2. **Edit `.env.local` with your settings**

```env
# Database Configuration
DATABASE_URL="postgresql://nexusai_user:secure_password@localhost:5432/nexusai"

# NextAuth Configuration
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Get from respective platforms)
# Google OAuth: https://console.cloud.google.com/
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth: https://github.com/settings/developers
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"

# OpenAI API: https://platform.openai.com/
OPENAI_API_KEY="sk-your-openai-api-key"

# Cloudinary (Optional): https://cloudinary.com/
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Application Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### Generate NEXTAUTH_SECRET

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows
certutil -encodehex -f "random" -out b64.txt
```

---

## Step 5: Setup OAuth Providers (Optional)

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized JavaScript origins:
   - `http://localhost:3000`
   - Your production domain
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
7. Copy Client ID and Client Secret to `.env.local`

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env.local`

---

## Step 6: Setup Database Schema

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio to view data
npm run db:studio
```

---

## Step 7: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Check application is running

```bash
curl http://localhost:3000
```

---

## Step 8: Create Test Account

1. Visit `http://localhost:3000/auth/signup`
2. Register with email and password
3. You'll be redirected to the dashboard

---

## Troubleshooting

### Database Connection Issues

**Error: "Can't reach database server"**

```bash
# Check PostgreSQL is running
psql -U nexusai_user -d nexusai -c "SELECT 1"

# Check connection string in .env.local
# Format: postgresql://username:password@host:port/database
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Database Schema Issues

```bash
# Reset database (⚠️ Deletes all data)
npm run db:push -- --force-reset

# Or manually drop and recreate database
psql -U postgres
DROP DATABASE nexusai;
CREATE DATABASE nexusai;
```

### NextAuth Errors

1. Check `NEXTAUTH_SECRET` is set in `.env.local`
2. Ensure `NEXTAUTH_URL` matches your application URL
3. Clear browser cookies and cache

---

## Development Tips

### Hot Reload

Changes are automatically reloaded during development. No need to restart the server.

### Prisma Studio

View and edit database data graphically:

```bash
npm run db:studio
```

### Debug Mode

Set `DEBUG=prisma:*` to see detailed Prisma logs:

```bash
DEBUG=prisma:* npm run dev
```

### TypeScript Checking

Check for TypeScript errors:

```bash
npm run type-check
```

### Linting

Check code quality:

```bash
npm run lint
```

---

## Next Steps

1. **Customize UI** - Edit colors in `tailwind.config.js`
2. **Add More Features** - Create new pages in `app/dashboard/`
3. **Deploy** - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
4. **Integrate APIs** - Connect to OpenAI, Cloudinary, etc.

---

## Common Tasks

### Add a New Feature Page

```bash
# Create directory
mkdir -p app/dashboard/my-feature

# Create page
touch app/dashboard/my-feature/page.tsx

# Add content (copy from existing pages as template)
```

### Connect OpenAI API

```typescript
// In your API route
import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const response = await openai.createChatCompletion({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

---

## Support

For issues or questions:

1. Check [README.md](README.md) for overview
2. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
3. Open an issue on GitHub
4. Email: support@nexusai.com

---

Happy coding! 🚀
