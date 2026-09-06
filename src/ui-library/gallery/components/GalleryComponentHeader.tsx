/**
 * GalleryComponentHeader
 *
 * Brand application (DESIGN.md):
 *   Category label — brand-sky (Level 3 / supporting hierarchy)
 *   Component H1   — brand-navy (Level 1 / dominant identity)
 */

import type { ComponentStatus } from '../../registry';
import { CopyCodeBlock } from './CopyCodeBlock';

interface GalleryComponentHeaderProps {
  category: string;
  name: string;
  description: string;
  status: ComponentStatus;
  /** Accepted for source compatibility but not rendered. */
  docsRoute?: string;
  /**
   * Override the auto-generated import symbol(s).
   * e.g. "Card, CardHeader, CardContent"
   * Defaults to the component name with spaces removed.
   * Pass false to suppress the import line entirely (for doc-only foundation pages).
   */
  importName?: string | false;
}

// Foundation pages that document concepts, not importable components.
// Both the npm block and the import line are hidden for these.
const DOC_ONLY_NAMES = new Set([
  // Design tokens
  'Colors', 'Typography', 'Spacing', 'Radius',
  'Elevation', 'Motion', 'Icons', 'Logo', 'Installation',
  // Brand / content guidelines
  'Brand Strategy', 'Brand Narrative', 'Voice & Tone', 'Writing Examples',
]);

export function GalleryComponentHeader({
  category,
  name,
  description,
  importName,
}: GalleryComponentHeaderProps) {
  // Derive symbol from name: "Field Input" → "FieldInput"
  const autoSymbol = name.replace(/\s+/g, '');
  // DOC_ONLY_NAMES: match by raw name (not stripped) — hides both npm and import
  const isDocOnly  = DOC_ONLY_NAMES.has(name);
  // importName={false}: layout/sample pages — show npm, hide import
  const showImport = !isDocOnly && importName !== false;
  const symbol     = showImport ? (importName ?? autoSymbol) : null;
  const importCode = symbol ? `import { ${symbol} } from '@diwauhris/ui';` : null;

  return (
    <div className="space-y-4 border-b border-slate-200/70 pb-10">
      {/* Category label */}
      <p className="text-xs font-bold uppercase tracking-widest text-brand-sky">
        {category}
      </p>

      {/* Component name */}
      <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-navy">
        {name}
      </h1>

      <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-500">
        {description}
      </p>

      {/* Install + import — omitted for foundation token pages only */}
      {!isDocOnly && (
        <div className="space-y-2">
          <CopyCodeBlock
            code="npm i @diwauhris/ui"
            language="bash"
            title="npm"
          />
          {importCode && (
            <CopyCodeBlock
              code={importCode}
              language="tsx"
              title="import"
            />
          )}
        </div>
      )}
    </div>
  );
}
