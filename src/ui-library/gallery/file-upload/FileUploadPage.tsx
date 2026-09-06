/**
 * FileUploadPage — Gallery infrastructure (Inputs)
 * Source: gallery/file-upload/FileUpload.tsx
 */

import React from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { FileUpload } from './FileUpload';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['button', 'progress', 'empty-state']);

function ControlledUploadExample() {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <div className="w-full max-w-sm space-y-2">
      <FileUpload value={files} onChange={setFiles} />
      {files.length > 0 && (
        <p className="text-xs font-medium text-slate-500">
          {files.length} file{files.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  );
}

const CODE = {
  basic: `import { FileUpload } from '@diwauhris/ui';
import { useState } from 'react';

// Basic
<FileUpload aria-label="Upload document" />

// Images only
<FileUpload
  accept="image/jpeg,image/png,image/webp"
  aria-label="Upload profile photo"
  onFiles={(files) => console.log(files)}
/>

// Multiple files — wire to your own state
const [attachments, setAttachments] = useState<File[]>([]);

<FileUpload
  accept=".pdf,.doc,.docx"
  multiple
  aria-label="Upload documents"
  onFiles={(files) => setAttachments(files)}
/>`,

  disabled: `// Disabled state
<FileUpload disabled aria-label="Upload (unavailable)" />`,

  controlled: `import { FileUpload } from '@diwauhris/ui';
import { useState } from 'react';

const [files, setFiles] = useState<File[]>([]);

// Controlled mode — use value + onChange instead of onFiles
<FileUpload
  value={files}
  onChange={setFiles}
/>`,

  multiple: `import { FileUpload } from '@diwauhris/ui';

<FileUpload multiple accept="image/*" />`,
};

export default function FileUploadPage() {
  return (
    <GalleryLayout activeId="file-upload">
      <title>File Upload — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Inputs"
          name="File Upload"
          description="A drag-and-drop file zone wrapping a native file input. Handles the visual affordance and selected file list — the HTTP upload is yours to own."
          status="complete"
        />

        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone center={false}>
            <div className="w-full space-y-4">
              <ShowcaseGrid columns={2}>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Default</p>
                  <FileUpload aria-label="Upload document" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Images only</p>
                  <FileUpload accept="image/jpeg,image/png,image/webp" aria-label="Upload photo" />
                </div>
              </ShowcaseGrid>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Disabled</p>
                <FileUpload disabled aria-label="Upload (unavailable)" />
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Basic usage">
            <div className="w-full max-w-xs">
              <FileUpload aria-label="Upload document" />
            </div>
          </Showcase>
          <Showcase code={CODE.disabled} language="tsx" title="Disabled state">
            <div className="w-full max-w-xs">
              <FileUpload disabled aria-label="Upload (unavailable)" />
            </div>
          </Showcase>
          <Showcase title="Controlled mode" description="Use value and onChange for controlled usage — integrates with form libraries." code={CODE.controlled} tone="white" center={false}>
            <ControlledUploadExample />
          </Showcase>
          <Showcase title="Multiple files" description="Set multiple to accept more than one file. Use accept to restrict file types." code={CODE.multiple} tone="white" center={false}>
            <div className="w-full max-w-sm">
              <FileUpload multiple accept="image/*" />
            </div>
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Input + label pattern', [
                'The drop zone is a <label> wrapping a visually-hidden <input type="file">.',
                'Clicking anywhere in the zone activates the native file picker.',
                'The input has aria-label describing the expected file type.',
              ]],
              ['Keyboard', [
                'Tab focuses the hidden input (the label transfers focus).',
                'Enter / Space opens the native file picker.',
                'Disabled: input has the disabled attribute; zone has aria-disabled="true".',
              ]],
              ['Selected files', [
                'Each selected file shows a Remove button with aria-label="Remove [filename]".',
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
            { name: 'onFiles',     type: '(files: File[]) => void',    description: 'Original callback for uncontrolled usage. Called when the user selects or removes files. Use onChange instead when using controlled mode (value prop).' },
            { name: 'accept',      type: 'string',                     description: 'MIME types or extensions (forwarded to <input accept>). E.g. "image/*" or ".pdf,.docx".' },
            { name: 'multiple',    type: 'boolean',  default: 'false', description: 'Allow selecting multiple files.' },
            { name: 'disabled',    type: 'boolean',  default: 'false', description: 'Disables the zone and input.' },
            { name: 'aria-label',  type: 'string',   default: "'Upload file'", description: 'Accessible label for the hidden input.' },
            { name: 'className',   type: 'string',                     description: 'Additional class on the root div.' },
            { name: 'value',       type: 'File[]',                     description: 'Controlled selected files. When provided, the component uses this instead of internal state.' },
            { name: 'onChange',    type: '(files: File[]) => void',    description: 'Controlled-mode callback. Called when files change. Use together with the value prop for controlled mode.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
