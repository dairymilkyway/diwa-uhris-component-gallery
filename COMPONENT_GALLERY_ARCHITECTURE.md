# UHRIS Component Gallery Architecture

> **Source of truth for all component page implementation.**
> Extracted from the canonical Button page. Do not modify without
> updating the Button reference and re-verifying every rule below.

---


## 1. Purpose

This document is the single authoritative reference for how component pages in the
UHRIS Component Gallery are designed, structured, and implemented.

The gallery currently contains inconsistent page implementations. This document
establishes the correct standard so that all existing and future component pages
can be audited and migrated to a uniform architecture.

This document does not describe what a component does. It describes how a
component's gallery page must be built.

### Scope and acceptance standards

**The gallery is a developer reference tool, not a visual acceptance standard.**

Component pages demonstrate:
- The component's full API surface (all props, all states)
- Default visual appearance using hard-coded demo data
- Keyboard and ARIA behaviour

**What application developers are expected to customise:**
- `variant` / `tone` — choose the semantically appropriate variant for the feature context
- `children` / `label` — real copy from the feature, not gallery placeholder text
- `icon` / `leftIcon` / `rightIcon` — icons relevant to the action, not gallery defaults
- `size` — match the density of the surrounding layout

**What must not be changed:**
- Keyboard interaction model (Enter, Space, Escape, Arrow navigation)
- ARIA roles, aria-label, aria-expanded, aria-invalid wiring
- Focus management (open → first item, close → trigger return)
- Loading / disabled / error state logic

**Acceptance standard:** Behaviour and accessibility must match the feature specification.
Visual appearance may differ from the gallery when the developer has intentionally
customised variant, content, or size for the feature context.

---

## 2. Canonical Reference

> **The Button component page is the canonical reference implementation.**
>
> File: `src/ui-library/gallery/button/ButtonPage.tsx`
> Component: `src/ui-library/gallery/button/Button.tsx`
> Playground: `src/ui-library/gallery/button/ButtonPlayground.tsx`

Button is the architectural reference because its page structure, section ordering,
example presentation, playground design, accessibility documentation, API table, and
overall information flow represent the intended standard.

**Important:** Button is the design and implementation reference. It is not a template
to be copied verbatim for every component. Some sections in Button are specific to a
configurable interactive component (variants, sizes, states, icon placement, patterns).
A simpler component should follow the same structural rules but will have fewer sections.

---

## 3. Core Principles

These principles are extracted directly from the Button implementation and must
be preserved in every component page.

**P1. Separate "what it looks like" from "how to build it".**
The Overview section shows only the rendered component. Code appears only in the
Implementation sections. This separation prevents the page from becoming a code dump
before the user has seen the component visually.

**P2. Every implementation example owns its code.**
Every `<Showcase>` block contains both the live rendered preview and the exact
copyable code that reproduces that preview. Code is never shown separately from
the thing it produces.

**P3. Code must exactly reproduce its preview.**
The string in `code={CODE.x}` must produce the same visual output as the JSX
inside the `<Showcase>` children. No approximations or abbreviated examples.

**P4. The playground answers "how does this behave?" not "what does this look like?"**
The Overview answers the visual question. The Playground lets the user experiment
with configuration. These are separate concerns and must stay separate.

**P5. Sections are independent anchored units.**
Every section has an `id` and a heading. Users can link to `/ui-library/button#api`
and land directly on the API section. Section `id` values are stable identifiers.

**P6. The page is an article, not a list of facts.**
Sections flow in a logical narrative: see it → experiment → understand it →
implement it → know the rules → find the API → find related things.

**P7. No state, no business logic, no API calls in gallery pages.**
Gallery pages and examples are purely presentational. Demo data is hard-coded.
No service calls, no context reads from production providers.



---

## 4. Canonical Page Structure

This is the section order extracted directly from ButtonPage.tsx.

