/**
 * component-audit.test.jsx
 *
 * Generic battery that runs against every exported component.
 * One test file covers the entire library surface.
 *
 * Checks per component:
 *   1. Export validity  — symbol is defined and is a renderable type
 *   2. Renders          — mounts without throwing
 *   3. Passthrough props — className + data-testid survive without throwing
 *   4. Accessibility    — jest-axe finds no violations
 *
 * Configuration lives entirely in audit.config.js — do not add per-component
 * logic here. Extend REQUIRED_PROPS or SKIP there instead.
 */

const React = require('react');
const { render, act } = require('@testing-library/react');
const { axe, toHaveNoViolations } = require('jest-axe');
const { MemoryRouter } = require('react-router-dom');

const {
  REQUIRED_PROPS,
  NEEDS_ROUTER,
  NEEDS_PARENT,
  SKIP,
  CHILDREN_SKIP,
} = require('./audit.config.js');

// Extend expect with axe matcher
expect.extend(toHaveNoViolations);

// ── Import the entire library ────────────────────────────────────────────────
const Library = require('../src/ui-library/index');

// ── Classify exports ─────────────────────────────────────────────────────────

// Lucide re-exports: all 400+ icon symbols. We skip them to keep the suite
// fast and focused. They're third-party; their own tests cover rendering.
// Heuristic: name ends with a lucide-pattern (e.g. "Search", "Plus", etc.)
// but we simply skip anything NOT in REQUIRED_PROPS AND not defined below.
const KNOWN_NON_COMPONENTS = new Set([
  // Hooks
  'useFieldContext',
  // Contexts
  'FieldContext',
  // Utilities / functions
  'toast',
  'statusMenuItems',
  // Type-only exports (filtered out by runtime typeof check anyway)
]);

function isReactComponent(value) {
  if (value === null || value === undefined) return false;
  const t = typeof value;
  // Function components and class components
  if (t === 'function') return true;
  // Exotic types (React.memo, React.forwardRef)
  if (t === 'object' && value.$$typeof) return true;
  return false;
}

// Build the test matrix: [ [name, component], ... ]
// Only include exports that:
//   a) are in REQUIRED_PROPS (explicitly configured), OR
//   b) are capitalized and renderable (auto-discovered), AND
//   c) are not in KNOWN_NON_COMPONENTS
const testMatrix = Object.entries(Library)
  .filter(([name, value]) => {
    if (KNOWN_NON_COMPONENTS.has(name)) return false;
    // Must be explicitly in REQUIRED_PROPS OR be a capitalized renderable symbol
    const configured = name in REQUIRED_PROPS;
    const autoDiscovered = /^[A-Z]/.test(name) && isReactComponent(value);
    return configured || autoDiscovered;
  })
  // Exclude lucide icons: they're in the library but not in REQUIRED_PROPS.
  // We only test what's explicitly configured to avoid 400 icon tests.
  .filter(([name]) => name in REQUIRED_PROPS)
  .map(([name, component]) => [name, component]);

// ── Render helper ────────────────────────────────────────────────────────────

function renderComponent(name, component) {
  const props = REQUIRED_PROPS[name] ?? {};

  let element = React.createElement(component, props);

  // Wrap in parent context if needed
  if (name in NEEDS_PARENT) {
    element = NEEDS_PARENT[name](element);
  }

  // Wrap in MemoryRouter if needed
  if (NEEDS_ROUTER.has(name)) {
    element = React.createElement(MemoryRouter, null, element);
  }

  return render(element);
}

// ── Test suite ───────────────────────────────────────────────────────────────

describe('Component Library Audit', () => {
  // Report skipped components upfront
  if (Object.keys(SKIP).length > 0) {
    describe('Skipped components (jsdom limitations)', () => {
      Object.entries(SKIP).forEach(([name, reason]) => {
        test.skip(`${name} — ${reason}`, () => {});
      });
    });
  }

  describe.each(testMatrix)('%s', (name, Component) => {
    // Skip components explicitly excluded
    if (name in SKIP) {
      test.todo(`Skipped: ${SKIP[name]}`);
      return;
    }

    // ── Check 1: Export validity ────────────────────────────────────────
    test('is a valid React component', () => {
      expect(Component).toBeDefined();
      expect(isReactComponent(Component)).toBe(true);
    });

    // ── Check 2: Renders without throwing ──────────────────────────────
    test('renders without throwing', () => {
      expect(() => {
        act(() => {
          renderComponent(name, Component);
        });
      }).not.toThrow();
    });

    // ── Check 3: Accepts passthrough props ─────────────────────────────
    test('accepts className and data-testid without throwing', () => {
      const props = {
        ...(REQUIRED_PROPS[name] ?? {}),
        className: 'audit-test-class',
        'data-testid': 'audit-test',
      };

      // Only inject a generic child if:
      //   a) The component accepts children (not in CHILDREN_SKIP), AND
      //   b) No children are already provided in REQUIRED_PROPS
      const hasChildren = 'children' in props;
      const canHaveChildren = !CHILDREN_SKIP.has(name);
      if (!hasChildren && canHaveChildren) {
        props.children = React.createElement('span', null, 'test-child');
      }

      let element = React.createElement(Component, props);
      if (name in NEEDS_PARENT) element = NEEDS_PARENT[name](element);
      if (NEEDS_ROUTER.has(name)) element = React.createElement(MemoryRouter, null, element);

      expect(() => {
        act(() => { render(element); });
      }).not.toThrow();
    });

    // ── Check 4: Accessibility (jest-axe) ──────────────────────────────
    test('has no axe accessibility violations', async () => {
      let container;
      act(() => {
        const result = renderComponent(name, Component);
        container = result.container;
      });

      // axe needs the DOM to settle — small components are synchronous
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
