/**
 * PafTemplate — self-contained preview component
 *
 * Ported from unified-hris/components/PAFTemplate.tsx.
 * All context deps removed. Data passed via props.
 */

interface PafSalaryComponent {
  label: string;
  from: string;
  to: string;
}

export interface PafPreviewData {
  id: string;
  type: string;
  date: string;
  effectiveDate?: string;
  fromTemplate?: string;
  toTemplate?: string;
  employee: {
    name: string;
    idNo: string;
    position: string;
    department: string;
    dateHired?: string;
  };
  from: {
    rank: string;
    status: string;
    position: string;
    department: string;
    company: string;
    supervisor: string;
    departmentHead: string;
    basicSalary: string;
  };
  to: {
    rank: string;
    status: string;
    position: string;
    department: string;
    company: string;
    supervisor: string;
    departmentHead: string;
    basicSalary: string;
  };
  reason: string;
  preparedBy: string;
  preparedByTitle?: string;
  approvedBy?: string;
  approvedByTitle?: string;
  salaryComponents?: PafSalaryComponent[];
}

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
const fmtDate = (v?: string) => {
  if (!v?.trim()) return '';
  const n = /^\d{4}-\d{2}-\d{2}$/.test(v.trim()) ? `${v.trim()}T00:00:00` : v.trim();
  const d = new Date(n);
  return isNaN(d.getTime()) ? v : fmt.format(d);
};

const STANDARD_LABELS = ['Basic Salary', 'Cola', 'Trasa', 'Trarep', 'Communication', 'Car', 'Motor', 'Others'];

interface Props { data: PafPreviewData }

