/**
 * FieldInput — Gallery-native context-aware <input> wrapper.
 * Copied from shared/components/FieldInput.tsx.
 * Updated to import FieldContext from gallery-local field directory
 * and to carry full DIWA visual styling.
 */
import { cn } from '../../../lib/utils';
import { useFieldContext } from '../field/FieldContext';

type FieldInputProps = React.ComponentProps<'input'>;

export function FieldInput({
  id,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
  className = '',
  disabled,
  ref,
  ...rest
}: FieldInputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const ctx = useFieldContext();

  const resolvedId          = id              ?? ctx?.inputId;
  const resolvedRequired    = ariaRequired    ?? (ctx?.required ? 'true' : undefined);
  const resolvedInvalid     = ariaInvalid     ?? (ctx?.invalid  ? 'true' : undefined);
  const resolvedDescribedBy = ariaDescribedBy ?? (ctx?.invalid && ctx?.errorId ? ctx.errorId : undefined);

  const isInvalid = resolvedInvalid === 'true';

  return (
    <input
      ref={ref}
      id={resolvedId}
      aria-required={resolvedRequired}
      aria-invalid={resolvedInvalid}
      aria-describedby={resolvedDescribedBy}
      disabled={disabled}
      className={cn(
        // Layout + sizing
        'h-10 w-full rounded-md border bg-white px-3.5 text-sm font-medium text-slate-900',
        'outline-none transition-all duration-150',
        'placeholder:text-slate-400',
        // Default border + focus ring
        isInvalid
          ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
          : 'border-slate-200 hover:border-slate-300 focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/15',
        // Disabled
        disabled && 'cursor-not-allowed bg-slate-50 text-slate-400 opacity-60',
        className,
      )}
      {...rest}
    />
  );
}