```
GalleryLayout (activeId="<component-id>")
  <title>{ComponentName} — UI Component Gallery</title>
  GalleryPageWrapper
    │
    ├── 1. Header                        [UNIVERSAL — required on every page]
    │       GalleryComponentHeader
    │         category, name, description, status
    │
    ├── 2. Overview                      [UNIVERSAL — required on every page]
    │       GallerySection id="overview"
    │         ShowcasePreview standalone
    │           {rendered component — all primary variants/states at a glance}
    │
    ├── 3. Playground                    [CONDITIONAL — see Section 9]
    │       GallerySection id="playground"
    │         <ComponentPlayground />
    │
    ├── 4. Implementation sections       [CONDITIONAL — varies by component]
    │       One GallerySection per dimension:
    │         id="variants"   — if multiple visual variants exist
    │         id="sizes"      — if multiple sizes exist
    │         id="states"     — if interactive states exist (default/disabled/loading)
    │         id="icons"      — if icon placement is a documented prop behavior
    │         id="full-width" — if a layout dimension prop exists
    │         id="patterns"   — if real-world composition patterns exist
    │
    ├── 5. Accessibility                 [UNIVERSAL — required on every page]
    │       GallerySection id="accessibility"
    │         White card with keyboard, focus, and ARIA documentation
    │
    ├── 6. API Reference                 [UNIVERSAL — required on every page with props]
    │       GallerySection id="api"
    │         ApiTable
    │
    └── 7. Related Components            [UNIVERSAL — required when related entries exist]
            GallerySection id="related"
              RelatedComponents
```

### Section ordering rule

The order must always be:
**Header → Overview → [Playground] → [Implementation sections] → Accessibility → API → Related**

Do not move Accessibility to before Implementation. Users need to see and understand
the component before reading its accessibility rules.

Do not move API to before Accessibility. The API is reference material, not the
primary learning path.



---

## 5. Visual Design Standards

These are extracted from the actual class names in Button and its infrastructure components.

### Page container

```tsx
// GalleryPageWrapper
<article className="mx-auto max-w-5xl space-y-16 pb-32">
```

- Max width: `max-w-5xl` (64rem / 1024px)
- Horizontal centering: `mx-auto`
- Section vertical spacing: `space-y-16` (4rem between every top-level section)
- Bottom padding: `pb-32` (8rem — room below the last section)

### Section container

```tsx
// GallerySection
<section className="scroll-mt-8 space-y-6">
```

- Internal vertical spacing: `space-y-6` (1.5rem between heading, description, content)
- Scroll offset: `scroll-mt-8` (2rem — compensates for the sticky header)

### Component header

```tsx
<div className="space-y-4 border-b border-slate-100 pb-10">
  <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">
    {category}
  </p>
  <div className="flex flex-wrap items-center gap-3">
    <h1 className="text-4xl font-bold tracking-tight text-slate-900">{name}</h1>
    <span className="...status badge...">{label}</span>
  </div>
  <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-500">
    {description}
  </p>
</div>
```

- Category: `text-xs font-bold uppercase tracking-widest text-indigo-500`
- Component name: `text-4xl font-bold tracking-tight text-slate-900`
- Status badge: pill with variant-colored background (emerald/amber/slate)
- Description: `max-w-2xl text-lg font-medium leading-relaxed text-slate-500`
- Bottom border: `border-b border-slate-100 pb-10`

### Section headings

```tsx
<h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
<p className="mt-1.5 text-base font-medium leading-relaxed text-slate-500">{description}</p>
```

- Heading: `text-2xl font-bold tracking-tight text-slate-900`
- Optional description: `text-base font-medium leading-relaxed text-slate-500`

### Showcase preview wells

Four background tones available. Button uses all four:

| Tone | Class | When to use |
|---|---|---|
| `light` (default) | `bg-slate-50` | Most component previews |
| `white` | `bg-white` | When component has its own background or borders |
| `dark` | `bg-slate-900` | Dark-background demonstrations |
| `grid` | `bg-slate-50` + CSS grid lines | Layout/spacing demonstrations |

Button uses `white` with `center={false}` for pattern examples (modal footer, approval actions)
because those patterns use their own white background and the default `light` background would
create visual confusion with the button's own white/outline styling.

### Showcase example structure

```
[Optional title text — text-sm font-bold text-slate-800]
[Optional description — text-xs font-medium text-slate-400]
┌─ Preview well ────────────────────────────────────┐
│  bg-slate-50 (or white/dark/grid)                 │
│  min-h-[120px] px-8 py-8                          │
│  flex flex-wrap items-center justify-center gap-3 │
│  (or items-start when center={false})             │
│  rounded-t-xl border-x border-t border-slate-200  │
└───────────────────────────────────────────────────┘
┌─ Code toolbar ────────────────────────────────── Copy ─┐
│  bg-slate-800  border-b border-slate-700/60            │
│  language label (text-[10px] monospace text-slate-500) │
└────────────────────────────────────────────────────────┘
┌─ Code body ────────────────────────────────────────────┐
│  bg-slate-900                                          │
│  max-h-80 px-5 py-4                                   │
│  font-mono text-xs text-slate-300                      │
│  rounded-b-xl border-x border-b border-slate-200       │
└────────────────────────────────────────────────────────┘
```

### ShowcaseGrid

