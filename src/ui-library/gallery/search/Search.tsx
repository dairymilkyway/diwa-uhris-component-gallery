/**
 * Search — Design System Component
 *
 * A search input with a built-in search icon prefix and optional clear button.
 * Built for filtering and discovery use cases — not for form submission fields
 * (use Input for those).
 *
 * Features:
 *   - Search icon in prefix by default
 *   - Optional × clear button when value is non-empty (pass onClear)
 *   - Controlled via value + onChange (standard input event)
 *   - Forwards ref to the underlying <input>
 *   - All native <input> attributes are forwarded
 */

import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface SearchProps extends Omit<React.ComponentProps<'input'>, 'type'> {
  /** Called when the × clear button is clicked. When provided, shows the × button if value is non-empty. */
  onClear?: () => void;
  /** Override className on the outer wrapper div */
  className?: string;
  /** Ref forwarded to the underlying <input> element */
  ref?: React.Ref<HTMLInputElement>;
}

export function Search({
  value,
  onChange,
  onClear,
  placeholder = 'Search…',
  disabled = false,
  className = '',
  ref,
  ...props
}: SearchProps) {
  const hasValue = value !== undefined && value !== '';

  return (
    <div
      className={cn(
        'flex w-full items-center rounded-xl border bg-slate-50 transition-all',
        'border-slate-200 focus-within:border-brand-blue/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-blue/15',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      {/* Search icon */}
      <span className="flex shrink-0 items-center pl-3.5 text-slate-400" aria-hidden="true">
        <SearchIcon size={15} />
      </span>

      {/* Input */}
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-transparent py-2.5 pl-2.5 pr-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        {...props}
      />

      {/* Clear button */}
      {onClear && hasValue && !disabled && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="flex shrink-0 items-center pr-3 text-slate-400 transition-colors hover:text-slate-600"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
