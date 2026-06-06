# Premium Landing Page — Immersive Showcase Experience

Rebuild the existing `HomePage.tsx` into a 9-section, Awwwards-quality showcase experience using Framer Motion, existing design tokens, and the project's component conventions.

> [!IMPORTANT]
> **Scope** — All changes are strictly inside `src/landing/`. No dashboard, features, APIs, hooks, routing, or auth code will be touched. The existing `LandingLayout`, `LandingNavbar`, and `LandingFooter` remain untouched.

> [!WARNING]
> **HomePage.tsx will be fully rewritten** — The current basic hero+stats+features+CTA page will be replaced entirely with the new 9-section experience. The `AboutPage.tsx` is left unchanged.

## Open Questions

> [!IMPORTANT]
> **Team Members** — The `AboutPage` currently lists 3 placeholder team members. Should I use the same names, or do you want to provide real team member names, roles, and contributions for Section 8?

---

## Proposed Changes

### Dependency Installation

Install `framer-motion` for scroll animations, viewport reveals, parallax, and stagger effects.

```bash
npm install framer-motion
```

---

### Landing Section Components

All new section components will be created under `src/landing/components/`. Each section is self-contained and reusable.

#### [NEW] [HeroSection.tsx](file:///d:/Full%20Projects/WEP/File%20Archiving%20and%20Taxpayer%20Service/file_archiving_and_taxpayer_services_system/src/landing/components/HeroSection.tsx)

- Full-viewport hero with animated gradient mesh background
- Floating archive cards that orbit/float using `motion.div` with `animate` loops
- Animated data-flow particle dots in the background
- Project name with typewriter-style reveal
- Short description with stagger word animation
- Dual CTAs: "ابدأ الآن" and "استكشف النظام"
- Responsive: stacks vertically on mobile

#### [NEW] [TransformationSection.tsx](file:///d:/Full%20Projects/WEP/File%20Archiving%20and%20Taxpayer%20Service/file_archiving_and_taxpayer_services_system/src/landing/components/TransformationSection.tsx)

- Visual before/after split with scroll-triggered reveal
- Left side: paper archives, manual processes (muted, grayscale aesthetic)
- Right side: digital system, organized workflows (vibrant, primary colors)
- Animated divider line that draws on scroll
- Icon-based comparison items with stagger animations

#### [NEW] [WorkflowSection.tsx](file:///d:/Full%20Projects/WEP/File%20Archiving%20and%20Taxpayer%20Service/file_archiving_and_taxpayer_services_system/src/landing/components/WorkflowSection.tsx)

- Interactive vertical timeline with connected nodes
- 7 steps: Create Taxpayer → Create File → Add Tax Info → Manage Attachments → Track Movements → Archive → Reports
- Each step has icon, title, description
- Animated connecting line that draws progressively on scroll
- Active step highlights with glow effect
- Nodes pulse when they enter viewport

#### [NEW] [ModulesSection.tsx](file:///d:/Full%20Projects/WEP/File%20Archiving%20and%20Taxpayer%20Service/file_archiving_and_taxpayer_services_system/src/landing/components/ModulesSection.tsx)

- Bento-grid layout (asymmetric card sizes) for system modules
- Modules: Files, Taxpayers, Requests, Reports, Notifications, Attachments, File Movements, Users
- Each card has icon, title, short description, subtle hover animation
- Glassmorphism card style with border glow on hover
- Stagger reveal on scroll

#### [NEW] [TechStackSection.tsx](file:///d:/Full%20Projects/WEP/File%20Archiving%20and%20Taxpayer%20Service/file_archiving_and_taxpayer_services_system/src/landing/components/TechStackSection.tsx)

- Three columns: Frontend, Backend, Mobile
- Each technology shown as a premium card with SVG icon, name, and one-liner
- Floating orbital animation for tech icons
- Subtle connection lines between related technologies
- Scroll-triggered stagger reveal

#### [NEW] [ArchitectureSection.tsx](file:///d:/Full%20Projects/WEP/File%20Archiving%20and%20Taxpayer%20Service/file_archiving_and_taxpayer_services_system/src/landing/components/ArchitectureSection.tsx)

- Animated vertical architecture diagram
- Layers: Mobile App → API Layer → Backend → Database
- Each layer is a glassmorphism card that fades in sequentially
- Animated connecting arrows between layers
- Pulsing data-flow dots traveling along the arrows
- Icons for each layer (Smartphone, Globe, Server, Database)

#### [NEW] [StrengthsSection.tsx](file:///d:/Full%20Projects/WEP/File%20Archiving%20and%20Taxpayer%20Service/file_archiving_and_taxpayer_services_system/src/landing/components/StrengthsSection.tsx)

- Grid of strength badges/pills with icons
- Items: RBAC, Clean Architecture, Separation of Concerns, Scalable Structure, Lazy Loading, Code Splitting, Reusable Components, Feature-Based Architecture, Type Safety, Form Validation, Modern State Management
- Each pill animates in with a subtle bounce
- Hover effect: expand to show brief description
- Premium dark section with subtle gradient background

#### [NEW] [TeamSection.tsx](file:///d:/Full%20Projects/WEP/File%20Archiving%20and%20Taxpayer%20Service/file_archiving_and_taxpayer_services_system/src/landing/components/TeamSection.tsx)

- Premium team cards with avatar placeholder (initials-based)
- Name, role, contribution description
- Cards have subtle tilt effect on hover
- Stagger reveal animation
- Will use same team data from AboutPage unless user provides real data

#### [NEW] [FinalShowcaseSection.tsx](file:///d:/Full%20Projects/WEP/File%20Archiving%20and%20Taxpayer%20Service/file_archiving_and_taxpayer_services_system/src/landing/components/FinalShowcaseSection.tsx)

- Full-width dark section with gradient background
- Project summary with animated counter stats
- Final CTA with glowing button effect
- Subtle particle/dot pattern background
- Emotional closing statement

---

### Main Page Assembly

#### [MODIFY] [HomePage.tsx](file:///d:/Full%20Projects/WEP/File%20Archiving%20and%20Taxpayer%20Service/file_archiving_and_taxpayer_services_system/src/landing/pages/HomePage.tsx)

- Complete rewrite to compose all 9 sections
- Clean, readable component composition
- Smooth scroll behavior via CSS `scroll-behavior: smooth`

---

### Landing-Specific CSS

#### [NEW] [landing.css](file:///d:/Full%20Projects/WEP/File%20Archiving%20and%20Taxpayer%20Service/file_archiving_and_taxpayer_services_system/src/landing/landing.css)

- Custom keyframe animations (float, pulse-glow, gradient-shift)
- Glassmorphism utility classes
- Landing-specific spacing/typography tokens
- Gradient mesh background utilities
- No modifications to the global `index.css`

---

## Verification Plan

### Manual Verification

- Navigate to `/` and verify all 9 sections render correctly
- Scroll through the entire page and verify:
  - All Framer Motion animations trigger on scroll
  - No janky or broken animations
  - Responsive layout on smaller viewports
  - Dark mode compatibility
- Verify the existing `AboutPage` at `/about` is unaffected
- Verify the dashboard and all features are completely unaffected
- Check for TypeScript errors via the dev server console
