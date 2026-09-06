/**
 * FilterChipPage — Gallery infrastructure
 * Documents the FilterChip design-system component.
 */

import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { FilterChip } from './FilterChip';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['badge', 'button', 'input']);

const CODE = {
  basic: `import { FilterChip } from '@diwauhris/ui';

// With remove button
<FilterChip
  label="Department: HR"
  onRemove={() => removeFilter('department')}
  removeLabel="Remove Department filter"
/>

// Read-only (no remove button)
<FilterChip label="Status: Active" />

// Disabled
<FilterChip label="Locked filter" disabled onRemove={() => {}} />`,

  group: `// Multiple active filters
const [filters, setFilters] = useState([
  { id: 'dept',   label: 'Department: HR'     },
  { id: 'status', label: 'Status: Active'     },
  { id: 'type',   label: 'Type: Full-time'    },
]);

<div className="flex flex-wrap gap-2">
  {filters.map((f) => (
    <FilterChip
      key={f.id}
      label={f.label}
      onRemove={() => setFilters((prev) => prev.filter((x) => x.id !== f.id))}
      removeLabel={\`Remove \${f.label}\`}
    />
  ))}
</div>`,

  liveRegion: `// Wrap the chip group in a role="status" container.
// "polite" announces after the current speech finishes — correct for filter changes.
// The container announces its text content when it changes.
// Use a separate visually-hidden status message, not the chips themselves.

function ActiveFilters({ filters, onRemove }: { filters: Filter[]; onRemove: (id: string) => void }) {
  const [announcement, setAnnouncement] = useState('');

  function handleRemove(filter: Filter) {
    setAnnouncement(\`Removed filter: \${filter.label}\`);
    onRemove(filter.id);
  }

  return (
    <>
      {/* Chips — visual only */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <FilterChip
            key={f.id}
            label={f.label}
            onRemove={() => handleRemove(f)}
            removeLabel={\`Remove \${f.label}\`}
          />
        ))}
      </div>

      {/* Screen-reader live region — visually hidden */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </>
  );
}`,
};

function RemovableDemo() {
  const [chips, setChips] = useState([
    { id: 'dept',   label: 'Department: HR'   },
    { id: 'status', label: 'Status: Active'   },
    { id: 'type',   label: 'Type: Full-time'  },
    { id: 'site',   label: 'Site: Manila HQ'  },
  ]);

  if (chips.length === 0) {
    return (
      <div className="text-sm text-slate-400 italic">All filters cleared.</div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <FilterChip
          key={chip.id}
          label={chip.label}
          onRemove={() => setChips((prev) => prev.filter((c) => c.id !== chip.id))}
          removeLabel={`Remove ${chip.label}`}
        />
      ))}
    </div>
  );
}

export default function FilterChipPage() {
  return (
    <GalleryLayout activeId="filter-chip">
      <title>FilterChip — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Inputs"
          name="FilterChip"
          description="A small removable tag that shows an active filter. Purely presentational — the filter state lives in your component. Pair with a live region to announce removals to screen readers."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="Click × to remove chips.">
          <ShowcasePreview standalone>
            <RemovableDemo />
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Single chip variants" center>
            <div className="flex flex-wrap gap-2">
              <FilterChip label="Department: HR" onRemove={() => {}} removeLabel="Remove Department filter" />
              <FilterChip label="Status: Active" />
              <FilterChip label="Locked filter" disabled onRemove={() => {}} />
            </div>
          </Showcase>
          <Showcase code={CODE.group} language="tsx" title="Multiple removable filters">
            <RemovableDemo />
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <Showcase
            language="tsx"
            title="Live-region pattern — announce filter removal to screen readers"
            code={CODE.liveRegion}
          >
            <div className="flex flex-wrap gap-2">
              <FilterChip label="Department: HR" onRemove={() => {}} removeLabel="Remove Department filter" />
              <FilterChip label="Status: Active" onRemove={() => {}} removeLabel="Remove Status filter" />
            </div>
          </Showcase>

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Remove button', [
                'The remove button has aria-label describing what is being removed.',
                'Default aria-label is "Remove filter". Always override with a descriptive label: removeLabel="Remove Department filter".',
                'Disabled chips set the button\'s disabled attribute — it is excluded from Tab navigation and cannot be activated.',
              ]],
              ['Chip container', [
                'The chip root is a <span> — not interactive. Only the remove <button> is in the Tab order.',
                'FilterChip does not add aria-live internally. It is a focused presentation primitive.',
                'To announce filter removals to screen readers, wrap the chip group in an aria-live region (see pattern below).',
              ]],
            ].map(([h, items]) => (
              <div key={String(h)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(h)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-sky/60" aria-hidden="true" />
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
            { name: 'label',       type: 'ReactNode', required: true, description: 'Chip content (string or JSX). Truncated at 20rem.' },
            { name: 'onRemove',    type: '() => void', description: 'When provided, renders the × remove button.' },
            { name: 'removeLabel', type: 'string', default: "'Remove filter'", description: 'aria-label for the remove button. Always provide a descriptive label.' },
            { name: 'disabled',    type: 'boolean', default: 'false', description: 'Disables the remove button.' },
            { name: 'className',   type: 'string', description: 'Additional class on the chip span.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
