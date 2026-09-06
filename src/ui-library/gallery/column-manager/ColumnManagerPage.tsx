/**
 * ColumnManagerPage — Gallery (Data Display)
 *
 * Documents the ColumnManager component — a dropdown panel for
 * table column visibility and reordering.
 */

import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';
import { ColumnManager, applyColumnOrder, type ColumnManagerColumn } from './ColumnManager';

const RELATED = getRelatedComponents(['table', 'dropdown', 'checkbox']);

// ── Sample data ────────────────────────────────────────────────────────────────

const DEMO_COLUMNS: ColumnManagerColumn[] = [
  { key: 'name',   label: 'Employee Name' },
  { key: 'dept',   label: 'Department' },
  { key: 'role',   label: 'Job Title' },
  { key: 'status', label: 'Status' },
  { key: 'date',   label: 'Start Date' },
  { key: 'salary', label: 'Salary' },
];

// ── Code samples ───────────────────────────────────────────────────────────────

const CODE = {
  basic: `import { ColumnManager, applyColumnOrder } from '@diwauhris/ui';
import { useState } from 'react';

const COLUMNS = [
  { key: 'name',   label: 'Employee Name' },
  { key: 'dept',   label: 'Department' },
  { key: 'role',   label: 'Job Title' },
  { key: 'status', label: 'Status' },
];

function MyTable() {
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
  const [order,      setOrder]      = useState<string[] | null>(null);

  // Apply order before rendering — preserves new columns gracefully
  const visibleColumns = applyColumnOrder(COLUMNS, order)
    .filter((col) => !hiddenKeys.includes(col.key));

  return (
    <div>
      <div className="flex justify-end mb-2">
        <ColumnManager
          columns={COLUMNS}
          hiddenColumnKeys={hiddenKeys}
          columnOrder={order}
          onHiddenColumnKeysChange={setHiddenKeys}
          onColumnOrderChange={setOrder}
          onReset={() => { setHiddenKeys([]); setOrder(null); }}
        />
      </div>
      <table>
        <thead>
          <tr>
            {visibleColumns.map((col) => <th key={col.key}>{col.label}</th>)}
          </tr>
        </thead>
        {/* ... rows ... */}
      </table>
    </div>
  );
}`,

  applyOrder: `// applyColumnOrder utility — apply stored order to runtime columns.
// Safe when columns are added or removed after a user saved preferences.
import { applyColumnOrder } from '@diwauhris/ui';

const ordered = applyColumnOrder(columns, storedOrder);
// Keys in storedOrder that no longer exist are silently dropped.
// New columns not in storedOrder are appended at the end.`,
};

// ── Live demo ──────────────────────────────────────────────────────────────────

