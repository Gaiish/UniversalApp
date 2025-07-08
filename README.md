# Universal App

A simple universal application built with Expo, TypeScript, and React Native. Runs on iOS, Android, and Web from a single codebase.

- **Authentication**: Powered by [Supabase](https://supabase.com/).
- **Form Management**: Uses [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/) for schema validation and type-safe forms.

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- Expo CLI: `npm install -g @expo/cli`
- [Supabase](https://supabase.com/).

### Environment Setup

Create a `.env` from `.env.example`:

```bash
cp .env.example .env
```

Then edit `.env` with your own Supabase credentials. Example:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server (choose platform)
npm run start      # Opens Expo Dev Tools
npm run web        # Start web development
npm run android    # Start Android development
npm run ios        # Start iOS development

# Other commands
npm run lint       # Run ESLint
npm test          # Run Jest tests
```

### Production Builds

```bash
# Build for all platforms via EAS
eas build --platform all

# Web deployment (auto-deployed to Vercel on main branch)
npm run build
```

---

## 📚 Why **Expo + React Native**

### Decision at a Glance

| Criterion        | Expo + RN (managed)                                                 | Bare React Native                                                              | Flutter / Others                             |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------- |
| **Language fit** | TypeScript + React (what the team already writes)                   | Same, but deeper native plumbing                                               | New language (Dart) or JS wrappers           |
| **Spin-up time** | `npx create-expo-app` → working iOS/Android/Web in ≈ 1 h            | Fastlane + Xcode/Gradle setup takes several days on first run                  | Same infra work **plus** new toolchain       |
| **Ops overhead** | Cloud builds & OTA via **EAS**; linear, predictable bill            | Self-host CI; **macOS minutes cost 10×** Linux and spike at every iOS SDK drop | Similar to bare RN, larger binaries          |
| **Prod proof**   | **Bluesky Social**, Brex, Cameo, ZOE run this stack in public repos | Meta Marketplace, X (Twitter Lite), Flipkart                                   | Google Ads, BMW, eBay Motors (mainly mobile) |
| **Escape hatch** | `eas prebuild` ejects to bare RN                                    | —                                                                              | Full rewrite required                        |

> Expo's managed workflow allows to ship iOS, Android **and** Web from one TypeScript repo with almost zero DevOps, validated at scale by apps like **Bluesky Social** (In future, its possible to eject to bare React Native when deep native work becomes necessary).

### When Expo + RN Is the Sweet Spot

- **Small teams**, primarily web/React engineers.
- Need **web parity** (same features/UX on web as mobile) from day 1 (Expo Web + NativeWind).
- Happy to trade a small per-build fee for zero platform toil.
- Feature set covered by existing expo modules.

---

## Tech Stack

### Core Framework

- **Expo SDK 52** - Universal app platform
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type safety and developer experience
- **Expo Router** - File-based routing with Stack.Protected

### UI & Styling

- **NativeWind** - Tailwind CSS utilities for React Native

### State Management & Forms

- **React Context** - Application state management
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### Authentication

- **Supabase Auth**

### Development & Deployment

- **GitHub Actions** - Continuous integration
- **EAS Build** - Cloud builds for iOS/Android
- **Vercel** - Web deployment and hosting
- **Jest** - Unit testing framework
- **ESLint** - Code linting and formatting

## Project Structure

```
src/
├── app/                 # Expo Router pages
│   ├── (app)/          # Protected app routes
│   ├── (auth)/         # Authentication routes
│   └── _layout.tsx     # Root layout with providers
├── components/         # Reusable UI components
│   ├── forms/         # Form components
│   └── ui/            # Base UI components
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── lib/               # Third-party library configurations
├── schemas/           # Zod validation schemas
├── services/          # API and business logic
└── constants/         # App constants and configuration
```
