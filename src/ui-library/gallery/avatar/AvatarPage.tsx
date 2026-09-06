/**
 * AvatarPage — Gallery infrastructure (Display)
 *
 * Documents the Avatar design-system component.
 *
 * Section order (canonical):
 *   Header → Overview → Sizes → Patterns → Accessibility → API → Related
 *
 * No playground — Avatar has deterministic output from props.
 * Static Showcase examples communicate the API more clearly than interactive controls.
 */

import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { Avatar, type AvatarSize } from './Avatar';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['badge', 'card', 'status-badge']);

// ── Demo data ──────────────────────────────────────────────────────────────

const DEMO_NAMES = [
  'Juan dela Cruz',
  'Maria Santos',
  'Jose Reyes',
  'Ana Gonzalez',
  'Pedro Mendoza',
  'Luisa Rivera',
  undefined,
];

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  basic: `import { Avatar } from '@diwauhris/ui';

// Initials from name (deterministic color)
<Avatar name="Juan dela Cruz" />

// Image with initials fallback
<Avatar name="Maria Santos" src="/photos/maria.jpg" />

// No name → shows "?"
<Avatar />

// Custom color
<Avatar name="Jose Reyes" color="#0369A1" />`,

  sizes: `// Size variants (xs=24px, sm=32px, md=40px, lg=48px, xl=64px)
<Avatar name="Ana Gonzalez" size="xs" />
<Avatar name="Ana Gonzalez" size="sm" />
<Avatar name="Ana Gonzalez" size="md" />  {/* default */}
<Avatar name="Ana Gonzalez" size="lg" />
<Avatar name="Ana Gonzalez" size="xl" />`,

  imgFallback: `// Image with fallback to initials.
// If src fails to load, Avatar automatically shows initials — no extra handling needed.
<Avatar
  name="Maria Santos"
  src={employee.photoUrl}  // can be null/undefined — safely handled
  size="lg"
/>`,

  stack: `// Avatar stack — overlapping group
function AvatarStack({ names, max = 3 }: { names: (string | undefined)[]; max?: number }) {
  const visible = names.slice(0, max);
  const overflow = names.length - visible.length;

  return (
    <div className="flex -space-x-2">
      {visible.map((name, i) => (
        <Avatar key={i} name={name} size="sm" className="ring-2 ring-white" />
      ))}
      {overflow > 0 && (
        <div className="h-8 w-8 rounded-full ring-2 ring-white flex items-center justify-center bg-slate-200 text-slate-600 text-xs font-bold">
          +{overflow}
        </div>
      )}
    </div>
  );
}`,
};

// ── Live demos ─────────────────────────────────────────────────────────────

function AvatarStack({ names, max = 4 }: { names: (string | undefined)[]; max?: number }) {
  const visible = names.slice(0, max);
  const overflow = names.length - visible.length;
  return (
    <div className="flex -space-x-2">
      {visible.map((name, i) => (
        <Avatar key={i} name={name} size="sm" className="ring-2 ring-white" />
      ))}
      {overflow > 0 && (
        <div className="h-8 w-8 rounded-full ring-2 ring-white flex items-center justify-center bg-slate-200 text-slate-600 text-xs font-bold">
          +{overflow}
        </div>
      )}
    </div>
  );
}

