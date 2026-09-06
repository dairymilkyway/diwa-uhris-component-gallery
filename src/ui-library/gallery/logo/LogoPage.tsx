/**
 * LogoPage — Gallery infrastructure (Foundations)
 *
 * Documents the official DIWA Learning Systems Inc. logo system based on the
 * DIWA Brand Guidelines: anatomy, logo types & variations, minimum sizes,
 * clear space rules, and proper usage / misuse examples.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

// ── Asset imports ─────────────────────────────────────────────────────────────
import logoWithTagline    from '../../../assets/diwa-logo-with tagline.png';
import logoWithTaglineJpg from '../../../assets/diwa-logo_with tagline.jpg';
import logoWordmark       from '../../../assets/diwa-logo03_wordmark.jpg';
import logoWithoutTagline from '../../../assets/diwa-logo02_without tagline.jpg';
import logoWhite          from '../../../assets/DIWA LOGO WHITE.png';

// ── Variant assets ────────────────────────────────────────────────────────────
import wordmarkColor from '../../../assets/wordmark/diwa-logo-wordmark-color.png';
import wordmarkBlack from '../../../assets/wordmark/diwa-logo-wordmark-black.png';
import wordmarkWhite from '../../../assets/wordmark/diwa-logo-wordmark-white.png';
import emblem        from '../../../assets/emblem/diwa-emblem.png';

// ── Download helper ───────────────────────────────────────────────────────────
function downloadAsset(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const RELATED = getRelatedComponents(['colors', 'typography']);

// ── Shared sub-components ─────────────────────────────────────────────────────

/** Pill label above a preview cell */
function CellLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
      {children}
    </p>
  );
}


/** Reusable "Don't" violation card */
function DontCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex items-center justify-center rounded-xl border-2 border-rose-200 bg-rose-50/50 p-6 min-h-[96px]">
        {children}
        <span className="absolute top-2 right-2 rounded bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-rose-500">
          Don't
        </span>
      </div>
      <p className="text-xs font-medium text-slate-500 text-center leading-snug">{label}</p>
    </div>
  );
}

/** Info / warning callout strip */
function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: 'info' | 'warning' | 'danger';
  title: string;
  children: React.ReactNode;
}) {
  const styles = {
    info:    'border-brand-sky/30 bg-sky-50 text-sky-700',
    warning: 'border-amber-300  bg-amber-50  text-amber-800',
    danger:  'border-rose-300   bg-rose-50   text-rose-800',
  }[variant];
  return (
    <div className={`rounded-xl border px-5 py-4 space-y-1 ${styles}`}>
      <p className="text-sm font-bold">{title}</p>
      <p className="text-sm font-medium leading-relaxed">{children}</p>
    </div>
  );
}


// ── Download components ───────────────────────────────────────────────────────

/** Small inline download button */
function DownloadButton({ url, filename, label = 'Download' }: { url: string; filename: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => downloadAsset(url, filename)}
      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-navy px-3 py-1.5 text-[11px] font-bold text-white hover:bg-brand-blue active:scale-95 transition-all select-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      {label}
    </button>
  );
}

