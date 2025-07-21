# 🚀 SatuKas Web Application

SatuKas is a comprehensive personal finance management web application built with Next.js. It helps users track their expenses, manage budgets, and gain insights into their financial habits through an intuitive dashboard interface.

## 📑 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Development Setup](#-development-setup)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)

## ✨ Key Features

- **User Management**
  - Secure authentication system
  - User profile customization
  - Account settings management
  - Email verification
  - Password recovery

- **Financial Management**
  - Expense tracking
  - Income management
  - Budget planning
  - Financial reports
  - Transaction history

- **Dashboard Features**
  - Responsive layout
  - Dark/Light theme support
  - Multi-language support (ID/EN)
  - Interactive charts
  - Financial insights

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
- **Others:**
  - next-themes (Dark mode)
  - next-intl (Internationalization)
  - dayjs (Date handling)

## 🚦 Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/SatuKas/web.git
cd satukas-web
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

---

Built with ❤️ by SatuKas Team
