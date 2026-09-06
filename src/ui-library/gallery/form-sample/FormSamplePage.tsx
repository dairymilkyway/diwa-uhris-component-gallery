/**
 * FormSamplePage — Gallery (Layout)
 *
 * Full HRIS employee profile form — white background, PageHeader,
 * stacked section cards with brand-navy left strip, two-column field grid,
 * and a simple Cancel / Save footer.
 *
 * Architecture: ButtonPage pattern
 *   Header → Overview (visual only) → Sections (each = Showcase) → Accessibility → Related
 */

import { useState } from 'react';
import {
  User,
  Briefcase,
  DollarSign,
  HeartHandshake,
  Save,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['field', 'page-sample', 'wizard-layout', 'banner']);

// ── Types ──────────────────────────────────────────────────────────────────

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  position?: string;
  department?: string;
  emergencyName?: string;
  emergencyPhone?: string;
}

// ── Inline form primitives (demo-only) ────────────────────────────────────

function FormField({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-brand-blue" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs font-medium text-rose-600" role="alert">
          <AlertCircle size={11} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

function TextInput({ placeholder, value, onChange, type = 'text', hasError }: {
  placeholder?: string; value: string; onChange: (v: string) => void;
  type?: string; hasError?: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={[
        'w-full rounded-xl border px-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-white',
        'transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue',
        hasError ? 'border-rose-300 bg-rose-50/40' : 'border-slate-200 hover:border-slate-300',
      ].join(' ')}
    />
  );
}

function SelectInput({ options, value, onChange, placeholder }: {
  options: string[]; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:border-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue"
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ── Section card ───────────────────────────────────────────────────────────

function SectionCard({ title, icon: Icon, children }: {
  title: string; icon: React.ElementType; children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="absolute inset-y-0 left-0 w-1 bg-brand-navy" aria-hidden="true" />
      <div className="px-7 py-6">
        <div className="mb-5 flex items-center gap-2">
          <Icon size={16} className="text-brand-sky" aria-hidden="true" />
          <h3 className="font-heading text-base font-bold text-slate-900">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Full form demo (overview) ──────────────────────────────────────────────

function FullFormDemo() {
  const [submitted, setSubmitted]     = useState(false);
  const [errors, setErrors]           = useState<FormErrors>({});
  const [firstName, setFirstName]     = useState('');
  const [lastName, setLastName]       = useState('');
  const [email, setEmail]             = useState('');
  const [phone, setPhone]             = useState('');
  const [birthdate, setBirthdate]     = useState('');
  const [position, setPosition]       = useState('');
  const [department, setDepartment]   = useState('');
  const [empType, setEmpType]         = useState('');
  const [startDate, setStartDate]     = useState('');
  const [grade, setGrade]             = useState('');
  const [salary, setSalary]           = useState('');
  const [payFreq, setPayFreq]         = useState('');
  const [emergencyName, setEmergencyName]   = useState('');
  const [emergencyRel, setEmergencyRel]     = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!firstName)  errs.firstName  = 'Required';
    if (!lastName)   errs.lastName   = 'Required';
    if (!email)      errs.email      = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email';
    if (!position)   errs.position   = 'Required';
    if (!department) errs.department = 'Required';
    if (!emergencyName)  errs.emergencyName  = 'Required';
    if (!emergencyPhone) errs.emergencyPhone = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleReset() {
    setSubmitted(false); setErrors({});
    setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setBirthdate('');
    setPosition(''); setDepartment(''); setEmpType(''); setStartDate('');
    setGrade(''); setSalary(''); setPayFreq('');
    setEmergencyName(''); setEmergencyRel(''); setEmergencyPhone('');
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/50">
          <CheckCircle2 size={32} className="text-emerald-500" aria-hidden="true" />
        </div>
        <h3 className="font-heading text-xl font-bold text-slate-900">Profile Saved</h3>
        <p className="mt-2 max-w-sm text-sm font-medium text-slate-500">
          The employee profile has been submitted successfully.
        </p>
        <button type="button" onClick={handleReset}
          className="mt-6 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
          Reset Demo
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Section 1 — Personal Information */}
      <SectionCard title="Personal Information" icon={User}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="First Name" required error={errors.firstName}>
            <TextInput placeholder="e.g. Maria" value={firstName} onChange={setFirstName} hasError={!!errors.firstName} />
          </FormField>
          <FormField label="Last Name" required error={errors.lastName}>
            <TextInput placeholder="e.g. Santos" value={lastName} onChange={setLastName} hasError={!!errors.lastName} />
          </FormField>
          <FormField label="Work Email" required error={errors.email}>
            <TextInput type="email" placeholder="maria.santos@diwa.edu.ph" value={email} onChange={setEmail} hasError={!!errors.email} />
          </FormField>
          <FormField label="Mobile Number">
            <TextInput type="tel" placeholder="+63 912 345 6789" value={phone} onChange={setPhone} />
          </FormField>
          <FormField label="Date of Birth">
            <TextInput type="date" value={birthdate} onChange={setBirthdate} />
          </FormField>
        </div>
      </SectionCard>

      {/* Section 2 — Employment Details */}
      <SectionCard title="Employment Details" icon={Briefcase}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Position Title" required error={errors.position}>
            <TextInput placeholder="e.g. Senior Accountant" value={position} onChange={setPosition} hasError={!!errors.position} />
          </FormField>
          <FormField label="Department" required error={errors.department}>
            <SelectInput placeholder="Select department" value={department} onChange={setDepartment}
              options={['Finance & Accounting','Human Resources','Information Technology','Operations','Academic Affairs','Legal & Compliance']} />
          </FormField>
          <FormField label="Employment Type">
            <SelectInput placeholder="Select type" value={empType} onChange={setEmpType}
              options={['Regular','Contractual','Part-time','Probationary','Project-based']} />
          </FormField>
          <FormField label="Start Date">
            <TextInput type="date" value={startDate} onChange={setStartDate} />
          </FormField>
        </div>
      </SectionCard>

      {/* Section 3 — Compensation */}
      <SectionCard title="Compensation" icon={DollarSign}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Pay Grade">
            <SelectInput placeholder="Select grade" value={grade} onChange={setGrade}
              options={['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6']} />
          </FormField>
          <FormField label="Basic Salary (PHP)">
            <TextInput type="number" placeholder="e.g. 35000" value={salary} onChange={setSalary} />
          </FormField>
          <FormField label="Pay Frequency">
            <SelectInput placeholder="Select frequency" value={payFreq} onChange={setPayFreq}
              options={['Semi-monthly','Monthly','Bi-weekly','Weekly']} />
          </FormField>
        </div>
        <div className="mt-5 rounded-xl border border-brand-sky/30 bg-brand-sky/5 px-4 py-3">
          <p className="text-xs font-semibold text-brand-blue">
            Compensation details are visible only to HR administrators and payroll officers.
          </p>
        </div>
      </SectionCard>

      {/* Section 4 — Emergency Contact */}
      <SectionCard title="Emergency Contact" icon={HeartHandshake}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Contact Name" required error={errors.emergencyName}>
            <TextInput placeholder="e.g. Jose Santos" value={emergencyName} onChange={setEmergencyName} hasError={!!errors.emergencyName} />
          </FormField>
          <FormField label="Relationship">
            <SelectInput placeholder="Select relationship" value={emergencyRel} onChange={setEmergencyRel}
              options={['Spouse','Parent','Sibling','Child','Relative','Friend']} />
          </FormField>
          <FormField label="Contact Phone" required error={errors.emergencyPhone}>
            <TextInput type="tel" placeholder="+63 912 345 6789" value={emergencyPhone} onChange={setEmergencyPhone} hasError={!!errors.emergencyPhone} />
          </FormField>
        </div>
      </SectionCard>

      {/* Action footer */}
      <div className="flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        <button type="button" onClick={handleReset}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
          Cancel
        </button>
        <button type="button" onClick={() => { if (validate()) setSubmitted(true); }}
          className="flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
          <Save size={15} aria-hidden="true" /> Save Profile
        </button>
      </div>
    </div>
  );
}

// ── Isolated section demos ─────────────────────────────────────────────────

function SectionCardDemo() {
  return (
    <SectionCard title="Personal Information" icon={User}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="First Name" required>
          <TextInput placeholder="e.g. Maria"  value="" onChange={() => {}} />
        </FormField>
        <FormField label="Last Name" required>
          <TextInput placeholder="e.g. Santos" value="" onChange={() => {}} />
        </FormField>
        <FormField label="Work Email" required>
          <TextInput type="email" placeholder="maria.santos@diwa.edu.ph" value="" onChange={() => {}} />
        </FormField>
        <FormField label="Mobile Number">
          <TextInput type="tel" placeholder="+63 912 345 6789" value="" onChange={() => {}} />
        </FormField>
      </div>
    </SectionCard>
  );
}

function FooterDemo() {
  return (
    <div className="flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm w-full">
      <button type="button"
        className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
        Cancel
      </button>
      <button type="button"
        className="flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
        <Save size={15} aria-hidden="true" /> Save Profile
      </button>
    </div>
  );
}

// ── Code strings ───────────────────────────────────────────────────────────

const CODE = {
  sectionCard: `// Section card — brand-navy left accent strip, brand-sky icon, font-heading title
// Repeat for each form section: Personal, Employment, Compensation, Emergency

<div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  {/* 4px brand-navy left strip */}
  <div className="absolute inset-y-0 left-0 w-1 bg-brand-navy" aria-hidden="true" />

  <div className="px-7 py-6">
    {/* Section header */}
    <div className="mb-5 flex items-center gap-2">
      <SectionIcon size={16} className="text-brand-sky" aria-hidden="true" />
      <h3 className="font-heading text-base font-bold text-slate-900">{title}</h3>
    </div>

    {/* Two-column responsive field grid */}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-slate-700">
          First Name <span className="text-brand-blue" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Maria"
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm
                     focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue"
        />
      </div>
      {/* more fields */}
    </div>
  </div>
</div>`,

  footer: `// Action footer — Cancel + Save Profile, right-aligned
// No Previous/Next — all sections are visible at once

<div className="flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4">
  <button type="button" onClick={handleCancel}
    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">
    Cancel
  </button>
  <button type="button" onClick={handleSubmit}
    className="flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-navy">
    <Save size={15} aria-hidden="true" /> Save Profile
  </button>
</div>`,

  layout: `// Full form page layout — space-y-6, all sections stacked
// Section cards → action footer (no PageHeader, no wizard nav)

<div className="space-y-6">
  <SectionCard title="Personal Information"  icon={User}          />
  <SectionCard title="Employment Details"    icon={Briefcase}     />
  <SectionCard title="Compensation"          icon={DollarSign}    />
  <SectionCard title="Emergency Contact"     icon={HeartHandshake}/>

  {/* Action footer — right-aligned Cancel + Save */}
  <div className="flex items-center justify-end gap-3 ...">
    <button>Cancel</button>
    <button><Save size={15} /> Save Profile</button>
  </div>
</div>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function FormSamplePage() {
  return (
    <GalleryLayout activeId="form-sample">
      <title>Form — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Layout"
          name="Form"
          description="A complete HRIS employee profile form — stacked section cards with brand-navy left accent strip, two-column field grid, and a simple Cancel / Save footer."
          status="complete"
          importName={false}
        />

        {/* ── Overview ──────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="The full form at a glance. Fill required fields and click Save Profile to trigger validation."
        >
          <ShowcasePreview standalone tone="light" center={false} minHeight="min-h-0">
            <div className="w-full">
              <FullFormDemo />
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Section Card ──────────────────────────────────────────── */}
        <GallerySection
          id="section-card"
          title="Section Card"
          description="brand-navy left accent strip, brand-sky icon, font-heading section title, two-column field grid inside."
        >
          <Showcase code={CODE.sectionCard} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <div className="w-full">
              <SectionCardDemo />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Action Footer ─────────────────────────────────────────── */}
        <GallerySection
          id="footer"
          title="Action Footer"
          description="Right-aligned Cancel and Save Profile. No step navigation — all sections are visible at once."
        >
          <Showcase code={CODE.footer} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <FooterDemo />
          </Showcase>
        </GallerySection>

        {/* ── Full Layout ───────────────────────────────────────────── */}
        <GallerySection
          id="layout"
          title="Full Layout"
          description="How the sections compose together — space-y-6 stack from PageHeader down to the action footer."
        >
          <Showcase code={CODE.layout} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <div className="w-full">
              <FullFormDemo />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Accessibility ─────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {([
              ['Form fields', [
                'Every input has a visible <label> element associated via htmlFor or wrapping.',
                'Required fields use the native required attribute — communicated to screen readers automatically.',
                'Validation errors use role="alert" — announced immediately on submission without moving focus.',
              ]],
              ['Section cards', [
                'Each section has an <h3> heading.',
                'The brand-navy left strip is decorative — aria-hidden="true".',
              ]],
              ['Action footer', [
                'Cancel and Save Profile both have descriptive text labels.',
                'Save Profile uses type="button" to prevent accidental form submission.',
              ]],
            ] as [string, string[]][]).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{heading}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GallerySection>

        {/* ── Related ───────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