/** Card showing a logo asset with preview + metadata + download */
function DownloadCard({
  src,
  alt,
  name,
  filename,
  format,
  usage,
  bg = 'white',
  imgClass = '',
}: {
  src: string;
  alt: string;
  name: string;
  filename: string;
  format: string;
  usage: string;
  bg?: string;
  imgClass?: string;
}) {
  const formatColor: Record<string, string> = {
    PNG: 'bg-sky-100 text-sky-700',
    JPG: 'bg-amber-100 text-amber-700',
    SVG: 'bg-emerald-100 text-emerald-700',
  };
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 overflow-hidden bg-white">
      {/* Preview */}
      <div
        className="flex items-center justify-center p-8 min-h-[140px]"
        style={{ background: bg }}
      >
        <img src={src} alt={alt} className={`max-h-24 w-auto object-contain ${imgClass}`} />
      </div>
      {/* Meta + download */}
      <div className="px-4 py-3 border-t border-slate-100 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-800 leading-tight">{name}</p>
          <p className="text-[11px] font-medium text-slate-400 mt-0.5 leading-snug">{usage}</p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${formatColor[format] ?? 'bg-slate-100 text-slate-600'}`}>
            {format}
          </span>
          <DownloadButton url={src} filename={filename} />
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LogoPage() {
  return (
    <GalleryLayout activeId="logo">
      <title>Logo — DIWA Brand Guidelines</title>
      <GalleryPageWrapper>

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Foundations"
          name="Logo"
          description="The official DIWA Learning Systems Inc. logo system — anatomy, approved variants, minimum sizes, clear space rules, and proper usage guidelines."
          status="complete"
        />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — THE LOGO
        ══════════════════════════════════════════════════════════════════ */}
        <GallerySection
          id="the-logo"
          title="The Logo"
          description="The DIWA trademark is composed of three elements: the Icon (emblem), the Word Mark, and the Tagline / Brand Promise. Together they form the full logo lockup."
        >
          {/* Full logo preview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-10 flex flex-col items-center gap-4">
            <img
              src={logoWithTagline}
              alt="DIWA Learning Systems Inc. full logo with tagline"
              className="max-w-xs w-full object-contain"
            />
            <DownloadButton
              url={logoWithTagline}
              filename="diwa-logo-with-tagline.png"
              label="Download logo"
            />
          </div>


          {/* Anatomy table */}
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Element', 'Description'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  ['Icon (Emblem)', 'An equilateral triangle enclosing a Carbon atom, surrounded by 25 equally-spaced lines. The triangle symbolises the three pillars of Diwa\'s corporate culture (planning, hard work, frugality) and core values (competence, commitment, consistency). The atom represents science and education — the foundation of the company\'s existence. The 25 lines depict Diwa\'s vision of equitable distribution of wealth and opportunity attained through education.'],
                  ['Word Mark', 'A bold, slanted typeface spelling "DIWA." The italic stance conveys movement, motion, and action — reinforcing the tagline and brand promise of Innovation in Education.'],
                  ['Tagline / Brand Promise', '"Innovation in Education" — the brand\'s enduring promise and the reason for the company\'s existence.'],
                ].map(([element, desc]) => (
                  <tr key={String(element)} className="hover:bg-slate-50/60 align-top">
                    <td className="px-5 py-4 text-xs font-bold text-slate-800 whitespace-nowrap w-40">{element}</td>
                    <td className="px-5 py-4 text-xs font-medium text-slate-500 leading-relaxed">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GallerySection>


        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — LOGO TYPES & VARIATIONS
        ══════════════════════════════════════════════════════════════════ */}
        <GallerySection
          id="logo-types"
          title="Logo Types & Variations"
          description="Three approved logo types exist. Choose the correct type based on the application context and available space."
        >

          {/* ── Standard Logo ── */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-6 pt-6 pb-2 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-800">Standard Logo</p>
              <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                Use in all formal and informal applications — corporate identity collaterals, internal and external communications, websites, digital applications, online media, and promotional materials.
              </p>
              <div className="mt-4 flex items-center gap-6 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Print minimum</p>
                  <code className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">1.5 inches</code>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Screen minimum</p>
                  <code className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">300px</code>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100">
              {[
                { label: '4″ width', size: 'max-w-[192px]' },
                { label: '3″ width', size: 'max-w-[144px]' },
                { label: '2″ width', size: 'max-w-[96px]' },
                { label: '1.5″ width (minimum)', size: 'max-w-[72px]' },
              ].map(({ label, size }) => (
                <div key={label} className="bg-white p-6 flex flex-col items-center gap-3">
                  <img
                    src={logoWithTaglineJpg}
                    alt={`DIWA standard logo at ${label}`}
                    className={`${size} w-full object-contain`}
                  />
                  <p className="text-[10px] font-medium text-slate-400 text-center">{label}</p>
                </div>
              ))}
            </div>
          </div>


          {/* ── Logo Type Only  &  Icon Only ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Logo Type Only */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-800">Logo Type Only (Word Mark)</p>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                  Use in informal applications, and when the complete logo or icon & wordmark combination doesn't meet minimum size requirements.
                </p>
                <p className="text-[11px] text-slate-400 mt-2">
                  Internal / external communications · informal digital · online media · promotional materials
                </p>
                <div className="mt-4 flex items-center gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Print min</p>
                    <code className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">.5 inches</code>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Screen min</p>
                    <code className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">150px</code>
                  </div>
                </div>
              </div>
              <div className="p-8 flex items-center justify-center">
                <img
                  src={logoWordmark}
                  alt="DIWA wordmark only"
                  className="max-w-[160px] w-full object-contain"
                />
              </div>
            </div>

            {/* Icon Only */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-800">Icon Only (Emblem)</p>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                  Use in informal applications where the DIWA brand is already established in context — favicons, app icons, or repeated headers.
                </p>
                <p className="text-[11px] text-slate-400 mt-2">
                  Internal / external communications · informal digital · online media · promotional materials
                </p>
                <div className="mt-4 flex items-center gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Print min</p>
                    <code className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">1 inch</code>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Screen min</p>
                    <code className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">150px</code>
                  </div>
                </div>
              </div>
              <div className="p-8 flex items-center justify-center">
                <img
                  src={logoWithoutTagline}
                  alt="DIWA icon / emblem only"
                  className="max-w-[120px] w-full object-contain"
                />
              </div>
            </div>
          </div>
        </GallerySection>


        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — PROPER LOGO USAGE
        ══════════════════════════════════════════════════════════════════ */}
        <GallerySection
          id="proper-usage"
          title="Proper Logo Usage"
          description="Guidelines for correctly placing and reproducing the DIWA logo across all media."
        >

          {/* Clear space */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-800">Clear Space</p>
              <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                Always maintain sufficient clear space around the logo. No text, images, borders, or other graphic elements may enter this protected zone.
              </p>
            </div>
            <div className="p-8 flex items-center justify-center">
              <div className="relative inline-block">
                {/* dashed clear-space boundary */}
                <div className="border-2 border-dashed border-sky-300 rounded-xl p-8">
                  <img
                    src={logoWithTaglineJpg}
                    alt="DIWA logo with clear space shown"
                    className="max-w-[200px] w-full object-contain"
                  />
                </div>
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-sky-500 whitespace-nowrap">
                  ← minimum clear space →
                </span>
              </div>
            </div>
          </div>

          {/* Black & White */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-800">Black & White / Single-Color Reproduction</p>
              <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                While the logo is best represented in its originally designed color, black-and-white or single-color versions are acceptable for one-color prints, brown (buff) document envelopes, stamps, receipts, and invoices.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-100">
              <div className="bg-white p-8 flex flex-col items-center gap-3">
                <CellLabel>Black & White</CellLabel>
                <img
                  src={logoWithTaglineJpg}
                  alt="DIWA logo black and white"
                  className="max-w-[180px] w-full object-contain grayscale"
                />
              </div>
              <div className="bg-[#00377B] p-8 flex flex-col items-center gap-3">
                <CellLabel>Reversed — on dark backgrounds</CellLabel>
                <img
                  src={logoWhite}
                  alt="DIWA logo reversed white on dark"
                  className="max-w-[180px] w-full object-contain"
                />
              </div>
            </div>
          </div>
        </GallerySection>


        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — LOGO MISUSE
        ══════════════════════════════════════════════════════════════════ */}
        <GallerySection
          id="misuse"
          title="Logo Misuse"
          description="Never alter the logo in any of the following ways. These rules ensure the brand remains consistent and recognisable across all touchpoints."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

            {/* 1. Don't change proportions */}
            <DontCard label="Do not change proportions of any logo element. Resize only — retain all proportions.">
              <img
                src={logoWithTaglineJpg}
                alt="Distorted DIWA logo"
                className="max-w-[140px] object-contain"
                style={{ transform: 'scaleX(1.35)', transformOrigin: 'center' }}
              />
            </DontCard>

            {/* 2. Don't alter color */}
            <DontCard label="Never stray or alter the logo's official colors.">
              <img
                src={logoWithTaglineJpg}
                alt="Wrong color DIWA logo"
                className="max-w-[140px] object-contain"
                style={{ filter: 'hue-rotate(120deg) saturate(2)' }}
              />
            </DontCard>

            {/* 3. Don't use on similar-colored backgrounds */}
            <DontCard label="Never use the logo on similarly colored backgrounds.">
              <div className="rounded-lg bg-[#034EA2] p-4">
                <img
                  src={logoWithTaglineJpg}
                  alt="DIWA logo on similar colored background"
                  className="max-w-[120px] object-contain opacity-30"
                />
              </div>
            </DontCard>

            {/* 4. Don't re-arrange elements */}
            <DontCard label="Do not re-arrange or alter the elements of the logo.">
              <div className="flex flex-col items-center gap-1">
                <img
                  src={logoWordmark}
                  alt="Re-arranged DIWA logo"
                  className="max-w-[80px] object-contain"
                />
                <img
                  src={logoWithoutTagline}
                  alt="Icon below wordmark"
                  className="max-w-[48px] object-contain"
                />
              </div>
            </DontCard>

            {/* 5. Don't rotate */}
            <DontCard label="Do not rotate or tilt the logo.">
              <img
                src={logoWithTaglineJpg}
                alt="Rotated DIWA logo"
                className="max-w-[120px] object-contain"
                style={{ transform: 'rotate(-20deg)' }}
              />
            </DontCard>

            {/* 6. Don't add effects */}
            <DontCard label="Do not add drop shadows, gradients, or other effects.">
              <img
                src={logoWithTaglineJpg}
                alt="DIWA logo with drop shadow"
                className="max-w-[140px] object-contain"
                style={{ filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.6))' }}
              />
            </DontCard>

          </div>

          <Callout variant="danger" title="Brand integrity rule">
            You may resize the logo as needed but must always retain all proportions. Never alter colors, rearrange elements, or apply any visual effects.
          </Callout>
        </GallerySection>


        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5 — MINIMUM SIZES QUICK REFERENCE
        ══════════════════════════════════════════════════════════════════ */}
        <GallerySection
          id="minimum-sizes"
          title="Minimum Size Reference"
          description="A consolidated reference of all approved logo types and their minimum reproduction sizes."
        >
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Logo Type', 'Use Context', 'Print Minimum', 'Screen Minimum'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  ['Standard Logo', 'All formal & informal applications', '1.5 inches', '300px'],
                  ['Logo Type Only (Word Mark)', 'Informal — when full logo is too small', '0.5 inches', '150px'],
                  ['Icon Only (Emblem)', 'Informal — when full logo is too small', '1 inch', '150px'],
                ].map(([type, context, print, screen]) => (
                  <tr key={String(type)} className="hover:bg-slate-50/60">
                    <td className="px-5 py-4 text-xs font-bold text-slate-800">{type}</td>
                    <td className="px-5 py-4 text-xs font-medium text-slate-500">{context}</td>
                    <td className="px-5 py-4">
                      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-800">{print}</code>
                    </td>
                    <td className="px-5 py-4">
                      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-800">{screen}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Callout variant="warning" title="Minimum size alert">
            Do not reproduce any logo type smaller than the specified minimums. Below these thresholds, detail is lost and legibility breaks down — defeating the purpose of a clear brand identity.
          </Callout>
        </GallerySection>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6 — DOWNLOAD ASSETS
        ══════════════════════════════════════════════════════════════════ */}
        <GallerySection
          id="downloads"
          title="Download Logo Assets"
          description="All official approved logo files — standard lockups, wordmark variants (color, black, white), and the standalone emblem. Use these assets as-is for all digital and print applications."
        >

          {/* ── Standard Logo ── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Standard Logo (with Tagline)</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DownloadCard
                src={logoWithTagline}
                alt="DIWA standard logo with tagline (PNG)"
                name="Standard Logo — Color"
                filename="diwa-logo-with-tagline.png"
                format="PNG"
                usage="Primary — all formal & informal digital use"
              />
              <DownloadCard
                src={logoWithTaglineJpg}
                alt="DIWA standard logo with tagline (JPG)"
                name="Standard Logo — Color"
                filename="diwa-logo-with-tagline.jpg"
                format="JPG"
                usage="Primary — print & document applications"
              />
              <DownloadCard
                src={logoWhite}
                alt="DIWA standard logo reversed white"
                name="Standard Logo — White (Reversed)"
                filename="diwa-logo-white.png"
                format="PNG"
                usage="Use on dark / brand-navy backgrounds"
                bg="#00377B"
              />
            </div>
          </div>

          {/* ── Wordmark only ── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Logo Type Only (Word Mark)</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DownloadCard
                src={wordmarkColor}
                alt="DIWA wordmark color"
                name="Word Mark — Color (Navy)"
                filename="diwa-logo-wordmark-color.png"
                format="PNG"
                usage="Informal use on light backgrounds"
              />
              <DownloadCard
                src={wordmarkBlack}
                alt="DIWA wordmark black"
                name="Word Mark — Black"
                filename="diwa-logo-wordmark-black.png"
                format="PNG"
                usage="Single-color print, stamps, receipts"
              />
              <DownloadCard
                src={wordmarkWhite}
                alt="DIWA wordmark white"
                name="Word Mark — White"
                filename="diwa-logo-wordmark-white.png"
                format="PNG"
                usage="Use on dark backgrounds"
                bg="#00377B"
              />
              <DownloadCard
                src={logoWordmark}
                alt="DIWA wordmark JPG"
                name="Word Mark — Color (JPG)"
                filename="diwa-logo-wordmark.jpg"
                format="JPG"
                usage="Informal use — documents & web"
              />
            </div>
          </div>

          {/* ── Icon / Emblem only ── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Icon Only (Emblem)</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DownloadCard
                src={emblem}
                alt="DIWA emblem / icon"
                name="Emblem — Color"
                filename="diwa-emblem.png"
                format="PNG"
                usage="Favicon, app icon, compact informal spaces"
              />
              <DownloadCard
                src={logoWithoutTagline}
                alt="DIWA icon without tagline (JPG)"
                name="Emblem — Color (JPG)"
                filename="diwa-emblem.jpg"
                format="JPG"
                usage="Informal use — documents & print"
              />
            </div>
          </div>

          <Callout variant="info" title="File usage guidance">
            PNG files preserve transparency — use them for digital, web, and overlay applications. JPG files are best for document embedding and print. Always use files as-is: do not re-export, resize the canvas, or alter colors.
          </Callout>
        </GallerySection>

        {/* ── Related ─────────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
