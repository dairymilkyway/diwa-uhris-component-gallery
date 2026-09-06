/**
 * CalendarPage — Gallery infrastructure (Data Display)
 * Source: gallery/calendar/Calendar.tsx
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
import { Calendar } from './Calendar';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['date-picker', 'input', 'popover']);

const CODE = {
  basic: `import { Calendar } from '@diwauhris/ui';

// Uncontrolled
<Calendar />

// Controlled
const [date, setDate] = useState<Date | null>(null);
<Calendar value={date} onChange={setDate} />

// With min/max
<Calendar
  value={date}
  onChange={setDate}
  minDate={new Date()}
/>`,
};

function DateDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="space-y-3">
      <Calendar value={date} onChange={setDate} />
      <p className="text-xs font-mono text-slate-500">
        Selected: {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'none'}
      </p>
    </div>
  );
}

export default function CalendarPage() {
  const today = new Date();
  return (
    <GalleryLayout activeId="calendar">
      <title>Calendar — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Data Display"
          name="Calendar"
          description="A standalone month-view calendar for browsing and selecting dates. Supports min/max constraints, controlled and uncontrolled usage, and full keyboard navigation. Use DatePicker when you need it in a popup."
          status="complete"
        />

        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone>
            <ShowcaseGrid columns={2}>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Controlled</p>
                <DateDemo />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Min date = today</p>
                <Calendar minDate={today} />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Basic usage">
            <DateDemo />
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            {[
              'role="grid" on the calendar table; role="gridcell" on each day.',
              'aria-label on each cell includes the full date and Today/Selected annotations.',
              'aria-selected marks the selected day; aria-current="date" marks today.',
              'Previous/Next month buttons have aria-label.',
              'Disabled dates use the HTML disabled attribute.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </GallerySection>

        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'value',        type: 'Date | null', description: 'Controlled selected date.' },
            { name: 'defaultValue', type: 'Date | null', description: 'Initial selected date (uncontrolled).' },
            { name: 'onChange',     type: '(date: Date) => void', description: 'Called when a date is selected.' },
            { name: 'minDate',      type: 'Date', description: 'Minimum selectable date.' },
            { name: 'maxDate',      type: 'Date', description: 'Maximum selectable date.' },
            { name: 'className',    type: 'string', description: 'Additional class on the root element.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