```tsx
<ShowcaseGrid columns={2}>  // or 3
  <Showcase ...>{/* example 1 */}</Showcase>
  <Showcase ...>{/* example 2 */}</Showcase>
</ShowcaseGrid>
```

- `columns={2}`: `sm:grid-cols-2` — side by side on small+ screens
- `columns={3}`: `sm:grid-cols-2 lg:grid-cols-3` — up to 3 on large screens
- Always collapses to `grid-cols-1` on mobile
- Gap between items: `gap-6`
- Use grids when examples are visually independent and similar in size
- Do not use a grid for examples that need full width (e.g. patterns)

### Accessibility section card

```tsx
<div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
  {/* sections rendered as headed lists */}
  <h3 className="mb-2 text-sm font-bold text-slate-700">{heading}</h3>
  <ul className="space-y-1.5">
    <li className="flex items-start gap-2 text-sm font-medium text-slate-600">
      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
      {rule}
    </li>
  </ul>
</div>
```

### API table

The `<ApiTable>` component handles all visual styling. The page only provides the data.
Columns: Prop name (with required badge) / Type (monospace indigo) / Default / Description.



---

## 6. Component Header Standard

Every component page uses `<GalleryComponentHeader>` as its first element inside
`<GalleryPageWrapper>`.

### Required props

| Prop | Type | What it is |
|---|---|---|
| `category` | `string` | Registry category label ("Inputs", "Display", etc.) |
| `name` | `string` | Human-readable component name ("Button", "OTP Input") |
| `description` | `string` | One-sentence description of what the component does |
| `status` | `'complete' \| 'wip' \| 'coming-soon'` | Shown as a status pill |

### Optional props

| Prop | Notes |
|---|---|
| `docsRoute` | Accepted for source compatibility, not rendered in standalone gallery |

### Rules

- `description` must be a single sentence. It answers "what does this component do?"
  in one line. Do not list features, do not use bullet points.
- `category` must exactly match the component's registry `category` field.
- `status` must exactly match the component's registry `status` field.

### What the header does NOT contain

- No navigation breadcrumbs (those are in the sidebar)
- No action buttons (no "View Source", no external links)
- No version numbers
- No last-updated timestamps

The header is intentionally minimal. Extra metadata belongs in the API section or
in a dedicated documentation section, not in the header.

---

## 7. Example Standard

### The Overview section

Every component page has exactly one Overview section.

**Purpose:** Show the component rendered visually without any code. The user sees
what the component looks like before reading anything.

```tsx
<GallerySection
  id="overview"
  title="Overview"
  description="Brief sentence explaining what is shown — optional"
>
  <ShowcasePreview standalone>
    {/* render all primary variants/forms of the component */}
  </ShowcasePreview>
</GallerySection>
```

Rules:
- `standalone={true}` — the preview has full border-radius and all four borders
  because there is no code block below it
- Do not put code blocks in the Overview
- Show multiple variants side by side when they fit (Button shows all 5 variants)
- If the component has only one form, show the one form
- The description is optional and brief — one sentence max

### Implementation sections (Showcase pattern)

Every implementation example uses `<Showcase>`:

```tsx
<Showcase
  title="Primary"
  description="The single most prominent action on a surface."
  code={CODE.primary}
>
  <Button variant="primary">
    <Save size={15} aria-hidden="true" />
    Save Changes
  </Button>
</Showcase>
```

Rules:
- `title` — optional short name for the example (e.g., "Primary", "Disabled", "Left icon")
- `description` — optional one-sentence explanation (e.g., usage guidance, when to use)
- `code` — a string constant defined at the top of the page file in a `CODE` object
- The JSX inside children must exactly produce what the `code` string shows
- `tone` defaults to `light`; use `white` when the component has a white background
- `center` defaults to `true`; use `center={false}` for layout/pattern examples

### Code constant convention

All code strings are defined as a single `CODE` object at the top of the page file,
after imports and before the component function:

```tsx
const CODE = {
  primary: `import { Button } from '...';
...`,
  disabled: `...`,
};
```

Rules:
- Use a single `CODE` object, not individual `const` declarations
- Key names match the section/example name (e.g. `CODE.primary`, `CODE.stateLoading`)
- Values are raw template literals — no JSX, no syntax highlighting, no imports
- Import paths in code examples use `@/ui-library/gallery/...` aliases
- Every code string must be a complete, runnable example (imports included)

### When to use ShowcaseGrid vs individual Showcase

Use `<ShowcaseGrid>` when you have multiple related examples that are:
- Similar in visual size
- Meant to be compared side-by-side
- Each independent (the user can read any one without the others)

