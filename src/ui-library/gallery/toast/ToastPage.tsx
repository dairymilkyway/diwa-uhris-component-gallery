/**
 * ToastPage — Gallery
 *
 * Interactive showcase for the application's Toast notification system
 * (powered by Sonner). The <Toaster /> is mounted once in App.tsx — this
 * page calls the real imperative API and relies on that existing provider.
 *
 * No second <Toaster /> is added here.
 *
 * Section order (canonical):
 *   Header → Overview → Playground → Implementation → Accessibility → API → Related
 */

import { toast } from 'sonner';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { CopyCodeBlock } from '../components/CopyCodeBlock';
import { ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { ToastPlayground } from './ToastPlayground';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['alert', 'dialog']);

// ── Variant firing for Overview section ───────────────────────────────────────

type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

const VARIANT_CONFIG: Record<ToastVariant, { label: string; message: string; fire: (msg: string) => void }> = {
  success: { label: 'Success', message: 'Employee record saved successfully.',           fire: (msg) => toast.success(msg) },
  error:   { label: 'Error',   message: 'Failed to save changes. Please try again.',     fire: (msg) => toast.error(msg)   },
  warning: { label: 'Warning', message: 'This action cannot be undone after submission.', fire: (msg) => toast.warning(msg) },
  info:    { label: 'Info',    message: 'Changes will take effect at the next payroll cycle.', fire: (msg) => toast.info(msg) },
  default: { label: 'Default', message: 'Operation completed.',                           fire: (msg) => toast(msg)         },
};

// ── Code strings — centralized per canonical architecture ─────────────────────

const CODE = {
  usage: `import { toast } from 'sonner';

// Success — after a save, create, or status change
toast.success('Employee record saved successfully.');

// Error — after a failed action
toast.error('Failed to save changes. Please try again.');

// Warning — non-blocking caution
toast.warning('This action cannot be undone after submission.');

// Info — neutral informational
toast.info('Changes will take effect at the next payroll cycle.');

// Default — unstyled fallback
toast('Operation completed.');`,

  setup: `// App.tsx — registered once at the application root.
// Do NOT add another <Toaster /> in feature code or gallery pages.
import { Toaster } from 'sonner';

<Toaster
  position="top-right"
  toastOptions={{
    className: 'toast-default',
    duration: 4000,
  }}
/>`,
};