function ImageFallbackDemo() {
  const [broken, setBroken] = useState(false);
  return (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Avatar
          name="Maria Santos"
          src={broken ? '/broken-url-that-404s.jpg' : undefined}
          size="lg"
        />
        <p className="mt-1 text-xs text-slate-400">{broken ? 'Fallback (img error)' : 'Initials'}</p>
      </div>
      <button
        type="button"
        onClick={() => setBroken((v) => !v)}
        className="text-xs font-semibold text-brand-blue hover:text-brand-navy px-3 py-1.5 rounded-lg border border-brand-blue/20 hover:bg-blue-50 transition-colors"
      >
        {broken ? 'Reset' : 'Simulate img error'}
      </button>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function AvatarPage() {
  return (
    <GalleryLayout activeId="avatar">
      <title>Avatar — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Display"
          name="Avatar"
          description="A circular identity tile. Shows a photo when src is provided; falls back to initials when it isn't — consistently colored based on the name. No user model dependencies."
          status="complete"
        />

        {/* ── 2. Overview — visual only, no code ────────────────────────── */}
        <GallerySection id="overview" title="Overview" description="Initials with deterministic colors. Undefined name renders '?'.">
          <ShowcasePreview standalone>
            <div className="flex flex-wrap items-center gap-3">
              {DEMO_NAMES.map((name, i) => (
                <Avatar key={i} name={name} />
              ))}
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 3. Sizes ──────────────────────────────────────────────────── */}
        <GallerySection id="sizes" title="Sizes" description="Five size presets for different layout densities.">
          <Showcase code={CODE.sizes} language="tsx">
            <div className="flex flex-wrap items-end gap-4">
              {SIZES.map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Avatar name="Ana Gonzalez" size={size} />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{size}</span>
                </div>
              ))}
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 4. Basic usage & Patterns ─────────────────────────────────── */}
        <GallerySection id="patterns" title="Patterns" description="Common usage patterns for Avatar in enterprise layouts.">
          <ShowcaseGrid columns={2}>
            <Showcase
              title="Basic usage"
              description="Initials, image with fallback, custom color, and missing name."
              code={CODE.basic}
              language="tsx"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Avatar name="Juan dela Cruz" />
                <Avatar name="Jose Reyes" color="#0369A1" />
                <Avatar />
              </div>
            </Showcase>
            <Showcase
              title="Avatar stack"
              description="Overlapping group with overflow count."
              code={CODE.stack}
              language="tsx"
            >
              <AvatarStack names={DEMO_NAMES as (string | undefined)[]} max={4} />
            </Showcase>
          </ShowcaseGrid>
          <Showcase
            title="Image with initials fallback"
            description="If the src fails to load, Avatar automatically shows initials. No extra error handling needed."
            code={CODE.imgFallback}
            language="tsx"
            tone="white"
          >
            <ImageFallbackDemo />
          </Showcase>
        </GallerySection>

        {/* ── 5. Accessibility ──────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {[
              ['Semantics', [
                'Both the image and initials paths render with role="img".',
                'When rendering an <img>, alt={name} is used as the accessible name.',
                'When rendering initials, aria-label={name} provides the accessible name on the container div.',
                'If name is absent, "Unknown" is used as the fallback accessible label.',
              ]],
              ['Decorative avatars', [
                'If the avatar is purely decorative (the name appears nearby as text), pass aria-label="" or use aria-hidden="true" on a wrapper to avoid redundant announcements.',
              ]],
              ['Color alone', [
                'Avatar background colors are decorative — they differentiate individuals visually but carry no semantic meaning.',
                'The accessible name (initials + aria-label / alt) is always text, never color.',
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

        {/* ── 6. API ────────────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'name',      type: 'string',               description: 'Display name — used for initials and aria-label. undefined or empty → "?".' },
            { name: 'src',       type: 'string | null',        description: 'Optional image source. Falls back to initials when absent or on load error.' },
            { name: 'size',      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size preset. xs=24px, sm=32px, md=40px, lg=48px, xl=64px.' },
            { name: 'color',     type: 'string',               description: 'Background color for initials fallback. Overrides the deterministic color from name.' },
            { name: 'className', type: 'string',               description: 'Additional class on the root element. Use for ring, shadow, or positioning.' },
          ]} />

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 space-y-2">
            <p className="text-sm font-semibold text-slate-700">Deterministic color</p>
            <p className="text-sm text-slate-500">
              When <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">color</code> is not provided,
              the background is derived deterministically from <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">name</code> using
              a hash over a 9-color palette. The same name always produces the same color — safe for server-side rendering and pagination.
            </p>
          </div>
        </GallerySection>

        {/* ── 7. Related ────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