Use individual full-width `<Showcase>` (no grid) when:
- The example needs full width (layout patterns, modal footers)
- The example demonstrates a concept that stands alone
- The code is long and needs the full horizontal space



---

## 8. Code Example Standard

Code examples are the most important artifact of an implementation section.
These rules are non-negotiable.

### The code-preview contract

The preview JSX and the code string must produce identical output.
If the code shows `variant="primary"`, the preview renders `variant="primary"`.
If the code shows an import, that import is required for the example to work.
There are no shortcuts, no approximations.

### Code string format

```
import { ComponentName } from '@/ui-library/gallery/<name>/<Name>';
import { Icon } from 'lucide-react';

// optional comment explaining a non-obvious choice

<ComponentName prop="value">
  content
</ComponentName>
```

- Use `@/ui-library/gallery/...` for gallery component imports
- Use `lucide-react` for icon imports
- Use `react` for hook imports (`useState`, etc.)
- Use plain JSX — no TypeScript-specific syntax in the code examples (no `<T>`, no `as Type`)
- Keep examples minimal — show only what is needed to demonstrate the example
- Show complete code including imports when the import is not obvious

### Code block visual rules (enforced by `ShowcaseCode`)

- Background: `bg-slate-900` (dark panel)
- Language badge: `text-[10px] monospace text-slate-500` (e.g., "tsx")
- Code text: `text-xs font-mono text-slate-300`
- **No syntax highlighting** — plain text only. Color comes only from the text-slate-300 class.
  This is intentional and must not be changed.
- `<code>` element must have `style={{ background: 'transparent', padding: 0, borderRadius: 0 }}`
  to prevent the global `code` CSS rule from bleeding in
- Copy button: accessible, shows "Copied" for 2 seconds after activation

### CopyCodeBlock vs Showcase

There are two code block components:

| Component | When to use |
|---|---|
| `Showcase` | When code is paired with a live preview (implementation examples) |
| `CopyCodeBlock` | When code stands alone with no preview (import snippets, setup code) |

Button uses `Showcase` for all examples. `CopyCodeBlock` is appropriate for
components where the code demonstrates something that cannot be shown as a static
preview (e.g., a hook, a utility function, a setup pattern).

---

## 9. Playground Standard

### Decision tree

```
Does the component have user-configurable props?
│
├── NO → No playground. Use Overview + static Showcase examples only.
│
└── YES
    │
    Does changing those props produce visually distinct or meaningfully
    different behavior that is hard to show with static examples alone?
    │
    ├── NO → No playground. Static Showcase examples are sufficient.
    │
    └── YES
        │
        Would interactive controls help a developer quickly understand
        how to configure the component for their use case?
        │
        ├── NO → Static examples. Consider adding more examples instead.
        │
        └── YES → Add a playground.
```

### When a playground is APPROPRIATE

From Button: the playground is justified because:
- 5 visual variants × 3 sizes × 2 states (loading/disabled) × 2 icon slots × fullWidth
  = ~60+ combinations
- Static examples cannot exhaustively cover the space
- A developer needs to see "what does a small ghost button with a right arrow look like?"
  and the playground answers that instantly
- Icon placement behavior (icons hidden during loading) is easiest to understand interactively

Other component types that typically benefit from a playground:
- Any component with multiple configurable visual variants (Badge tones, Alert types)
- Form controls with validation states, sizes, disabled states
- Components with boolean toggles that produce visually distinct behavior
- Components with interactive states that are hard to show statically

### When a playground is NOT APPROPRIATE

- Static/structural components (Divider, Section heading, PageHeader)
- Components that are already simple enough that all variants fit in 1-3 static examples
- Documentation-only sections (Colors, Typography, Spacing tokens)
- Components where the interesting behavior is interaction, not configuration
  (e.g., Modal — the interesting thing is opening/closing, not configuration)

### When a playground is OPTIONAL

For components that are primarily interactive (Modal, Drawer, Combobox, DatePicker),
a playground adds little value because the interactivity IS the behavior. Instead,
live trigger buttons in the Overview section serve the same purpose.

### Playground implementation rules

If a playground exists:

1. It lives in a separate `<ComponentName>Playground.tsx` file in the same directory
2. It is imported into the page file and rendered inside a dedicated `GallerySection`
3. The section has `id="playground"` and `title="Playground"`
4. It uses `<PlaygroundPanel controls={...} preview={...} />`
5. The controls column is `w-72` at `lg:` breakpoint, collapses to full width below
6. Controls use the primitive components from `PlaygroundPanel.tsx`:
   - `ControlGroup` — groups related controls with a label
   - `RadioControl` — mutually exclusive button-style choices
   - `ToggleControl` — boolean switch
   - `SelectControl` — dropdown for longer option lists