function LiveDemo() {
  const [hiddenKeys, setHiddenKeys] = useState<string[]>(['salary']);
  const [order,      setOrder]      = useState<string[] | null>(null);

  const visibleColumns = applyColumnOrder(DEMO_COLUMNS, order)
    .filter((col) => !hiddenKeys.includes(col.key));

  const demoRows = [
    { name: 'Maria Santos',    dept: 'Finance',    role: 'Senior Accountant', status: 'Active',  date: 'Jan 2021', salary: '₱ 48,500' },
    { name: 'Jose Reyes',      dept: 'Operations', role: 'Operations Lead',   status: 'Active',  date: 'Mar 2019', salary: '₱ 38,000' },
    { name: 'Ana Villanueva',  dept: 'HR',         role: 'HR Specialist II',  status: 'On Leave', date: 'Jun 2022', salary: '₱ 32,000' },
  ];

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-end">
        <ColumnManager
          columns={DEMO_COLUMNS}
          hiddenColumnKeys={hiddenKeys}
          columnOrder={order}
          onHiddenColumnKeysChange={setHiddenKeys}
          onColumnOrderChange={setOrder}
          onReset={() => { setHiddenKeys(['salary']); setOrder(null); }}
        />
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {visibleColumns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {demoRows.map((row) => (
              <tr key={row.name} className="hover:bg-slate-50 transition-colors">
                {visibleColumns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-slate-700 font-medium">
                    {row[col.key as keyof typeof row]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-slate-400">
        Try hiding columns or reordering them using the Columns button above.
      </p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ColumnManagerPage() {
  return (
    <GalleryLayout activeId="column-manager">
      <title>ColumnManager — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Data Display"
          name="ColumnManager"
          description="A dropdown panel for showing/hiding and reordering table columns. Caller owns all state — ColumnManager is purely presentational. Ships with applyColumnOrder(), a utility that safely applies a stored order to the runtime column array."
          status="complete"
          importName="ColumnManager, applyColumnOrder"
        />

        {/* Overview */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Live demo — open the Columns button to hide columns or drag them into a new order."
        >
          <ShowcasePreview standalone center={false} overflow="visible" minHeight="min-h-[320px]">
            <LiveDemo />
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Standard usage with a data table" center={false} overflow="visible" minHeight="min-h-[80px]">
            <div className="w-full flex justify-center">
              <ColumnManager
                columns={DEMO_COLUMNS.slice(0, 4)}
                hiddenColumnKeys={[]}
                columnOrder={null}
                onHiddenColumnKeysChange={() => {}}
                onColumnOrderChange={() => {}}
                onReset={() => {}}
              />
            </div>
          </Showcase>

          <Showcase code={CODE.applyOrder} language="tsx" title="applyColumnOrder utility" center={false}>
            <div className="w-full max-w-sm space-y-2">
              <p className="text-xs font-medium text-slate-500">
                <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">applyColumnOrder(columns, order)</code> applies a stored key-array order to your runtime columns array. Keys that no longer exist are dropped; new columns are appended.
              </p>
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {([
              ['Trigger', [
                'The trigger button has aria-expanded and aria-controls — screen readers announce the panel state.',
                'When the panel closes, focus returns to the trigger.',
                'The hidden-column count badge is announced as part of the button label.',
              ]],
              ['Panel', [
                'The panel has role="region" with aria-label="Manage columns" — it\'s a named landmark region.',
                'Closes on Escape from any focus position inside the panel.',
                'Closes when focus leaves via an outside pointer-down.',
              ]],
              ['Checkboxes', [
                'Each checkbox is associated with its label via htmlFor + id — clicking the label toggles the checkbox.',
                'Hidden columns are visually de-emphasised (text-slate-400) to signal their off state.',
              ]],
              ['Reorder buttons', [
                'Each up/down button has an aria-label: "Move {column label} up/down".',
                'Disabled at boundaries (first column can\'t move up, last can\'t move down). disabled buttons are removed from tab order.',
              ]],
            ] as [string, string[]][]).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{heading}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
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
          <p className="text-sm font-bold text-slate-700 mb-2">ColumnManager</p>
          <ApiTable props={[
            { name: 'columns',                   type: 'ColumnManagerColumn[]', required: true,  description: 'All available columns in their default order.' },
            { name: 'hiddenColumnKeys',           type: 'string[]',             required: true,  description: 'Keys of currently hidden columns.' },
            { name: 'columnOrder',                type: 'string[] | null',      required: true,  description: 'Current column order as key array. Pass null to use the default column order.' },
            { name: 'onHiddenColumnKeysChange',   type: '(keys: string[]) => void', required: true, description: 'Called with the new hidden-keys array when visibility changes.' },
            { name: 'onColumnOrderChange',        type: '(order: string[]) => void', required: true, description: 'Called with the new key order when a column is moved.' },
            { name: 'onReset',                    type: '() => void',           required: true,  description: 'Called when the Reset button is clicked. Caller restores defaults.' },
            { name: 'triggerLabel',               type: 'string',               default: '"Columns"', description: 'Label for the dropdown trigger button.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">ColumnManagerColumn</p>
          <ApiTable props={[
            { name: 'key',   type: 'string', required: true, description: 'Unique identifier matching the data column key.' },
            { name: 'label', type: 'string', required: true, description: 'Human-readable column name shown in the panel.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">applyColumnOrder(columns, order)</p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-600">
            Applies a stored key-array order to a runtime column array. Keys in <code className="font-mono text-xs">order</code> that no longer exist in <code className="font-mono text-xs">columns</code> are silently dropped. New columns not in <code className="font-mono text-xs">order</code> are appended at the end. Pass <code className="font-mono text-xs">null</code> as <code className="font-mono text-xs">order</code> to return the original array unchanged.
          </div>
        </GallerySection>

        {/* Related */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
