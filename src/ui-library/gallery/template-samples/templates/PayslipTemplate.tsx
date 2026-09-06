/**
 * PayslipTemplate — self-contained preview component
 *
 * Ported from unified-hris/components/PayslipTemplate.tsx.
 * No context deps. All data prop-driven with sane defaults.
 */

export interface PayslipPreviewData {
  id: string;
  name: string;
  role: string;
  department: string;
  payPeriod?: string;
  netPay?: number;
  rates?: { hourly: number; daily: number; monthly: number };
  taxCode?: string;
  taxableGross?: number;
  nonTaxableGross?: number;
  ytd?: { gross: number; tax: number };
  leaveBalances?: {
    vacation: { remaining: number };
    sick: { remaining: number };
    personal?: { remaining: number };
  };
}

const DEDUCTIONS = [
  { label: 'W-Tax',      amount: 117.59,  remainingBalance: undefined,  base: undefined },
  { label: 'Pag-Ibig',   amount: 100.00,  remainingBalance: undefined,  base: undefined },
  { label: 'HMO Premium',amount: 229.99,  remainingBalance: undefined,  base: 5059.84   },
  { label: 'Insurance',  amount: 19.44,   remainingBalance: undefined,  base: 427.62    },
  { label: 'COOP Share', amount: 300.00,  remainingBalance: 4500.00,    base: undefined },
  { label: 'Salary Loan',amount: 1250.00, remainingBalance: 12500.00,   base: undefined },
];

const ATTENDANCE_LOGS = [
  { in: '07:00', out: '16:00' }, { in: '07:15', out: '16:00' },
  { in: 'Reg. Hol', out: 'Reg. Hol' }, { in: 'Sp. Hol', out: 'Sp. Hol' },
  { in: '-', out: '-' }, { in: '-', out: '-' },
  { in: '07:00', out: '16:00' }, { in: 'VL w/pay', out: 'VL w/pay' },
  { in: 'SL w/pay', out: 'SL w/pay' }, { in: '07:00', out: '12:00 (VL)' },
  { in: '07:00', out: '13:00 (SL)' }, { in: '07:00 (RH)', out: '16:00' },
  { in: '-', out: '-' }, { in: '07:00', out: '16:00' },
  { in: '07:00', out: '16:00' }, { in: '07:00', out: '16:00' },
];

const WHOLE_DAY_TYPES = new Set(['Reg. Hol', 'Sp. Hol', 'VL w/pay', 'VL wo/pay', 'SL w/pay', 'SL wo/pay']);

const fc = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fr = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });

interface AttendanceRow { date: string; in: string; out: string }

