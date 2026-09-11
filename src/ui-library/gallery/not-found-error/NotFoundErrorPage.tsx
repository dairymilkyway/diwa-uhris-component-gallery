/**
 * NotFoundErrorPage — Gallery (Display)
 *
 * Documents the NotFoundError component: a full-page 404 screen that
 * composes StatusPage internally. Consumer wires navigation via callbacks.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';
import { STATUS_PAGE_PRESETS } from '../status-page/StatusPage';

const RELATED = getRelatedComponents(['status-page', 'forbidden-error', 'application-error']);

// ── Code samples ───────────────────────────────────────────────────────────────

const CODE = {
  basic: `import { NotFoundError } from '@diwauhris/ui';
import { useNavigate } from 'react-router-dom';

// Used as React Router errorElement or a catch-all route component
export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <NotFoundError
      primaryAction={{ label: 'Go to Dashboard', onClick: () => navigate('/dashboard') }}
      secondaryAction={{ label: 'Go Back', onClick: () => navigate(-1) }}
    />
  );
}`,

  routerSetup: `// React Router v6 — catch-all route
import { createBrowserRouter } from 'react-router-dom';
import { NotFoundError } from '@diwauhris/ui';

const router = createBrowserRouter([
  // ... your routes
  {
    path: '*',
    element: (
      <NotFoundError
        primaryAction={{ label: 'Go to Dashboard', onClick: () => navigate('/dashboard') }}
        secondaryAction={{ label: 'Go Back', onClick: () => navigate(-1) }}
      />
    ),
  },
]);`,

  withHref: `// External navigation — renders <a> tags instead of buttons
<NotFoundError
  primaryAction={{ label: 'Go to Dashboard', href: '/dashboard' }}
  secondaryAction={{ label: 'Go Back', href: '/' }}
/>`,
};

// ── Compact preview card (same pattern as StatusPagePage) ─────────────────────

function PreviewCard() {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-slate-200 bg-surface-page flex items-center justify-center px-8 py-10"
      style={{ minHeight: 260 }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-heading font-bold text-brand-navy opacity-[0.07] text-[100px] leading-none"
      >
        {STATUS_PAGE_PRESETS.notFound.code}
      </span>
      <div className="relative z-10 w-full max-w-[220px]">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-sky">
          {STATUS_PAGE_PRESETS.notFound.eyebrow}
        </p>
        <h2 className="font-heading text-xl font-bold text-brand-navy leading-tight">
          {STATUS_PAGE_PRESETS.notFound.title}
        </h2>
        <p className="mt-2 text-xs font-medium text-slate-500 leading-relaxed">
          {STATUS_PAGE_PRESETS.notFound.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex h-8 items-center rounded-md bg-brand-blue px-3 text-xs font-bold text-white shadow-sm">
            Go to Dashboard
          </span>
          <span className="inline-flex h-8 items-center rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm">
            Go Back
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function NotFoundErrorPage() {
  return (
    <GalleryLayout activeId="not-found-error">
      <title>NotFoundError — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Display"
          name="NotFoundError"
          description="Full-page 404 Not Found screen. Composes StatusPage internally using the notFound preset. No routing logic — consumer wires navigation via primaryAction and secondaryAction callbacks."
          status="complete"
          importName="NotFoundError"
        />

        {/* ── Overview ──────────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="A standalone 404 component that renders the StatusPage notFound preset. Pass navigation callbacks — no router dependency inside the component."
        >
          <ShowcasePreview standalone center={false}>
            <PreviewCard />
          </ShowcasePreview>
        </GallerySection>

        {/* ── Composition note ──────────────────────────────────────────── */}
        <GallerySection id="composition" title="Composition">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            {[
              'NotFoundError is a thin wrapper that spreads STATUS_PAGE_PRESETS.notFound into StatusPage. It adds no visual logic of its own.',
              'The preset supplies: code "404", eyebrow "404 — Not Found", title "Page Not Found", and description text.',
              'Consumer always provides primaryAction — this is required. secondaryAction is optional.',
              'Both actions accept onClick (renders <button>) or href (renders <a>). Use onClick for SPA navigation, href for external links.',
              'The component fills the full viewport (min-h-screen) — it is intended as a top-level page replacement, not an inline block.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </GallerySection>

        {/* ── Usage ─────────────────────────────────────────────────────── */}
        <GallerySection id="usage" title="Usage">
          <Showcase code={CODE.basic} language="tsx" title="React Router — route component" center={false}>
            <PreviewCard />
          </Showcase>

          <Showcase code={CODE.routerSetup} language="tsx" title="React Router — catch-all route setup" center={false}>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">
                Add as a catch-all route in your router definition. The <code className="rounded bg-slate-200 px-1 font-mono text-xs">path: '*'</code> entry matches any URL not handled by other routes.
              </p>
            </div>
          </Showcase>

          <Showcase code={CODE.withHref} language="tsx" title="Non-SPA navigation (href)" center={false}>
            <PreviewCard />
          </Showcase>
        </GallerySection>

        {/* ── API Reference ──────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">
          <p className="text-sm font-bold text-slate-700 mb-2">NotFoundError</p>
          <ApiTable props={[
            { name: 'primaryAction',   type: 'StatusPageAction', required: true,  description: 'Primary action button. Renders as <button> (onClick) or <a> (href). Typically "Go to Dashboard".' },
            { name: 'secondaryAction', type: 'StatusPageAction',                  description: 'Optional secondary action. Renders as Button variant="outline". Typically "Go Back".' },
            { name: 'className',       type: 'string',                            description: 'Additional class on the root wrapper.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">StatusPageAction</p>
          <ApiTable props={[
            { name: 'label',   type: 'string',     required: true, description: 'Button or link label.' },
            { name: 'onClick', type: '() => void',                 description: 'Click handler for button-based actions. Consumer wires navigation.' },
            { name: 'href',    type: 'string',                     description: 'Renders an <a> tag. Use for external links or non-SPA navigation.' },
          ]} />
        </GallerySection>

        {/* ── Related ───────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
