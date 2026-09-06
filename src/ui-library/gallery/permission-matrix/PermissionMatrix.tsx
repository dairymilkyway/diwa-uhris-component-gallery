/**
 * PermissionMatrix — Design System Component
 *
 * A grid showing which roles have which permissions, using checkboxes
 * or check icons. Purely presentational. No RBAC logic.
 *
 * Based on the "Effective Permission Matrix" pattern in RoleDetailPage.tsx
 * but domain-free.
 *
 * Accessibility:
 *   - <table> with <caption>
 *   - Column headers: role names
 *   - Row headers: permission names
 *   - Cell has aria-label: "Permission X for Role Y: granted/denied"
 */

import { Check, Minus } from 'lucide-react';

export interface PermissionMatrixCell {
  granted: boolean;
  /** If true, the cell is read-only and visually subdued */
  inherited?: boolean;
}

export interface PermissionMatrixProps {
  /** Column headers (roles) */
  roles: string[];
  /** Row definitions */
  permissions: Array<{
    label: string;
    group?: string;
    cells: PermissionMatrixCell[];
  }>;
  caption?: string;
  className?: string;
}

export function PermissionMatrix({
  roles,
  permissions,
  caption = 'Permission matrix',
  className = '',
}: PermissionMatrixProps) {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-slate-200 ${className}`}>
      <table className="w-full text-sm border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            <th scope="col" className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Permission
            </th>
            {roles.map((role) => (
              <th
                key={role}
                scope="col"
                className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-slate-500"
              >
                {role}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {permissions.map((perm) => (
            <tr key={perm.label} className="hover:bg-slate-50/60">
              <th
                scope="row"
                className="px-5 py-3 text-left text-xs font-semibold text-slate-700"
              >
                <div className="flex items-center gap-2">
                  {perm.group && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {perm.group}
                    </span>
                  )}
                  {perm.label}
                </div>
              </th>
              {perm.cells.map((cell, ci) => {
                const roleLabel = roles[ci] ?? '';
                const cellLabel = `${perm.label} for ${roleLabel}: ${cell.granted ? 'granted' : 'denied'}${cell.inherited ? ' (inherited)' : ''}`;
                return (
                  <td
                    key={ci}
                    className="px-4 py-3 text-center"
                    aria-label={cellLabel}
                  >
                    {cell.granted ? (
                      <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full mx-auto ${cell.inherited ? 'bg-brand-blue/15 text-brand-blue/60' : 'bg-brand-blue text-white'}`}>
                        <Check size={11} strokeWidth={2.5} aria-hidden="true" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full mx-auto bg-slate-100 text-slate-300">
                        <Minus size={11} aria-hidden="true" />
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
