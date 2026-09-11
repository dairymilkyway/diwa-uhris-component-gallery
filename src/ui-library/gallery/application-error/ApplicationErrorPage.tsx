/**
 * ApplicationErrorPage — Gallery (Display)
 *
 * Documents the ApplicationError and ApplicationErrorFallback components:
 * full-page 500 error screens with dev-only collapsible error details.
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
import { ChevronDown } from 'lucide-react';

const RELATED = getRelatedComponents(['status-page', 'not-found-error', 'forbidden-error']);

// ── Code samples ───────────────────────────────────────────────────────────────

const CODE = {
  routerErrorElement: `import { ApplicationError } from '@diwauhris/ui';
import { useRouteError, useNavigate } from 'react-router-dom';

// Used as React Router v6 errorElement
export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <ApplicationError
      error={error}
      onRetry={() => navigate(0)}
      onDashboard={() => navigate('/dashboard')}
    />
  );
}

// Attach to the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [/* ... */],
  },
]);`,

  errorBoundary: `import { ApplicationErrorFallback } from '@diwauhris/ui';
import { ErrorBoundary } from 'react-error-boundary'; // or class-based boundary

// react-error-boundary (recommended)
<ErrorBoundary
  fallbackRender={({ error, resetErrorBoundary }) => (
    <ApplicationErrorFallback
      error={error}
      onReset={resetErrorBoundary}
    />
  )}
>
  <App />
</ErrorBoundary>`,

  classBoundary: `// Class-based ErrorBoundary — place above RouterProvider
import { ApplicationErrorFallback } from '@diwauhris/ui';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: undefined, componentStack: undefined };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ componentStack: info.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ApplicationErrorFallback
          error={this.state.error}
          componentStack={this.state.componentStack}
          onReset={() => this.setState({ hasError: false })}
        />
      );
    }
    return this.props.children;
  }
}`,

  withErrorId: `// Pass an errorId for support correlation
<ApplicationError
  error={error}
  errorId={generateErrorId()}   // e.g. "ERR-A1B2C"
  onRetry={() => navigate(0)}
  onDashboard={() => navigate('/dashboard')}
