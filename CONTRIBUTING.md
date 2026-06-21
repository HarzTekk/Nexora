# Contributing to NexusAI

Thank you for your interest in contributing to NexusAI! We welcome contributions from everyone.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. **Fork the repository**

```bash
git clone https://github.com/yourusername/nexusai.git
cd nexusai
```

2. **Create a feature branch**

```bash
git checkout -b feature/your-feature-name
```

3. **Install dependencies**

```bash
npm install
```

4. **Create a `.env.local` for development**

```bash
cp .env.example .env.local
```

5. **Start development server**

```bash
npm run dev
```

## Development Workflow

### Before Starting

- Check existing issues and PRs to avoid duplicates
- Discuss major changes in an issue first

### Making Changes

1. **Follow the code style**
   - Use TypeScript for all new code
   - Use Prettier for formatting
   - Use ESLint for linting

2. **Keep commits atomic**
   - One feature per commit
   - Write clear commit messages
   - Reference issues in commits: `Fixes #123`

3. **Test your changes**
   - Run type checking: `npm run type-check`
   - Run linting: `npm run lint`
   - Test locally: `npm run dev`

### Commit Message Format

```
[TYPE] Brief description

Longer explanation if needed.

Fixes #issue-number
```

Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Tests

Example:
```
feat: Add dark mode toggle to settings

Users can now toggle between dark and light modes
in the settings page. The preference is saved to
localStorage and persisted across sessions.

Fixes #45
```

## Pull Request Process

1. **Update README if needed**
   - Document new features
   - Update API routes
   - Add troubleshooting if applicable

2. **Add tests if applicable**
   - Create test files alongside components
   - Follow existing test patterns

3. **Submit PR with description**
   - Explain what changes are made
   - Link related issues
   - Include screenshots for UI changes

4. **Address review feedback**
   - Respond to all comments
   - Push additional commits
   - Don't rebase after review starts

## File Structure Guidelines

### Components

```
components/
├── dashboard/
│   ├── DashboardLayout.tsx
│   ├── QuickActions.tsx
│   └── ...
├── landing/
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   └── ...
└── layout/
    ├── Navbar.tsx
    └── Footer.tsx
```

- One component per file
- Components in PascalCase
- Props in separate type files if large

### Pages

```
app/
├── dashboard/
│   ├── page.tsx
│   ├── chat/
│   │   └── page.tsx
│   └── ...
└── auth/
    ├── login/
    │   └── page.tsx
    └── signup/
        └── page.tsx
```

### API Routes

```
app/api/
├── auth/
│   ├── signup/
│   │   └── route.ts
│   └── ...
├── user/
│   ├── route.ts
│   ├── settings/
│   │   └── route.ts
│   └── ...
└── health/
    └── route.ts
```

## Code Style

### TypeScript

- Use explicit types
- Avoid `any` type
- Use interfaces over types for objects

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Avoid
type User = {
  id: any;
  name?: string;
};
```

### React

- Use functional components
- Use hooks for state management
- Memoize expensive components

```typescript
// ✅ Good
const MyComponent: React.FC<Props> = ({ title }) => {
  const [count, setCount] = useState(0);
  return <div>{title}</div>;
};

// ❌ Avoid
class MyComponent extends React.Component {
  // ...
}
```

### Styling

- Use Tailwind CSS classes
- Keep styles in components
- Use CSS modules for complex styles

```typescript
// ✅ Good
<button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/80">
  Click me
</button>

// ❌ Avoid
<button style={{ padding: '16px 8px' }}>Click me</button>
```

## Testing

### Adding Tests

```typescript
// Example test
describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
npm run test
npm run test -- --watch
```

## Documentation

### Writing Docs

- Use clear, concise language
- Include code examples
- Link to related docs
- Update table of contents

### Code Comments

```typescript
/**
 * Generate a short URL code
 * @param length - Length of the code (default: 6)
 * @returns Random alphanumeric string
 */
export function generateShortCode(length: number = 6): string {
  // Implementation
}
```

## API Development

### Creating an API Route

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Your logic here
    return NextResponse.json({ data: 'example' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Performance Tips

- Use `next/image` for images
- Lazy load components with `dynamic()`
- Memoize expensive computations
- Optimize database queries
- Use Redis for caching

## Security Guidelines

- Never commit secrets to git
- Use environment variables for sensitive data
- Validate all user inputs
- Sanitize database queries (Prisma does this)
- Implement rate limiting
- Use HTTPS in production
- Keep dependencies updated

## Reporting Bugs

### Bug Report Template

```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
Add screenshots if helpful

## Environment
- OS: macOS 13
- Node: 18.10.0
- npm: 9.0.0
```

## Feature Requests

### Feature Request Template

```markdown
## Description
Brief description of the feature

## Problem
What problem does this solve?

## Solution
How should this be implemented?

## Alternative Approaches
Other possible solutions

## Acceptance Criteria
- [ ] Requirement 1
- [ ] Requirement 2
```

## Getting Help

- **Discord:** Join our Discord community
- **GitHub Issues:** Ask in relevant issue
- **Email:** help@nexusai.com
- **Documentation:** Read our docs

## Recognition

Contributors will be recognized in:
- README.md
- GitHub contributors page
- Release notes
- Blog posts

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to NexusAI! 🙏
