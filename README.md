# 🚀 Next.js Dashboard Base Project

A robust and scalable Next.js dashboard starter template with built-in authentication, JWT token management, pre-configured UI components, and essential dashboard features. This project serves as a solid foundation for quickly bootstrapping new dashboard applications.

## 📑 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Quick Setup](#-quick-setup)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

## ✨ Key Features

- **Authentication System**

  - JWT-based authentication
  - Login/Register functionality
  - Password reset flow
  - Email verification
  - Protected routes

- **Dashboard Features**

  - Responsive layout
  - Dark/Light theme support
  - Internationalization ready
  - Sidebar navigation
  - User profile management

- **Developer Experience**
  - TypeScript support
  - Pre-configured UI components
  - Form validation with Zod
  - API integration setup
  - Storybook documentation
  - Unit testing setup
  - ESLint + Prettier configuration

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:**
  - Radix UI
  - Shadcn UI
  - Custom components
- **State Management:** React Query
- **Form Handling:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Testing:** Jest + React Testing Library
- **Documentation:** Storybook
- **Others:**
  - next-themes (Dark mode)
  - next-intl (Internationalization)
  - dayjs (Date handling)

## 🚦 Quick Setup

1. **Clone the repository**

```bash
git clone https://github.com/arubaya/next-dashboard-base-project.git
cd next-dashboard-base-project
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
# Copy example env file and modify as needed
cp .env.example .env.local
```

Required environment variables:

```env
NEXT_PUBLIC_MAIN_DOMAIN=your-domain
NEXT_PUBLIC_BASE_API_URL=your-api-url
```

4. **Start development server**

```bash
pnpm dev
```

## 🔧 Available Scripts

- **Development**

```bash
pnpm dev         # Start development server
pnpm lint        # Run ESLint
```

- **Testing**

```bash
pnpm test        # Run tests
```

- **Storybook**

```bash
pnpm storybook   # Start Storybook server
```

- **Production**

```bash
pnpm build       # Create production build
pnpm start       # Start production server
```

## 📂 Project Structure

```
├── app/                  # Next.js app router pages
├── components/          # React components
│   ├── ui/             # Base UI components
│   ├── shared/         # Shared components
│   └── module/         # Feature-specific components
├── config/             # App configuration
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript types
└── utils/              # Utility functions
```

## 🤝 Contributing

This project is actively maintained and welcomes contributions. Feel free to open issues and pull requests for:

- Bug fixes
- New features
- Documentation improvements
- Performance optimizations

---

Built with ❤️ using Next.js and TypeScript
