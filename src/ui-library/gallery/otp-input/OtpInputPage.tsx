/**
 * OtpInputPage — Gallery infrastructure (Inputs)
 * Source: gallery/otp-input/OtpInput.tsx
 */

import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { OtpInput } from './OtpInput';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['input', 'field', 'button']);

const CODE = {
  basic: `import { OtpInput } from '@diwauhris/ui';

// Uncontrolled (internal state)
<OtpInput aria-label="Verification code" />

// Controlled
const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
<OtpInput
  value={otp}
  onChange={setOtp}
  aria-label="Verification code"
/>

// Check complete
const code = otp.join('');
const isComplete = code.length === 6 && /^[0-9]+$/.test(code);`,

  error: `// Fragment — add your own state: const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

// Error state
<OtpInput
  value={otp}
  onChange={setOtp}
  error
  errorMessage="Invalid code. Please try again."
  aria-label="Verification code"
/>`,
};

function BasicDemo() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const complete = otp.join('').length === 6;
  return (
    <div className="space-y-3">
      <OtpInput value={otp} onChange={setOtp} aria-label="Demo code" />
      <p className="text-xs font-mono text-slate-500">
        Value: [{otp.map(d => d ? `"${d}"` : '""').join(', ')}]
        {complete && <span className="ml-2 text-emerald-600 font-bold">✓ Complete</span>}
      </p>
    </div>
  );
}

export default function OtpInputPage() {
  return (
    <GalleryLayout activeId="otp-input">
      <title>OTP Input — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Inputs"
          name="OTP Input"
          description="Segmented digit boxes for OTP codes and PINs. Auto-advances as you type, handles paste from clipboard, navigates backward on backspace, and supports configurable length."
          status="complete"
          importName="OtpInput"
        />

        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone>
            <ShowcaseGrid columns={2}>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">6-digit OTP</p>
                <BasicDemo />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">4-digit PIN</p>
                <OtpInput length={4} aria-label="PIN" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Error state</p>
                <OtpInput error errorMessage="Invalid code. Please try again." aria-label="Invalid code" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Disabled</p>
                <OtpInput disabled value={['1','2','3','4','5','6']} aria-label="Disabled OTP" />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Basic usage">
            <BasicDemo />
          </Showcase>
          <Showcase code={CODE.error} language="tsx" title="Error state">
            <OtpInput error errorMessage="Invalid code. Please try again." aria-label="Invalid verification code" />
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Group semantics', [
                'role="group" + aria-label on the container groups all cells as a single logical unit.',
                'Each input has an individual aria-label: "digit N of M".',
              ]],
              ['Keyboard navigation', [
                'ArrowLeft / ArrowRight moves between cells.',
                'Backspace clears the current cell; if empty, clears and focuses the previous cell.',
                'Tab moves focus out of the OTP group.',
              ]],
              ['Paste', [
                'Pasting a digit string fills all cells and focuses the last filled cell.',
                'Non-digit characters are stripped automatically.',
              ]],
              ['Error', [
                'error adds aria-invalid="true" to each cell.',
                'errorMessage renders with role="alert" for immediate screen-reader announcement.',
              ]],
            ].map(([h, items]) => (
              <div key={String(h)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(h)}</h3>
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
            { name: 'length',       type: 'number',       default: '6',          description: 'Number of digit cells.' },
            { name: 'value',        type: 'string[]',                            description: 'Controlled value. Array of single-digit strings.' },
            { name: 'onChange',     type: '(value: string[]) => void',           description: 'Called on any change.' },
            { name: 'disabled',     type: 'boolean',      default: 'false',      description: 'Disables all cells.' },
            { name: 'error',        type: 'boolean',      default: 'false',      description: 'Shows error styling and sets aria-invalid.' },
            { name: 'errorMessage', type: 'string',                              description: 'Error message shown below. Announced via role="alert".' },
            { name: 'aria-label',   type: 'string',       default: '"One-time password"', description: 'Accessible label for the group.' },
            { name: 'className',    type: 'string',                              description: 'Additional class on the root element.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