7. The preview renders the live component with no surrounding text, just the component
8. Use `const [x, setX] = useState(...)` for every controlled value — no global state

### Playground section placement

The playground comes immediately after Overview and before any implementation sections.

```
Overview (see it)
↓
Playground (experiment)
↓
Variants / Sizes / States / etc. (understand it systematically)
```



---

## 10. Universal vs Conditional Sections

### Universal (required on every component page)

These sections must appear on every complete component page, regardless of
component complexity.

| Section | id | Justification |
|---|---|---|
| **Header** | — | Every component needs identity, description, status |
| **Overview** | `overview` | Every component needs a visual-first introduction |
| **Accessibility** | `accessibility` | Every interactive or visible component has accessibility rules |
| **API Reference** | `api` | Every component with props needs a prop reference table |
| **Related Components** | `related` | Every component connects to related components in the system |

**Note on `related`:** This section is required when the registry has meaningful
related entries. If `getRelatedComponents([...])` returns an empty array, omit the
section rather than showing an empty state.

### Conditional (present when the component warrants it)

| Section | id | When to include |
|---|---|---|
| **Playground** | `playground` | See decision tree in Section 9 |
| **Variants** | `variants` | Component has multiple named visual variants |
| **Sizes** | `sizes` | Component has multiple size scales |
| **States** | `states` | Component has meaningful interactive states (default, disabled, loading, error) |
| **Icons** | `icons` | Component documents icon placement as a distinct API feature |
| **Full Width** | `full-width` | Component has a layout-filling mode |
| **Patterns** | `patterns` | Component has documented composition patterns with other components |
| **Events/Behavior** | custom | Complex interactive behavior requiring dedicated examples |

### Additional custom sections

A page may add sections beyond this list when the component genuinely requires it.
Examples:
- `comparison` — when two related components need side-by-side comparison (OrgChart vs OrgUnitTree)
- `deep` — when a component has a specific complex mode worth a separate section
- `keyboard` — when keyboard navigation is so central to the component it warrants its own section

Adding custom sections is acceptable. They must still use `<GallerySection>` with a
stable `id` and a clear `title`.

---

## 11. Button-Specific Patterns — Do Not Copy Universally

These patterns exist in Button and are correct for Button. They should not be
mechanically applied to every component.

### Five variants

Button has five named variants. Most components do not. Do not add a Variants
section to a component that has only one visual form, or only has boolean options.

### Sizes section

Button documents three sizes (sm/md/lg). Not every component has a size prop.
If a component has no size variants, omit the Sizes section entirely.

### Icon placement section

Button documents `leftIcon` and `rightIcon` as dedicated prop behavior. This is
specific to the Button's slot-based API design. Components that render icons as
children without special props do not need an Icons section.

### Patterns section

Button shows three real enterprise composition patterns (modal footer, approval
actions, page header actions). This section exists because Button appears in every
layout and the patterns are non-obvious. Only add a Patterns section when the
component genuinely has documented multi-component usage patterns that developers
are likely to need and would not discover from the API alone.

### Loading state

Button documents a specific loading convention where the caller owns the spinner
inside `children`. This is documented in detail because it is architectural, not
just a prop. Components that have simpler or different loading behavior should
document their own convention — they should not attempt to mimic Button's convention
unless it is the same pattern.

### CODE object structure

Button's `CODE` object has 13 keys covering all example variations. Simpler components
will have fewer. The `CODE` object pattern itself is universal; the number and grouping
of keys is component-specific.



---

## 12. Implementation Architecture

### File structure per component

```
src/ui-library/gallery/<component-name>/
├── <ComponentName>.tsx          ← Design-system component (the reusable thing)
├── <ComponentName>Page.tsx      ← Gallery page (this is what we're architecting)
└── <ComponentName>Playground.tsx ← Interactive playground (only if warranted)
```

### Page file structure

The page file follows this internal structure, in order:

```tsx
/**
 * ComponentNamePage — Gallery infrastructure
 *
 * Brief description.
 *
 * Canonical section order:
 *   Header → Overview → [Playground] → [Implementation sections] → Accessibility → API → Related
 */

// 1. React imports
import { useState } from 'react';

// 2. Lucide icon imports (only icons actually used in examples)
import { Save, Trash2 } from 'lucide-react';

// 3. Gallery layout and infrastructure
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';

// 4. Playground (if applicable)
import { ComponentPlayground } from './ComponentPlayground';

// 5. The component being documented
import { Component } from './Component';

// 6. Registry lookup
import { getRelatedComponents } from '../../registry';

// ── Constants ────────────────────────────────────────────────────────────────

const RELATED = getRelatedComponents(['id1', 'id2', 'id3']);

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  basic: `import { Component } from '@/ui-library/gallery/<name>/Component';

