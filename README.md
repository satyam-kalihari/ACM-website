# ACM UI Design System

A product-facing design system and application shell for ACM, built with Next.js App Router, Tailwind CSS v4 tokens, shadcn-style primitives, and reusable UI composition patterns.

This README documents the system as a design platform first, and an app second.

## 1) Purpose

The system is designed to make UI decisions predictable and scalable across features like rooms, chat, dashboard, leaderboard, and authentication flows.

Core goals:

- Create one visual language for all pages and components.
- Keep styling semantic through design tokens (not hardcoded colors).
- Compose interfaces from reusable UI primitives.
- Maintain accessibility and theme parity (light and dark).
- Speed up feature delivery with shared conventions.

## 2) Technology Foundation

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS v4 + CSS variable tokens
- shadcn-style UI patterns (CVA variants, Radix primitives)
- next-themes for theme switching
- lucide-react icons

## 3) Design Principles

1. Semantic over literal
   Use semantic tokens such as `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, instead of fixed color values in component code.

2. Variant-driven APIs
   Expose component differences through typed variants (`variant`, `size`, state classes), not duplicate components.

3. Composability first
   Prefer small primitives and slots (`CardHeader`, `CardContent`, `CardFooter`) that can be assembled per use case.

4. Consistent interaction language
   Reuse shared hover/focus/disabled behavior so controls feel coherent throughout the app.

5. Accessibility by default
   Use visible focus rings, sufficient contrast, keyboard support, and semantic structure from the start.

## 4) Token System

Token definitions live in `src/app/globals.css` and are expressed through CSS variables with Tailwind mappings.

### 4.1 Color Tokens

Semantic families:

- Surface: `background`, `card`, `popover`, `sidebar`
- Text: `foreground`, `card-foreground`, `muted-foreground`, `sidebar-foreground`
- Action: `primary`, `secondary`, `accent`, `destructive`
- Utility: `border`, `input`, `ring`
- Data-viz: `chart-1` ... `chart-5`

Each semantic token has light (`:root`) and dark (`.dark`) values.

### 4.2 Radius Tokens

Radius scale is derived from a single root radius token:

- `--radius`
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`, `--radius-3xl`, `--radius-4xl`

### 4.3 Motion Tokens

Reusable animation tokens are defined in theme scope:

- `--animate-cell-ripple`
- `--animate-first`
- `--animate-second`
- `--animate-third`
- `--animate-fourth`
- `--animate-fifth`

Keyframes include `cell-ripple`, `moveHorizontal`, `moveInCircle`, and `moveVertical`.

## 5) Component Architecture

### 5.1 UI Primitives

Base primitives live in `src/components/ui` and provide:

- Stable visual tokens
- Accessibility-oriented defaults
- Variant APIs with class-variance-authority
- Predictable slots and composition patterns

Examples:

- `button.tsx`: typed `variant` and `size` system with focus/error states.
- `card.tsx`: slot-based composition (`CardHeader`, `CardContent`, etc.).
- `input.tsx`, `label.tsx`, `checkbox.tsx`, `tooltip.tsx`, `sheet.tsx`, `table.tsx`.

### 5.2 Feature Components

Higher-level components in `src/components` combine primitives with feature behavior:

- `Navbar.tsx`, `Footer.tsx`, `SidebarContainer.tsx`
- `ChatComponent.tsx`
- `Leaderboard.tsx`

Guideline: feature components should consume tokens and primitives rather than redefining system styles.

## 6) Theming

The system uses semantic variables and `next-themes` to support light/dark modes.

Rules:

- Do not hardcode black/white backgrounds in feature code.
- Favor semantic classes (`bg-background`, `text-foreground`, `border-border`, etc.).
- Validate component readability in both themes before merging.

## 7) Project Structure (Design-System Relevant)

```text
src/
	app/
		globals.css                # Token source (color, radius, motion)
		layout.tsx                 # App shell + providers
	components/
		ui/                        # Reusable design-system primitives
		Navbar.tsx                 # Product-level composition
		Footer.tsx
		ChatComponent.tsx
	context/                     # Room/socket contexts powering UI state
	hooks/                       # Reusable UI/feature hooks
	lib/
		utils.ts                   # cn helper and shared utility patterns
```

## 8) Development Workflow

### 8.1 Install and Run

```bash
npm install
npm run dev
```

### 8.2 Quality Checks

```bash
npm run lint
npm run build
```

## 9) Component Authoring Standards

When adding or updating a component:

1. Start from semantic tokens, not literal colors.
2. Add variants only when the behavior or role is meaningfully different.
3. Preserve keyboard/focus accessibility behavior.
4. Keep APIs small and typed.
5. Reuse existing primitives before creating new ones.

Recommended pattern:

- Define variants with CVA.
- Expose `className` for extension.
- Use `cn(...)` for class composition.
- Keep state classes centralized (hover, focus-visible, disabled, invalid).

## 10) Accessibility Baseline

Minimum requirements for all interactive UI:

- Keyboard navigable controls
- Visible focus style
- Readable text contrast in light and dark themes
- Correct labels and semantic roles
- No color-only status signaling

## 11) API + Real-Time Surfaces (UI Dependencies)

The UI layer consumes:

- App Router API endpoints under `src/app/api`
- Socket logic via `src/socket` and `websocket/`
- Context providers in `src/context`

Design implication: loading, error, empty, and optimistic states should use the same system components and tokenized status semantics.

## 12) Extension Checklist

Before shipping a new screen or component:

- Uses existing primitives where possible
- Uses semantic tokens only
- Works in light/dark themes
- Includes loading/empty/error states
- Passes lint and build

---

If you are contributing UI changes, treat this repository as a living design system: add patterns that are reusable, remove duplication, and keep the visual language consistent across every route.
