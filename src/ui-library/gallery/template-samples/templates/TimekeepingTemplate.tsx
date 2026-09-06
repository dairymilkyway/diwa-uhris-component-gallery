/**
 * TimekeepingTemplate — self-contained preview component
 *
 * Ported from unified-hris/components/TimekeepingFileTemplate.tsx.
 * No context deps. All data is mock + prop-driven.
 */

import React from 'react';

export interface TimekeepingPreviewData {
  employee: {
    name: string;
    role: string;
    department: string;
    empId?: string;
    supervisor?: string;
  };
  period: string;
}

const RECORDS = [
  { dateIn: '16-Jan-25', day: 'Thu', shift: 1, timeIn: '7:00 am', dateOut: '16-Jan-25', timeOut: '4:00 pm', hours: '8.00', actual: '9.00', late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '17-Jan-25', day: 'Fri', shift: 1, timeIn: '7:15 am', dateOut: '17-Jan-25', timeOut: '4:00 pm', hours: '8.00', actual: '9.00', late: '15', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '18-Jan-25', day: 'Sat', shift: 1, timeIn: '-',      dateOut: '-',          timeOut: '-',        hours: '-',    actual: '-',    late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '19-Jan-25', day: 'Sun', shift: 1, timeIn: '-',      dateOut: '-',          timeOut: '-',        hours: '-',    actual: '-',    late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '20-Jan-25', day: 'Mon', shift: 1, timeIn: '7:00 am', dateOut: '20-Jan-25', timeOut: '4:00 pm', hours: '8.00', actual: '9.00', late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '21-Jan-25', day: 'Tue', shift: 1, timeIn: '7:00 am', dateOut: '21-Jan-25', timeOut: '4:00 pm', hours: '8.00', actual: '9.00', late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '22-Jan-25', day: 'Wed', shift: 1, timeIn: '7:00 am', dateOut: '22-Jan-25', timeOut: '4:00 pm', hours: '8.00', actual: '9.00', late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '23-Jan-25', day: 'Thu', shift: 1, timeIn: '7:00 am', dateOut: '23-Jan-25', timeOut: '4:00 pm', hours: '8.00', actual: '9.00', late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '24-Jan-25', day: 'Fri', shift: 1, timeIn: '7:00 am', dateOut: '24-Jan-25', timeOut: '4:00 pm', hours: '8.00', actual: '9.00', late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '25-Jan-25', day: 'Sat', shift: 1, timeIn: '-',      dateOut: '-',          timeOut: '-',        hours: '-',    actual: '-',    late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '26-Jan-25', day: 'Sun', shift: 1, timeIn: '-',      dateOut: '-',          timeOut: '-',        hours: '-',    actual: '-',    late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '27-Jan-25', day: 'Mon', shift: 1, timeIn: '7:00 am', dateOut: '27-Jan-25', timeOut: '4:00 pm', hours: '8.00', actual: '9.00', late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '28-Jan-25', day: 'Tue', shift: 1, timeIn: '7:00 am', dateOut: '28-Jan-25', timeOut: '4:00 pm', hours: '8.00', actual: '9.00', late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '29-Jan-25', day: 'Wed', shift: 1, timeIn: '-',      dateOut: '-',          timeOut: '-',        hours: '-',    actual: '-',    late: '-', utime: '-', ot: '-', nd2: '-', rem: 'Sp. Hol' },
  { dateIn: '30-Jan-25', day: 'Thu', shift: 1, timeIn: '7:00 am', dateOut: '30-Jan-25', timeOut: '4:00 pm', hours: '8.00', actual: '9.00', late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
  { dateIn: '31-Jan-25', day: 'Fri', shift: 1, timeIn: '7:00 am', dateOut: '31-Jan-25', timeOut: '4:00 pm', hours: '8.00', actual: '9.00', late: '-', utime: '-', ot: '-', nd2: '-', rem: '-' },
];

const OT_SUMMARY = ['OT 0.30', 'OT 1.00', 'OT 1.25', 'OT 1.30', 'OT 1.69', 'OT 1.50', 'OT 1.95', 'OT 2.00', 'OT 2.69', 'OT 3.38'];

interface Props { data: TimekeepingPreviewData }

export function TimekeepingTemplate({ data }: Props) {
  return (
    <div className="w-[297mm] min-h-[210mm] bg-white text-black font-sans text-[10px] leading-tight p-10 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="mb-2 text-[10px]">DatePrinted: &nbsp; {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</div>
          <h1 className="text-xl font-bold uppercase tracking-tight">DIWA HRIS — TimeSheet</h1>
          <div className="mt-4 flex gap-8">
            <div>
              <div className="flex gap-2">
                <span className="w-16">Emp. ID:</span>
                <span className="font-bold">{data.employee.empId || 'DL250814-002'}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-16">Name:</span>
                <span className="font-bold uppercase">{data.employee.name}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="mb-1">Page 1 of 1</div>
          <div className="font-bold text-sm mb-2">{data.period || '01/16/2025 – 01/31/2025'}</div>
          <div className="grid grid-cols-[80px_1fr] gap-x-2 text-left">
            <span>Shift:</span><span className="font-bold">1</span>
            <span>Position:</span><span className="font-bold">{data.employee.role}</span>
            <span>Department:</span><span className="font-bold">{data.employee.department}</span>
            <span>Imm. Superior:</span><span className="font-bold">{data.employee.supervisor || 'ACGarcia'}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border-t border-b border-black mb-1">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b border-black">
              {['DateIn','Day','Shift','TimeIn','DateOut','TimeOut','Hours','Actual','Late','Utime','OT','ND2','Rem.'].map(h => (
                <th key={h} className="py-1 text-[9px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECORDS.map((r, i) => (
              <tr key={i} className="h-4">
                <td>{r.dateIn}</td><td>{r.day}</td><td>{r.shift}</td>
                <td>{r.timeIn}</td><td>{r.dateOut}</td><td>{r.timeOut}</td>
                <td>{r.hours}</td><td>{r.actual}</td><td>{r.late}</td>
                <td>{r.utime}</td><td>{r.ot}</td><td>{r.nd2}</td><td>{r.rem}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-black font-bold">
              <td colSpan={6} className="text-left py-1 pl-2">Totals: ( 11 WorkDays )</td>
              <td>88.00</td><td>99.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex justify-end mb-6 font-bold text-[10px]">
        <div className="text-right w-[120px]">
          Employment Status:<br />Regular<br />Monthly<br />Rest Day: Sunday
        </div>
      </div>

      {/* Certification */}
      <div className="text-center mb-10 px-12">
        <p className="mb-1">I hereby certify that the above records are true and correct. Any</p>
        <p>unauthorized overtime will not be paid by the management.</p>
      </div>

      {/* Signatures */}
      <div className="flex justify-between px-16 mb-10">
        <div className="text-center w-48">
          <div className="border-b border-black mb-1"></div>
          <div>Employee Signature</div>
        </div>
        <div className="text-center w-48">
          <div className="border-b border-black mb-1"></div>
          <div>Immediate Superior</div>
        </div>
      </div>

      {/* HRD Footer */}
      <div className="text-center mb-2">For HRD use only, please do not tamper with.</div>
      <div className="border-t border-black pt-2 flex justify-between items-start mb-6">
        <div className="grid grid-cols-[90px_60px] gap-y-0.5">
          {[
            ['Days Worked:', '11.00'], ['Hours Worked:', '88.00'], ['Absences:', '1.00'],
            ['', ''], ['Tardiness:', '0.00'], ['Reg. ND1', '0.00'],
            ['Reg. ND2', '0.00'], ['Holiday', '1.00'], ['', ''], ['Undertime:', '0.00'],
          ].map(([k, v], i) => (
            <React.Fragment key={i}><span>{k}</span><span className="text-right">{v}</span></React.Fragment>
          ))}
        </div>
        <div className="w-1/3">
          <div className="flex border-b border-black pb-0.5 mb-1">
            <span className="underline mr-auto">Summary:</span>
            <span className="w-10 text-center underline">10%</span>
            <span className="w-10 text-center underline">15%</span>
          </div>
          <div className="grid grid-cols-1 gap-y-0.5 pl-2">
            {OT_SUMMARY.map(ot => <div key={ot}>{ot}</div>)}
          </div>
        </div>
        <div className="grid grid-cols-[90px_30px] gap-y-0.5 text-right">
          {[
            ['VL Bal :', '10'], ['SL Bal :', '14'], ['VL w/ Pay :', '0'],
            ['VL w/o Pay :', '0'], ['Prev.VL w/ Pay :', '0'], ['SL w/ Pay :', '0'],
            ['SL w/o Pay :', '0'], ['PL Taken :', '0'], ['BL Taken :', '0'],
            ['Meal Allow. :', '0'],
          ].map(([k, v], i) => (
            <React.Fragment key={i}><span>{k}</span><span>{v}</span></React.Fragment>
          ))}
        </div>
      </div>

      <div className="border-t border-black/50 border-dashed pt-2"></div>
    </div>
  );
}
