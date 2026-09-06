/**
 * ErrorBannerPage — Gallery infrastructure
 * Documents the ErrorBanner design-system component.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { ErrorBanner } from './ErrorBanner';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['alert', 'toast', 'modal']);

const CODE = {
  basic: `import { ErrorBanner } from '@diwauhris/ui';

// Error (default) — role="alert", announced immediately
<ErrorBanner message="Failed to save changes. Please try again." />

// Warning — aria-live="polite"
<ErrorBanner message="This action cannot be undone." tone="warning" />

// Info — aria-live="polite"
<ErrorBanner message="Your draft has been saved." tone="info" />`,

  modal: `// Common pattern — inside a Modal or form
<Modal title="Edit Employee" onSubmit={handleSubmit} ...>
  {error && <ErrorBanner message={error} />}
  {/* form fields */}
</Modal>`,
};

export default function ErrorBannerPage() {
  return (
    <GalleryLayout activeId="error-banner">
      <title>ErrorBanner — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Display"
          name="ErrorBanner"
          description="A dismissible banner for form-level and page-level feedback. Three tones — error, warning, and info. Error banners are announced immediately; info banners are polite."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone center={false} minHeight="min-h-[160px]">
            <div className="w-full space-y-3">
              <ErrorBanner message="Failed to save changes. Please try again." tone="error" />
              <ErrorBanner message="This action cannot be undone once confirmed." tone="warning" />
              <ErrorBanner message="Your draft was saved automatically." tone="info" />
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.basic} language="tsx" title="All three tones" center={false} minHeight="min-h-[140px]">
              <div className="w-full space-y-3">
                <ErrorBanner message="Failed to save changes." tone="error" />
                <ErrorBanner message="This action cannot be undone." tone="warning" />
                <ErrorBanner message="Draft saved automatically." tone="info" />
              </div>
            </Showcase>
          </ShowcaseGrid>
          <Showcase code={CODE.modal} language="tsx" title="Inside a Modal (common pattern)" center={false}>
            <div className="w-full max-w-sm space-y-3 rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-bold text-slate-700">Edit Employee</p>
              <ErrorBanner message="Failed to save changes. Please check the fields below." />
              <div className="h-8 rounded-md border border-slate-200 bg-slate-50" aria-hidden="true" />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Live regions', [
                "tone='error' renders role='alert' — the message is announced immediately by screen readers when it appears in the DOM.",
                "tone='warning' and tone='info' render aria-live='polite' — announced at the next idle opportunity without interrupting current speech.",
                'Show the ErrorBanner conditionally ({error && <ErrorBanner>}) — inserting it into the DOM triggers the announcement.',
              ]],
              ['Placement', [
                'Place ErrorBanner near the context it describes: at the top of a form, inside a modal before form fields, or above a list.',
                'Do not use ErrorBanner as a persistent page-level banner — use Alert for that.',
              ]],
              ['ErrorBanner vs Alert vs Toast', [
                'ErrorBanner — inline, inside a form/modal, tied to a specific action failure.',
                'Alert — standalone callout anywhere on a page for general information/warnings.',
                'Toast — transient notification for background events (save success, import complete).',
              ]],
            ].map(([h, items]) => (
              <div key={String(h)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(h)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose-400" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GallerySection>

        {/* API */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'message',   type: 'ReactNode', required: true, description: 'Banner content. Usually a string; accepts JSX for links or emphasis.' },
            { name: 'tone',      type: "'error' | 'warning' | 'info'", default: "'error'", description: "error: rose + role='alert'. warning/info: amber/sky + aria-live='polite'." },
            { name: 'className', type: 'string',    description: 'Additional class on the banner div.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
