# LWT Redesign Plan: Digital Workplace & Company Operating Environment

## 1. Executive Summary & Brand Foundation
LWT (Let's Work Together by LAKSHYNiTi) is being evolved from a conventional SaaS presentation into an **AI-native digital workplace and company operating environment**. 
* **User-Facing Product Name**: Strictly **LWT, Let's Work Together** (by LAKSHYNiTi). No version suffixes (no "2.0", "V2", "New LWT", "Rebrand") anywhere in user-facing content.
* **Core Brand Identity**: Preserved 100%. Utilizing the official LWT logo assets (`brand-icon.png`, `full-clean.png`, `full-icon.png`, `full_icon.png`, `main_icon.png`).
* **Visual Palette**: 
  - Deep Navy: `#020817`
  - Near Black: `#01040A`
  - Dark Navy: `#061426`
  - Blue: `#0878FF`
  - Electric Blue: `#008CFF`
  - Cyan: `#00D9D9`
  - Bright Cyan: `#13E5E5`
  - White: `#FFFFFF`
  - Muted White: `#D9E2EC`
  - Muted Text: `#8B9AAF`
  *(Zero generic purple AI gradients, zero crypto neons, zero generic template tropes)*

---

## 2. Technical Audit of Current Repository & Architecture
* **Framework**: Next.js 16 (App Router), React 19, TypeScript
* **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`), custom design tokens, CSS variables, `tw-animate-css`
* **Animations & Graphics**: Framer Motion (`framer-motion`), Three.js (`three`), `@react-three/fiber`, `@react-three/drei`
* **Authentication**: Clerk (`@clerk/nextjs`, `@clerk/ui`)
* **State Management**: Zustand stores (`useOfficeStore` for 3D state, room selection, health metrics)
* **Backend & Database**: Prisma ORM with PostgreSQL/Neon adapter, Cloudflare R2 storage, Groq SDK, WebSocket server (`ws-server.js`)
* **Existing Application Routes**:
  - `/` (Landing page - currently minimal and conventional)
  - `/pricing` (Pricing options)
  - `/about` (About page)
  - `/(auth)` (`/sign-in`, `/sign-up`, Clerk flows)
  - `/onboarding` (Role selection and profile setup)
  - `/invite` (Team and workspace invitations)
  - `/dashboard` (Full product workspace with projects, tasks, mentors, calendar, portfolio, analytics, billing, and 3D mode)
  - `/adminpanel` (Administrative management)

---

## 3. Existing UI Analysis & Problems Identified
1. **Conventional Hero**: The previous landing page used a standard centered text + button layout with a static box placeholder.
2. **Generic Feature Grid**: Used generic 3-card layout ("AI Mentor", "Smart Projects", "3D Visualizations") with purple-tinted shadows (`rgba(99,102,241,...)`).
3. **Disconnected 3D Experience**: The rich 3D office environment developed for the dashboard was completely absent from the marketing experience, leaving visitors unaware of LWT's actual spatial capability.
4. **Missing AI Workforce Demonstration**: The core differentiator—autonomous AI coworkers (PM, Engineer, Designer, QA, Mentor) collaborating on real sprints—was explained only in static text rather than demonstrated interactively.
5. **No Execution Console**: Visitors could not see or experience how a natural prompt translates into a planned sprint, assigned AI tasks, code reviews, and verified artifacts.

---

## 4. Components & Systems Matrix

### A. Components to Preserve (Application & Core)
* All `/dashboard/**` routes and existing functionality (Projects, Tasks, Mentors, Portfolio, Billing, Analytics).
* Authentication flow via Clerk (`/sign-in`, `/sign-up`, protected routes, session tokens).
* Prisma schema, database models, backend API routes in `src/app/api/**`.
* Existing 3D rooms in `src/components/3d/rooms/` (`EngineeringDepartment`, `PersonalWorkspace`, `MeetingRoom`, `ExecutiveSuite`, `Reception`, `ArchiveRoom`).
* Zustand store (`useOfficeStore`) for office and workspace state.

### B. Components to Replace & Upgrade
* `src/app/page.tsx`: Full architectural rebuild from single-column marketing page into a 10-stage interactive digital workplace experience.
* `src/app/globals.css`: Upgrade theme variables and brand gradient to the official LWT color hierarchy (Deep Navy `#020817` -> Electric Blue `#008CFF` -> Cyan `#00D9D9` -> White `#FFFFFF`), removing legacy purple tints.
* Navigation (`Navbar`): Replace basic static header with a floating, adaptive frosted navbar featuring compact scroll states, live system status, and tactile quick actions.
* Hero (`Hero`): Replace with an interactive command environment and dynamic Company Nervous System network.

### C. New Modular Component Architecture (`src/components/`)
```
src/components/
├── branding/
│   ├── LWTLogo.tsx              # Adaptive SVG/Image lockups using official assets
│   └── BrandMark.tsx            # Animated orbital blue/cyan signature mark
├── navigation/
│   ├── Navbar.tsx               # Floating glassmorphic header with scroll compression
│   └── MobileNav.tsx            # Fluid mobile drawer with system telemetry
├── hero/
│   ├── Hero.tsx                 # Command center header + live CTAs
│   ├── CompanyNetwork.tsx       # Interactive nodes (Product, Eng, AI Core, Projects)
│   └── SystemTelemetry.tsx      # Realtime health, worker count, and latency pills
├── effects/
│   ├── AmbientSystem.tsx        # Configurable technical grid, data flow lines, glow
│   ├── SignatureCurve.tsx       # Flowing blue->cyan orbital light path
│   └── CursorLight.tsx          # Subtle desktop pointer spotlight (disabled on mobile)
├── ai/
│   ├── AIEmployeeCard.tsx       # Expandable employee profile (role, status, tasks)
│   ├── AgentNetwork.tsx         # Visual task handoffs (Idea -> PM -> Eng -> QA -> Launch)
│   └── ExecutionPipeline.tsx    # Live simulation console (Understand -> Plan -> Execute)
├── workplace/
│   ├── WorkplacePreview.tsx     # Interactive 2D operational interface
│   ├── CompanyPulse.tsx         # Live simulated event stream of company actions
│   └── ArchitectureGraph.tsx    # Operating system layers (AI Core, Work Core, Data Core)
├── digital-twin/
│   ├── DigitalTwinPreview.tsx   # Progressive Three.js / R3F spatial office preview
│   └── RoomInspectModal.tsx     # Department telemetry inspector (active tasks, AI workers)
├── sections/
│   ├── WhatIsLWT.tsx            # Connected system interactive explanation
│   ├── AIWorkforceSection.tsx   # AI employee grid & collaboration network
│   ├── ExecutionEngineSection.tsx # Live command simulator
│   ├── DigitalTwinSection.tsx   # 3D spatial office viewport
│   ├── ArchitectureSection.tsx  # Operating system diagram
│   ├── TechnologySection.tsx    # Architecture breakdown with animated indicators
│   └── CTASection.tsx           # "ENTER LWT" immersive portal
└── footer/
    └── Footer.tsx               # Streamlined footer with LAKSHYNiTi attribution
```

---

## 5. Animation & Interaction Architecture
* **Library**: `framer-motion` for fluid component orchestration, layout transitions, and scroll reveals; CSS keyframes for background micro-pulses; `@react-three/fiber` for progressive 3D.
* **Signature Brand Animation**: Flowing Blue (`#0878FF`) → Cyan (`#00D9D9`) orbital light path that travels along network paths, frames cards on hover, and pulses during simulated execution.
* **Micro-Interactions**:
  - Magnetic CTAs with subtle glow border.
  - Hover states on company nodes displaying live metrics (12 active tasks, 4 AI workers, 94% health).
  - Terminal typewriter effect in the Execution Console demo.
  - Throttled mouse position tracking for ambient radial spotlight.

---

## 6. Performance & Responsive Strategy
* **Progressive 3D Loading**: Lazy-load the Three.js Canvas via Next.js `dynamic(() => import(...), { ssr: false })` with a lightweight 2.5D schematic placeholder until the WebGL context is initialized.
* **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`, gracefully bypassing heavy orbital transforms.
* **Mobile Adaptation**: Convert complex horizontal diagrams (company network, agent handoffs) into fluid vertical operational cards on `< 768px` viewports; disable custom cursor light; keep touch targets >= 44px.
* **Clean Code Separation**: Zero monolithic files; every section is isolated in its own typed TypeScript component.
