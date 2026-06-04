import { TOTAL_STEPS } from "../../constants/steps.ts";

export type ProgressBarProps = {
  /** Zero-based index of the active registration step. */
  currentStep: number;
};

export function ProgressBar({ currentStep }: ProgressBarProps) {
  if (currentStep <= 0) {
    return null;
  }

  const percent = Math.min((currentStep / (TOTAL_STEPS - 1)) * 100, 100);

  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={0}
      aria-valuemax={TOTAL_STEPS - 1}
      aria-label={`Registration progress, step ${currentStep} of ${TOTAL_STEPS - 1}`}
    >
      <div
        className="h-full rounded-full bg-[#2563eb] transition-all duration-300 ease-out"
        style={{ width: `${percent}%` }}
        aria-hidden
      />
    </div>
  );
}
