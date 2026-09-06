/**
 * CopyCodeBlock
 *
 * Dark code block with copy-to-clipboard.
 *
 * Brand application (DESIGN.md):
 *   Copy button focus — brand-sky ring (visible against dark panel)
 *   Dark panel itself is unchanged — slate-900 is correct for code readability.
 *
 * IMPORTANT: The <code> element uses an inline style reset for background,
 * padding, borderRadius, and fontSize. The global CSS rule
 * `code { background: #e8edf3; ... }` styles inline code in prose contexts.
 * Without the reset that rule bleeds into this dark panel. Do not remove it.
 */

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  title?: string;
}

export function CopyCodeBlock({ code, language, filename, title }: CopyCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available — silently ignore
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-4 py-2.5">
        <div className="flex items-center gap-2">
          {title && (
            <span className="text-xs font-semibold text-slate-300">{title}</span>
          )}
          {filename && (
            <span className="font-mono text-[11px] text-slate-400">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {language && (
            <span className="rounded bg-slate-700 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-400">
              {language}
            </span>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold text-slate-400 transition hover:bg-slate-700 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky/50"
            aria-label={copied ? 'Copied' : 'Copy code'}
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" aria-hidden="true" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} aria-hidden="true" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto bg-slate-900 px-6 py-5">
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