<Component />`,
  // ... one key per Showcase instance
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ComponentPage() {
  return (
    <GalleryLayout activeId="<registry-id>">
      <title>ComponentName — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* 1. Header */}
        <GalleryComponentHeader ... />

        {/* 2. Overview */}
        <GallerySection id="overview" title="Overview" description="...">
          <ShowcasePreview standalone>
            {/* rendered component */}
          </ShowcasePreview>
        </GallerySection>

        {/* 3. Playground — if applicable */}
        <GallerySection id="playground" title="Playground" description="...">
          <ComponentPlayground />
        </GallerySection>

        {/* 4. Implementation sections — one per relevant dimension */}

        {/* 5. Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          {/* headed lists of rules */}
        </GallerySection>

        {/* 6. API */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[...]} />
        </GallerySection>

        {/* 7. Related */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
```

### Playground file structure

```tsx
/**
 * ComponentPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import { /* icons */ } from 'lucide-react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  ToggleControl,
  SelectControl,
} from '../components/PlaygroundPanel';
import { Component } from './Component';
import type { ComponentVariant /* etc. */ } from './Component';

export function ComponentPlayground() {
  // One useState per control
  const [variant, setVariant] = useState<ComponentVariant>('primary');
  // ...

  const controls = (
    <>
      <ControlGroup label="Variant">
        <RadioControl<ComponentVariant>
          name="variant"
          value={variant}
          onChange={setVariant}
          options={[...]}
        />
      </ControlGroup>
      {/* more controls */}
    </>
  );

  const preview = (
    <Component variant={variant} /* ... */ />
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
```

### Component file structure (design-system component)

```tsx
/**
 * ComponentName — Design System Component
 *
 * Brief description of what it does.
 *
 * Document any non-obvious conventions (e.g., loading pattern, slot behavior)
 * in JSDoc here.
 */

// React imports
// Third-party imports (lucide-react, etc.)

// Types
export type ComponentVariant = 'a' | 'b';

export interface ComponentProps extends React.ComponentProps<'element'> {
  // custom props
}

// Style maps (if applicable)
const VARIANT_STYLES: Record<ComponentVariant, string> = { ... };

// Component
export function ComponentName({ prop = 'default', ...props }: ComponentProps) {
  return <element className={...} {...props} />;
}
```

### Import organization

Imports are always in this order:
1. `react` (hooks, types)
2. Third-party non-icon (`sonner`, `react-calendar`, etc.)
3. Icon imports (`lucide-react`)
4. Gallery infrastructure (`GalleryLayout`, `GalleryPageWrapper`, etc.)
5. Gallery support components (`ApiTable`, `RelatedComponents`, etc.)
6. Playground component
7. The component being documented
8. Registry functions

### State conventions

- No global state, no context, no zustand/redux
- Only `useState` for local demo/playground state
- Demo data is inlined as `const` at module level
- If a demo needs a timer or async, use `useState` + `setTimeout` inline

### Title element

Every page renders `<title>ComponentName — UI Component Gallery</title>` as JSX.
React 19 hoists this to `<head>` automatically. It must always be the first child
after `<GalleryPageWrapper>`, before `<GalleryComponentHeader>`.

Wait — checking Button: `<title>` is before `<GalleryPageWrapper>` children start,
placed as the direct first JSX element inside `<GalleryPageWrapper>`.

```tsx
<GalleryPageWrapper>
  <title>Button — UI Component Gallery</title>
  <GalleryComponentHeader ... />
  ...
</GalleryPageWrapper>
```

Format: `{ComponentName} — UI Component Gallery`



---

## 13. Responsive Requirements

These are derived from the classes actually used in ButtonPage and its infrastructure.

### Page content

- Content is constrained to `max-w-5xl` (1024px) and centered with `mx-auto`
- The gallery shell provides side padding: `px-4 sm:px-8 lg:px-12`
- At mobile widths the page is single-column, full-width within the shell's padding

### Showcase grids

- `ShowcaseGrid columns={2}` → 1 column on mobile, 2 columns on `sm:` (≥640px)
- `ShowcaseGrid columns={3}` → 1 column on mobile, 2 on `sm:`, 3 on `lg:` (≥1024px)
- Single `<Showcase>` blocks are always full width

### Playground

- Controls column: full width on mobile (below preview), `lg:w-72` fixed on desktop
- Preview: fills remaining width, min-height `240px`
- The panel collapses to vertical stacking below `lg:` breakpoint

