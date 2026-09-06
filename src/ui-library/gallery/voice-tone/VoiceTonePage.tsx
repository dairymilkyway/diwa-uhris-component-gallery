/**
 * VoiceTonePage — Gallery (Foundations)
 *
 * Content source: DIWA Brand Expression — Tone & Manner
 * Design: DESIGN.md — brand navy #00377B, white surfaces.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';
import { Check, X } from 'lucide-react';

const RELATED = getRelatedComponents(['brand-strategy', 'brand-narrative', 'writing-examples']);

export default function VoiceTonePage() {
  return (
    <GalleryLayout activeId="voice-tone">
      <title>Voice & Tone — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Foundations"
          name="Voice & Tone"
          description="How DIWA communicates. Writing principles derived from the Brand Expression Tone & Manner guidelines — applied to every word in UHRIS: button labels, form copy, error messages, and notifications."
          status="complete"
          importName={false}
        />

        {/* ── The DIWA Voice ────────────────────────────────────────────── */}
        <GallerySection id="voice" title="The DIWA Voice">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <p className="text-[10px] font-black text-[#00377B] uppercase tracking-[0.18em] mb-3">Voice Identity</p>
            <p className="text-base font-bold text-slate-900 leading-relaxed mb-5 border-l-4 border-[#00377B] pl-4">
              "We speak with strong conviction yet in a warm and respectable manner."
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-slate-100">
              {[
                { label: 'Warm',         desc: 'Never cold or transactional' },
                { label: 'Confident',    desc: 'Never arrogant or boastful'  },
                { label: 'Professional', desc: 'Never stiff or bureaucratic' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-sm font-black text-slate-900 mb-0.5">{item.label}</p>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </GallerySection>

        {/* ── Principles ────────────────────────────────────────────────── */}
        <GallerySection id="principles" title="Writing Principles"
          description="Eight principles from the Tone & Manner pillar, applied to UHRIS UI copy.">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {[
                { number: '01', label: 'Conviction with Warmth',   desc: 'Speak with clarity and certainty. Lead with what the user needs to know, not with hedges or qualifications.' },
                { number: '02', label: 'Empower and Elevate',      desc: 'Write to help users succeed. Every message — including errors — should leave the user knowing what to do next.' },
                { number: '03', label: 'Positive Tone',            desc: 'Lead with what users can do, not what they can\'t. Reframe restrictions as guidance.' },
                { number: '04', label: 'Demonstrate Expertise',    desc: 'Use correct HR terminology. Employees and managers trust the system when the language reflects their domain.' },
                { number: '05', label: 'High Professionalism',     desc: 'No slang, no emojis in serious contexts, no overly casual phrasing. Match official HR communication register.' },
                { number: '06', label: 'Simplicity and Confidence', desc: 'Short sentences. Active voice. No jargon unless the audience are specialists. One idea per message.' },
                { number: '07', label: 'Vibrancy, Not Arrogance',  desc: 'Express energy and confidence but stay grounded. Never condescend or lecture the reader.' },
                { number: '08', label: 'Accuracy and Excellence',  desc: 'Every word in UHRIS must be factually correct, grammatically sound, and consistent with HR terminology.' },
              ].map(p => (
                <div key={p.number} className="flex items-start gap-5 px-6 py-4">
                  <span className="text-[11px] font-black text-[#2D8ACA] w-6 flex-shrink-0 mt-0.5">{p.number}</span>
                  <div>
                    <p className="text-sm font-black text-slate-900 mb-0.5">{p.label}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GallerySection>

        {/* ── Tone Spectrum ─────────────────────────────────────────────── */}
        <GallerySection id="spectrum" title="Tone Spectrum"
          description="The DIWA voice is constant — tone shifts based on context.">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="space-y-5">
              {[
                { left: 'Warm',          leftDesc: 'Employee self-service',      right: 'Precise',  rightDesc: 'Compliance & policy',   pct: 35 },
                { left: 'Encouraging',   leftDesc: 'Onboarding, empty states',   right: 'Direct',   rightDesc: 'Errors, confirmations', pct: 40 },
                { left: 'Conversational',leftDesc: 'Notifications, tooltips',    right: 'Formal',   rightDesc: 'Documents, records',    pct: 30 },
              ].map(row => (
                <div key={row.left}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-black text-[#00377B]">{row.left}</span>
                      <span className="ml-2 text-[11px] text-slate-400">{row.leftDesc}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-500">{row.right}</span>
                      <span className="ml-2 text-[11px] text-slate-400">{row.rightDesc}</span>
                    </div>
                  </div>
                  <div className="relative h-1.5 bg-slate-100 rounded-full">
                    <div className="absolute left-0 top-0 h-full bg-[#034EA2] rounded-full" style={{ width: `${row.pct}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#00377B] rounded-full border-2 border-white shadow-sm" style={{ left: `calc(${row.pct}% - 6px)` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GallerySection>

        {/* ── Always / Never ────────────────────────────────────────────── */}
        <GallerySection id="rules" title="Always / Never">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#00377B] px-5 py-3">
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Always</p>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  'Use active voice — "Submit your request" not "Your request should be submitted"',
                  'Lead with the action or outcome the user cares about',
                  'Use correct HR terminology employees already know',
                  'Give the user a clear next step in every error message',
                  'Match formality to context — warmer for approvals, more direct for errors',
                  'Capitalize proper nouns: Leave Request, Personnel Action Form, Payslip',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 px-5 py-3">
                    <Check size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-700 px-5 py-3">
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Never</p>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  'Never use arrogance or condescension — even in rejection messages',
                  'Never blame the user — "Invalid input" not "You entered an invalid value"',
                  'Never use vague error messages like "Something went wrong"',
                  'Never use exclamation marks in serious or compliance content',
                  'Never truncate required policy information',
                  'Never use technical jargon without explanation on employee-facing screens',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 px-5 py-3">
                    <X size={14} className="text-rose-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GallerySection>

        {/* ── Tagline in Context ────────────────────────────────────────── */}
        <GallerySection id="tagline" title="Tagline in Context"
          description="How the brand tagline informs UHRIS copy strategy.">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <p className="text-[10px] font-black text-[#00377B] uppercase tracking-[0.18em] mb-3">Brand Tagline</p>
            <p className="text-xl font-black text-[#00377B] mb-5">
              We Move the Nation Forward Through Education.
            </p>
            <div className="border-t border-slate-100 pt-5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-2">What This Means for UHRIS</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Every word in UHRIS contributes to the larger purpose of enabling education. HR operations — leave requests, payroll, attendance — are the infrastructure that keeps educators in the field. UHRIS copy should be efficient, empowering, and respectful of the staff who move education forward.
              </p>
            </div>
          </div>
        </GallerySection>

        <GallerySection id="related" title="Related">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