/>`,
};

// ── Compact preview cards ──────────────────────────────────────────────────────

function ProductionPreviewCard() {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-slate-200 bg-surface-page flex items-center justify-center px-8 py-10"
      style={{ minHeight: 260 }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-heading font-bold text-brand-navy opacity-[0.07] text-[100px] leading-none"
      >
        {STATUS_PAGE_PRESETS.serverError.code}
      </span>
      <div className="relative z-10 w-full max-w-[220px]">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-sky">
          {STATUS_PAGE_PRESETS.serverError.eyebrow}
        </p>
        <h2 className="font-heading text-xl font-bold text-brand-navy leading-tight">
          {STATUS_PAGE_PRESETS.serverError.title}
        </h2>
        <p className="mt-2 text-xs font-medium text-slate-500 leading-relaxed">
          {STATUS_PAGE_PRESETS.serverError.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex h-8 items-center rounded-md bg-brand-blue px-3 text-xs font-bold text-white shadow-sm">
            Try Again
          </span>
          <span className="inline-flex h-8 items-center rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm">
            Go to Dashboard
          </span>
        </div>
      </div>
    </div>
  );
}

function DevPanelPreviewCard() {
  const fakeError = new Error('Cannot read properties of undefined (reading "employeeId")');

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Dev panel — shown only in import.meta.env.DEV builds when error is present
        </span>
      </div>
      <div className="p-4 space-y-3">
        {/* Toggle button */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500"
          aria-disabled="true"
        >
          <ChevronDown size={13} aria-hidden="true" />
          Technical Details
        </button>

        {/* Expanded state preview */}
        <div className="space-y-3 mt-2">
          <div className="rounded-xl bg-slate-900 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Error
            </p>
            <pre className="whitespace-pre-wrap break-all text-xs font-mono text-rose-300">
              {`Error: ${fakeError.message}`}
            </pre>
          </div>
          <div className="rounded-xl bg-slate-900 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Stack Trace
            </p>
            <pre className="text-xs font-mono text-slate-400 truncate">
              {`    at getEmployeeData (pis.service.ts:142)\n    at async EmployeeDetail (EmployeeDetailPage.tsx:67)`}
            </pre>
          </div>
          <div className="rounded-xl bg-slate-900 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Component Stack
            </p>
            <pre className="text-xs font-mono text-slate-400 truncate">
              {`    at EmployeeDetailPage\n    at Suspense\n    at ProtectedRoute`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ApplicationErrorPage() {
  return (
    <GalleryLayout activeId="application-error">
      <title>ApplicationError — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Display"
          name="ApplicationError"
          description="Full-page 500 error screen for unexpected runtime failures. Composes StatusPage with the serverError preset. Includes a dev-only collapsible error details panel. Two exports: ApplicationError (primary, caller wires both callbacks) and ApplicationErrorFallback (ErrorBoundary convenience wrapper)."
          status="complete"
          importName="ApplicationError, ApplicationErrorFallback"
        />

        {/* ── Overview ──────────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Production state: clean 500 screen with Try Again and Go to Dashboard actions."
        >
          <ShowcasePreview standalone center={false}>
            <ProductionPreviewCard />
          </ShowcasePreview>
        </GallerySection>

        {/* ── Dev panel ─────────────────────────────────────────────────── */}
        <GallerySection
          id="dev-panel"
          title="Dev Panel"
          description="In development builds (import.meta.env.DEV), when an error object is provided, a collapsible details panel appears below the page. It shows the error message, stack trace, and component stack. Hidden in production — zero overhead."
        >
          <ShowcasePreview standalone center={false}>
            <DevPanelPreviewCard />
          </ShowcasePreview>
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 mt-4">
            {[
              'The panel renders only when import.meta.env.DEV evaluates to true AND error !== undefined.',
              'It is collapsible — the "Technical Details" toggle is collapsed by default so the 500 message is the first thing the developer sees.',
              'Shows up to three code blocks: Error (message + name), Stack Trace (Error.prototype.stack), and Component Stack (ErrorInfo.componentStack if provided).',
              'Stack blocks have max-h-48 with overflow-y-auto to prevent very long traces from pushing content off screen.',
              'In the gallery component, the dev panel is anchored to the bottom of the viewport with fixed positioning and a backdrop blur so it doesn\'t obscure the StatusPage.',
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
          <Showcase
            code={CODE.routerErrorElement}
            language="tsx"
            title="React Router v6 — errorElement"
            center={false}
          >
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
              <p className="text-sm font-bold text-slate-700">Router errorElement pattern</p>
              <p className="text-sm font-medium text-slate-500">
                Attach <code className="rounded bg-slate-200 px-1 font-mono text-xs">errorElement</code> to the root route. React Router calls{' '}
                <code className="rounded bg-slate-200 px-1 font-mono text-xs">useRouteError()</code> inside your component to get the caught error.
                Pass it to <code className="rounded bg-slate-200 px-1 font-mono text-xs">ApplicationError</code> — it shows in the dev panel automatically.
              </p>
            </div>
          </Showcase>

          <Showcase
            code={CODE.errorBoundary}
            language="tsx"
            title="react-error-boundary — fallbackRender"
            center={false}
          >
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
              <p className="text-sm font-bold text-slate-700">ErrorBoundary fallback pattern</p>
              <p className="text-sm font-medium text-slate-500">
                <code className="rounded bg-slate-200 px-1 font-mono text-xs">ApplicationErrorFallback</code> maps <code className="rounded bg-slate-200 px-1 font-mono text-xs">onReset</code>{' '}
                to the internal <code className="rounded bg-slate-200 px-1 font-mono text-xs">onRetry</code> and wires dashboard navigation via{' '}
                <code className="rounded bg-slate-200 px-1 font-mono text-xs">window.location.href</code> — safe outside router context.
              </p>
            </div>
          </Showcase>

          <Showcase
            code={CODE.classBoundary}
            language="tsx"
            title="Class-based ErrorBoundary"
            center={false}
          >
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
              <p className="text-sm font-bold text-slate-700">Class boundary + componentStack</p>
              <p className="text-sm font-medium text-slate-500">
                Pass <code className="rounded bg-slate-200 px-1 font-mono text-xs">info.componentStack</code> from{' '}
                <code className="rounded bg-slate-200 px-1 font-mono text-xs">componentDidCatch</code> to show the React component tree in the dev panel.
              </p>
            </div>
          </Showcase>

          <Showcase code={CODE.withErrorId} language="tsx" title="With error ID" center={false}>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                The <code className="rounded bg-slate-200 px-1 font-mono text-xs">errorId</code> prop renders a small monospace label useful for correlating
                user-reported errors with server logs. Generate it server-side or client-side using a short UUID or nanoid.
              </p>
            </div>
          </Showcase>
        </GallerySection>

        {/* ── API Reference ──────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">

          <p className="text-sm font-bold text-slate-700 mb-2">ApplicationError</p>
          <ApiTable props={[
            { name: 'onRetry',        type: '() => void', required: true,  description: 'Called when the user clicks "Try Again". Router: () => navigate(0). Boundary: resetErrorBoundary.' },
            { name: 'onDashboard',    type: '() => void', required: true,  description: 'Called when the user clicks "Go to Dashboard". Router: () => navigate(\'/dashboard\'). Boundary: window.location.href.' },
            { name: 'error',          type: 'unknown',                     description: 'The caught error object. In DEV builds, used to extract message and stack for the collapsible panel.' },
            { name: 'componentStack', type: 'string',                      description: 'React component stack from ErrorInfo.componentStack. Shown in the dev panel when provided.' },
            { name: 'errorId',        type: 'string',                      description: 'Short error ID for support correlation (e.g. "ERR-A1B2C"). Shown in the dev panel and below actions.' },
            { name: 'className',      type: 'string',                      description: 'Additional class on the root wrapper.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">ApplicationErrorFallback</p>
          <ApiTable props={[
            { name: 'onReset',        type: '() => void', required: true,  description: 'Maps to onRetry. Called when the user clicks "Try Again". Typically resetErrorBoundary.' },
            { name: 'error',          type: 'unknown',                     description: 'The caught error object passed by the ErrorBoundary.' },
            { name: 'componentStack', type: 'string',                      description: 'React component stack from componentDidCatch / ErrorInfo.componentStack.' },
            { name: 'errorId',        type: 'string',                      description: 'Short error ID for support correlation.' },
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
