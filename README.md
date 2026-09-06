# UHRIS Component Gallery

Developer toolkit for the `@diwauhris/ui` component library.

> **This gallery is a developer reference, not a visual acceptance standard.**
> It documents component APIs, interaction behaviour, and default visual states.
> Application screens are expected to customise tone, content, labels, icon choice, and size
> for each feature context. Acceptance criteria should be evaluated against the feature
> specification — not pixel-for-pixel visual match with this gallery.

## Running the gallery

```bash
npm install
npm run dev     # starts at http://localhost:5174
```

## What this gallery contains

- **Component pages** — API reference, live playground, and implementation examples for every `@diwauhris/ui` component.
- **Foundations** — Design tokens: colors, typography, spacing, elevation, and motion.
- **Patterns** — Real HRIS composition patterns (approval actions, modal footers, page headers).

## Package test

Navigate to `/ui-library/package-test` to verify the installed `@diwauhris/ui` build exposes
all expected exports without import errors.

## Publishing a new version

```bash
cd DIWA-UHRIS-UI-GUIDELINES
npm run build:lib
npm publish
```
