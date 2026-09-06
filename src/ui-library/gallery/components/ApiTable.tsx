/**
 * ApiTable
 *
 * Prop API reference table for gallery component pages.
 *
 * Brand application (DESIGN.md):
 *   Table header bg   — brand-navy tinted (#eef2f8)
 *   Table header text — brand-navy
 *   Prop name code    — brand-blue tinted bg, brand-navy text
 *   Type code         — brand-blue text
 *   Required badge    — unchanged (semantic: rose)
 */

interface ApiProp {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface ApiTableProps {
  props: ApiProp[];
}

export function ApiTable({ props }: ApiTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            {/* Header — brand-navy tinted background */}
            <tr className="border-b border-slate-200/80 bg-[#eef2f8]">
              <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-brand-navy">
                Prop
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-brand-navy">
                Type
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-brand-navy">
                Default
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-brand-navy">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {props.map((prop) => (
              <tr key={prop.name} className="group hover:bg-slate-50/60">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    {/* Prop name — brand-blue tinted chip */}
                    <code className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-xs font-bold text-brand-navy">
                      {prop.name}
                    </code>
                    {prop.required && (
                      <span className="rounded-full border border-rose-100 bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-rose-600">
                        required
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  {/* Type — brand-blue text */}
                  <code className="font-mono text-xs text-brand-blue">{prop.type}</code>
                </td>
                <td className="px-5 py-3.5">
                  {prop.default ? (
                    <code className="font-mono text-xs text-slate-500">{prop.default}</code>
                  ) : (
                    <span className="text-xs text-slate-300">—</span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-xs font-medium leading-relaxed text-slate-600">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
