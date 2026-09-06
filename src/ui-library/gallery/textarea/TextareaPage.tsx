/**
 * TextareaPage — Gallery infrastructure
 * Phase 3: Showcase pattern.
 */

import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { TextareaPlayground } from './TextareaPlayground';
import { Textarea } from './Textarea';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['input', 'select', 'button']);

// Controlled wrapper for the char-count showcase so the counter actually updates
function CharCountExample() {
  const [value, setValue] = useState('');
  return (
    <div className="w-full max-w-xs">
      <Textarea
        placeholder="Describe the reason…"
        maxLength={200}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
      />
    </div>
  );
}

const CODE = {
  default: `import { Textarea } from '@diwauhris/ui';

<Textarea placeholder="Enter comments…" rows={4} />`,

  withLabel: `<div>
  <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">
    Notes
  </label>
  <Textarea id="notes" placeholder="Add notes here…" rows={4} />
</div>`,

  error: `<Textarea
  status="error"
  defaultValue="Too short."
  helper="Minimum 20 characters required."
  aria-invalid="true"
  rows={3}
/>`,

  success: `<Textarea
  status="success"
  defaultValue="All requirements met."
  helper="Looks good!"
  rows={3}
/>`,

  disabled: `<Textarea disabled placeholder="Not editable" rows={3} />`,

  charCount: `import { useState } from 'react';

const [value, setValue] = useState('');

<Textarea
  placeholder="Describe the reason for this request…"
  maxLength={200}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows={4}
/>`,

  noResize: `<Textarea
  placeholder="Fixed height…"
  resize="none"
  rows={3}
/>`,

  patternReason: `// Reason field in a form
<div>
  <label htmlFor="reason" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">
    Reason for Request
  </label>
  <Textarea
    id="reason"
    placeholder="Please describe the reason…"
    maxLength={500}
    rows={4}
  />
</div>`,
};

export default function TextareaPage() {
  return (
    <GalleryLayout activeId="textarea">
      <title>Textarea — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Inputs"
          name="Textarea"
          description="Multi-line text entry with validation states, a live character counter, and configurable resize. Drop it inside Field and the label and ARIA attributes wire themselves."
          status="complete"
        />

        <GallerySection id="overview" title="Overview" description="Key states at a glance. No code — use the playground to experiment.">
          <ShowcasePreview standalone>
            <div className="w-full max-w-xs space-y-3">
              <Textarea placeholder="Default…" rows={3} />
              <Textarea status="error" defaultValue="Too short." helper="Min 20 characters." rows={3} />
              <Textarea status="success" defaultValue="All good." rows={3} />
              <Textarea disabled placeholder="Disabled" rows={3} />
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="playground" title="Playground">
          <TextareaPlayground />
        </GallerySection>

        <GallerySection id="states" title="States">
          <ShowcaseGrid columns={2}>
            <Showcase title="Default" code={CODE.default}>
              <div className="w-full max-w-xs">
                <Textarea placeholder="Enter comments…" rows={4} />
              </div>
            </Showcase>

            <Showcase title="With Label" code={CODE.withLabel}>
              <div className="w-full max-w-xs">
                <label htmlFor="ta-notes" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
                  Notes
                </label>
                <Textarea id="ta-notes" placeholder="Add notes here…" rows={4} />
              </div>
            </Showcase>

            <Showcase title="Error" code={CODE.error}>
              <div className="w-full max-w-xs">
                <Textarea status="error" defaultValue="Too short." helper="Minimum 20 characters required." rows={3} />
              </div>
            </Showcase>

            <Showcase title="Success" code={CODE.success}>
              <div className="w-full max-w-xs">
                <Textarea status="success" defaultValue="All requirements met." helper="Looks good!" rows={3} />
              </div>
            </Showcase>

            <Showcase title="Disabled" code={CODE.disabled}>
              <div className="w-full max-w-xs">
                <Textarea disabled placeholder="Not editable" rows={3} />
              </div>
            </Showcase>

            <Showcase title="No Resize" description="resize='none' for constrained layouts." code={CODE.noResize}>
              <div className="w-full max-w-xs">
                <Textarea placeholder="Fixed height…" resize="none" rows={3} />
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        <GallerySection id="char-count" title="Character Count">
          <Showcase
            title="With maxLength"
            description="Pass maxLength to show a live character count. Track value in the consuming feature."
            code={CODE.charCount}
          >
            <CharCountExample />
          </Showcase>
        </GallerySection>

        <GallerySection id="patterns" title="Patterns">
          <Showcase title="Reason for request" code={CODE.patternReason} tone="white" center={false}>
            <div className="w-full max-w-sm">
              <label htmlFor="ta-reason" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
                Reason for Request
              </label>
              <Textarea id="ta-reason" placeholder="Please describe the reason…" maxLength={500} rows={4} />
            </div>
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Labels', [
                'Textarea does not include a <label>. The consuming feature provides <label htmlFor="id">.',
                'Wire helper text to the textarea via aria-describedby in the consuming feature.',
              ]],
              ['Validation', [
                'Set aria-invalid="true" on the textarea for error states.',
                'Always pair error state with visible helper text — do not rely on color alone.',
              ]],
              ['Resize', [
                'Use resize="none" inside constrained layouts.',
                'Do not disable resize in contexts where users expect to adjust height.',
              ]],
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

        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'status',    type: "'default' | 'error' | 'success'", default: "'default'", description: 'Visual validation state.' },
            { name: 'helper',    type: 'string',  description: 'Helper or error text below the field.' },
            { name: 'maxLength', type: 'number',  description: 'Enables live character count.' },
            { name: 'resize',    type: "'none' | 'vertical' | 'both'", default: "'vertical'", description: 'CSS resize behavior.' },
            { name: 'disabled',  type: 'boolean', default: 'false', description: 'Disables the field.' },
            { name: '...rest',   type: 'React.ComponentProps<"textarea">', description: 'All native textarea attributes are forwarded.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