### Overview preview

- `ShowcasePreview` uses `flex flex-wrap items-center justify-center gap-3`
- Items wrap naturally on narrow screens — no horizontal overflow

### Component page content

- `ShowcasePreview` has horizontal padding `px-8` and vertical `py-8`
- This is sufficient for most components; use `minHeight` prop for tall content
- Do not use fixed widths inside previews — use `max-w-*` with `w-full` when needed

---

## 14. Accessibility Requirements

These are standards demonstrated by the Button implementation that apply broadly.

### In the Accessibility section

Every component page must have a dedicated Accessibility section. It is rendered
as a white card with headed lists of rules. The minimum three categories that
Button demonstrates are:

1. **Keyboard** — list the exact keys that operate the component
2. **Focus Visibility** — describe the focus ring behavior (color, trigger)
3. **ARIA** — list the semantic roles, attributes, and element type rules

Not every component needs all three. Adapt the categories to the component:
- For dialogs/overlays: add Focus Management and Scroll Behavior
- For lists/trees: add Role Semantics (tree, treeitem, etc.)
- For form controls: add Label Association and Error Announcement

### In the code examples

Icons used purely decoratively must have `aria-hidden="true"`:
```tsx
<Save size={15} aria-hidden="true" />
```

Interactive elements demonstrated in examples must have accessible names:
```tsx
<button aria-label="Delete employee"><Trash2 size={16} /></button>
```

### In the component implementation

Gallery components are expected to follow the accessibility patterns documented
in `ARCHITECTURE.md` (the broader gallery accessibility document). The gallery
page's Accessibility section documents what the component does; it does not fix
accessibility gaps in production components.

---

## 15. New Component Checklist

Use this checklist before considering a new component page complete.

### Files

- [ ] `<Name>.tsx` — the reusable design-system component
- [ ] `<Name>Page.tsx` — the gallery page
- [ ] `<Name>Playground.tsx` — only if playground decision tree says YES

### Header

- [ ] `GalleryComponentHeader` is the first element inside `GalleryPageWrapper`
- [ ] `category` matches registry `category` field exactly
- [ ] `name` matches registry `name` field exactly
- [ ] `description` is a single sentence
- [ ] `status` matches registry `status` field exactly
- [ ] `<title>` element present: `{name} — UI Component Gallery`

### Overview

- [ ] `GallerySection id="overview"` present
- [ ] `ShowcasePreview standalone` used (no code block in this section)
- [ ] Shows all primary visual forms of the component

### Playground (if applicable)

- [ ] Playground decision tree consulted — decision recorded in page JSDoc
- [ ] `GallerySection id="playground"` present
- [ ] Renders `<PlaygroundPanel controls={...} preview={...} />`
- [ ] Every control uses a `ControlGroup`-wrapped primitive
- [ ] All playground state is local `useState`

### Implementation sections

- [ ] Each section uses `<GallerySection>` with a stable `id`
- [ ] Every `<Showcase>` has a `code={}` prop
- [ ] Every `code` string exactly reproduces the adjacent preview
- [ ] `CODE` object defined at module level before the page function
- [ ] Import paths in code strings use `@/ui-library/gallery/...`
- [ ] `ShowcaseGrid` used when 2+ comparable examples exist
- [ ] `tone="white"` used when component background is white
- [ ] `center={false}` used for layout/pattern examples

### Accessibility

- [ ] `GallerySection id="accessibility"` present
- [ ] White card with at least: Keyboard, Focus Visibility, ARIA sections
- [ ] Lists use bullet-dot pattern (`h-1 w-1 rounded-full bg-slate-300`)
- [ ] All decorative icons in examples have `aria-hidden="true"`

### API Reference

- [ ] `GallerySection id="api"` present
- [ ] `<ApiTable>` with all public props documented
- [ ] Each prop has: name, type, default (if applicable), description
- [ ] Required props marked with `required: true`

### Related Components

- [ ] `GallerySection id="related"` present (if related components exist)
- [ ] `getRelatedComponents([...])` called with appropriate registry IDs
- [ ] Registry IDs verified against actual registry entries

### Section order

- [ ] Header → Overview → [Playground] → [Implementation] → Accessibility → API → Related

### Code quality

- [ ] No production imports (no `shared/`, no feature modules)
- [ ] No unused imports
- [ ] `noUnusedLocals` would not fail on this file
- [ ] No console.log or debug code
- [ ] Page is `export default function`



---

## 16. Migration / Audit Checklist

Use this checklist when auditing an existing component page against the Button architecture.