function AttendanceTable({ logs }: { logs: AttendanceRow[] }) {
  return (
    <table className="flex-1 w-full text-center">
      <thead>
        <tr className="border-b border-black">
          <th className="font-black text-[8px]">Date</th>
          <th className="font-black text-[8px]">IN</th>
          <th className="font-black text-[8px]">OUT</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, i) => {
          const isWholeDay = WHOLE_DAY_TYPES.has(log.in) && log.in === log.out;
          const isAbsence = log.in === '-' && log.out === '-';
          const isTiny = log.in.includes('(') || log.out.includes('(');
          return (
            <tr key={i}>
              <td className="font-bold text-[8px]">{log.date}</td>
              {isWholeDay ? (
                <td colSpan={2} className="text-center font-bold text-[5px] tracking-tight uppercase border-b border-black/10">{log.in}</td>
              ) : isAbsence ? (
                <><td className="text-[6px]">—</td><td className="text-[6px]">—</td></>
              ) : (
                <>
                  <td className={isTiny ? 'text-[5px]' : 'text-[8px]'}>{log.in}</td>
                  <td className={isTiny ? 'text-[5px]' : 'text-[8px]'}>{log.out}</td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

interface Props { data: PayslipPreviewData }

export function PayslipTemplate({ data }: Props) {
  const rates = data.rates ?? { hourly: 107.9713, daily: 863.77, monthly: 22601.90 };
  const taxCode = data.taxCode ?? 'S';
  const taxableGross = data.taxableGross ?? (data.netPay ? data.netPay * 1.1 : 22601.90);
  const nonTaxableGross = data.nonTaxableGross ?? 0;
  const totalGross = taxableGross + nonTaxableGross;
  const totalDeductions = DEDUCTIONS.reduce((s, d) => s + d.amount, 0);
  const finalNet = totalGross - totalDeductions;

  // Build dated attendance logs based on pay period
  const buildLogs = (): AttendanceRow[] => {
    const period = data.payPeriod;
    return ATTENDANCE_LOGS.map((log, idx) => {
      let date = String(16 + idx).padStart(2, '0');
      if (period && period.includes('-')) {
        const monthMap: Record<string, number> = {
          Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11,
        };
        const parts = period.split(' ');
        const startMonth = monthMap[parts[0]] ?? 0;
        const startDay = parseInt(parts[1]) || 1;
        const year = parseInt(period.match(/\d{4}$/)?.[0] ?? String(new Date().getFullYear()));
        const d = new Date(year, startMonth, startDay + idx);
        date = `${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
      }
      return { ...log, date };
    });
  };

  const logs = buildLogs();
  const leftLogs = logs.slice(0, 8);
  const rightLogs = logs.slice(8, 16);

  return (
    <div className="bg-white text-[#1a1a1a] p-8 font-mono text-[10px] max-w-[900px] mx-auto leading-tight">
      {/* Header */}
      <div className="grid grid-cols-12 gap-0 mb-2 items-start h-[70px]">
        <div className="col-span-4 translate-y-2">
          <h1 className="text-lg font-black tracking-tight leading-none mb-2">DIWA HRIS PAYSLIP</h1>
          <p className="font-bold flex gap-1 text-[9px]">Period: <span className="font-normal">{data.payPeriod || 'No Period Selected'}</span></p>
          <p className="font-bold flex gap-1 text-[8px]">Printed: <span className="font-normal">{new Date().toLocaleDateString()}</span></p>
        </div>
        <div className="col-span-4 border border-black p-1.5 mt-2 mb-1 relative z-10">
          <div className="flex gap-2 mb-0.5 border-b border-black pb-0.5">
            <span className="font-black border-r border-black pr-2">{data.id}</span>
            <span className="font-black tracking-tight">{data.name.toUpperCase()}</span>
          </div>
          <div className="font-bold text-[9px] border-b border-black pb-0.5 mb-0.5">{data.role}</div>
          <div className="font-bold text-[9px]">{data.department}</div>
        </div>
        <div className="col-span-4 text-[9px] pl-8 text-right pr-2 mt-4 space-y-0">
          {[
            ['Hourly :', fr(rates.hourly)],
            ['Daily :', fr(rates.daily)],
            ['Monthly :', fr(rates.monthly)],
            ['Tax Code :', taxCode],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-2">
              <span className="text-left font-bold">{k}</span>
              <span className="font-bold">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-12 border-t border-black min-h-[160px]">
        {/* Earnings + Deductions */}
        <div className="col-span-8 grid grid-cols-2 border-r border-black min-h-[160px]">
          {/* Earnings */}
          <div className="border-r border-black p-1 flex flex-col h-full">
            <div className="flex-1">
              <div className="font-black border-b border-black mb-1 p-0.5 flex justify-between">
                <span>EARNINGS:</span>
                <div className="flex gap-8 text-[7px] pr-2 items-center">
                  <span>UNIT</span><span>AMOUNT</span>
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="grid grid-cols-12 gap-1 px-1">
                  <span className="col-span-7">Basic Salary</span>
                  <span className="col-span-5 text-right">{fc(taxableGross)}</span>
                </div>
                <div className="grid grid-cols-12 gap-1 px-1">
                  <span className="col-span-6">Holiday Pay</span>
                  <span className="col-span-2 text-right">1.00</span>
                  <span className="col-span-4 text-right">863.77</span>
                </div>
                <div className="grid grid-cols-12 gap-1 px-1 italic">
                  <span className="col-span-6">Absences</span>
                  <span className="col-span-2 text-right">1.00</span>
                  <span className="col-span-4 text-right">({fc(863.77)})</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-dotted border-black space-y-0.5">
              <div className="grid grid-cols-12 gap-1 px-1">
                <span className="col-span-8 font-bold">Gross <span className="font-normal">(taxable)</span></span>
                <span className="col-span-4 text-right">{fc(taxableGross)}</span>
              </div>
              <div className="grid grid-cols-12 gap-1 px-1">
                <span className="col-span-8 font-bold">Gross <span className="font-normal">(nontaxable)</span></span>
                <span className="col-span-4 text-right">{fc(nonTaxableGross)}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="p-1">
            <div className="font-black border-b border-black mb-1 p-0.5 flex justify-between">
              <span>DEDUCTIONS:</span>
              <div className="flex gap-4 text-[7px] pr-2 items-center">
                <span className="w-16 text-center">REM. BAL</span>
                <span className="w-12 text-right">AMOUNT</span>
              </div>
            </div>
            <div className="space-y-0.5">
              {DEDUCTIONS.map((d, i) => (
                <div key={i} className="grid grid-cols-12 gap-1 px-1">
                  <span className="col-span-5">{d.label}</span>
                  <span className="col-span-3 text-center text-[8px] text-slate-500">
                    {d.remainingBalance ? fc(d.remainingBalance) : d.base ? fc(d.base) : ''}
                  </span>
                  <span className="col-span-4 text-right">{fc(d.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Logs */}
        <div className="col-span-4 p-1 text-[8px]">
          <div className="flex gap-4">
            <AttendanceTable logs={leftLogs} />
            <AttendanceTable logs={rightLogs} />
          </div>
        </div>
      </div>

      {/* Bottom summary */}
      <div className="border-t border-black mb-1">
        <div className="grid grid-cols-12">
          <div className="col-span-8 border-r border-black">
            <div className="grid grid-cols-2 bg-slate-100 py-1.5 border-y border-black font-black uppercase tracking-tight">
              <div className="grid grid-cols-12 px-2 border-r border-black">
                <span className="col-span-7">Total Gross</span>
                <span className="col-span-5 text-right">{fc(totalGross)}</span>
              </div>
              <div className="grid grid-cols-12 px-2">
                <span className="col-span-8 text-right pr-4">Total Deductions:</span>
                <span className="col-span-4 text-right">{fc(totalDeductions)}</span>
              </div>
            </div>
            <div className="p-1 px-2 flex gap-4 items-center h-8">
              <span className="text-[11px] font-black uppercase">Net Pay:</span>
              <span className="text-[16px] font-black pl-4">{fc(finalNet)}</span>
            </div>
          </div>
          <div className="col-span-4 p-1 px-2">
            <div className="grid grid-cols-2 border border-black text-center mb-2">
              <div className="border-r border-black p-0.5">
                <div className="border-b border-black font-bold uppercase text-[7px] mb-0.5">YTD Gross</div>
                <div className="font-black text-[12px]">{fc(data.ytd?.gross ?? taxableGross)}</div>
              </div>
              <div className="p-0.5">
                <div className="border-b border-black font-bold uppercase text-[7px] mb-0.5">YTD Tax</div>
                <div className="font-black text-[12px]">{fc(data.ytd?.tax ?? totalDeductions * 0.1)}</div>
              </div>
            </div>
            <div className="flex justify-between text-[8px] font-bold uppercase px-1 pb-0.5 pt-1">
              {[
                ['VL', data.leaveBalances?.vacation.remaining ?? 10],
                ['SL', data.leaveBalances?.sick.remaining ?? 14],
                ['PL', data.leaveBalances?.personal?.remaining ?? 0],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex gap-1">
                  <span>{k} Bal:</span>
                  <span className="font-normal">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 border-t-2 border-dashed border-black pt-2 opacity-30 text-center">
        <span className="text-[7px] font-black uppercase tracking-[0.2em] italic">
          Authorized Document — DIWA HRIS Fin-Audit System
        </span>
      </div>
    </div>
  );
}
