/**
 * Stepper — Design System Component
 *
 * A step progress indicator for multi-step workflows.
 *
 * Step states: completed | current | upcoming | disabled
 *
 * Accessibility:
 *   - The current step receives aria-current="step".
 *   - Completed steps have aria-label with a "Completed" suffix when no icon.
 *   - The step list is an ordered list (<ol>) — each step is an <li>.
 *   - Orientation is exposed via aria-orientation on the container.
 *
 * API:
 *   <Stepper
 *     steps={[
 *       { id: '1', label: 'Personal Details', description: 'Name and contact' },
 *       { id: '2', label: 'Employment',       description: 'IDs and dates' },
 *     ]}
 *     currentStep="2"
 *     completedSteps={['1']}
 *   />
 */

import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../../lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

export type StepState = 'completed' | 'current' | 'upcoming' | 'disabled';

export interface StepDef {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}

export interface StepperProps {
  steps: StepDef[];
  /** The id of the currently active step */
  currentStep: string;
  /** IDs of steps that are completed */
  completedSteps?: string[];
  /** IDs of steps that are disabled */
  disabledSteps?: string[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveState(
  id: string,
  currentStep: string,
  completedSteps: string[],
  disabledSteps: string[],
): StepState {
  if (disabledSteps.includes(id)) return 'disabled';
  if (completedSteps.includes(id)) return 'completed';
  if (id === currentStep) return 'current';
  return 'upcoming';
}

// ── Step indicator circle ─────────────────────────────────────────────────────

function StepCircle({ state, number, icon }: { state: StepState; number: number; icon?: ReactNode }) {
  const base = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all';

  const styles: Record<StepState, string> = {
    completed: 'border-brand-blue bg-brand-blue text-white',
    current:   'border-brand-blue bg-white text-brand-blue shadow-md shadow-brand-blue/15',
    upcoming:  'border-slate-300 bg-white text-slate-400',
    disabled:  'border-slate-200 bg-slate-50 text-slate-300',
  };

  return (
    <div className={`${base} ${styles[state]}`} aria-hidden="true">
      {state === 'completed' ? (
        icon ?? <Check size={16} strokeWidth={3} />
      ) : (
        icon ?? <span>{number}</span>
      )}
    </div>
  );
}

// ── Stepper ───────────────────────────────────────────────────────────────────

export function Stepper({
  steps,
  currentStep,
  completedSteps = [],
  disabledSteps  = [],
  orientation = 'horizontal',
  className = '',
}: StepperProps) {
  const isHorizontal = orientation === 'horizontal';

  if (!isHorizontal) {
    // ── Vertical layout ───────────────────────────────────────────────────────
    return (
      <div
        role="group"
        aria-label="Progress"
        className={cn('flex flex-col', className)}
      >
        <ol className="flex flex-col">
          {steps.map((step, idx) => {
            const state = resolveState(step.id, currentStep, completedSteps, disabledSteps);
            const isCurrent = state === 'current';
            const isLast = idx === steps.length - 1;
            const labelColor: Record<StepState, string> = {
              completed: 'text-brand-blue',
              current:   'text-brand-navy font-bold',
              upcoming:  'text-slate-500',
              disabled:  'text-slate-300',
            };
            return (
              <li
                key={step.id}
                aria-current={isCurrent ? 'step' : undefined}
                className="flex items-start gap-4 pb-8 last:pb-0"
              >
                <div className="relative flex flex-col items-center">
                  <StepCircle state={state} number={idx + 1} icon={step.icon} />
                  {!isLast && (
                    <div
                      className={`mt-1 w-0.5 flex-1 min-h-[32px] ${
                        state === 'completed' ? 'bg-brand-blue/50' : 'bg-slate-200'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <p className={`text-sm leading-tight ${labelColor[state]}`}>{step.label}</p>
                  {step.description && (
                    <p className="mt-0.5 text-xs text-slate-400 leading-tight">{step.description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  // ── Horizontal layout ─────────────────────────────────────────────────────
  // Grid approach: N equal columns, circle centered in each column,
  // connector as a full-width bar on a separate row behind the circles.
  // No translateX hacks needed.
  const resolvedStates = steps.map((step) =>
    resolveState(step.id, currentStep, completedSteps, disabledSteps)
  );

  const labelColor: Record<StepState, string> = {
    completed: 'text-brand-blue',
    current:   'text-brand-navy font-bold',
    upcoming:  'text-slate-500',
    disabled:  'text-slate-300',
  };

  return (
    <div
      role="group"
      aria-label="Progress"
      className={cn('w-full', className)}
    >
      <ol
        className="grid w-full"
        style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
      >
        {steps.map((step, idx) => {
          const state = resolvedStates[idx];
          const isCurrent = state === 'current';
          const isLast = idx === steps.length - 1;
          const prevState = idx > 0 ? resolvedStates[idx - 1] : null;
          // connector on the LEFT side of this step (between prev and current)
          const connectorDone = prevState === 'completed' || prevState === 'current';

          return (
            <li
              key={step.id}
              aria-current={isCurrent ? 'step' : undefined}
              className="flex flex-col items-center"
            >
              {/* Circle + connectors row */}
              <div className="flex w-full items-center">
                {/* Left connector */}
                {idx > 0 ? (
                  <div
                    className={`h-0.5 flex-1 ${connectorDone ? 'bg-brand-blue/50' : 'bg-slate-200'}`}
                    aria-hidden="true"
                  />
                ) : (
                  <div className="flex-1" aria-hidden="true" />
                )}

                {/* Circle — always centered */}
                <div className="shrink-0 z-10">
                  <StepCircle state={state} number={idx + 1} icon={step.icon} />
                </div>

                {/* Right connector */}
                {!isLast ? (
                  <div
                    className={`h-0.5 flex-1 ${state === 'completed' ? 'bg-brand-blue/50' : 'bg-slate-200'}`}
                    aria-hidden="true"
                  />
                ) : (
                  <div className="flex-1" aria-hidden="true" />
                )}
              </div>

              {/* Label — centered under circle */}
              <div className="mt-2 flex flex-col items-center text-center px-1">
                <p className={`text-sm leading-tight ${labelColor[state]}`}>{step.label}</p>
                {step.description && (
                  <p className="mt-0.5 text-xs text-slate-400 leading-tight">{step.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