export function PafTemplate({ data }: Props) {
  const allComponents: PafSalaryComponent[] = STANDARD_LABELS.map(label => {
    const found = data.salaryComponents?.find(c => c.label.toLowerCase() === label.toLowerCase());
    if (found) return found;
    if (label === 'Basic Salary') return { label, from: data.from.basicSalary, to: data.to.basicSalary };
    return { label, from: '', to: '' };
  });

  const shownComponents = allComponents.filter(c => {
    if (c.label === 'Basic Salary') return true;
    const hasFrom = c.from && parseFloat(c.from.replace(/,/g, '')) !== 0;
    const hasTo = c.to && parseFloat(c.to.replace(/,/g, '')) !== 0;
    return hasFrom || hasTo;
  });

  const minRows = 7;
  const paddingRows = Array.from({ length: Math.max(0, minRows - shownComponents.length) });

  const calcTotal = (type: 'from' | 'to') => {
    const t = allComponents.reduce((acc, c) => {
      const v = parseFloat((type === 'from' ? c.from : c.to).replace(/,/g, ''));
      return acc + (isNaN(v) ? 0 : v);
    }, 0);
    return t === 0 ? '' : t.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div
      className="bg-white text-black font-sans"
      style={{ width: '816px', minHeight: '1056px', padding: '60px 50px', boxSizing: 'border-box' }}
    >
      <h1 className="text-center italic font-bold text-2xl tracking-widest mb-8 uppercase">
        Personnel Action Form
      </h1>

      {/* Employee Data */}
      <div className="mb-6">
        <h2 className="text-sm font-bold italic border-b border-black mb-2 uppercase tracking-tight">Employee Data</h2>
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-8 space-y-2">
            {[
              { label: 'Employee ID:', value: data.employee.idNo },
              { label: 'Employee Name:', value: data.employee.name.toUpperCase() },
            ].map((r, i) => (
              <div key={i} className="flex items-center">
                <span className="w-32 text-[11px] font-bold italic">{r.label}</span>
                <div className="flex-1 border border-black px-2 py-0.5 text-[12px] min-h-[24px] font-semibold">{r.value}</div>
              </div>
            ))}
          </div>
          <div className="col-span-4 space-y-2">
            {[
              { label: 'Date Hired:', value: fmtDate(data.employee.dateHired) || 'Jan 01, 2024' },
              { label: 'Date Prepared:', value: fmtDate(data.date) },
            ].map((r, i) => (
              <div key={i} className="flex items-center">
                <span className="w-24 text-[11px] font-bold italic">{r.label}</span>
                <div className="flex-1 border border-black px-2 py-0.5 text-[12px] min-h-[24px] text-center">{r.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Position / Salary Change Details */}
      <div className="mb-6">
        <h2 className="text-sm font-bold italic border-b border-black mb-2 uppercase tracking-tight">Position/Salary Change Details</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-[124px]"><span className="sr-only">Field</span></th>
              <th className="text-[12px] italic font-bold text-center pb-1">FROM</th>
              <th className="text-[12px] italic font-bold text-center pb-1">TO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-[10px] italic font-bold py-1">Pay Template</td>
              <td className="border border-black p-1 text-[11px] font-bold w-[300px]">
                <div className="px-1 min-h-[16px]">{data.fromTemplate || '—'}</div>
              </td>
              <td className="border border-black p-1 text-[11px] font-bold w-[300px]">
                <div className="px-1 min-h-[16px]">{data.toTemplate || '—'}</div>
              </td>
            </tr>
            {[
              { label: 'Rank', from: data.from.rank, to: data.to.rank },
              { label: 'Employment Status', from: data.from.status, to: data.to.status },
              { label: 'Position', from: data.from.position, to: data.to.position },
              { label: 'Department', from: data.from.department, to: data.to.department },
              { label: 'Supervisor', from: data.from.supervisor, to: data.to.supervisor },
              { label: 'Department Head', from: data.from.departmentHead, to: data.to.departmentHead },
              { label: 'Company', from: data.from.company, to: data.to.company },
            ].map((row, i) => (
              <tr key={i}>
                <td className="text-[10px] italic font-bold py-1">{row.label}</td>
                <td className="border border-black p-1 text-[11px] w-[300px]">
                  <div className="px-1 min-h-[16px]">{row.from}</div>
                </td>
                <td className="border border-black p-1 text-[11px] w-[300px]">
                  <div className="px-1 min-h-[16px]">{row.to}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reason for Adjustment */}
      <div className="mb-6">
        <h2 className="text-sm font-bold italic border-b border-black mb-2 uppercase tracking-tight">Reason for Adjustment</h2>
        <div className="flex mb-2">
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <span className="text-[10px] italic font-bold w-32">Date of Effectivity:</span>
              <span className="text-[11px] font-bold">{fmtDate(data.effectiveDate)}</span>
            </div>
            <div className="text-[10px] italic font-bold mb-1">Reason for Adjustment:</div>
            <div className="flex items-start ml-4">
              <span className="text-[10px] italic mt-1">Others</span>
            </div>
          </div>
          <div className="w-[450px]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-1/3"><span className="sr-only">Component</span></th>
                  <th className="text-[11px] italic font-bold text-center border-x border-t border-black py-1">FROM</th>
                  <th className="text-[11px] italic font-bold text-center border-r border-t border-black py-1">TO</th>
                </tr>
              </thead>
              <tbody className="border-b border-black">
                <tr>
                  <td className="text-[10px] italic pr-4 text-right font-bold uppercase">Template</td>
                  <td className="border-x border-black px-2 py-0.5 text-[9px] text-center font-bold">{data.fromTemplate || '—'}</td>
                  <td className="border-r border-black px-2 py-0.5 text-[9px] text-center font-bold">{data.toTemplate || '—'}</td>
                </tr>
                {shownComponents.map((c, i) => (
                  <tr key={i}>
                    <td className="text-[10px] italic pr-4 text-right font-bold">{c.label}</td>
                    <td className="border-x border-black px-2 py-0.5 text-[11px] text-right min-h-[18px]">
                      {c.from && parseFloat(c.from.replace(/,/g, '')) !== 0 ? c.from : ''}
                    </td>
                    <td className="border-r border-black px-2 py-0.5 text-[11px] text-right min-h-[18px]">
                      {c.to && parseFloat(c.to.replace(/,/g, '')) !== 0 ? c.to : ''}
                    </td>
                  </tr>
                ))}
                {paddingRows.map((_, i) => (
                  <tr key={`p-${i}`}>
                    <td className="text-[10px] py-1">&nbsp;</td>
                    <td className="border-x border-black">&nbsp;</td>
                    <td className="border-r border-black">&nbsp;</td>
                  </tr>
                ))}
                <tr className="border-t border-black">
                  <td className="text-[10px] italic pr-4 text-right font-bold uppercase py-1">Total</td>
                  <td className="border-x border-black px-2 py-1 text-[11px] text-right font-bold">
                    <div className="border-b-4 border-double border-black pb-0.5">{calcTotal('from')}</div>
                  </td>
                  <td className="border-r border-black px-2 py-1 text-[11px] text-right font-bold">
                    <div className="border-b-4 border-double border-black pb-0.5">{calcTotal('to')}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reason for Change */}
      <div className="mb-8">
        <h2 className="text-sm font-bold italic border-b border-black mb-2 uppercase tracking-tight">Reason for Change</h2>
        <div className="border border-black p-2 min-h-[60px] text-[11px] break-words whitespace-pre-wrap">{data.reason}</div>
      </div>

      {/* Signatures */}
      <div className="mt-10">
        <h2 className="text-sm font-bold italic border-b border-black mb-4 uppercase tracking-tight">Authorized Signatories</h2>
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { heading: 'Prepared By', name: data.preparedBy, title: data.preparedByTitle || 'HRMD Supervisor' },
            { heading: 'Verified By', name: data.approvedBy || 'VP of HRMD', title: data.approvedByTitle || 'Vice President for HRMD' },
            { heading: 'Conforme', name: data.employee.name, title: 'Employee' },
          ].map((sig, i) => (
            <div key={i} className="flex flex-col">
              <h3 className="text-[11px] italic font-bold mb-3">{sig.heading}</h3>
              <div className="border-b border-black min-h-[48px] mb-1" />
              <div className="text-center">
                <div className="text-[10px] font-bold uppercase">{sig.name}</div>
                <div className="text-[9px] font-bold text-slate-400">{sig.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t-2 border-dashed border-black pt-2 opacity-30 text-center">
        <span className="text-[7px] font-black uppercase tracking-[0.2em] italic">
          Authorized Document — DIWA HRIS
        </span>
      </div>
    </div>
  );
}
