/**
 * PaginationPage — Gallery infrastructure
 *
 * Gallery page for the Pagination design-system component.
 *
 * Section order: Header → Overview → Playground → Implementation → Accessibility → API → Related
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
import { PaginationPlayground } from './PaginationPlayground';
import { Pagination } from './Pagination';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['button', 'spinner', 'table']);

// ── Code strings ──────────────────────────────────────────────────────────────

const CODE = {
  fewPages: `// Fragment — add your own state: const [page, setPage] = useState(3);
// Fewer than 7 pages — all numbers shown
<Pagination page={3} totalPages={5} onPageChange={setPage} />`,

  manyPages: `// Fragment — add your own state: const [page, setPage] = useState(5);
// More than 7 pages — ellipsis collapses middle pages
<Pagination page={5} totalPages={20} onPageChange={setPage} />`,

  atStart: `// Fragment — add your own state: const [page, setPage] = useState(1);
// At the start — previous is disabled
<Pagination page={1} totalPages={10} onPageChange={setPage} />`,

  atEnd: `// Fragment — add your own state: const [page, setPage] = useState(10);
// At the end — next is disabled
<Pagination page={10} totalPages={10} onPageChange={setPage} />`,

  patternTable: `import { Pagination } from '@diwauhris/ui';
import { useState } from 'react';

const PAGE_SIZE = 10;
const [page, setPage] = useState(1);
const totalPages = Math.ceil(totalItems / PAGE_SIZE);

<div>
  <DataTable rows={rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)} />
  <div className="flex justify-end border-t border-slate-100 px-5 py-4">
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      ariaLabel="Employee table pagination"
    />
  </div>
</div>`,

  withCount: `// Fragment — add your own state:
// const [page, setPage] = useState(1);
// const totalPages = Math.ceil(totalItems / PAGE_SIZE);

// Record count footer — pass totalItems + pageSize to enable it
<Pagination
  page={page}
  totalPages={totalPages}
  onPageChange={setPage}
  totalItems={103}
  pageSize={10}
  itemLabel="employees"
/>
// Renders: "Showing 1–10 of 103 employees" below the nav`,
};

function LivePagination({ initialPage, totalPages }: { initialPage: number; totalPages: number }) {
  const [page, setPage] = useState(initialPage);
  return <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />;
}

export default function PaginationPage() {
  return (
    <GalleryLayout activeId="pagination">
      <title>Pagination — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* Header */}
        <GalleryComponentHeader
          category="Navigation"
          name="Pagination"
          description="Previous, next, and numbered page controls for paginated data. Collapses large page ranges into ellipsis automatically. Pass page and totalPages — the rest is handled."
          status="complete"
        />

        {/* Overview */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Common pagination states at a glance. No code — use the playground to experiment."
        >
          <ShowcasePreview standalone>
            <div className="flex flex-col items-center gap-5">
              <Pagination page={3} totalPages={5}  onPageChange={() => {}} />
              <Pagination page={5} totalPages={20} onPageChange={() => {}} />
              <Pagination page={1} totalPages={10} onPageChange={() => {}} />
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Playground */}
        <GallerySection id="playground" title="Playground" description="Change total pages and navigate interactively.">
          <PaginationPlayground />
        </GallerySection>

        {/* Implementation — Variants */}
        <GallerySection id="variants" title="Variants" description="Pagination adapts its display based on the number of pages.">
          <ShowcaseGrid columns={2}>
            <Showcase
              title="Few pages (≤ 7)"
              description="All page numbers are shown without ellipsis."
              code={CODE.fewPages}
            >
              <LivePagination initialPage={3} totalPages={5} />
            </Showcase>

            <Showcase
              title="Many pages (> 7)"
              description="Middle pages collapse to ellipsis. Current page and its neighbors are always visible."
              code={CODE.manyPages}
            >
              <LivePagination initialPage={5} totalPages={20} />
            </Showcase>

            <Showcase
              title="At start"
              description="Previous button is disabled on page 1."
              code={CODE.atStart}
            >
              <Pagination page={1} totalPages={10} onPageChange={() => {}} />
            </Showcase>

            <Showcase
              title="At end"
              description="Next button is disabled on the last page."
              code={CODE.atEnd}
            >
              <Pagination page={10} totalPages={10} onPageChange={() => {}} />
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* Patterns */}
        <GallerySection id="patterns" title="Patterns">
          <Showcase
            title="Table footer"
            description="Standard placement: right-aligned in the table footer, below the data rows."
            code={CODE.patternTable}
            tone="white"
            center={false}
          >
            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="divide-y divide-slate-100">
                {['Maria Santos', 'Juan dela Cruz', 'Ana Villanueva'].map((name) => (
                  <div key={name} className="px-4 py-3 text-sm font-semibold text-slate-700">{name}</div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Showing 1–3 of 47
                </span>
                <LivePagination initialPage={1} totalPages={16} />
              </div>
            </div>
          </Showcase>
          <Showcase
            title="With record count footer"
            description="Pass totalItems + pageSize to render a 'Showing X–Y of Z items' line below the page nav."
            code={CODE.withCount}
            center={false}
          >
            <Pagination
              page={1}
              totalPages={11}
              onPageChange={() => {}}
              totalItems={103}
              pageSize={10}
              itemLabel="employees"
            />
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Semantics', [
                'Renders as <nav aria-label="Pagination"> — provides a navigation landmark.',
                'Page number buttons have aria-label="Page N".',
                'The active page button has aria-current="page".',
                'Ellipsis spans are aria-hidden="true".',
                'Previous/Next buttons have aria-label="Previous page" and "Next page".',
              ]],
              ['Keyboard', [
                'Tab / Shift+Tab moves between previous, page numbers, and next buttons.',
                'Enter or Space activates the focused button.',
                'Disabled buttons (previous on page 1, next on last page) cannot receive focus.',
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

        {/* API */}
        <GallerySection id="api" title="API Reference">
          <ApiTable
            props={[
              { name: 'page',         type: 'number',   required: true, description: 'Current page (1-indexed).' },
              { name: 'totalPages',   type: 'number',   required: true, description: 'Total number of pages.' },
              { name: 'onPageChange', type: '(page: number) => void', required: true, description: 'Called when the user selects a page.' },
              { name: 'ariaLabel',    type: 'string',   default: '"Pagination"', description: 'aria-label for the <nav> element.' },
              { name: 'totalItems',   type: 'number',   description: 'Total number of records across all pages. When provided alongside pageSize, renders a "Showing X–Y of Z {itemLabel}" footer.' },
              { name: 'pageSize',     type: 'number',   description: 'Records per page. Required together with totalItems to compute the Showing X–Y range.' },
              { name: 'itemLabel',    type: 'string',   default: '"items"', description: 'Label for the item type in the record count footer. Example: "employees", "records".' },
            ]}
          />
        </GallerySection>

        {/* Related */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
