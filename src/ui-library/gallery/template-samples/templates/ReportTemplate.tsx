/**
 * ReportTemplate — self-contained preview component
 *
 * A generic HRIS Masterlist / Report document layout.
 * Mimics the tabular report format used in unified-hris reports.
 */

export interface ReportPreviewData {
  title?: string;
  subtitle?: string;
  asOf?: string;
  preparedBy?: string;
  company?: string;
}

const MOCK_ROWS = [
  { id: 'DL-0001', name: 'Maria Santos',     dept: 'Finance',    position: 'Senior Accountant',      status: 'Regular', dateHired: 'Jan 15, 2021', rate: '25,000.00' },
  { id: 'DL-0002', name: 'Jose Reyes',       dept: 'IT',         position: 'IT Infrastructure Lead', status: 'Regular', dateHired: 'Mar 08, 2020', rate: '38,000.00' },
  { id: 'DL-0003', name: 'Ana Dela Cruz',    dept: 'HR',         position: 'HR Business Partner',    status: 'Regular', dateHired: 'Jun 01, 2019', rate: '32,000.00' },
  { id: 'DL-0004', name: 'Carlo Mendoza',    dept: 'Operations', position: 'Operations Manager',     status: 'Regular', dateHired: 'Sep 22, 2022', rate: '45,000.00' },
  { id: 'DL-0005', name: 'Liza Bautista',    dept: 'Legal',      position: 'Legal Counsel',          status: 'Probationary', dateHired: 'Feb 10, 2024', rate: '28,000.00' },
  { id: 'DL-0006', name: 'Mark Villanueva',  dept: 'Academic',   position: 'Academic Coordinator',  status: 'Regular', dateHired: 'Nov 03, 2023', rate: '22,000.00' },
  { id: 'DL-0007', name: 'Rosa Castillo',    dept: 'Finance',    position: 'Bookkeeper',             status: 'Regular', dateHired: 'Apr 14, 2018', rate: '20,000.00' },
  { id: 'DL-0008', name: 'Noel Ramos',       dept: 'IT',         position: 'Systems Analyst',        status: 'Regular', dateHired: 'Jul 30, 2021', rate: '30,000.00' },
  { id: 'DL-0009', name: 'Cynthia Torres',   dept: 'HR',         position: 'Recruitment Officer',    status: 'Regular', dateHired: 'Dec 05, 2022', rate: '24,000.00' },
  { id: 'DL-0010', name: 'Ramon Aquino',     dept: 'Operations', position: 'Logistics Coordinator',  status: 'Probationary', dateHired: 'Aug 18, 2024', rate: '19,500.00' },
  { id: 'DL-0011', name: 'Elena Fuentes',    dept: 'Academic',   position: 'Faculty Member',         status: 'Regular', dateHired: 'Jun 12, 2017', rate: '27,000.00' },
  { id: 'DL-0012', name: 'Dennis Lacerna',   dept: 'Finance',    position: 'Payroll Officer',        status: 'Regular', dateHired: 'Oct 01, 2020', rate: '23,500.00' },
];

const HEADERS = ['#', 'Employee ID', 'Full Name', 'Department', 'Position', 'Status', 'Date Hired', 'Monthly Rate'];

interface Props { data: ReportPreviewData }

export function ReportTemplate({ data }: Props) {
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-white text-black font-sans"
      style={{ width: '816px', minHeight: '1056px', padding: '48px 50px', boxSizing: 'border-box' }}
    >
      {/* Report Header */}
      <div className="flex justify-between items-start mb-6 border-b-2 border-black pb-4">
        <div>
          <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-bold">
            {data.company || 'DIWA Learning Systems, Inc.'}
          </div>
          <h1 className="text-[20px] font-black uppercase tracking-tight leading-tight">
            {data.title || 'Employee Masterlist Report'}
          </h1>
          <p className="text-[11px] text-slate-500 mt-0.5 italic">
            {data.subtitle || 'All Active Employees — Direct Labor'}
          </p>
        </div>
        <div className="text-right text-[9px] space-y-0.5">
          <div><span className="font-bold">As of:</span> {data.asOf || today}</div>
          <div><span className="font-bold">Date Printed:</span> {today}</div>
          <div><span className="font-bold">Page:</span> 1 of 1</div>
          <div><span className="font-bold">Prepared by:</span> {data.preparedBy || 'System'}</div>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="flex gap-6 mb-5 text-[10px]">
        {[
          ['Total Employees', String(MOCK_ROWS.length)],
          ['Regular', String(MOCK_ROWS.filter(r => r.status === 'Regular').length)],
          ['Probationary', String(MOCK_ROWS.filter(r => r.status === 'Probationary').length)],
          ['Departments', '5'],
        ].map(([label, value]) => (
          <div key={label} className="border border-black px-3 py-1.5 text-center min-w-[80px]">
            <div className="font-black text-[16px]">{value}</div>
            <div className="text-[8px] text-slate-500 font-bold uppercase tracking-tight">{label}</div>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <table className="w-full border-collapse text-[9px]">
        <thead>
          <tr className="bg-[#00377B] text-white">
            {HEADERS.map(h => (
              <th key={h} className="border border-[#00377B] px-2 py-1.5 text-left font-bold uppercase tracking-wide text-[8px]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MOCK_ROWS.map((row, i) => (
            <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="border border-slate-200 px-2 py-1 text-slate-400">{i + 1}</td>
              <td className="border border-slate-200 px-2 py-1 font-mono font-bold">{row.id}</td>
              <td className="border border-slate-200 px-2 py-1 font-bold uppercase">{row.name}</td>
              <td className="border border-slate-200 px-2 py-1">{row.dept}</td>
              <td className="border border-slate-200 px-2 py-1">{row.position}</td>
              <td className="border border-slate-200 px-2 py-1">
                <span className={[
                  'inline-flex items-center rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-tight',
                  row.status === 'Regular' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700',
                ].join(' ')}>
                  {row.status}
                </span>
              </td>
              <td className="border border-slate-200 px-2 py-1">{row.dateHired}</td>
              <td className="border border-slate-200 px-2 py-1 text-right font-mono">{row.rate}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-slate-100 font-black border-t-2 border-black">
            <td colSpan={7} className="border border-slate-300 px-2 py-1.5 text-right uppercase text-[8px] tracking-widest">
              Total Monthly Cost:
            </td>
            <td className="border border-slate-300 px-2 py-1.5 text-right font-mono">
              {MOCK_ROWS.reduce((s, r) => s + parseFloat(r.rate.replace(/,/g, '')), 0)
                .toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Footer */}
      <div className="mt-8 flex justify-between items-end text-[9px]">
        <div>
          <div className="border-b border-black w-48 mb-1"></div>
          <div className="font-bold">Prepared by: {data.preparedBy || 'HRIS System'}</div>
          <div className="text-slate-400">Human Resources Management Division</div>
        </div>
        <div className="text-right">
          <div className="border-b border-black w-48 mb-1 ml-auto"></div>
          <div className="font-bold">Noted by: ___________________________</div>
          <div className="text-slate-400">HR Director / VP Operations</div>
        </div>
      </div>

      <div className="mt-6 border-t border-dashed border-black/40 pt-2 text-center opacity-40">
        <span className="text-[7px] font-black uppercase tracking-[0.2em] italic">
          System-Generated Report — DIWA HRIS — Confidential
        </span>
      </div>
    </div>
  );
}