For each item: mark **PASS**, **FAIL**, or **N/A** (not applicable to this component).

### Structure audit

| Item | Status | Notes |
|---|---|---|
| Section order matches canonical: Header → Overview → [Playground] → [Impl] → A11y → API → Related | | |
| `GalleryLayout` is the outermost wrapper | | |
| `GalleryPageWrapper` wraps all content | | |
| `<title>` element present with correct format | | |
| `GalleryComponentHeader` is first section inside wrapper | | |
| `GallerySection` used for every top-level section | | |
| Every section has a stable `id` attribute | | |

### Header audit

| Item | Status | Notes |
|---|---|---|
| `category` matches registry entry | | |
| `name` matches registry entry | | |
| `description` is a single sentence | | |
| `status` matches registry entry | | |

### Overview audit

| Item | Status | Notes |
|---|---|---|
| Overview section exists (`id="overview"`) | | |
| `ShowcasePreview standalone` used | | |
| No code blocks in Overview | | |
| All primary forms of component shown | | |

### Playground audit

| Item | Status | Notes |
|---|---|---|
| Playground decision tree was applied | | |
| If playground exists: uses `PlaygroundPanel` | | |
| If playground exists: lives in separate `Playground.tsx` | | |
| If playground skipped: reason is documented in page JSDoc | | |

### Example audit

| Item | Status | Notes |
|---|---|---|
| Every `Showcase` has a `code` prop | | |
| Every code string exactly reproduces its preview | | |
| Import paths in code strings use `@/ui-library/gallery/...` | | |
| `CODE` object defined at module level | | |
| `ShowcaseGrid` used for comparable side-by-side examples | | |
| `tone` set appropriately for white-background components | | |
| `center={false}` used for layout/pattern examples | | |

### Documentation audit

| Item | Status | Notes |
|---|---|---|
| Accessibility section exists (`id="accessibility"`) | | |
| Accessibility section has white card style | | |
| Keyboard behavior documented | | |
| Focus visibility documented | | |
| ARIA behavior documented | | |
| API section exists (`id="api"`) | | |
| All public props in ApiTable | | |
| Required props marked | | |
| Related section exists (if applicable) | | |

### Isolation audit

| Item | Status | Notes |
|---|---|---|
| No imports from `shared/components/` | | |
| No imports from production feature modules | | |
| No `navigate('/dashboard')` or production routes | | |
| Demo data is hard-coded, no API calls | | |

### Identified gaps (fill in during audit)

List any sections, examples, or patterns that are missing compared to Button:

- [ ] _________________
- [ ] _________________

### Identified Button-specific content incorrectly applied (fill in during audit)

List any Button-specific patterns that were copied without justification:

- [ ] _________________

---

## Appendix: Quick Reference — Infrastructure Components

| Component | Import | Purpose |
|---|---|---|
| `GalleryLayout` | `../GalleryLayout` | Page shell with sidebar and header |
| `GalleryPageWrapper` | `../components/GalleryPageWrapper` | `max-w-5xl` article container |
| `GalleryComponentHeader` | `../components/GalleryComponentHeader` | Component name/description/status |
| `GallerySection` | `../components/GallerySection` | Anchored, labeled content section |
| `Showcase` | `../components/Showcase` | Preview + code block pair |
| `ShowcasePreview` | `../components/Showcase` | Preview well only (for Overview) |
| `ShowcaseCode` | `../components/Showcase` | Code block only (rare) |
| `ShowcaseGrid` | `../components/ShowcaseGrid` | 2 or 3-column grid of Showcases |
| `PlaygroundPanel` | `../components/PlaygroundPanel` | 2-column controls+preview layout |
| `ControlGroup` | `../components/PlaygroundPanel` | Labeled group of controls |
| `RadioControl` | `../components/PlaygroundPanel` | Mutually exclusive button choices |
| `ToggleControl` | `../components/PlaygroundPanel` | Boolean switch |
| `SelectControl` | `../components/PlaygroundPanel` | Dropdown for longer option lists |
| `ApiTable` | `../components/ApiTable` | Prop documentation table |
| `RelatedComponents` | `../components/RelatedComponents` | Related component link chips |
| `CopyCodeBlock` | `../components/CopyCodeBlock` | Standalone code block (no preview) |
| `PreviewCanvas` | `../components/PreviewCanvas` | Alternative preview container |
| `StateGrid` | `../components/StateGrid` | Horizontal state strip |
| `VariantGrid` | `../components/VariantGrid` | Labeled tile grid |

---

*This document was extracted from the Button component page. Any deviation from the
patterns described here must be justified by the specific requirements of the component
being documented. When in doubt, compare against Button.*
