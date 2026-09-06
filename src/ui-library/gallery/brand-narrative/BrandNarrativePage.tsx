/**
 * BrandNarrativePage — Gallery (Foundations)
 *
 * Content source: DIWA Brand Identity, Expressions & Design Guidelines (Version 2019)
 * Design: DESIGN.md — brand navy #00377B, white surfaces.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';
import { ArrowRight } from 'lucide-react';

const RELATED = getRelatedComponents(['brand-strategy', 'voice-tone', 'writing-examples', 'logo', 'colors']);

function PillarCard({ label, sublabel, items, footer }: {
  label: string;
  sublabel: string;
  items: string[];
  footer: string;
}) {
  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="bg-[#00377B] px-5 py-4">
        <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.18em] mb-1">{sublabel}</p>
        <h3 className="text-sm font-black text-white uppercase tracking-wide">{label}</h3>
      </div>
      <ul className="flex-1 divide-y divide-slate-100 px-5 py-2">
        {items.map(item => (
          <li key={item} className="py-2.5 text-sm text-slate-700 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
      <div className="bg-slate-50 border-t border-slate-100 px-5 py-3">
        <p className="text-[10px] text-slate-400 italic leading-relaxed">{footer}</p>
      </div>
    </div>
  );
}

export default function BrandNarrativePage() {
  return (
    <GalleryLayout activeId="brand-narrative">
      <title>Brand Narrative — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Foundations"
          name="Brand Narrative"
          description="How the DIWA brand expresses itself — Character & Persona, Tone & Manner, Look & Feel, and the Creative Evolution framework. Source: DIWA Brand Identity, Expressions & Design Guidelines (Version 2019, CMC)."
          status="complete"
          importName={false}
        />

        {/* ── Brand Expression ─────────────────────────────────────────── */}
        <GallerySection id="expression" title="Brand Expression"
          description="Building an experience through the brand's Character, Tone & Manner, and Look & Feel.">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <p className="text-[10px] font-black text-[#00377B] uppercase tracking-[0.18em] mb-3">Brand Expression Framework</p>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Building a consistent brand experience across every touchpoint requires alignment across three dimensions: who we are (Character & Persona), how we speak (Tone & Manner), and how we look (Look & Feel). All three must be consistent in every communication output.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-5">
              {[
                { label: 'Character & Persona', desc: 'The human qualities and emotional connection of the brand' },
                { label: 'Tone & Manner',       desc: 'How the brand speaks and conducts itself' },
                { label: 'Look & Feel',         desc: 'How the brand radiates its identity visually' },
              ].map((item, i) => (
                <div key={item.label} className="flex items-start gap-2">
                  <span className="mt-1 text-[11px] font-black text-[#2D8ACA] flex-shrink-0">0{i + 1}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.label}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GallerySection>

        {/* ── Three Pillars ─────────────────────────────────────────────── */}
        <GallerySection id="pillars" title="The Three Pillars"
          description="Each pillar defines a different dimension of how DIWA presents itself.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <PillarCard
              label="Character & Persona"
              sublabel="The human qualities, emotional connection, and perception"
              items={[
                'Excellence is our way of life.',
                'We live by Planning, Frugality, Hard Work, Competence, Commitment, and Consistency; Mental Tenacity and Individual Integrity.',
                'We work with purpose and function as a team.',
                'We are dedicated, sincere, honest, and open to new ideas.',
                'We are socially aware and contribute to nation building through education.',
                'We build lasting relationships with all our stakeholders.',
              ]}
              footer="Applies to all brand communication medium — the overall character, emotional condition, and perception it portrays."
            />
            <PillarCard
              label="Tone & Manner"
              sublabel="How the brand speaks and conducts itself"
              items={[
                'We speak with strong conviction in a warm and respectable manner.',
                'We speak to empower, elevate, and encourage.',
                'We always radiate positive attitude and tone.',
                'We demonstrate brilliance and expertise in the performance of our duties.',
                'We exude a high-level of professionalism at all times.',
                'We communicate with simplicity and confidence — never arrogance.',
                'We manifest proficiency, accuracy, and excellence at all times.',
              ]}
              footer="Applies to all copy and messaging, including how we speak to and behave in front of our stakeholders."
            />
            <PillarCard
              label="Look & Feel"
              sublabel="How the brand radiates its character and identity visually"
              items={[
                'Exudes excellence, integrity, and credibility.',
                'Structured, clean, and direct.',
                'Keeps everything simple but not generic.',
                'Use of strong, relevant, and smart imageries.',
                'Brilliance, expertise, wit, and professionalism across all media.',
                'Professionally crafted.',
                'Reflects the overall character, persona, tone, and manner.',
              ]}
              footer="Our copy and visual languages are equal partners. Look and feel must maintain consistency across all communication outputs."
            />
          </div>
        </GallerySection>

        {/* ── Visual Communications ─────────────────────────────────────── */}
        <GallerySection id="visual" title="Brand Identity & Visual Communications"
          description="Unifying how we express our brand across channels.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <p className="text-[10px] font-black text-[#00377B] uppercase tracking-[0.18em] mb-3">Purpose</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                By unifying and regulating how we express our brand and identity through different channels and media, we can communicate our purpose and show what we stand for as we continue to create strong and lasting relationships with our stakeholders.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <div>
                <p className="text-[10px] font-black text-[#00377B] uppercase tracking-[0.18em] mb-2">For Strict Compliance</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Each employee is expected to uphold the integrity of the company's brand mark. Consult with Corporate and Marketing Communications (CMC) for inquiries regarding proper logo usage.
                </p>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-lg px-4 py-3">
                <p className="text-sm font-bold text-rose-800">
                  Do not replicate the brand mark. Request official logo files and formats from CMC.
                </p>
              </div>
            </div>
          </div>
        </GallerySection>

        {/* ── Creative Evolution ────────────────────────────────────────── */}
        <GallerySection id="creative-evolution" title="Creative Evolution"
          description="A checklist to achieve consistent and uniform branding across all creative outputs.">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-[#00377B] px-6 py-4">
              <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.18em] mb-1">Creative Evolution Checklist</p>
              <p className="text-sm text-white/90 leading-relaxed max-w-2xl">
                This is our ideal evolutionary flow, a guide to how we should develop our creative outputs and messaging. Always use this checklist to achieve consistent and uniform branding.
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { number: '01', label: 'Purpose',       question: 'Does it serve our purpose and what we stand for?' },
                  { number: '02', label: 'Roots',         question: 'Does it reflect who we are and our core messaging?' },
                  { number: '03', label: 'Expression',    question: 'Does it follow our character, manner, and look & feel?' },
                  { number: '04', label: 'Correct Usage', question: 'Does it adhere to our branding guidelines?' },
                ].map((step, i, arr) => (
                  <div key={step.number} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full border-2 border-[#00377B] flex items-center justify-center">
                        <span className="text-[11px] font-black text-[#00377B]">{step.number}</span>
                      </div>
                    </div>
                    <div className="pt-1 flex-1">
                      <p className="text-sm font-black text-slate-900 uppercase tracking-wide mb-0.5">{step.label}</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{step.question}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight size={16} className="text-slate-300 mt-2.5 flex-shrink-0 hidden lg:block" />
                    )}
                  </div>
                ))}
              </div>
              {/* Output */}
              <div className="flex items-center gap-3 bg-[#EEF3FB] border border-[#C7D8F0] rounded-xl px-5 py-4">
                <ArrowRight size={16} className="text-[#00377B] flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-black text-[#00377B] uppercase tracking-[0.18em] mb-0.5">Output</p>
                  <p className="text-sm font-bold text-[#00377B]">Creative Output · Communication Materials · Ads & Campaigns</p>
                </div>
              </div>
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
