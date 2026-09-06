/**
 * PaginationPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
} from '../components/PlaygroundPanel';
import { Pagination } from './Pagination';

type TotalOption = '5' | '10' | '20' | '50';

export function PaginationPlayground() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPagesStr] = useState<TotalOption>('10');
  const total = parseInt(totalPages, 10);

  const controls = (
    <ControlGroup label="Total Pages">
      <RadioControl<TotalOption>
        name="totalPages"
        value={totalPages}
        onChange={(v) => { setTotalPagesStr(v); setPage(1); }}
        options={[
          { value: '5',  label: '5'  },
          { value: '10', label: '10' },
          { value: '20', label: '20' },
          { value: '50', label: '50' },
        ]}
      />
    </ControlGroup>
  );

  return (
    <PlaygroundPanel
      controls={controls}
      preview={
        <div className="flex flex-col items-center gap-2">
          <Pagination page={page} totalPages={total} onPageChange={setPage} />
          <p className="text-xs font-medium text-slate-400">
            Page {page} of {total}
          </p>
        </div>
      }
    />
  );
}