export default function ToastPage() {
  return (
    <GalleryLayout activeId="toast">
      <title>Toast — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Display"
          name="Toast"
          description="Temporary notifications that pop up and auto-dismiss. Styled to match the Alert design — same left-border rule, tinted backgrounds, and tone colors. Powered by Sonner — call toast(), toast.success(), or toast.error() from anywhere. No component to render in JSX."
          status="complete"
          importName="Toaster, toast"
        />

        {/* ── 2. Overview — visual only, no code ────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Five semantic variants. Toasts use the same left-border rule, tinted backgrounds, and tone colors as the Alert component. Click any button to trigger a live notification."
        >
          {/* Static visual preview — shows the alert-style toast design without firing */}
          <ShowcasePreview standalone>
            <div className="flex flex-col gap-2 w-full max-w-sm">
              {/* Success */}
              <div className="flex items-start gap-3 rounded-md border-l-4 border-emerald-400 bg-emerald-50 px-4 py-3 text-emerald-800 text-sm font-semibold shadow-sm">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                Employee record saved successfully.
              </div>
              {/* Error */}
              <div className="flex items-start gap-3 rounded-md border-l-4 border-rose-500 bg-rose-50 px-4 py-3 text-rose-800 text-sm font-semibold shadow-sm">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-rose-500" aria-hidden="true" />
                Failed to save changes. Please try again.
              </div>
              {/* Warning */}
              <div className="flex items-start gap-3 rounded-md border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-amber-800 text-sm font-semibold shadow-sm">
                <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                This action cannot be undone after submission.
              </div>
              {/* Info */}
              <div className="flex items-start gap-3 rounded-md border-l-4 border-sky-400 bg-sky-50 px-4 py-3 text-sky-800 text-sm font-semibold shadow-sm">
                <Info size={18} className="mt-0.5 shrink-0 text-sky-500" aria-hidden="true" />
                Changes will take effect at the next payroll cycle.
              </div>
              {/* Default */}
              <div className="flex items-start gap-3 rounded-md border-l-4 border-slate-400 bg-slate-50 px-4 py-3 text-slate-800 text-sm font-semibold shadow-sm">
                Operation completed.
              </div>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-400">
              Static preview — click a button below to trigger the real notification.
            </p>
          </ShowcasePreview>

          {/* Live trigger buttons */}
          <ShowcasePreview standalone>
            <div className="flex flex-wrap gap-3">
              {(Object.entries(VARIANT_CONFIG) as [ToastVariant, typeof VARIANT_CONFIG[ToastVariant]][]).map(
                ([key, cfg]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => cfg.fire(cfg.message)}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-blue/30 hover:bg-blue-50 hover:text-brand-blue active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
                  >
                    {cfg.label}
                  </button>
                ),
              )}
            </div>
            <p className="mt-4 text-xs font-medium text-slate-400">
              Click any button above to trigger the real application toast.
            </p>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 3. Playground ─────────────────────────────────────────────── */}
        <GallerySection
          id="playground"
          title="Playground"
          description="Select a variant and fire the toast to see the live result."
        >
          <ToastPlayground />
        </GallerySection>

        {/* ── 4. Implementation ─────────────────────────────────────────── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Import toast from sonner and call the relevant method. No component to render — purely imperative."
        >
          <CopyCodeBlock code={CODE.usage} language="ts" title="Usage" />
          <CopyCodeBlock code={CODE.setup} language="tsx" title="Provider registration (already done — do not duplicate)" />
        </GallerySection>

        {/* ── 5. Accessibility ──────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {[
              ['ARIA',     ['Sonner manages aria-live="polite" announcements internally. Toast messages are announced to screen readers without additional consumer work.']],
              ['Dismiss',  ['Toasts include a close button accessible by keyboard. Users can also dismiss by pressing Escape while a toast is focused.']],
              ['Duration', ['Auto-dismiss at 4 000 ms. Users who need more time can dismiss manually, or use prefers-reduced-motion to disable animations.']],
              ['Color',    ['Each variant has a distinct icon in addition to color — color is not the only indicator.']],
            ].map(([heading, items]) => (
              <div key={String(heading)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(heading)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GallerySection>

        {/* ── 6. API ────────────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference" description="The toast() function is imperative — no props or JSX.">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Call</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Variant</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">When to use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ['toast.success(message)', 'Success', 'After a save, create, update, or status change.'],
                    ['toast.error(message)',   'Error',   'After a failed action when an inline ErrorBanner is unavailable.'],
                    ['toast.warning(message)', 'Warning', 'Non-blocking caution that does not require immediate action.'],
                    ['toast.info(message)',    'Info',    'Neutral informational notification.'],
                    ['toast(message)',         'Default', 'Generic notification with no semantic tone.'],
                  ].map(([call, variant, when]) => (
                    <tr key={String(call)} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3.5">
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-800">
                          {String(call)}
                        </code>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-semibold text-slate-700">{String(variant)}</td>
                      <td className="px-5 py-3.5 text-xs font-medium leading-relaxed text-slate-600">{String(when)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-sm font-semibold text-amber-800">Do not use Toast when:</p>
            <ul className="mt-2 space-y-1">
              {[
                'The error should remain visible until the user acts — use ErrorBanner instead.',
                'Validating individual form fields — use the Field error prop.',
                'Validating a multi-field form — use StepValidationAlert.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-medium text-amber-700">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </GallerySection>

        {/* ── 7. Related ────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
