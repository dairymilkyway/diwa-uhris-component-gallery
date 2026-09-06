/**
 * BrandStrategyPage — Gallery (Foundations)
 *
 * Content: DIWA Brand Identity, Expressions & Design Guidelines (Version 2019, CMC)
 * Architecture: GalleryComponentHeader → sections → each wrapped in ShowcasePreview (no code blocks)
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['brand-narrative', 'voice-tone', 'writing-examples', 'logo', 'colors']);

// ── Card primitives ───────────────────────────────────────────────────────────

function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <p className="text-[10px] font-black text-[#00377B] uppercase tracking-[0.18em] mb-3">{label}</p>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map(item => (
        <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
          <span className="mt-2 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[#2D8ACA]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BrandStrategyPage() {
  return (
    <GalleryLayout activeId="brand-strategy">
      <title>Brand Strategy — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Foundations"
          name="Brand Strategy"
          description="DIWA's brand roots — who we are, what we believe, and what drives every product decision. Read this before writing any product copy or making design decisions for UHRIS."
          status="complete"
          importName={false}
        />

        {/* ── Overview ──────────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="The six pillars of DIWA's brand strategy at a glance."
        >
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {[
                { label: 'Company Overview', desc: 'Who we are and what we do'     },
                { label: 'Vision',           desc: 'Where we want to go'           },
                { label: 'Mission',          desc: 'Why we exist'                  },
                { label: 'Corporate Values', desc: '6 values that guide every act' },
                { label: 'Quality Policy',   desc: 'ZD + OTD — non-negotiable'     },
                { label: 'Brand Promise',    desc: 'What we commit to stakeholders'},
              ].map(item => (
                <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <p className="text-xs font-black text-[#00377B] mb-1">{item.label}</p>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Company Overview ─────────────────────────────────────────── */}
        <GallerySection
          id="company-overview"
          title="Company Overview"
          description="Who we are and the organizational context behind DIWA."
        >
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <InfoCard label="Who We Are">
                <p className="text-sm font-bold text-slate-900 leading-relaxed mb-3">
                  Diwa Learning Systems Inc is the Philippines' leading provider of print and digital educational resources for basic education.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  As the country's only ISO-certified educational publisher, Diwa relentlessly pursues its goal to equip 21st educators with resources that will elevate the students' learning experiences, and empower school leaders to become advocates of innovation.
                </p>
              </InfoCard>
              <InfoCard label="Organizational Context">
                <div className="space-y-0">
                  {[
                    { label: 'Parent Company',  value: 'First Asia Venture Capital (FAVC)'    },
                    { label: 'Core Values',     value: 'Competence · Commitment · Consistency'},
                    { label: 'Social Arm',      value: 'Bato Balani Foundation Inc.'          },
                    { label: 'Certification',   value: 'ISO-Certified Educational Publisher'  },
                    { label: 'Focus',           value: 'K-to-12 Print & Digital Resources'    },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-start gap-4 py-3 border-b border-slate-100 last:border-0">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex-shrink-0">{row.label}</span>
                      <span className="text-sm font-semibold text-slate-800 text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </InfoCard>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Vision ───────────────────────────────────────────────────── */}
        <GallerySection
          id="vision"
          title="Our Vision"
          description="Four aspirations that define where DIWA is headed."
        >
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="w-full">
              <InfoCard label="Vision">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  With our exceptional 21st century-ready learning resources and excellent service present in all parts of the country, we pursue various opportunities that will help us:
                </p>
                <BulletList items={[
                  'Become the publishing group at the leading edge of the industry',
                  'Develop new forms of media and explore new markets',
                  'Establish alliance with like-minded companies in the pursuit of its objectives',
                  'Create superior value for its customers, shareholders, and staff',
                ]} />
              </InfoCard>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Mission ──────────────────────────────────────────────────── */}
        <GallerySection
          id="mission"
          title="Our Mission"
          description="The mission statement that drives the tone of all UHRIS product copy."
        >
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="w-full">
              <InfoCard label="Mission">
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  Since 1983, we have rapidly grown to become the multi-awarded publishing powerhouse that we are today. The growing number of teachers, students, and parents that have placed their trust on us is a testament that we are living up to our mission:
                </p>
                <div className="border-l-4 border-[#00377B] pl-5 py-1">
                  <p className="text-base font-bold text-[#00377B] leading-relaxed">
                    To achieve a position of leadership in upgrading the quality of education of our people throughout the Philippines.
                  </p>
                </div>
              </InfoCard>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Corporate Values ─────────────────────────────────────────── */}
        <GallerySection
          id="values"
          title="Corporate Values"
          description="Six values that show up in every copy decision. When in doubt about tone, check if it aligns with these."
        >
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b-2 border-[#00377B] bg-[#00377B]">
                <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.18em]">Corporate Values</p>
              </div>
              <div className="divide-y divide-slate-100 px-6">
                {[
                  { label: 'Planning',    desc: 'We anticipate challenges and opportunities to achieve our desired result.' },
                  { label: 'Frugality',   desc: 'We avoid unnecessary expenditure, either of money or of material resources. We deliberately avoid waste.' },
                  { label: 'Hard Work',   desc: 'We solve problems. We face challenges. We do the work, the best way we know how. Hard work always works.' },
                  { label: 'Competence',  desc: 'We are physically and intellectually qualified to contribute to the attainment of the corporate objectives.' },
                  { label: 'Commitment',  desc: 'We are intellectually and emotionally bonded to every course of action that we take.' },
                  { label: 'Consistency', desc: 'We do the right thing right, all the time.' },
                ].map(v => (
                  <div key={v.label} className="flex items-start gap-4 py-4">
                    <div className="w-2 h-2 mt-2 flex-shrink-0 rounded-full bg-[#00377B]" />
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-wide mb-0.5">{v.label}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Quality Policy ────────────────────────────────────────────── */}
        <GallerySection
          id="quality"
          title="Quality Policy"
          description="Zero Defect and On Time Delivery are the two non-negotiable standards for every DIWA product and service."
        >
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              <InfoCard label="Quality In Diwa Is">
                <BulletList items={[
                  'An essential attribute to lasting corporate success and excellence',
                  'A constant norm in all aspects of operations',
                  'A way of life everyone must uphold',
                ]} />
              </InfoCard>
              <InfoCard label="Corporate Belief">
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  Quality is the conformance of our products and services that we and our customers require as a matter of course.
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-[#00377B]">Zero Defect (ZD)</strong> and <strong className="text-[#00377B]">On Time Delivery (OTD)</strong> are basic standards for all products and services.
                </p>
              </InfoCard>
              <InfoCard label="We Dedicate Ourselves To">
                <BulletList items={[
                  'Do things right, the first time, every time',
                  'Eliminate the cost of wastes',
                  'Create a work environment based on sincerity, honesty, team effort and open-mindedness',
                ]} />
              </InfoCard>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Brand Promise ─────────────────────────────────────────────── */}
        <GallerySection
          id="promise"
          title="Brand Promise"
          description="The one commitment DIWA makes to every school, teacher, and student."
        >
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="w-full">
              <InfoCard label="Brand Promise">
                <p className="text-base font-bold text-slate-900 leading-relaxed mb-6 max-w-3xl">
                  We at Diwa Learning Systems Inc. believe that education is the key to a better nation. This is why we continue to provide top-of-the-line print and digital K-to-12 educational resources to schools all over the Philippines.
                </p>
                <div className="border-t border-slate-100 pt-5">
                  <p className="text-[10px] font-black text-[#00377B] uppercase tracking-[0.18em] mb-2">Tagline</p>
                  <p className="text-xl font-black text-[#00377B] tracking-tight leading-snug">
                    We Move the Nation Forward Through Education.
                  </p>
                </div>
              </InfoCard>
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="related" title="Related">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
