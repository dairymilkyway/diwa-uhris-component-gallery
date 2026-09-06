/**
 * FieldContext — Gallery-native version.
 * Copied from shared/components/FieldContext.ts.
 */
import { createContext, use } from 'react';

export interface FieldContextValue {
  inputId: string;
  errorId: string;
  required: boolean;
  invalid: boolean;
}

export const FieldContext = createContext<FieldContextValue | null>(null);

/** Returns the nearest Field's context, or null when used outside a Field. */
export function useFieldContext(): FieldContextValue | null {
  return use(FieldContext);
}
