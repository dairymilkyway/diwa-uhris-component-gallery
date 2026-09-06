import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Scanned during lib CSS build so all component utility classes are included
    './src/ui-library/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    // ── Custom screens (breakpoints) ─────────────────────────────────────
    // Adds xs: (475px) to the standard Tailwind scale.
    // Full 7-tier scale: base → xs → sm → md → lg → xl → 2xl
    screens: {
      'xs':  '475px',   // Large phone landscape — added custom
      'sm':  '640px',   // Small tablet
      'md':  '768px',   // Tablet portrait — most layout shifts happen here
      'lg':  '1024px',  // Tablet landscape / small laptop
      'xl':  '1280px',  // Desktop — max-w-7xl container caps here
      '2xl': '1536px',  // Wide desktop
    },
    extend: {
      // ── Typography tokens ──────────────────────────────────────────────
      // Two typographic roles aligned to the DIWA/UHRIS brand specification.
      //
      // font-heading → Barlow (digital implementation of Helvetica Neue 85)
      //   Official brand role: Display, Headlines, Headings, Sub-headings
      //   Use: page H1, section headings, modal/dialog titles, display numbers
      //   Class: font-heading
      //
      // font-body → Libre Franklin (digital implementation of ITC Franklin Gothic Std)
      //   Official brand role: Titles, Body, Supporting text
      //   Use: all UI text, labels, body copy, navigation, form controls
      //   Inherited from body{} — no explicit class needed in most contexts
      //
      // font-mono → system monospace stack
      //   Functional role only — NOT a DIWA brand typeface
      //   Use: code blocks, inline code, technical values exclusively
      fontFamily: {
        heading: [
          'Barlow',
          'Helvetica Neue',
          'Helvetica',
          'Arial Narrow',
          'Arial',
          'sans-serif',
        ],
        body: [
          'Libre Franklin',
          'Franklin Gothic Medium',
          'Franklin Gothic',
          'ITC Franklin Gothic Std',
          'Gill Sans',
          'Trebuchet MS',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },

      // ── Brand color tokens ─────────────────────────────────────────────
      // These token names are the single mapping point between the official
      // DIWA brand specification and the codebase.
      // Every Tailwind class referencing brand colors must use these names.
      colors: {
        // ── Surface & text foundation ──────────────────────────────────
        // Registered here so body{} in index.css can reference Tailwind
        // utilities (bg-surface-page, text-body-base) instead of raw hex.
        // Hex values are the single source of truth — do not duplicate them.
        'surface-page': '#f4f6f9', // Page background — body bg
        'body-base':    '#0c1a2e', // Primary body text color
        // Primary palette — core brand identity
        'brand-navy':    '#00377B',  // Primary Blue 1 — deep anchor
        'brand-blue':    '#034EA2',  // Primary Blue 2 — core interactive
        'brand-sky':     '#2D8ACA',  // Primary Blue 3 — lighter accent

        // Secondary palette — controlled accents only
        'brand-cyan':    '#00ADCC',
        'brand-orange':  '#F68B1F',
        'brand-green':   '#00A74C',
        'brand-magenta': '#B61D66',
        'brand-gray':    '#D1D3D4',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
