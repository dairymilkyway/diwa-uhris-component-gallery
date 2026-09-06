/**
 * Showcase — Gallery infrastructure
 *
 * Pairs a live component preview with its exact copyable code.
 *
 * Brand application (DESIGN.md):
 *   Preview well (light)  — #eef2f8 (very light blue tint, neutral-cool)
 *   Copy button focus     — brand-blue ring
 *   Showcase title/desc   — unchanged prose hierarchy
 *
 * The dark code panel (slate-900) is intentionally unchanged — it provides
 * maximum legibility for monospace code regardless of brand palette.
 */

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { ReactNode } from 'react';

// ── Background tones ──────────────────────────────────────────────────────────

export type ShowcaseTone = 'light' | 'white' | 'dark' | 'grid';

const TONE_CLASS: Record<ShowcaseTone, string> = {
  // light: brand-tinted off-white — more distinctive than plain slate-50
  light: 'bg-[#eef2f8]',
  white: 'bg-white',
  dark:  'bg-slate-900',
  grid:  'bg-[#eef2f8] [background-image:linear-gradient(rgba(45,138,202,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(45,138,202,0.12)_1px,transparent_1px)] [background-size:20px_20px]',
};

// ── Copy hook ─────────────────────────────────────────────────────────────────

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — fail silently
    }
  };
  return { copied, copy };
}

// ── ShowcaseCode ──────────────────────────────────────────────────────────────

interface ShowcaseCodeProps {
  code: string;
  language?: string;
}

export function ShowcaseCode({ code, language = 'tsx' }: ShowcaseCodeProps) {
  const { copied, copy } = useCopy(code);

  return (
    <div className="overflow-hidden rounded-b-xl border-x border-b border-slate-200 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-2">
        {language && (
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-slate-500">
            {language}
          </span>
        )}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
          className="ml-auto flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold text-slate-400 transition hover:bg-slate-700/60 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky/50"
        >
          {copied ? (
            <>
              <Check size={11} className="text-emerald-400" aria-hidden="true" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={11} aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="max-h-80 overflow-x-auto overflow-y-auto px-5 py-4">
        <code
          className="whitespace-pre font-mono text-xs leading-relaxed text-slate-300"
          style={{ background: 'transparent', padding: 0, borderRadius: 0, fontSize: 'inherit' }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}

// ── ShowcasePreview ───────────────────────────────────────────────────────────

interface ShowcasePreviewProps {
  tone?: ShowcaseTone;
  center?: boolean;
  minHeight?: string;
  standalone?: boolean;
  /** Allow floating panels (dropdowns, menus, popovers) to escape the container.
   *  Default 'hidden' preserves border-radius clipping for non-floating content. */
  overflow?: 'hidden' | 'visible';
  children: ReactNode;
}

export function ShowcasePreview({
  tone = 'light',
  center = true,
  minHeight = 'min-h-[120px]',
  standalone = false,
  overflow = 'hidden',
  children,
}: ShowcasePreviewProps) {
  return (
    <div
      className={[
        'px-8 py-8',
        overflow === 'visible' ? 'overflow-visible' : 'overflow-hidden',
        standalone
          ? 'rounded-xl border border-slate-200'
          : 'rounded-t-xl border-x border-t border-slate-200',
        TONE_CLASS[tone],
        minHeight,
        center
          ? 'flex flex-wrap items-center justify-center gap-3'
          : 'flex flex-wrap items-start justify-center gap-3',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

// ── Showcase (composed) ───────────────────────────────────────────────────────

interface ShowcaseProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
  tone?: ShowcaseTone;
  center?: boolean;
  minHeight?: string;
  overflow?: 'hidden' | 'visible';
  children: ReactNode;
}

export function Showcase({
  code,
  language = 'tsx',
  title,
  description,
  tone,
  center = true,
  minHeight,
  overflow,
  children,
}: ShowcaseProps) {
  return (
    <div>
      {(title || description) && (
        <div className="mb-3">
          {title && <h3 className="text-sm font-bold text-slate-800">{title}</h3>}
          {description && (
            <p className="mt-0.5 text-xs font-medium text-slate-400">{description}</p>
          )}
        </div>
      )}
      <ShowcasePreview tone={tone} center={center} minHeight={minHeight} overflow={overflow}>
        {children}
      </ShowcasePreview>
      <ShowcaseCode code={code} language={language} />
    </div>
  );
}
